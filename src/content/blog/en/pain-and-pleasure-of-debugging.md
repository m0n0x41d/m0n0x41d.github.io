---
title: Pain and Pleasure of Debugging
description: Don't play around with the debugger
pubDate: 2024-09-19T00:00:00Z
language: 'en'
tags: [Software Engineering,  Debugging]
style: border
color: info
---

You should not approach debugging intuitively and carelessly. Quite often, debugging is painful and detestable. This alone is already a sufficient reason to treat debugging as a separate category of "programmer's science."

I have already discussed concepts like levels of thinking about a software system, and all the material I write in my blog is permeated with one simple, obvious but easy-to-forget idea: programming and software engineering are exact sciences, which we need to remember and be guided by in learning and work.

And therefore, any sub-discipline in software engineering is exact too.  
In my honest opinion there is no place for vague creativity and humanitarian "intuition."

So, debugging. When encountering any erroneous behavior of the system, forgetting or not thinking at all about the above, we may start making almost random assertions, literally pointing a finger at the sky, trying to determine the causes and factors leading to the observed problem.

It doesn't matter how reasonable and justified our assertions are (they may be completely unreasonable) — in the overwhelming majority of cases, we will be at a disadvantage, unless we are lucky and, on the first try, using a precise assertion, hit the root of the problem and fix it.

Unfortunately, this happens either in very simple systems and scenarios, whose complexity is close to zero, or such a problem has already appeared and we have sloppily fixed it :)

So the problem lies in precision.

By making overly precise judgments, assuming something very specific as the cause of a bug — when there are 150 possible reasons for such an error — we go and check only one such cause.

Failure? No problem, 149 more options, keep aiming soldier!

This is a very straightforward, very intuitive, but non-engineering approach.

Speaking of precision, I mean the narrowness of the context of such assumptions, for example:


> "This happened because there's crappy method in class X that I found 3 weeks ago but have not fixed; there's definitely a race condition there!"

So, one of the most important ideas I want to convey today is that it is much more correct and expedient to make more general, broader assumptions and test them, eliminating an entire category of possible causes at once.

This is another counterintuitive idea, but it has saved me a ton of time more than once, especially during my time working as a DevOps engineer.

For example, in an infrastructure overloaded with dependencies, where there are several components between the application and the DBMS — a load balancer, a Kubernetes cluster with all its zoo — when any incomprehensible problems "with the database" appear, I always try to reproduce them by removing as many intermediate components from the chain as possible by connecting directly to the database. 

If the problem is reproduced, then there is definitely something wrong either in the code or in the database configurations, and we can avoid thinking about the load balancer, network problems in the cluster, and yada yada yada. 

You won't believe it, but I still occasionally encounter genuine admiration from some colleagues in response to the suggestion to do something like this simple thing during debugging.

While writing about this important meta idea, I realized that it's worth talking about more specific, but also significant "components" of the debugging process, which I would like to always remember myself, and for you to always remember and be aware of.

### Key Points of the Debugging Process

Let's start with the fact that any bug needs to be reproduced — yes, yes, this is the pure truth.

It also may seem extremely obvious and not worth mentioning, but I have too often found myself in situations where a bug arises and people make no effort at all to reproduce it themselves before bringing it to the public.

Of course, if the bug is production critical, that's might be a different story in terms of reproduction, reaction, and fixing (panic). Here we're rather talking about "ordinary" errors.

> Actually, I don’t like to panic, and even with production failures caused by bugs, it can often be drastically helpful to reproduce them in a development or staging environment. Why panic? It has already happened.

About half of ordinary bugs people fixed themselves (probably because half of the bugs are quite simple?) after I asked, "And how exactly can I reproduce it?"

Most of this experience again relates to my times working as a DevOps engineer. At Monite, I can hardly recall situations when bugs were brought to the platform without an "instruction" on how to reproduce them.

Nevertheless, please remember this — it doesn't matter whether the bug belongs to your direct area of responsibility or it's a bug from a "neighboring" subsystem — make at least some effort to reproduce it.

But better yet, of course, reproduce it fully; ideally, automate the reproduction of the bug. And it's absolutely great if the error is of a category that can be reproduced using a unit test (DO IT).

The speed of reproducing the error is important, at least so as not to waste extra time checking the success of the fixes we apply in the process of eliminating the bug.

An excellent approach when encountering a bug is to start by trying to write a unit test, and only if the error is completely wild, "distributed," and cannot be covered by a unit test — reproduce it with a script using suitable tools (curl? Selenium? Postman? Wireshark? JMeter? Name your thing).

> Or... sorry... e2e test? 🫣

In principle, these are the main ‘preparatory’ moments. By being able to quickly reproduce the bug, we can smoothly transition to what I started this post with — experimenting and making assumptions about the causes and sources of the bug

As I said — it's very important to learn to make general assumptions, eliminating entire categories of causes at once.

But here is another important point — never engage in parallel investigation of multiple assumptions, even if they seem very similar and cognitively not complex for parallel exploration — this is an exspensive deception.

*You. Will. Get. Confused. Very. Quickly.*

And this applies to any of the paths; it doesn't matter whether we follow the meta-idea and study broad assumptions or play roulette and check narrow assertions — in any case, check to the end one specific aspect you've taken into work, until you are convinced that you were wrong or have fixed the bug or find its exact cause.

These three things directly relate to debugging when we've already started it.

There are a couple more important and related points.

---

Firstly, there is a very poisonous cognitive error to which many are prone — not only beginners but also experienced developers: "Anything is to blame for this error, but not my code!"

It doesn't matter what guides a particular developer thinking so — inexperience, stubbornness, or, for example, religious belief in 100% code coverage — the fact remains that probably in 99 cases out of 100, our own code is to blame, not a third-party mature library or the operating system version.

Here is also one nuance — by "own code," we need to understand not only the specific source-code of a specific application but everything that we or our colleagues have written by hand — configuration files, all that stuff with YAML, TOML, and other familiar extensions.

Otherwise, we can again fall into too narrow, too "precise" assumptions if, overall, our system is quite complex and distributed.


But it is not a reason to blame everything on system administrators or DevOps engineers; most likely, the error is still in your code, simply because the lion's share of infrastructure configuration mistakes are identified quickly enough by the ops engineers themselves and eliminated by them, often even at the stage of deploying the infrastructure component.

Secondly, the best defense is a good offense, so the best way to protect yourself from too much pain and suffering in the debugging process is to write code with try/catch, asserts, and GOOD, informative messages in logs and exceptions.

This might also feel quite obvious and seem not even worth mentioning, but let’s be honest with ourselves — we’ve all coded and continue to occasionally think, "I’ll write the try/catch later; I’ll improve logging later," right?

Later does not exist; that’s why it often doesn’t become ‘present.’

### Summary

From all the above, I want to extract the following:


- Don't play around with the debugger, poking breakpoints into the sky in a childish hope for luck. Debugging should be as conscious as possible as a process to be successful and bring less suffering.

- Make general assertions from a meta-position, not "from inside the code." You are an engineer, not a line of code or lost bit.

- Write tests, logs, and error handling. Before, after, during programming features — just, please...

