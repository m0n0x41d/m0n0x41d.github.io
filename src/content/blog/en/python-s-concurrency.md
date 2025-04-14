---
title: Python's Concurrency
description: Do it FASTER!
pubDate: 2023-10-02T00:00:00Z
language: 'en'
tags: [Programming, Python]
style: border
color: light
---

# Kind of an intro

Concurrency means doing multiple tasks at "once" in programming.
In many programs, waiting for slow input/output (I/O) operations, like reading from a disk, takes up a lot of time, and making some external web requests and waiting for response takes MUCH MORE time than reading from the ssd.

So, CPUs are super fast, much faster than I/O operations. Thats why our programs often sit idle, waiting for I/O tasks to finish. To make things efficient, developers use tricks like asynchronous programming. This lets programs do other things while waiting for slow I/O, making the best use of the speedy CPU.

There is a good looking [infographic](https://colin-scott.github.io/personal_website/research/interactive_latency.html) showing latency for different operations.

---

Python (CPython and PyPy) has a thing called GIL, it is, actually thred-lock/mutex, which ensures that only one thread controls python interpreter at a time.

> Other python implementations like Jython, IronPython, etc, don't have GIL. And treat threds differently.

Thus, it limits the multi-thread execution "inside" Python, allowing only one thread to run at a time in a single Python process. This is a saviour from the race conditions with memory allocations, but con is that two threds can't use same core simultaneously.

{:refdef2: style="display: block; margin: 0 auto; max-width: 65%; height: auto;"}
![race](/assets/images/concurrency.webp)
{: refdef2}

The basic approach to move around the GIL is to use sup interpreters using things like [multiprocessing](https://docs.python.org/3.10.2/library/multiprocessing.html) module. But we won't go into that today.

There is also a long [discussion](https://peps.python.org/pep-0554/) about exposing sub interpreters in Python stdlib, to use multiprocesses with own GIL's, but is still not applied completely.

# How to make a python program concurrent?

There are two ways to make a python program concurrent: *threads* and *asyncio*, and they are work in different way.

Thread, basically, is each independent parallel activity in some software system.
Threads run independently but share a common memory space.
For example, tabs in a browser (activities within one parent program running within one process) usually operate in separate threads.

Asyncio is a Python "framework". Unlike threads, it operates in a single-threaded event loop and uses asynchronous I/O operations and coroutines. It handles I/O-bound tasks efficiently by allowing the program to switch between tasks during I/O operations. Asyncio is especially useful for managing many simultaneous connections, such as handling multiple network requests concurrently.

1. **Threads:**
   - **Blocking Operations:** Threads are suitable for I/O-bound tasks where programs spend a lot of time waiting for external operations to complete, like reading from a file or making a network request.
   - **Parallel Execution:** Python threads provide a way to achieve parallelism on multi-core systems. Multiple threads can run in parallel, making use of multiple CPU cores.
   - **Global Interpreter Lock (GIL):** Python's Global Interpreter Lock allows only one thread to execute in the interpreter at a time, limiting true parallelism in CPU-bound tasks.

    ```python
   import threading

   def task():
       # code for the task

   thread = threading.Thread(target=task)
   thread.start()
   ```

Easier to say – this is cuncurrency, managed by OS.

2. **Asyncio:**
   - **Non-Blocking I/O:** Asyncio is designed for I/O-bound tasks as well but relies on asynchronous I/O operations and cooperative multitasking. It is particularly useful for handling many simultaneous connections.
   - **Single-threaded:** Asyncio operates in a single-threaded event loop. It doesn't create multiple threads for parallel execution. Instead, it switches between tasks during I/O operations, making efficient use of a single thread.
   - **Coroutines:** Asyncio uses coroutines, which are special types of functions that can be paused and resumed. This allows for a more sequential style of code even though the tasks are asynchronous.

   ```python
   import asyncio

   async def task():
       # code for the task

   asyncio.run(task())
   ```

### Choosing Between Threads and Asyncio

The *very basic* rule of thumb is:

- Use **threads** for tasks that involve heavy computation or CPU-bound operations where parallelism is necessary.
- Use **asyncio** for I/O-bound tasks, especially those involving network operations or handling many simultaneous connections. Asyncio is efficient for tasks where waiting for I/O takes more time than actual processing.

In summary, threads provide parallel execution but are limited by the GIL, while asyncio provides asynchronous, non-blocking I/O operations and is efficient for handling I/O-bound tasks with a single thread. The choice depends on the specific requirements of the program.

Today I want to take a closer look at the asyncio library.

# asyncio

So, we have an asyncio lib starting from Python 3.4.
When python threads are rely on OS concurrency implementation, asycio library is python's specific set of high-level API's, providing opportunities	to run Python coroutines, control subprocesses and synchronize concurrent code within things called event loops.

Basically, concurrency with asyncio achieved cooperatively by coroutines, which giving up to each other turns to execute.

You can immediately identify python asyncio code by *async* and *await* keywords.

These are exactly the tools for indicating:
- By async, that code (function ar method) will run asynchronously as coroutine
- By await, making a signal, what our coroutine is ok to wait in this place, while another coroutine taking execution control.

You got to be sure that libraries you use are supports asyncio, if you want to use it.

Take a look at this bunch of code:

```python
import requests
import time


def fetch_url(url):
    response = requests.get(url)
    content_length = len(response.text)
    return url, content_length


def main():
    urls = [
        "https://wannahack.in",
        "https://docs.python.org/3/library/asyncio.html",
        "https://www.google.com",
    ]

    results = [fetch_url(url) for url in urls]

    for url, length in results:
        print(f"Content from {url} has length: {length}")


if __name__ == "__main__":
    start = time.time()
    main()
    total_duration = time.time() - start
    print(f"Total duration: {total_duration}")


> Content from https://wannahack.in has length: 7699
> Content from https://docs.python.org/3/library/asyncio.html has length: 20875
> Content from https://www.google.com has length: 19252
> Total duration: 1.5766408443450928
```

We just fetching sites and measure total execution time of the script.

Now lets do same thing, but using asyncio concurrency.

```python
import asyncio
import aiohttp
import time


async def fetch_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            content = await response.text()
            return url, len(content)


async def main():
    urls = [
        "https://wannahack.in",
        "https://docs.python.org/3/library/asyncio.html",
        "https://www.google.com",
    ]

    tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks)

    for url, length in results:
        print(f"Content from {url} has length: {length}")


if __name__ == "__main__":
    start = time.time()
    asyncio.run(main())
    total_duration = time.time() - start
    print(f"Total duration: {total_duration}")

> Content from https://wannahack.in has length: 7699
> Content from https://docs.python.org/3/library/asyncio.html has length: 20864
> Content from https://www.google.com has length: 19190
> Total duration: 0.5765419006347656
```

Look how faster is it!
In last example, the fetch_url function is an asynchronous function that fetches data from a given URL using aiohttp.
The main function creates a list of URLs and creates tasks to fetch data from each URL concurrently using asyncio. Finally, the asyncio.gather function is used to wait for all the tasks to complete, and the results are printed out.

---

As a reminder, if you are going to code some concurrent code, you probably should know benefits of [immutablity](/blog/Immutability-is-the-key).


Se you!
