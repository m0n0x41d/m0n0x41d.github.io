---
title: 'Engineering Habits: The Good, The Bad, and The Ugly Truth'
description: It is all in your head.
pubDate: 2024-11-20T00:00:00Z
language: 'en'
tags: [Soft Skills]
style: border
color: info
heroImage: '/images/heroes/engineering_habbits.jpg' 
---


### Introduction

Most likely, any person, regardless of qualification, who starts writing code and studying programming will sooner or later develop some skill of writing it semi-automatically. This is normal human development - we learn skills -> our brain, due to neuroplasticity, develops certain pathways for thinking, so-called habits or patterns. Great.

A self-taught programmer who completed online courses and survived in the industry will, over time, hone the skill of performing typical business tasks -> JSON shuffling and CRUD building.

These aren't the "habits" I want to talk about today. I want to examine in detail the good programming habits that I've been persistently cultivating over the past years and continue to strengthen.

We'll also look at bad habits that will inevitably drag you down like a stone if you don't control them and prevent them from developing.

### What is good, and what is wrong, Momma?

The *good* programming habits I'm interested in are the skills of writing understandable, clean, pleasant to perceive, maintainable, and extensible code.

Ideally, with fewer errors than "just randomly written code," and covered with tests, too.

The topic of "designing and writing code with fewer errors" actually permeates most of my posts, and it is my point to keep getting better and better.

It you read my blog for a while already you might have noticed, that I don't write about frameworks; I hardly write "applied" articles with guides and code snippets that you can copy and forget.

First, there's more than enough of such material online, and it already has too little useful significance because widely available LLM models can generate dozens of such small snippets very quickly and almost for free.

I'm rock-solid confident that if you don't consciously make efforts to study the correct, fundamental principles of software engineering, you can, of course, write code all your life, write it successfully and quite quickly, but mostly – ***crappy code***.

Crappy code that you'll constantly have to rewrite and optimize and adapt and again and again suffer making your way through the thickets when you need to add a new feature a month or six months after this code was born.

I think such crappy code is born for several reasons:

- Conscious or unconscious incompetence - when we have no idea about good programming principles, or think we do (which is even worse);
- Negligence and laziness (IMHO - this is still incompetence, or under-competence) - when we kind of know something about our applied area, about design patterns or such beautiful things as SOLID and so on, but ignore them to save some time and just *write code that works*.

The price of such a pseudo-economy is what we call *technical debt*.

So we need to do something, to make us able to write better code.

### The good

The first and simplest habit you need to develop is to refactor bad code every time you see bad code.

Refactoring costs nothing! It's a stylistic code change that doesn't take much time but can often make code more readable and understandable for us in the future. So, if you're selfish and don't want to make code more readable for others, do yourself a favor at least.

> For those who triggered here – *refactoring it is not code factorization!* Refactoring is *stylistic* changes, which might be quickly implemented without violating code logic or interfaces, whereas code factorization is about *making changes in design at a higher level.* Please do not perform factorization on the spot! :D 

The next excellent habit is to study well and follow popular stylistic and code design practices. If there's anything good in the mainstream, these practices are one of those "good" things - DRY, KISS, SOLID for OOP systems.

Next, your language has popular linters, and at work, your team may also have stylistic agreements. There's not a single objectively valid reason not to follow these practices and not use linters and code formatters. This also costs nothing.

What's interesting is that everyone knows or has heard at least once about these practices, about how wonderful and marvelous they are, but not everyone starts following them right away or even doesn't start following them for many years, and continues to stubbornly write crappy code.

> Why?

Recently, I wrote a joking post on Threads, where I silly-funny threatened developers to stop using single-letter variables. I received quite a few angry responses, although, from the context, it was clear that I didn't mean single-letter variables where they're justified - for loops, geometry calculations, and so on.

Many responses were like - *piss off, idgaf.*

Well. That's *exactly* it.

---

