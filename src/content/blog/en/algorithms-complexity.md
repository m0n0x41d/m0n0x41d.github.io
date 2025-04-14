---
title: 'Algorithms Complexity'
description: "How to properly think about a program, what is time complexity, and what is \"Big O\" notation? Let's delve into it."
pubDate: 2022-01-22T00:00:00Z
language: 'en'
tags: ['Algorithms', 'Computer Science']


---

This is a complex topic, particularly if you have never studied data structures, never heard of time complexity, or read about evaluating the efficiency or inefficiency of program code. If that is the case, I recommend in first place reading this [article](https://malisper.me/an-algorithm-for-passing-programming-interviews/) by Michael Malis.

## And how should we think?

Let me begin by saying that regardless of an individual's particularities, if we are physically and mentally healthy, our understanding of a certain topic will develop more or less similarly.

Take, for example, a television. A person grows and develops, sees how their parents press buttons, images are displayed on the television, certain connections are formed in their brain, leading to an understanding of the dependency of actions on an object and the results that these actions lead to.

However, if a person has never been interested in how a television works, what components it consists of, then they will not be able to explain what it actually is, how it works, how to create it from scratch, or how to fix it. This is normal.

An engineer or a factory worker assembling televisions or their components knows much more due to having more experience in the direct field, relevant education, etc.

The same goes for programming. Information technology and programming are the offspring of science and mathematics, developed by the best minds of humanity over the last centuries. It goes without saying that it is a complex subject, and it cannot be grasped without effort.

As self-taught programmers, we can quickly learn a modern high-level and expressive programming language like Python, along with its standard library methods. Intuitively, we begin to form a mental picture of what we want to achieve with our program, and have a vague understanding of how it works.

We also intuitively understand what a variable, list, or array is. We can put some data in there, perform some operations like "sorted(my_very_special_list)", and expect a result.

Although this approach may suffice to learn some technologies, frameworks, and perform simple (or not so simple) tasks, but it is counterproductive, and falls short when it comes to developing complex systems.

Whether we like it or not, the only correct way to approach programming is to think scientifically and adopt a scientific approach to learning programming. Let's engage our mental faculties and move forward.

***

## Algorithm

#### Moving from intuitive to scientific

What is programming in general? Well, first and foremost, you might say it's the act of writing a program that does something "inside" and gives us the result we're interested in, and you would be mostly correct.

Acceptable. But what is a program? Nothing more, nothing less, a program, in its simplest representation and correct understanding, is an Algorithm for achieving the desired result.

An overdone example of an algorithm that I have come across repeatedly in all sorts of beginner-level books is a list of your sequential tasks for tomorrow:

- Wake up
- Stretch
- Put on socks
- Go to work (or walk to the desktop and start working)
- Break for lunch.

Each of these steps is actually an algorithm for some sequential (and maybe parallel) actions, so in the example above, I am rather describing a list of algorithms.

That's right. Even in any small program, there are practically always *n* number of algorithms - calls of various functions, each of computes something. And if it computes - so... it's an algorithm :trollface:.

I may be confusing you, but I believe the idea is clear.

> An algorithm is a step-by-step guide for the "computer" (the executor) to calculate something.
> Calculations can be very simple or extremely complex.
> The correct way to think about a program is not as a magical code, but as a strictly **mathematical** description of a problem-solving process.

Computational hardware, like any other object in the physical world, is subject to the laws of physics. Gravity (at least on our planet) will not allow you to jump like a grasshopper to the first-floor window.

Similarly, computational resources such as the central processing unit and the random access memory will not process a huge amount of data instantaneously with the snap of your fingers; it takes **time** to accomplish this task.

However, no matter how powerful a supercomputer you may suddenly gain access to, its computing power plays a much smaller role in program performance than a properly chosen algorithm.

The correct selection of the algorithm that is discussed in the article I provided you with at the beginning of this post.

So, an algorithm is a computation or transformation of input data into the desired output data. Do you like to wait? Unlikely. The efficiency of an algorithm can be easily understood as the ratio of the time it takes to obtain the result. The faster, the better.

***

## Asymptotic complexity

So what affects the speed of an algorithm? As mentioned above, first and foremost it's the correctness of the algorithm itself.

More specifically — justification for use in specific circumstances. By specific circumstances, I mean the context of the problem we are trying to solve.

In the context of the problem, the speed at which the algorithm will compute the solution depends on the quantity of input data.

The scientific (mathematical) complexity of algorithms is assessed using the so-called *asymptotic analysis*. We evaluate the complexity of an algorithm by analyzing the relationship between the *time* and *computational resources* that will be required by the algorithm during its operation on a given task.

On practice, all of this is expressed as a mathematical function that allows us to understand *how quickly* the necessary *time* to complete the algorithm's work will *increase*, depending on the increase of the *amount* of input data.

In other words, by asymptotics we mean the behavior of a function over time (whether it starts to work worse or better) as its argument (the amount of processed data) approaches a certain "**point**".

{% include elements/highlight.html text="But here the thing," %} in asymptotic analysis of computer algorithm complexity, however, this **point** is taken as *infinity*, because we are interested not in the actual execution time of a particular algorithm (in seconds, etc.), but rather in how the efficiency of the algorithm's performance will change as we continually and infinitely increase the size of the input data.

I apologize for repeating the same thing several times, but it is important to understand:

*We evaluate the speed of an algorithm in terms of a **comparative number** of operations. This number is how we measure **"execution time"**.*

***

## What does this "O" mean anyway?

The following notations are most commonly used to estimate growth:

- Ο (big O) - upper or "worst-case" complexity estimate. Input data is given in the most "inconvenient" way for the algorithm;
- o (little o) - average estimate, data is given randomly;
- Ω (big omega) - lower bound estimate, an ideal situation for achieving maximum algorithm speed;
- Θ (big theta) - lower and upper bound, precise estimate of the growth of the time function.

We will only consider fundamental measures of complexity that are widely used and expressed through O-notation.

Let's take *n* as the amount of input data. Then the upper bound of algorithm complexity can be written as **O(f(n))**.

Why are we interested in the upper or "worst-case" estimate? Because from a practical point of view, it is important to understand the worst-case scenario in which the algorithm will be fed a large amount of data.

If it is efficient under these conditions, then it will certainly be efficient under more "favorable" conditions.

The most straightforward complexity notations to understand are **O(1)** and **O(n)**.

**O(1)** expresses the complexity for which the algorithm requires a constant amount of time to complete. For example, accessing an element of an array by its index. We know exactly where the element is located and simply go there. Such operations do not depend on the amount of data being processed.

**O(n)** has a linear dependency on the amount of input data. In the worst case, such an algorithm will have to perform its operations on *each* data element.

This includes traversing an array, traversing a linked list, or calculating its length. To better understand this, let me give you an funny example.

Imagine that the task is for a creature (algorithm) to drink a certain amount (n) of water. Let's imagine a situation where water is being drunk not by a human, but by a magical troglodyte who has no stomach, but a bottomless black hole instead (n tends to infinity).

This troglodyte can only drink water sequentially (implementation constraints by its creator :trollface:) — sip by sip. So the algorithm of drinking water will have a *linear* complexity of **O(n)** — the more water we give the troglodyte to drink, the longer he will drink it.

***

A classic example of an algorithm with logarithmic complexity **O(log n)**, where the base of the logarithm is usually taken to be 2 — is binary search.

The larger the input data, the slower the algorithm's execution time grows (i.e., the lower its complexity). The simplest and most well-worn example for describing binary search is attempting to find the phone number of a person you need in an indexed directory sorted by last name.

You could search in order, record by record, page by page, but it is obvious that this could take a lot of time. The complexity of such a naive search can be expressed by the previous formula **O(n)**. Imagine that you are looking for a person's phone number not in your own address book, but in a directory of all subscribers in Tokyo. It seems that paging through it sequentially (linearly) is a bad approach.

Knowing that the directory is sorted, it is much faster to open it roughly in the place where we expect to find the person we are looking for. Let's say we're looking for Hideo Kojima (let's imagine this directory is in English and indexed by names).

Knowing the alphabet, we can assume that the letter "H" will be in the first half of the directory, but that's not for certain. We don't know how many names there are starting with A, B, and so on.
It's possible that names starting with H are in the second half of the directory.

The Binary Search algorithm works like this — we open the directory (array) in the middle and see where we land. If we need to go to the left half (for example, if names on the open page start with the letter "P"), we discard the right half and open the remaining left half *again in the middle*. And so on until we find all Hideos.

***

Sorting algorithms are often characterized by a complexity of **O(n log n)**, where their execution time grows faster than **O(n)**. This can be seen as a combination of **O(log n)** and **O(n)**.

Next in terms of growth intensity are quadratic dependencies, such as **O(n^2)**. The execution time of these algorithms grows *very quickly* as input data volume increases (exponentially!).

For example, two nested loops, each of which operates at **O(n)** complexity. In almost **any** case, this is a very poor measure and should not be used to define algorithms.

***

The discussion of sorting algorithms and various data structures goes beyond the scope of this post. In the future, we will cover basic data structures and try to evaluate their complexity.

Until next time!