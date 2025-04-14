---
title: The Wisdom of Avoiding Conditional Statements
description: Get rid of this IF/ELSE trees already!
pubDate: 2024-08-11T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: danger
---

# The Wisdom of Avoiding Conditional Statements

Cyclomatic complexity is a metric that measures the complexity and tangledness of code.

High cyclomatic complexity is not a good thing, quite the opposite.

Simply put, cyclomatic complexity is directly proportional to the number of possible execution paths in a program. In other words, cyclomatic complexity and the total number of conditional statements (especially their nesting) are closely related.

So today, let’s talk about conditional statements.

### Anti-if

In 2007, **Francesco Cirillo** launched a movement called [Anti-if](https://www.antiifprogramming.com/about-the-anti-if.php).

> **Francesco Cirillo** is the guy who came up with the Pomodoro technique. I'm writing this blog post right now “under the Pomodoro.”

I guess we all quickly figured out what this campaign is about from its name. Interestingly, the movement has quite a few computer scientists among its followers.

Their arguments are rock solid — `if` statements are evil, leading to exponential growth in program execution paths.

In short, that’s cyclomatic complexity. The higher it is, the harder it is not only to read and understand the code but also to cover it with tests.

Sure, we have kind of an "opposite" metric — `code coverage`, which shows how much of your code is covered by tests. But does this metric, along with the rich tools in our programming languages for checking coverage, justify ignoring cyclomatic complexity and sprinkling `if` statements around just based on "instinct"?

I think not.

---

Almost every time I catch myself about to nest one `if` inside another, I realize that I'm doing something really silly that could be rewritten differently — either without nested `if`'s or without `if`'s at all.

> You did notice the word "almost," right?

I didn't start noticing this right away. If you look at my GitHub, you'll find more than one example of old code with not just high cyclomatic complexity but straight-up cyclomatic madness.

What helped me become more aware of this issue? Probably experience and a few smart things I learned and embraced about a year ago. That's what I want to share with you today.

---

### Two Sacred Techniques for the Destruction of `if` Statements

1. Padawan, move each conditional check of an unknown value to a place where that value is already known.
2. Padawan, change your mental model of the encoded logic so that it no longer requires conditional checks.

#### 1. Make Unknown Known

Checking something when we don't "know" it yet is probably the most common source of using conditional statements based on "instinct."

For example, suppose we need to do something based on a user's age, and we must ensure the age is valid (falls within reasonable ranges). We might end up with code like this:

```python
from typing import Optional

def process_age(age: Optional[int]) -> None:
    if age is None:
        raise ValueError("Age cannot be null")
    if age < 0 or age > 150:
        raise ValueError("Age must be between 0 and 150")
```

We've all seen and probably written similar code hundreds of times.

How do we eliminate these conditional checks by following the discussed *meta-principle*?

In our specific case with age, we can apply my favorite approach — moving away from primitive obsession towards using a custom data type.

```python
class Age:
    def __init__(self, value: int) -> None:
        if value < 0 or value > 150:
            raise ValueError("Age must be between 0 and 150")
        self.value = value

    def get_value(self) -> int:
        return self.value

def process_age(age: Age) -> None:
    # Age is guaranteed to be valid, process it directly
```

Hooray, one less `if`! The validation and verification of the age are now always "where the age is known" — within the responsibility and scope of a separate class.

We can go further/differently if we want to remove the `if` in the `Age` class, perhaps by using a Pydantic model with a validator or even replacing `if` with `assert` — it doesn't matter now.

---

Other techniques or mechanisms that help to get rid of conditional checks within this same meta-idea include approaches like replacing conditions with polymorphism (or anonymous lambda functions) and decomposing functions that have sneaky boolean flags.

For example, this code (horrible boxing, right?):

```python
class PaymentProcessor:
    def process_payment(self, payment_type: str, amount: float) -> str:
        if payment_type == "credit_card":
            return self.process_credit_card_payment(amount)
        elif payment_type == "paypal":
            return self.process_paypal_payment(amount)
        elif payment_type == "bank_transfer":
            return self.process_bank_transfer_payment(amount)
        else:
            raise ValueError("Unknown payment type")

    def process_credit_card_payment(self, amount: float) -> str:
        return f"Processed credit card payment of {amount}."

    def process_paypal_payment(self, amount: float) -> str:
        return f"Processed PayPal payment of {amount}."

    def process_bank_transfer_payment(self, amount: float) -> str:
        return f"Processed bank transfer payment of {amount}."
```

> And it doesn't matter if you replace `if/elif` with `match/case` — it's the same garbage!

It's quite easy to rewrite it as:

```python
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float) -> str:
        pass

class CreditCardPaymentProcessor(PaymentProcessor):
    def process_payment(self, amount: float) -> str:
        return f"Processed credit card payment of {amount}."

class PayPalPaymentProcessor(PaymentProcessor):
    def process_payment(self, amount: float) -> str:
        return f"Processed PayPal payment of {amount}."

class BankTransferPaymentProcessor(PaymentProcessor):
    def process_payment(self, amount: float) -> str:
        return f"Processed bank transfer payment of {amount}."
```

right?

---

The example of decomposing a function with a boolean flag into two separate functions is as old as time, painfully familiar, and incredibly annoying (in my honest opinion).

```python
def process_transaction(transaction_id: int, 
                        amount: float, 
                        is_internal: bool) -> None:
    if is_internal:
        # Process internal transaction
        pass
    else:
        # Process external transaction
        pass
```

Two functions will be much better in any case, even if 2/3 of the code in them is identical! This is one of those scenarios where a trade-off with DRY is the result of common sense, making the code just better.

---

The big difference here is that mechanically, on autopilot, we are unlikely to use these approaches unless we've internalized and developed *the habit* of thinking through the lens of this principle.

Otherwise, we'll automatically fall into `if: if: elif: if...`

#### 2. Free Your Mind, Neo

In fact, the second technique is the only real one, and the earlier "first" technique is just preparatory practices, a shortcut for getting *in place* :)

