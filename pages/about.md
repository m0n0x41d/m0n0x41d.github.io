---
layout: page
title: About Me
permalink: /about/
weight: 3
---

# **About Me**

I'm a Python Backend Engineer with experience in database administration and DevOps.
I've worked on Kubernetes administration, GitLab CI/CD, and Helm charts composition.

I enjoy coding and solving complex challenges.
My goal is to collaborate with a development team and continue learning and contributing in this area.

<div class="row justify-content-left align-items-left p-4">
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
{% include about/taken-courses-tl.html %}
</div>