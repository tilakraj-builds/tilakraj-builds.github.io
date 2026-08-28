---
title: "The discovery questions that actually change the build"
description: "Most discovery sessions collect requirements nobody disputes. These are the questions that surface the ones people disagree about — which are the ones that matter."
tags: [Consulting, Discovery, Process]
---

A discovery workshop where everybody agrees is a discovery workshop that failed.
You've collected the requirements people were already willing to say out loud —
which are, almost by definition, the ones that were never going to derail the
project.

These are the questions I've found actually change what gets built.

## "Show me the spreadsheet."

Every team has one. The shadow spreadsheet where the real work happens because
the system doesn't do the thing they need. Nobody volunteers it in a workshop,
because they know they're not supposed to have it.

Ask for it directly and without judgement. Its columns are your missing fields.
Its filters are your missing views. The manual step someone does every Friday at
4pm is your missing automation.

## "What happens when this goes wrong?"

Requirements describe the happy path. Systems live or die on the other one.

Ask specifically: when a deal has to be reopened after it's closed-won, who does
that, and what do they have to fix by hand? When an order is cancelled after
fulfilment starts, what breaks? The answers tell you which of your validation
rules are about to become the most-complained-about feature of the release.

## "Who is allowed to say no?"

Not "who is the stakeholder" — who has the authority to reject the design. These
are frequently different people, and the second one often isn't in the room.

If nobody can name them, that's your first finding, and it's more important than
anything about the platform.

## "What did the last person try?"

Almost no org is on its first attempt. There's usually a previous consultant, a
previous admin, or a previous internal project that got halfway. Understanding
why it stopped is worth more than any greenfield requirement, because the reason
it stopped is still there.

Sometimes it's budget. More often it's a political constraint nobody wrote down.

## "If we shipped nothing else, what one thing would make this worth it?"

This is the scoping question. Ask it of each stakeholder separately, and write
down the answers verbatim. When the answers disagree — and they will — you've
found the actual conversation the project needs to have, months before it would
have surfaced on its own.

## Why this matters more than the config

The technical decisions in a Salesforce implementation are mostly knowable. Data
model, automation strategy, sharing — there are good answers and you can find
them. The things that sink projects are almost never technical. They're a process
nobody was willing to describe accurately, or an approver who first saw the
design in UAT.

Discovery is the only phase where those are cheap to find.
