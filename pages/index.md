---
layout: page
permalink: /
---

# Oh, hello there! I'm Ivan 🖖,

<p class="wow animated fadeIn" data-wow-delay=".01s">
  and this is my blog and personal page.
</p>

<p class="wow animated fadeIn" data-wow-delay=".05s">
  <br>I am a back-end software engineer skilled in database administration and DevOps practices.
  <br>I enjoy tackling tough problems and figuring out how things work.
</p>

<p class="wow animated fadeIn" data-wow-delay=".11s">
  My goal is to hack as deep as I can into computer science, software, and system designs, attain this enlightenment and share it with you. Feel free to check my posts on the <a href="/blog">blog</a> page.
</p>

<p class="wow animated fadeIn" data-wow-delay=".25s">
    Here, you can access my CV by clicking the button below.
    <br>Find a summary of my work experience further down the page.
    <br>Explore my <a href="/bookshelf">bookshelf</a> to discover some of the books I've read and recommend.
    <br>Check out my <a href="/learning_tracker">learning tracker</a> to see the courses I've taken.
</p>


<div class="row justify-content-left align-items-left pt-2 wow animated fadeIn" data-wow-delay=".28s">
    <div class="col-md-10 text-left">
    <div class="mt-0 mb-4">
      <a href="/assets/Ivan_Zakutnii_CV.pdf" download="Ivan_Zakutnii_CV.pdf"><button type="button" class="btn align-items-center btn-primary mr-1">Download CV</button></a>
    </div>
  </div>
</div>

<p class="wow animated fadeIn" data-wow-delay=".20s">
    If you have any questions, feel free to reach out to me through social media or email.
    <br>You can find the links below.
    <br>Enjoy your reading! 😊
</p>

<p >
    {% include social_big.html %}
</p>

<div class="row">
{% include about/skills.html title="Dev Skills" source=site.data.dev-skills %}
{% include about/skills.html title="Ops Skills" source=site.data.ops-skills %}
</div>

<div class="row">
{% include about/work-experience-tl.html %}
</div>
