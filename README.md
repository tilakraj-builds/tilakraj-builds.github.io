# tilakraj-builds.github.io

Personal portfolio and blog for Tilak Raj, Salesforce consultant.
Jekyll site, deployed to GitHub Pages by GitHub Actions.

**Live at:** https://tilakraj-builds.github.io/

---

## 1. Publish it

The repository name has to match the domain exactly, or GitHub won't serve it at
the root URL.

1. Create a **public** repo on GitHub named exactly `tilakraj-builds.github.io`.
   Don't add a README, .gitignore, or licence — this folder already has them.
2. From inside this folder:

```bash
git remote add origin https://github.com/tilakraj-builds/tilakraj-builds.github.io.git && git push -u origin main
```

That's it. The workflow in `.github/workflows/pages.yml` builds the site and
turns Pages on by itself. First deploy takes about two minutes — watch it under
the repo's **Actions** tab.

If the workflow can't enable Pages automatically (it needs the repo to be
public), go to **Settings → Pages** and set **Source** to **GitHub Actions**,
then re-run the workflow.

## 2. Make it yours

Everything you'd want to change lives in `_config.yml` and `_data/`. No HTML
required.

| File | What's in it |
| --- | --- |
| `_config.yml` | Your name, role, bio, email, social links, headline stats |
| `_data/services.yml` | The "How I help" cards |
| `_data/projects.yml` | Case studies (problem → what I did → outcome) |
| `_data/certifications.yml` | Your Salesforce certs |
| `_data/experience.yml` | The experience timeline |
| `_data/skills.yml` | Skill groups on the About page |

### Placeholders you should replace before sharing the link

- [ ] `_config.yml` → `author.linkedin` and `author.trailhead` (both point at
      `your-handle` right now)
- [ ] `_config.yml` → `stats` (currently 6+ years / 25+ orgs / 4 certs)
- [ ] `_data/experience.yml` → two entries say `Company Name`
- [ ] `_data/projects.yml` → all three case studies are illustrative examples
- [ ] `_data/certifications.yml` → check the years, add a `credential:` link to
      each one if you want a "Verify" button
- [ ] The three posts in `_posts/` are sample content — keep, edit, or delete

### Optional extras

- **Contact form.** GitHub Pages is static, so a form needs a third-party
  endpoint. Make a free one at [formspree.io](https://formspree.io) and paste it
  into `author.formspree` in `_config.yml`. The form on `/contact/` switches
  itself on.
- **Booking link.** Set `author.calendar` to a Calendly or Cal.com URL and a
  "Book a call" button appears.
- **Résumé.** Drop a PDF at `assets/resume.pdf` and set `author.resume` to
  `/assets/resume.pdf`.
- **Availability pill.** Set `available: false` in `_config.yml` to hide it.
- **Colour.** Change `--accent` at the top of `assets/css/style.css` — it
  re-skins the whole site, light and dark.

## 3. Write a blog post

Create a file in `_posts/` named `YYYY-MM-DD-some-slug.md`:

```markdown
---
title: "Why your validation rules keep getting bypassed"
description: "One sentence for the card and the search snippet."
tags: [Flow, Data quality]
---

Your post, in Markdown.
```

Commit and push — the post appears on `/blog/`, in the RSS feed, and the tags
become filter buttons automatically. You can do this straight from the GitHub
web UI if you don't want to touch the terminal.

## 4. Preview locally (optional)

Needs Ruby 3.x. You have it at `/opt/homebrew/opt/ruby/bin` — add that to your
PATH first if `ruby -v` shows 2.6.

```bash
bundle install && bundle exec jekyll serve --livereload
```

Then open http://localhost:4000.

## 5. Custom domain (optional)

Buy a domain, add a file named `CNAME` at the repo root containing just the
domain, point a CNAME DNS record at `tilakraj-builds.github.io`, and update
`url:` in `_config.yml`.

## What's in here

```
_config.yml          site settings + your details
_data/               portfolio content (yaml, no HTML)
_posts/              blog posts (markdown)
_layouts/            page shells
_includes/           header, footer, cards, icons
assets/css/style.css all styling; design tokens at the top
assets/js/main.js    theme toggle, mobile nav, blog tag filter
.github/workflows/   the build-and-deploy action
```

Built with [Jekyll](https://jekyllrb.com). Dark mode follows the visitor's system
setting and can be overridden with the toggle in the header.