It turns out that to implement a good habit of following stylistic rules, or any other good habit – you first need to *realize its value* and then make *some effort to reinforce this habit*.

To reinforce these habits, I suggest you introduce into your life... Another habit :)

As we know, people start absorbing the information that surrounds them, so... if you don't understand the value of these popular practices... you just don't understand the value of these popular practices, that's all.

So, a good habit for acquiring good habits - weekly, at least once a week, read blogs of *authoritative engineers*. Not hustlers who offer you their mega-course about developing micro-SaaS that will help you make $20k per month.

Or for example, what's the point of reading articles like "How to deploy a next.js application in elastic beanstalk without pain in the fifth point?" – when you have a task, you'll find the necessary material anyway, either on the internet or hallucinate it with LLM.

Consuming this kind of content won't make you a really good engineer, you'll rather just forget what you read about in half a day if it has no practical value for your current stack and projects. 

The received information will simply have nothing to grab onto in your head. Stop losing your time.

---

You are likely asking yourself now - "So which blogs to read? Who to read?"
I won't give a list here; it would be equivalent to giving fish instead of a fishing rod and a fishing textbook.

Try to search yourself, there are plenty of well-known names, but if nothing works and you are still unsure - at least read my blog and follow me on Threads, I quite often post quotes from authoritative engineers and my thoughts on it.

So, we've covered the block about habits related to good engineering habits.

> Actually, developing these habits will directly lead to the development of good engineering competencies, habit here is more of a word for priming, but this is probably already obvious.

Before moving on to bad habits, I want to tell you this - however bitter it is to say and realize - mastery in programming and design won't make you a truly *elite and expensive engineer*, you need something else.

---

### Communication is a must-have soft-skill

If you find somewhere a job where you don't need to communicate with people, colleagues, and clients at all or just a little bit, and most of the time just design systems and write code - please, invite me to work!

It doesn't happen that way, the older and more experienced you become in software engineering, the more you'll have to communicate with colleagues. And if you go down the management path, then all your work, well probably 95 percent will only consist of communications.

We're not considering this path, but talking about an engineering career.

Even if you don't want to rise above the middle or senior level, good communication skills will still be needed.

No matter how brilliant your opinions and ideas might be about implementing a new bad feature or changing old code for the worse - your opinions will remain just your opinions if you can't loudly, clearly, and substantially express them, proving your rightness.

Being silent and unable to speak up is not the worst option, it's much worse to be a snob-despot who constantly argues with everyone, completely intractable and extremely unfriendly. Even if such a person finds work and makes a quality impact in the system lifecycle - everyone will try to stay away from them, and you probably shouldn't even dream about a promotion in position or salary.

Regarding salary, whether you believe it or not, our salary depends to a much greater extent on our ability to communicate and negotiate than our technical skills, which, of course, are still always important and needed.

The offer you'll get depends on how you present yourself and what you, excuse me, bargain for. How you sell yourself, that's all.

Regarding getting a good, really cool job in general, I see that networking is also important here, which relates to these same soft skills, I mean - the work on building this network.

I've repeatedly heard how guys found and got jobs in large companies, not blindly through the hiring process and HR filter, but simply by meeting engineers working in target companies and directly asking about the referral program like "bring a friend."

I won't write about the importance of communication with clients, everyone talks about this everywhere anyway, and in general, you could write a whole article just about this separate topic.

In short, without stable communication skills, a software engineer can't get anywhere high.

If you believe in some characters and genetic predispositions - like I'm an evil melancholic asshole and there's no way to fix this at all, excuse me, I'm certainly not a psychologist but these are excuses and nonsense.

Why did I even talk about communications in this post? What does habit have to do with it? I'll explain now.

Communication skills are mastered in the same way to some degree as technical ones - through study, habit cultivation, and skill development, experience.

Spend time thinking and searching for relevant information, you can consult with your lead or engineering manager finally about how to become more communicative, maybe the company will pay for some courses!

