---
title: The Essence of Error Theory
description: About the main perspectives and approaches in defensive programming
pubDate: 2024-01-25T00:00:00Z
language: 'en'
tags: [Computer Science,  Software Design]
style: border
color: secondary
---

# The Essence of Error Theory

Good day, my friends. I always love to dig into computer science topics, learn about the history of our industry, how programming languages and paradigms were born, and so on.

Today, in one of such posts, I want to talk a bit about Error handling "approaches", with a smal pinch of history of type systems evolution.

## Defensive Programming 

Well, defensive programming is a software engineering way of thinking and designing systems, focusing on making these systems as safe as possible.

But wait, what does "safety" mean here?

Well, a lot of bad things can happen during the execution process of our programs, and basically, these things have two sources:

- `Intentional`, such as malicious attacks or intentional non-fixing of errors discovered by developers.
- and `Unintentional`, such as developer oversight, OS, or hardware failures, and so on.

I think it is one of the most challenging battles in software development - the Battle with **abnormal things**.

I bet you've heard about Murphy's Law:

> "Anything that can go wrong will go wrong"

So, basically, it means that if our program is working fine *now*, it does not mean that it will always work in such a correct manner.

Conversely, it means that erroneous conditions are simply not met at this particular point in time.

Fortunately, in *Error Theory*, we have a few great conceptual topics for combating abnormal things. Let's delve into them.

## Constructivism

Constructivism assumes that every function checks the **adequacy** of its arguments and either returns something appropriate if the arguments are *inadequate*, or *assigns* to these arguments *adequate* values.

All code blocks "watch" for possible errors and terminate their operation when something goes wrong, setting the result (return) state to something that can be considered "correct", allowing the rest of the code to be executed further.

So the main idea here is that programs take into account all possible deviations from the normal execution process. Issues are not ignored; instead, programs incorporate practical *heuristics* for resolving identified issues in the interest of overall task completion.

The HTML rendering process in our browsers is a good example of this approach - even if an HTML page has syntax mistakes, the browser will always try to display such a page as well as possible.

Autocorrections in text editors, smartphone keyboard suggestions, and even the way voice recognition models try to understand what a drunk person is saying to them - all these conceptually apply the Constructivism Error Handling approach.

The main power of Constructivism is how it applies heuristic approaches in the battle with errors, but implementing and maintaining it might be a pain, just because of the huge amount of additional code checks. The idea of continuing execution in case of errors is also not a silver bullet; it is unacceptable and dangerous in situations where accuracy and reliability are critically important, and where incorrect program execution can lead to serious consequences.

## Panic

**Every** function checks the adequacy of its arguments and **refuses** to continue if the arguments are inadequate.

Here, all code blocks check for all errors that can potentially be tracked and possibly log context-specific messages when errors occur, passing these messages up the function call chain.

Basically, this is the same defensive style as the previous one - all possible errors are checked, but we are not going to execute the program further if some of them occur.

Very few systems actually make an effort in guessing the real intentions behind incorrect user input (or other sources of data).

It is much easier and less risky just to stop and refuse to continue working. Therefore, the Panic "style" is widely used in IT.

Sadly, it is quite a usual situation where Panics are accompanied by blurry, unclear messages, from which it's really hard to understand what the heck happened and how to fix it.

> It is crucial to write good errors for panics/exceptions, because it is extremely important to clearly inform the other party about what was expected from them and why the function/component refuses to continue working.

## Selective Exception Handling

Selective Exception Handling is quite similar to the Panic concept; functions there also check the adequacy of arguments and immediately stop their execution.

But the main idea in this style is that functions check for error occurrence only when they are able to *meaningfully* react to them.

Exception handling occurs at higher levels of the function call chains - wherever it makes sense.

Once again, the difference between Panic and Exception Handling approaches is that in Panic, we are throwing around exception handling code across the entire codebase, whereas Selective Exception Handling style concentrates its work only in one specific place; for example, at the very top level of the function call chain.

This "concentration" is the main benefit of the selective approach, but it can be challenging to properly interpret all exceptions because 
their handling logic is in one place, and the nature of these exceptions, as well as their causes, can vary greatly.

The essence of selective exception control is that we do not simply stop working and panic; instead, we try to handle errors as meaningfully as possible.

## Declared Intentions

In this approach, we assume that:

- There is some "mechanism" for explicit type coercion.
- Functions declare which types of arguments they expect.
- If the calling parties pass arguments of types that are not expected, either syntax errors or typecasting errors occur.

