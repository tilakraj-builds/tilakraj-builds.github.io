---
layout: page
title: Get in touch
permalink: /contact/
eyebrow: Contact
subtitle: Tell me what's breaking. If I'm not the right fit, I'll say so and point you somewhere better.
---

Good things to include in a first message: what your org does, roughly how many
Salesforce users you have, and the specific thing that prompted you to get in
touch. That's usually enough for me to tell you whether it's a two-week fix or a
two-quarter project.

<div class="contact-methods">
  <a class="card contact-card" href="mailto:{{ site.author.email }}">
    <span class="contact-label">Email</span>
    <span class="contact-value">{{ site.author.email }}</span>
  </a>
  {%- if site.author.linkedin and site.author.linkedin != "" -%}
  <a class="card contact-card" href="{{ site.author.linkedin }}" target="_blank" rel="noopener">
    <span class="contact-label">LinkedIn</span>
    <span class="contact-value">Connect &amp; message</span>
  </a>
  {%- endif -%}
  {%- if site.author.calendar and site.author.calendar != "" -%}
  <a class="card contact-card" href="{{ site.author.calendar }}" target="_blank" rel="noopener">
    <span class="contact-label">Calendar</span>
    <span class="contact-value">Book a 30-min call</span>
  </a>
  {%- endif -%}
</div>

{%- if site.author.formspree and site.author.formspree != "" %}

<form class="contact-form" action="{{ site.author.formspree }}" method="POST">
  <div class="field">
    <label for="name">Your name</label>
    <input type="text" id="name" name="name" required autocomplete="name">
  </div>
  <div class="field">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required autocomplete="email">
  </div>
  <div class="field">
    <label for="company">Company <span class="optional">(optional)</span></label>
    <input type="text" id="company" name="company" autocomplete="organization">
  </div>
  <div class="field">
    <label for="message">What's going on?</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>
  <button class="btn btn-primary" type="submit">Send message</button>
</form>

{%- else %}

> **Want a real form here?** Create a free endpoint at
> [formspree.io](https://formspree.io), then paste it into `author.formspree`
> in `_config.yml`. The form below the contact cards will switch itself on.
> GitHub Pages only serves static files, so a form needs a third-party endpoint
> like that one to actually deliver mail.

{%- endif %}
