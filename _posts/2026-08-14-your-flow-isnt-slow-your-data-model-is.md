---
title: "Your Flow isn't slow — your data model is"
description: "Most 'Flow performance' problems are really data model problems wearing a costume. Here's how to tell the difference before you start optimising the wrong thing."
tags: [Flow, Performance, Data model]
---

Every few months someone hands me an org where a record-triggered Flow is timing
out, and asks me to make the Flow faster. Nine times out of ten the Flow is fine.
It's doing exactly what it was told, on top of a data model that makes the
instruction expensive.

## The tell

Open the Flow. Count the Get Records elements that sit **inside** a loop. If the
answer is anything above zero, stop reading about Flow optimisation — you have a
bulkification bug, and it will bite you the first time someone imports 5,000 rows.

But assume you've already fixed that and it's still slow. The next question isn't
about the Flow at all. It's this:

> How many records does one Get Records element have to look at before it can
> return the handful you actually want?

That number is a property of your object design, not your automation.

## A concrete example

A client had a `Case` trigger Flow that looked up the related `Account`, then all
`Contract__c` records on that Account, then filtered in memory for the one that
was active. On a healthy Account, that's three contracts. On their biggest
customer, it was 4,100 — because every amendment had been created as a new
contract record rather than a version on an existing one.

The Flow wasn't slow. It was pulling four thousand rows to find one.

The fix wasn't in the Flow. It was a formula field on `Account`:

```apex
// Active_Contract__c — a lookup maintained by a single scheduled job,
// rather than resolved at runtime on every single Case save.
```

Once the Account carried a direct reference to its active contract, the Flow's
Get Records dropped from 4,100 rows to 1, and runtime went from ~8 seconds to
under 200ms. Nothing about the Flow's logic changed.

## How to check yours

Run this in the Developer Console against your worst-performing object, and
substitute your own relationship:

```sql
SELECT AccountId, COUNT(Id)
FROM Contract__c
GROUP BY AccountId
ORDER BY COUNT(Id) DESC
LIMIT 20
```

If the top of that list is one or two orders of magnitude above the median, your
automation is being sized by your outliers. That's the thing to fix.

## The rule I use now

Before touching a Flow for performance, I write down three numbers:

1. **Rows scanned** per Get Records, at the 99th percentile parent record
2. **Rows needed** to make the decision
3. **DML statements** per transaction

If (1) is much larger than (2), it's a data model problem. If (3) is climbing with
record count, it's a bulkification problem. Only when both look sane is it
actually worth arguing about Flow versus Apex.

Optimising a Flow that sits on a bad model is like tuning the engine on a car
that's dragging an anchor. It's satisfying work. It just doesn't move the car.