There is one of the most ancient, classic categories of abnormal situations that has existed from the very beginning of programming history - it is **type mismatch**.

Some function expects an argument of a specific type and receives a completely different type - BOOM. Endless possibilities of erroneous states, especially for dynamic type systems.

Thankfully, this problem is relatively easy to deal with - use programming languages with static type systems. :trollface:

At least, if we are coding in dynamically typed languages - we should always use type annotations and a linter. Sorry, but I am a believer in this context.

---

#### *A lyrical digression about the history of the development of type systems.*

The evolution of type systems in programming languages has been a remarkable journey, beginning in an era where values were limited to numeric types.

This journey took off with the introduction of FORTRAN in 1954, which differentiated between integer and floating-point numbers, and was further advanced by Algol 60 with its implementation of type declarations and compilation-time type checking.

Towards the end of the 1960s, static type systems became more popular due to the complex type system introduced by Algol 68. Its system influenced many important programming languages that came after it.

Concurrently, Lisp emerged, grounding its straightforward type system in lambda calculus and setting the stage for the concept of dynamic typing.

The late 1960s witnessed a crucial expansion in type concepts with the advent of the Simula language, which brought object-oriented programming and class types onto the stage.

The 1970s saw the rise of another programming language - ML, which played a huge role in evolving type systems that could infer types statically, leading to the development of functional languages such as Haskell and F#.

Additionally, the idea of typed interfaces, independent of module implementation as introduced by the Mesa language, has had a lasting impact on languages like Java and C#.

---

So, the main strength of Declared Intentions in the context of error theory is the *clear separation of logic between **meaning and implementation***.

Unfortunately, this approach is not *truly* applicable to languages with dynamic typing. Such things as, for example, Python type annotations, are just a hack for linters and type checkers.

> Yet, the hack is great indeed.

Moreover, Declared Intentions naturally lead to code being more expressive and readable, simply because we explicitly observe the types defined for each block of code.

The separation of meaning and implementation through a type system also naturally makes our code more modular and suitable for reuse.

## Quarantine 

The implementation of Quarantine implies that all the main functions of the program have no side effects, including input-output, network interactions with databases, and so on.

- All input-output actions in this approach are concentrated in separate abstractions, which are impeccably and clearly separated from the aforementioned main, pure functions.
- Any code using input-output should only be called from "external" functions.

This style takes an idea from functional programming, mainly - functional composition.

The first questions appearing in mind:

Hold on, how should we write programs that rely mainly on I/O? And why should we even be bothered with programming under such seemingly unreasonable limitations?

Well, the thing is, when a function needs to "connect" with the "outside world," it automatically loses its *purity*, like one in mathematical functions. These impure functions are no longer just simple relationships between their input and output data; they receive data from "outside" in a different way.

Such impure functions are harder to maintain and even test.

Due to the non-deterministic nature of the outside world, "impure" functions are generally more complex than "pure" functions. As a result, design philosophy suggests avoiding or at least reducing I/O code as much as possible.

For instance, Haskell uses an IO monad which serves as a complete "quarantine" for all I/O operations.

Here's how it's implemented: All the main functions of the program, which are first-class functions, *cannot* perform any I/O operations – they have to be "pure".

Only higher-order functions are allowed to perform I/O. So, the usual method is to enclose all the code affected by I/O operations within higher-order functions, then link them in a lazy sequence in the necessary order.

This way, we can activate such a sequence only in the main program when I/O is absolutely essential.

---

Monads, first introduced in programming languages like Haskell in the early 1990s, were primarily implemented to handle I/O operations in purely functional languages. Haskell's strong typing system incorporates IO types for functions performing I/O, making these operations a part of the language's design and not just an optional programming style.

---

Let's summarize Quarantine:

The Quarantine approach allows us to impeccably and clearly separate pure and impure tasks in the code.

The cost of this separation is a potential complication of the codebase due to the overly strict division of logic.

However, this cost seems justified because the path of inferring pure functions is incredibly beneficial as it allows us to isolate external and often unpredictable effects.


## Conclusion 

In summary, the exploration of error theory and defensive programming once again underscores the importance of robust and thoughtful software design.

Approaches like Constructivism, Panic, Selective Exception Handling, and Declared Intentions each offer unique strategies to handle errors effectively, 
improving the reliability and readability of code.

These diverse error handling methods collectively contribute to developing more resilient and efficient software systems, 
highlighting the critical role of error management in software development.

