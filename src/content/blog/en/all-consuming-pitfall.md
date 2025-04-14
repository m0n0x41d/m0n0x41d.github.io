---
title: All-consuming pitfall
description: Only a Sith deals in absolutes
pubDate: 2024-09-06T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: danger
---

A specification is an expression of a certain model and set of requirements for *something*, presented in a "tangible" form.

Any proper design process is tightly connected to writing specifications because it's simply impossible to fit any complex system into our minds without missing something important.

Specifications can take different forms — visual diagrams, plain "human" text, or mathematically justified formal specifications — but that's not the topic of today's note.

---

The meaning of a specification seems obvious from the word itself — the first thing that comes to mind is that it's about *clarifying* or *specifying* something.

Although perhaps clarifying is more about the *process* of creating a specification. Regardless of the form the product of this process takes, it is a document that sets the requirements for *something* to be that something.

And now I've finally arrived at the idea I want to highlight — it seems paradoxical, but sometimes we might use words like "everything," "all," or other similar *generalizing* terms in specifications.

It's almost always a bad thing...

## Why is "everything" bad?

Because generalizing with "everything" is the exact opposite of the goal and essence of *specification*? I think so. 

There's a place for generalization, but on a lower, more applied level —when deriving a good abstraction. Because a good abstraction is, in fact, a reasonable generalization.

> I've already covered this in detail in my article with the concise title ["What is Abstraction?"](https://ivanzakutnii.com/blog/What-is-Abstraction)

So, "everything"... 

It's a generalization of everything into who-knows-what, isn't it? Let's look at a few more specific examples.

## fork() in the UNIX API

Right at the very [beginning](https://pubs.opengroup.org/onlinepubs/009695399/functions/fork.html), it says:

> ... *The new process (child process) shall be an exact copy of the calling process (parent process) except as detailed below:* ...

An exact copy — it sounds like a really bad generalization, doesn't it?

Here's a [fantastic Microsoft Research](https://www.microsoft.com/en-us/research/uploads/prod/2019/04/fork-hotos19.pdf) paper from Boston University on the history and problems of `fork()`.

The paper describes many issues — like pushing towards memory overcommitment, and even mentions interesting topics like "Fork infects an entire system". Magnifiscent.

I'm not a scientist, but I do believe that a solid bunch of these problems stems from *"shall be an exact copy."*

And it seems pretty obvious, right? We're blindly copying an entire process; yes, we mark the child as a child, but the cloned code has to interact somehow with every function related to the process? Really?

Does the child process need all these functions? How many security risks and mental overheads did this decision create?

Quite a lot. Let's read the first highlighted thesis from the fourth part of the research paper I mentioned earlier:

> **Fork is no longer simple.**
> Fork's semantics have infected the design of each new API that creates process state. The POSIX specification now lists 25 special cases in how the parent's state is copied to the child: file locks, timers, asynchronous IO operations, tracing, etc. In addition, numerous system call flags control fork's behavior with respect to memory mappings (Linux madvise() flags MADV_DONTFORK/DOFORK/WIPEONFORK, etc.), file descriptors (O_CLOEXEC, FD_CLOEXEC), and threads (pthread_atfork()). Any non-trivial OS facility must document its behavior across a fork, and user-mode libraries must be prepared for their state to be forked at any time. The simplicity and orthogonality of fork is now a myth.

Twenty-five special cases. Cool stuff!
## What to do with "everything"?

Nothing to do with everything. It's an ideal case, as advised by researchers.

*Ideally,* we should never try to deal with everything. But as we've already seen, it can be really hard or even impossible sometimes to fix such specification flaws once they've been implemented and deeply infected the system.

But if it's already done, well... we can just live with it and suffer forever. Or we can try to limit "everything" somehow, behind some sort of interface that will structure the vague "everything."

Sure, it's a broad subject, and we can have a lot of casual discussions about it.

But it is what it is — specification is about being as precise as possible, and we definitely should write them to be able to spot these leaking "everythings" before it's too late.

How will this help us spot them? Essentially, because the process of writing a specification is the process of *formalizing* the multi-dimensional mental model we have in our heads. 

It's a process of thinking, and later on, we can revisit our thoughts, making assertions about the created model. The model becomes concrete and formal when it is expressed in some form outside of our skulls, whereas the mental model is unstable and unreliable.