I never, almost all my life, didn't like to communicate much, and at first, I did it exclusively through force, made myself speak slower, clearer, and so on. Over time, it became easier and easier. In recent years, I've taken on a lot of leadership in my professional activities, and without pride, I'll say - quite successfully.

I still don't like too long small talks in the working context, especially when I'm tired, and that's okay because when there's a topic, purpose, and importance for conversation (at least if it concerns my work) - I'm ready one hundred percent, *even if I am tired*. 

I just taught myself to do it.

---

### The bad

It's very good to start forming good habits from Monday or even from tomorrow, but you can still have bad habits that will cut off all your efforts at the root and bury the potential benefit and success from the most useful habits. Or at least dramatically reduce effectiveness.

I'm not talking about cigarettes, alcohol, and drugs now, this is obvious crap that everyone knows about, and everyone understands the harm, even those who use it - everyone understands well somewhere in the corner of their consciousness.

Besides these crappy habits, there are other saboteurs. The problem is that these enemies are invisible; they're much harder to notice, and they form by themselves.

> Often, to form these habits, you don't need to do anything to reinforce them. They just thrive without your attention.

The first and the most common example of such a habit is procrastination. We can very quickly get into the taste of constantly postponing things until the deadline pecks us with an eagle's beak in the ass.

As I just said - nothing needs to be done to form such a habit.

Another habit, or rather the next "evolutionary step" of procrastination and little programming responsibility - is, for example, writing tests or writing normal, clean, and sensible code. This should be familiar to you, at least, I had such a habit. You're programming something and suddenly notice a *problem* and think as follows:

> Oh well, of course, it's not good to do it this way, there's a very bad algorithm here, inefficient. Damn... well, I'll rewrite it *later*, I'll even write a TODO comment now... okay, let's continue coding.

Or the same thing, but about tests. I'm not calling you to program by TDD always, but at least after we've completed some logical implementation block, it needs to be covered with tests. 

At least to introduce some invariant by tests into the system that proves we've achieved the needed functionality at this stage and can calmly move forward. Well, TDD is another story, we'll return to it another time.

It's especially important not to let such bad habits get out of hand. By getting out of hand, I mean turning this habit into a full-fledged behavioral pattern when you already think the thought from the quote above in a fraction of a second, so essentially, you're churning out crappy code automatically.

I remind you, such a habit develops very quickly and is eradicated... with great mental blood.

### Wrapping up

Let's summarize the key points about good and bad programming habits; I am adding a few points that I did not mention in the post itself. Why? Because I can.

Good Habits:
1. Regular code refactoring – on the spot.
2. Following code style guidelines and best practices of your language.
3. Using linters and formatters.
4. Reading authoritative engineering blogs weekly.
5. Developing communication skills. We need it (unfortunately?)
6. Writing tests consistently. YES.
7. Taking time to design before coding. AGAIN. YES.
8. Continuous learning and improvement. This is the only way.

Bad Habits:
1. Procrastination.
2. Postponing code cleanup and refactoring. It still comes from procrastination.
3. Skipping test writing. Again - procrastination.
4. Writing quick and dirty solutions. You know it.
5. Avoiding communication and team interaction. It is poison; be strong and start talking.
6. Ignoring code review feedback, arguing, and not listening to the upper engineers. 
7. Not documenting code. Write the comments, at least.
8. Resistance to learning new practices. Cozy chilling with well-known applied things.

One last time – good habits require conscious effort from you to develop but make you a better, way better engineer. Bad habits form themselves effortlessly sneaky but can drastically limit your growth and career progression. 

---

Also, if you are an aspiring engineer, who is starting to learn programming but struggling with something, I have recently released a free self-study guide book, that you can read for free here [guide.ivanzakutnii.com](https://guide.ivanzakutnii.com)

Follow me on Threads: [m0n0x41d](https://www.threads.net/@m0n0x41d)
