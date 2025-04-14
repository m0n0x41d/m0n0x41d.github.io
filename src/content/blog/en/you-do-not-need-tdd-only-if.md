---
title: You do not need TDD. Only if...
description: A bit "higher" way of looking at Test-Driven Development.
pubDate: 2023-12-06T00:00:00Z
language: 'en'
tags: [Software Design,  Testing]
style: border
color: info
---

# What is TDD, really?

TDD is a somewhat underrated practice in the IT mainstream, but maximalist TDD adepts passionately advocate for it in a rather radical way.

They claim that TDD is as crucial in programming as handwashing is in surgery. This position isn't exactly welcoming and tends to make TDD newcomers apprehensive.

I appreciate TDD; I love this approach, even though I don't use it all the time. 

However, I firmly believe that TDD, as an engineering approach, must be practiced to become proficient in software design.

## TDD itself

Test-Driven Development is an iterative process where tests are written before code, guiding the development process by incrementally creating small and testable "units." 
It was invented by Kent Beck.

In essence, distilled TDD becomes a `"test && commit || reset"` (TCR) concept by Kent Beck:

- Write a test that fails.
- Write code that makes this test pass.
- Refactor your code without adding new logic/behavior.

According to Kent Beck, the creator of TDD, every time all tests complete successfully, we should commit the code.

From this, we might conclude that if tests fail at some atomic point of changes in code, we should roll back to the last "working" revision.

It might sound like complete nonsense... How can we write code and tests for this code without mistakes? 

We can't. We will always make mistakes, at least from time to time, until our brains are not empowered by interconnected silicon "helpers."

Okay, but does that mean we should delete a written bunch of code if something went wrong in the test? 

Well, if you want to get better in software engineering and not in monkey coding, this practice might gain you a dozen of valuable experiences.


{:refdef: style="text-align: center;"}
![Cry](/assets/images/cry.gif)
{: refdef}
*<center>I don't wanna delete my code</center>*

In fact, even though it might sound like nonsense, we can code productively following that way. 

Deleting a bunch of wrong code can even feel satisfying. 

It's quite likely that you will write a new, better, and more correct solution after deleting the previous one that you tried to fix.

If we don't want to lose too much code (and we don't), we might just not write too much code between commits. This also helps to avoid committing a few thousand changed rows at once.

This TDD-ish style aligns well with the CI/CD flow. We should be able to run all project tests locally and ensure that everything is "green" before pushing.

> I’m omitting here the possibility that you don’t have tests at all. Conversely, I naively assume that you have high-quality tests and at least 90% coverage.

Also, I hope that your CI/CD is configured to fail and restrict the merge and deploy of the code that fails any tests.

Here is one more good mantra:

> All tests must pass before new code changes are distributed to others.

---

Now we can conclude the idiomatic TDD approach:

1. Write the "Happy Case" test. The aim here is a shorter time between specification and a passed test as much as possible. Such a test might be "incomplete," e.g., written partially. Yet, it still should test something. More importantly, do not be satisfied with such a partially written test. Obviously, this test will fail because we still haven't written any actual code. Polish and complete this test later on.

2. Write the minimally required code for this test. As soon as your test is passed, start fixing all its "fakeness," little by little, build this bad boy up. Make yourself proud of this test. (Do not forget to delete everything you wrote if the test fails the first time. Just try it, really).

3. Make complex changes in the codebase simpler. It means, instead of changing six modules, find a way to make fewer changes in each iteration (write some auxiliary functions, etc.).

The good thing about this approach is that it is very cheap to adopt, and it guarantees that you will learn something new :)

## TDD for adults

Let's reason a bit about this TDD thing. Why do we really need it, and what benefits come from it?

Contemporary TDD adepts argue that this methodology truly levels up the *design* of your programs.

So, basically, they postulate that TDD is a *software designing approach* and even a **development paradigm**.

They also advocate for the mandatory use of TDD in **all** cases, except for a few situations, insisting on strict adherence to the TDD cycle.
But although acknowledging that Kent Beck's TCR is not obligatory (lol).

Well, there are two camps, and I am in the second one.

The second camp takes TDD as a valuable technique, practicing which you gain really valuable skills for formal software design. 
But we disagree that TDD is a development paradigm, and that TDD always leads to good *design*.

