---
layout: page
title: About Me
permalink: /about/
weight: 3
---

# **About Me**

Greetings, I'm Ivan, a Backend Engineer and software developer proficient in database administration and DevOps practices. I thrive on solving complex challenges and understanding the inner workings of things.

My goal is to attain and share enlightenment in computer science, software, and system designs. Join me in exploring the endless possibilities of software engineering! 🚀

Here you can find my CV, recap on working experience and learning tracker below.

<div class="row justify-content-left align-items-left pt-2">
    <div class="col-md-10 text-left">
    <div class="mt-0">
      <a href="/assets/Ivan_Zakutnii_CV.pdf" download="Ivan_Zakutnii_CV.pdf"><button type="button" class="btn align-items-center btn-primary mr-1">Download CV</button></a>
    </div>
  </div>
</div>

<div class="row">
{% include about/skills.html title="Dev Skills" source=site.data.dev-skills %}
{% include about/skills.html title="Ops Skills" source=site.data.ops-skills %}
</div>

<div class="row">
{% include about/work-experience-tl.html %}
</div>

<div class="row">
{% include about/learning-tracker.html %}
</div>