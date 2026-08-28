---
title: "Migrating off Workflow Rules without breaking everything"
description: "A phased approach to retiring legacy Workflow Rules and Process Builder that doesn't require a big-bang cutover — or a weekend of hotfixes."
tags: [Flow, Migration, Automation]
---

Salesforce has been telling everyone to move off Workflow Rules and Process
Builder for years now. Most orgs I walk into have started, stalled, and ended up
in the worst possible state: some logic in Workflow, some in Process Builder,
some in Flow, and no single place that tells you what fires when.

Here's the sequence I use. It's deliberately slow.

## Step 1: Inventory before you touch anything

You cannot migrate what you can't see. Before any config change, produce a single
table with one row per automation:

| Automation | Type | Object | What it does | Still needed? |
| --- | --- | --- | --- | --- |
| Set default close date | Workflow Rule | Opportunity | Stamps a date on create | No — field retired in 2023 |
| Notify AE on stage change | Process Builder | Opportunity | Sends an email alert | Yes — rebuild in Flow |
| Sync billing contact | Workflow Rule | Account | Cross-object field update | Yes — but move to before-save |
| Legacy approval kickoff | Workflow Rule | Contract | Submits for approval | No — process replaced |

That last column is the valuable one. In the last three migrations I ran, between
30% and 45% of existing automations were dead — they referenced fields nobody
populated any more, or served a process that had been replaced. **Deleting is the
cheapest migration there is.** Do that pass first, and the actual work shrinks by
a third before it starts.

## Step 2: Order by blast radius, not by ease

The instinct is to migrate the simple ones first for a quick win. Resist it. The
simple ones are simple to migrate later too. What you want to learn early is
whether your approach survives contact with the ugly stuff.

Start with the automation that touches the most business-critical object, and do
exactly one. If your migration pattern is wrong, you find out on the one you're
watching most closely.

## Step 3: One Flow per object, not one Flow per rule

This is the part people get wrong. It's tempting to convert each Workflow Rule
into its own record-triggered Flow, one for one. Don't. You end up with eleven
Flows on `Opportunity` and no control over the order they execute in.

Instead: one before-save Flow and one after-save Flow per object, with the
individual rules as decision branches inside. You get deterministic ordering, one
place to look, and a meaningful reduction in save-time overhead — before-save
updates skip a whole extra DML round trip.

## Step 4: Run both in parallel, with a kill switch

Deactivating the old rule the moment the new Flow goes live is how you end up
doing forensics on Monday. Instead:

1. Build the Flow with its entry criteria including a custom permission or a
   Custom Setting check — `Automation_V2_Enabled__c`
2. Enable it for yourself and two friendly users
3. Leave the Workflow Rule active but scoped *out* for those same users
4. Compare outcomes for a full business cycle
5. Flip the setting for everyone, watch for a week, then delete the old rule

The Custom Setting is the kill switch. If something goes wrong at 9am on a
Tuesday you flip one checkbox instead of rebuilding a Flow under pressure.

## Step 5: Delete the old one — properly

A deactivated Workflow Rule is not a migrated Workflow Rule. It's a landmine for
whoever inherits the org. Once the parallel run is clean, delete it, and record
the date in your inventory table.

## What this costs

For an org with ~60 automations, this runs about six to eight weeks of part-time
effort. That's genuinely slower than a big-bang rewrite. It's also the only
version of this project I've seen finish without an incident report attached.