Indeed, the only ultimate way, method — call it what you will — to achieve simpler code, reduce cyclomatic complexity, and cut down on conditional checks is *making a shift in the mental models we build in our minds to solve specific problems*.

I promise, one last silly example for today.

Consider that we're urgently writing a backend for some online store where user can make purchases without registration, or with it.

Of course, the system has a `User` class/entity, and finishing with something like this is easy:

```python
def process_order(order_id: int, 
                  user: Optional[User]) -> None:
    if user is not None:
        # Process order for a registered user
       pass
    else:
        # Process order for a guest user
	   pass
```

But noticing this nonsense, thanks to the fact that our thinking has already shifted in the right direction (I believe), we'll go back to where the `User` class is defined and rewrite part of the code in something like this:

```python
class User:
    def __init__(self, name: str) -> None:
        self.name = name

    def process_order(self, order_id: int) -> None:
        pass

class GuestUser(User):
    def __init__(self) -> None:
        super().__init__(name="Guest")

    def process_order(self, order_id: int) -> None:
        pass
```

---

So, the essence and beauty of it all is that we don't clutter our minds with various patterns and coding techniques to eliminate conditional statements and so on.

By shifting our focus to the meta-level, to a higher level of abstraction than just [the level of reasoning about lines of code](https://ivanzakutnii.com/blog/Levels-of-reasoning-about-software), and following the idea we've discussed today, the right way to eliminate conditional checks and, in general, more correct code will *naturally emerge*.

---

> A lot of conditional checks in our code arise from the cursed None/Null leaking into our code, so it's worth mentioning the quite popular [Null Object pattern](https://en.wikipedia.org/wiki/Null_object_pattern).

### Clinging to Words, Not Meaning

When following Anti-if, you can go down the wrong path by clinging to words rather than meaning and blindly following the idea that "if is bad, if must be removed.”

Since conditional statements are *semantic* rather than *syntactic* elements, there are countless ways to remove the `if` token from your code *without changing the underlying logic* in our beloved programming languages.

Replacing an `elif` chain in Python with a `match/case` isn’t what I’m talking about here.

Logical conditions stem from the mental “model” of the system, and there’s no _universal_ way to "just remove" conditionals entirely.

In other words, cyclomatic complexity and overall code complexity aren’t tied to the physical representation of the code — the letters and symbols written in a file.

The complexity comes from the *formal expression*, the *verbal or textual explanation* of why and how specific code works.

So if we change something in the code, and there are fewer if statements or none at all, but the verbal explanation of same code remains the same, *all we’ve done is change the representation of the code*, and the change itself doesn’t really mean anything or make any improvement.
