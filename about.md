---
layout: page
title: About
permalink: /about/
eyebrow: Who you'd be working with
subtitle: Salesforce consultant. Six years of turning "it works, mostly" into systems people trust.
---

{{ site.author.bio }}

## How I work

**Discovery before configuration.** The first week is spent with the people who
actually use the org — not just the person who bought it. Most of the requirements
that matter never make it into the brief.

**Fewer moving parts.** Every automation you add is something a future admin has to
reverse-engineer at 6pm on a release night. I'd rather ship three well-named Flows
than fifteen clever ones.

**Handover is part of the build.** If your internal admin can't maintain what I
leave behind, the engagement didn't work. Documentation and enablement sessions
are in scope by default, not a line item at the end.

## What I'm good at

{% for group in site.data.skills %}
**{{ group.group }}** — {{ group.items | join: ", " }}
{% endfor %}

## Outside the org

I write here about the parts of platform work that don't fit in a release note —
data model decisions that quietly cost you two years later, why Flow performance
falls apart at scale, and how to have the conversation where you tell a
stakeholder their process is the problem.

If any of that is useful to you, [the blog]({{ '/blog/' | relative_url }}) is the
place to start, or [say hello]({{ '/contact/' | relative_url }}).