---

Firstly, the first camp uses the word "design" in the context of "programming-in-small." 
By design, they mean organizing a concrete codebase rather than following software system specifications.

Secondly, in the original Ken Beck's book, TDD is called a *testing technique*.

TDD is fine; TDD guarantees you (with strict adherence) that every codeline will be covered by tests, leading to fewer errors.

But tests in TDD are limited by their nature. Here's the thing, we want to preserve speed in our software development cycle, 
so the tests in TDD should be pretty quick to write and very fast to complete (probably hundreds per second).

The only tests that fit the criteria above are simple modular tests, excluding all the other forms of testing (integration, fuzzing, mutation, and so on).

For unit testing to become completely self-sufficient, they must supplant all these other forms of testing and all verification methods that are not based on testing (we are talking about self-sufficiency literally).

Feel it? It is *impossible*.


{:refdef: style="text-align: center;"}
![Impossible](/assets/images/impossible.gif)
{: refdef}

Unit tests focus solely on what the programmer intentionally tests, ignoring side effects, non-determinism, or sequences of events.

Yet, significant errors can arise at a higher level, such as from incorrect interactions between components or specific input values.

---

**Design**, in the "language" of supporters of formal approaches to software development, means the specification of a software system. 
We have a problem, which we need to solve, and the set of properties that we want to preserve. 
Does our system satisfy all of this? 

Here we are only interested in what code does with the data in our domain, how this data flows, and so on.

> Please do not fall into the false assumption that the second camp is monkey coders who are not interested in programming-in-small approaches. The main difference between "camps" is that the second one always tries to extol the importance of software design, thinking as much as possible at the [3-rd level of reasoning](https://wannahack.in/blog/Levels-of-reasoning-about-software) about software systems.

In TDD maximalists' point of view, "design" takes a clear stance, dictating how code is structured.

TDD proponents stress the importance of "listening to your tests": if writing tests is hard, it indicates a code issue (which is hard to argue with in a lot of cases), 
saying that such code should be refactored for better testability. 

Essentially, they are saying that code challenging to test reflects that such code is poorly organized.

## Does TDD gain good code organization?

If you ever try to follow TDD in your development process, you should be able to admit that code written in TDD technique differs from the "usual."

The things typical for TDD code are:

- Dependency injections are used much more often.
- Numerous small functions instead of a few large ones.
- Extensive use of public methods instead of point-specific utilization of private methods.

All these things, of course, do not always lead to bad software design, but they definitely *may lead*.

*Sometimes*, dependency injections make code a lot harder to understand and reason for.

Bigger functions, *sometimes*, offer better abstractions, while a lot of small functions can lead to cumbersome interactions.

*Sometimes*, bit and reach APIs intensify the coupling between modules.

Yet, I understand that these arguments are pretty weak because they might align with every technique that makes an influence on the design. 

I am just trying to say again that it is crucial to reason about design in the terms of formal specification rather than codebase organization. 

Without this, blindly following stuff like TDD turns all "*sometimes*" from the above into "*most-likeliness*."

> TDD does not play any role in OOA/D at all. It is just different layers of reasoning.

## Conclusion

Maximalists TDD explicitly talk about the superiority of local system organization over global.

However, if TDD makes it hard for you to think about a "function" as a whole, it can also make it difficult to consider the bigger picture of an entire component or even the overall system (how different components interact).

**BUT**.

TDD is nice! Non-pure, a bit "relaxed" TDD (which is probably most commonly used) gives us undeniable advantages:

1. We write tests, and we write a lot of them. Even if writing tests "interrupts" coding, we should still do it. Because if you could potentially write tests later, you'll likely keep postponing them and may never get around to it. This is the main benefit of teaching TDD to programmers unfamiliar with this approach. And even a more "chill" way could be chosen here - agree on 100% coverage if we do not want to write tests in the first place.

2. Refactoring becomes easier for us just because we have written numerous regression tests.

3. Your code now has at least one user (the tests), which might help in understanding how user-friendly your interfaces are.

4. TDD trains you to think about how your code will be tested (yes, even 100% coverage enforces that thought).

> Any form of TDD is better than no TDD, but no TDD is better than excessive, maximalist TDD.

And there is no Holy War; both camps are just thinking in completely different universes.

