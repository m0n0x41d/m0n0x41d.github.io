---
title: Debugging Python Code
description: The orthodox way to do it.
pubDate: 2023-09-26T00:00:00Z
language: 'en'
tags: [Programming, Tools, Python]
style: border
color: warning
---


Oh, hello there!!!

Today, I'd like to talk about debugging in a more practical context. Please take a look at this article about the [3 levels of reasoning about software systems](/blog//Levels-of-reasoning-about-software).

So, today's subject is debugging Python code, specifically, how to debug it at the first level of reasoning.

> If you haven't checked the blog by the link above – by the first level of reasoning, I mean investigating stack traces and states.

I don't use PyCharm on a daily basis, and I don't use VSCode's debugger. For some reason, I find **pdb** more convenient to use.

**pdb** stands for "The Python Debugger," and it is a built-in Python module. This is awesome because it comes out of the box, and you can use it literally everywhere Python interpreter exists :)

Starting from Python 3.7, we have a built-in function called **breakpoint()**, which we can place anywhere in our code to start examining the stack trace from that particular breakpoint. In the good old days, Pythonistas didn't have such an expressive function and were forced to place a similar thing where they wanted to drop into the pdb shell:

> import pdb; pdb.set_trace()

If, for some reason, you need to investigate the entire stack trace from the very first instruction and further, you can pass the **-m pdb** key argument when running your Python code via your shell.

You may also find it very useful to drop into your breakpoint by running tests with **pytest**; just add the **--pdb** argument.

The pdb shell looks like this:

```bash
>>>>>>>>>>>>>>> PDB set_trace (IO-capturing turned off) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
> <ABSOLUTE_PATH_TO_THE_PYTHON_MODULE>(ROW NUMBER OF FUNCTION ENTRYPOINT)<MODULE NAME>
-> <EXACT LINE OF CODE WHERE INTERPRETER STOPS AFTER BREAKPOINT>
(Pdb)
```

From here, you can use a dozen of commands that will help you navigate through the stack trace and examine the states of objects.

Let's try this code:

```python
def printer(something: str):
"what a clever example"
    print(f"Eeeeeeh, python goes {something}")


breakpoint()
meaningful_string = "brrrrrrr"
printer(meaningful_st
```


And run it:

```bash
$ python3 stupid_printer.py
> /Users/m0n0x41d/stupid_printer.py(7)<module>()
-> meaningful_string = "brrrrrrr"
(Pdb)
```

Yeah, such example is much better :D
So, form here we can print something (actually – almost everything):

```bash
(Pdb) p printer
<function printer at 0x10252cc20>
(Pdb) p getattr(printer, '__doc__')
'what a clever example'
```

With "next" or just "n" command you cat hop further until the next line of code, or return:

```bash
(Pdb) next
> /Users/m0n0x41d/stupid_printer.py(8)<module>()
-> printer(meaningful_string)
(Pdb) next
Eeeeeeh, python goes brrrrrrr
--Return--
> /Users/m0n0x41d/stupid_printer.py(8)<module>()->None
-> printer(meaningful_string)
```

You may not jump like crazy around and move slowly, "step" by "step" (or just s):

```bash
$ python3 stupid_printer.py
> /Users/m0n0x41d/stupid_printer.py(7)<module>()
-> meaningful_string = "brrrrrrr"
(Pdb) step
> /Users/m0n0x41d/stupid_printer.py(8)<module>()
-> printer(meaningful_string)
(Pdb) s
--Call--
> /Users/m0n0x41d/stupid_printer.py(1)printer()
-> def printer(something: str):
(Pdb) s
> /Users/m0n0x41d/stupid_printer.py(3)printer()
-> print(f"Eeeeeeh, python goes {something}")
(Pdb) step
Eeeeeeh, python goes brrrrrrr
--Return--
> /Users/m0n0x41d/stupid_printer.py(3)printer()->None
-> print(f"Eeeeeeh, python goes {something}")
(Pdb) s
--Return--
> /Users/m0n0x41d/stupid_printer.py(8)<module>()->None
-> printer(meaningful_string)
(Pdb) s
```

If you need, you may list sourse code around your current line in pdb with "ll" command:

```bash
python3 stupid_printer.py
> /Users/m0n0x41d/stupid_printer.py(7)<module>()
-> meaningful_string = "brrrrrrr"
(Pdb) ll
1     def printer(something: str):
2         "what a clever example"
3         print(f"Eeeeeeh, python goes {something}")
4
5
6     breakpoint()
7  -> meaningful_string = "brrrrrrr"
8     printer(meaningful_string)
(Pdb)
```

But I do not use it often because I run code in the same IDE window.

***

There are many other exciting things you can do in PDB. For example, you can set additional breakpoints from the PDB shell, even in imported modules, and jump into them. You can also instruct PDB to print every new value of a variable with the "display <object name>" command (which can be useful in some loops).

However, in 9 out of 10 cases, the basic concepts we've just covered are sufficient.

Just experiment with it and refer to the documentation from time to time. By the way, there is a complete PDB documentation inside PDB. You can access it with the "h pdb" command in the PDB shell.

## Dessert Treat

There is a fantastic Python package out there called [pdb++](https://github.com/pdbpp/pdbpp), which is a drop-in extension for PDB, making your debugging experience even better. It adds incredible features like:

- Enhanced TAB completion for Python expressions with vibrant color support (powered by fancycompleter).
- Optional syntax highlighting for code listings (utilizing Pygments).
- Sticky mode for persistent breakpoints.
- Introduction of numerous new commands tailored for the interactive Pdb++ prompt.
- Intelligent command parsing, simplifying tasks such as printing variable values (e.g., 'r' or 'c' commands).
- Additional convenience functions within the pdb module to streamline your debugging process.

I strongly recommend checking it out after experimenting a few times with vanilla PDB.

Thanks for joining me today, and see you next time. Stay calm and be happy!