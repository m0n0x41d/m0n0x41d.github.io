---
title: Currying
description: Quick dive into function programming trick.
pubDate: 2023-12-01T00:00:00Z
language: 'en'
tags: [Functional Programming]
style: border
color: info
---

The promised topic about currying in functional programming is on its way!

Currying is yet another FP trick, where a function that takes several arguments transforms into a series of functions, with each of these functions taking only one argument.

Alternatively, you can return a Python lambda like this (although it may not be advisable in terms of readability):


![Currying](/public/images/lambda_currying.png)
*<center>"look everybody I'm so clever elite one-liners developer" coding style</center>*



But, you definitely want to do in with nested def's, like:

```python
def add(x):
    def inner(y):
        return x + y
    return inner
```

---


Isn't it pretty neat? We're crafting here a curried function 'f' that takes one argument and returns a function that takes another argument.

Please pardon me, but these FP tricks truly feel like magic spells, especially after constantly coding in a simple imperative or OOP-ish way.

Now, let's recap on the pros and cons of currying in FP.

#### Pros:
- Modularity: Curried functions encourage a modular approach to coding. You can partially apply arguments to create specialized functions on-the-fly, which makes your code more reusable.

- Flexibility: Currying gives you the power of flexibility. You can easily create different versions of a function by supplying various sets of arguments, allowing for dynamic behavior.

- Enhanced Function Composition: Curried functions work brilliantly with function composition, a core FP concept we have covered few days ago. You can seamlessly combine functions to create complex and reusable code structures.

#### Cons:
- Readability Concerns: While currying can be powerful, it might not always be the most readable style, particularly when functions are deeply nested with multiple levels of currying.

![Uncle Ben](/public/images/uncle_ben.jpeg)

- Complexity for Beginners: If you're new to functional programming, currying might seem a bit perplexing at first. It adds an extra layer of abstraction compared to more traditional coding styles. Don't be a beginner, be a lion, CRACK THAT SH*T UP!

- Performance Considerations: In some cases, currying can introduce a slight performance overhead due to the creation of multiple intermediate functions. However, modern interpreters and compilers often optimize this.


So, go ahead and experiment with currying; learn that spell, it might be pretty handy, at least for your brains 🪄✨

Until we meet again! 💀