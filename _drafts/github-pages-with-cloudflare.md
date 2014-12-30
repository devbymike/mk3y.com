---
layout: post

title: "Using CloudFlare with Github Pages"
permalink: /using-cloudflare-with-github-pages

hero: false
hero_image: "/media/jekyll.jpg"

category: guides
comments: false

---

AS part of my goal to Reboot This Site, I had recently moved away from self hosted WordPress to using Jekyll hosted via Github Pages.

One of the first things I noticed while testing this new setup was a two to three second delay in loading the site, which manifests itself in the Initial Connection time, of the second request.

The culprit of this slow down, is Github pages use of a 302 redirect.

##302 Redirects

After a quick search, I found Analyzing the GitHub Pages Waterfall Chart, wherein @helloanselm discovers that GitHub Pages intentionally redirects sites that are setup with DNS A records.

This is our exact setup since Namecheap doesn’t support the ALIAS record, which is suggested by Setting up a custom domain with Pages. For more info see my previous post on Setting the DNS for GitHub Pages on Namecheap.

That said, the ALIAS record doesn’t have robust support amongst registrars. I don’t have a good technical understanding of DNS, so I defer to the following post for a better explanation of the potential pitfalls of the ALIAS record.

##CloudFlare to the Rescue

CloudFlare rolled out CNAME Flattening earlier this year, which they introduced with this blog post: Introducing CNAME Flattening.

Read the article for a run down of how it works, needless to say, CloudFlare is a great product, with a ton of features that provide value just beyond using it to speed things up.

##CloudFlare DNS Settings for GitHub Pages

Okay so you’re ready to make the move to CloudFlare, right? After you sign up (you can do the free account), you’ll then want to add your site:

<< sticking a picture here >>

Once CloudFlare finishes importing your DNS records, you’ll then want to delete both of your A records and replace them with one CNAME that points to your username.github.io. Use the @ symbol to denote your root domain:

<< another picture >>

You should then have the following two CNAME records, amongst whatever other DNS records you may have:

<< another picture >>

Once you’ve finished modifying your DNS records with CloudFlare, you’ll want to transfer your DNS away from Namecheap.

##Results

Need to post details of results test.


