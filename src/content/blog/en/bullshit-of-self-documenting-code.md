---
title: Bullshit Of Self-Documenting Code
description: They are smart, but even smart people still people...
pubDate: 2023-09-25T00:00:00Z
language: 'en'
tags: [Software Design, Thoughts]
style: border
color: warning
---

Oh, hello there!

So… yep. What is self-documenting code?

It is a concept that applies to a codebase which is so beautifully expressive that it doesn't even need any documentation.

Sounds like a fairy tale, doesn't it?

Many strong and respected people in IT say that comments in code are a sign of poorly written code, and these comments indicate that you simply struggled to write your code in a clear, expressive way.

They insist that self-documented code is the goal we should aim for – we should use correct and expressive names for variables, classes, and functions, build a good structure, and this will be enough for other developers to understand our code!

OF COURSE, all of these rules of "Clean Code" should be followed, but I believe they are wrong (people, not rules :) about comments, and they are mistaken in thinking that everyone else is as smart as they are.

Write 50,000 lines of code in a "Clean Style," and it will automatically evolve into a complex structure. Then, come back after 6 months...


![Oh no](/public/images/wtf.gif)

***

"Obvious" things are not always obvious at all. It is an illusion!

Even if we are completely sure that we understand something at a specific point in time, it might be false... or even if it is true, it might not be true at a different point in time.

Even if we are smart and experienced enough to come back to our 50,000-line system after 6 months and understand it quickly, it is only because we have built a strong "context" of some subjective coding and architecture style in our own brains. Someone else's brain neurons are BUILT DIFFERENTLY.

Furthermore, it is just impossible to express everything related to software design in pure code. Because code, no matter which paradigm it follows, only expresses "what to do."

It is such a small part of the information related to the system…

In the design process, we also need to think about "what not to do", "what needs to be done", "what needs to be optimized" and so on.

You might think that comments are a bad place to store such information because we have JIRA and a lot of other really useful tracking systems. So instead of writing a TODO comment, I am going to create a ticket and send it to the backlog. You might be right, but not every team uses JIRA or follows popular development practices, and this one ticket might be lost in backlog for centuries.

Many teams do not write any formal documentation, so I believe, that comments could be really helpful there.



Another thought here is that even a fantastically pure piece of code can't tell us what it is doing in the context of the whole system design.

Because it just "doesn't know" anything about the system and encapsulates only the related logic in its module.

So, a comment with such meta information about "what this thing is doing in our system" will be really helpful for any developer.

Code that is expressive and clean, with "self-documenting" logic that this code implements – that's fine and nice, thanks for note being stupid.
Comments on this code describe meta-information, explaining how this code fits into the overall system – God bless the human being who wrote it.

So, I hope you understand why, in my humble opinion, self-documented code is bullshit. Even if it's concept has a bunch of reasonable, legitimate points, such as:

Comments may become out of date and out of sync with the code.
Comments can be boilerplate junk and make the file less readable.
Comments are just good manners towards the devs.
This is all true, but...

There is just no other way to describe design meta-information.