---
title: "Нам нужны явные состояния. Нужны же?..."
tags: "Программирование Отчеты Императивная_модель"
lang: ru
show_edit_on_github: false
comment: true
license: false
modify_date: "2022-06-06"
show_subscribe: false
article_header:
  theme: dark
  type: overlay
  align: left
  background_image:
    src: /header_images/imper1.png
---

Врубаемся в Императивную модель. Часть 1.
<!--more--> 

Всем привет! Я приступил к очередному курсу в skillsmart.ru 
На этот раз темой курса является изучение Императивной модели программирования, как расширения фундаментальной Декларативной модели.

Вы что нибудь помните про декларативную модель, и про состояния?
Мы разбирали эти и другие связанные темы некоторое время назад на соответствуещм курсе. Почитать про это вы можете в моих постах-отчетах, начиная с [этого.](/2022/02/06/hack_in_declarative_model.html)

Но тут мы тоже будем сперва говорить про декларативность, потому что никуда без неё :P

# Stateful programming

В императивной модели концепция времени понимается уже совсем по другому. Наверное самое главное отличие императивной модели от декларативной заключается именно в этом.

Время тут меняется благодаря введению в модель *Явных состояний*, которые добавляют программным сущностям возможность *долгосрочной памяти*.

Иными словами — тут появляются привычные нам "императивные" переменные.

Есть ещё умные слова, которыми достаточно часто отмечают природу состояний в моделях: **stateless** и **stateful** программирование. На самом под первым как правило имеется в виду декларативное, а под вторым — императивное.

Давайте вкратце повторимся.

*Декларативное программирование* — это когда мы описываем **какой результат** нужно получить. Возможно с дополнительным определением "подказок" как его получить :)

{:refdef: style="text-align: center;"}
![Рекурсивные кролики](/images/declarative_meme.jpeg)
{: refdef}

*Императивное программирование* — это когда мы с помощью конкретных команд описываем **как получить результат**. 


На самом деле декларативное программированое в какой то степени императивно, потому что всё равно зачастую используются последовательности каких то команд. 

Вообще, Декларативная парадигма это в первую очередь математическая модель, а сама "декларативность" проще будет пониматься как *относительная степень*, в которой эта самая декларативность применяется в языке программирования. 


# Прелести декларативного подхода

Хотя декларативный подход можно, грубо говоря, "спроецировать" на любой программный код, на практике же (в логических или фунциональных программах, например) он теряет большую часть аспекта *"что делать"*, так как приходится более детально описывать подробности *"как делать"*.

Тем не менее это не значит что от декларативного программирования можно или нужно как то отказываться, потому что у него есть три существеннных плюшки:

1. В декларативной модели проще формировать практически все программные абстракции благодаря тому что декларативные операции **композиционны**.
2. Декларативные программы просто тестировать, потому что достаточно протестировать одиночныне вызовы команд, когда stateful программу тестировать сложнее из за того что приходится проверять *последовательности вызовов*. 
3. Рассуждать о программи в декларативной модели проще, чем при использовании императивного программирования.

# Снова о состояниях

Итак, мы уже выяснили что *состояние* — это растянутая во времени последовательность значений, в которой содержатся промежуточные результаты нужного вычисления.

Мы помним что в декларативной модели состояние характеризуется как **скрытое**. Такие декларативные, состояния никак *явно* не поддерживаются со стороны вычислительной модели. Последовательности вычислений могут пониматься и представляться только в сознании программирующего существа, а на уровне кода последовательности просто не существуют.

Явное состояние наоборот — *существует* на протяжении времени, в более чем одном вызове функции *без явного определения этого состояния в аргументах этой функции*.

Такое состояние реализуется с помощью некоторого "контейнера", который принято называть **ячейка**. Такая ячейка уже фактически существует в коде, наблюдается, иными словами — *не только в сознании программирующего существа.*

# Принцип абстракции

По мере роста системы описывать её абстракции в чисто декларативном или функциональном программировании становится всё сложнее, потому что сам *принцип* абстракции не очень хорошо поддерживается этими парадигмами. Причиной этой сложности является как раз природа состояний — мы не можем вкладывать *новую* информацию в компоненты программы или функции (инкапсулировать их внутри).

Для того чтобы система могла хорошо поддерживать принцип абстракции она должна обладать следующими характеристиками:

- **Инкапсуляция** — это возможность скрывать внутренние части самой системы;
- **Композиционность** — это про возможность комбинирования частей системы в целях полуения новых частей;
- **Инстанциирование** (invocation) — возможность создавать много конкретных экземпляров компонена на основе его единого определения. 

Если вы знаете хотя бы немного про ООП (объектно ориентированное программирование), то наверняка уловили сейчас знакомые концепции. Но мы говорим сейчас совсем не про "высокии материи" ООП, и используем более фундаментальные и универсальные принципы программирования для определения и понимания этих концепций.

Например *замыкани* обеспечивают инкапсуляцию, а инстанциирование достигается посредством программирования высшего порядка.

**Важной** особенность характеристик перечисленных выше является то, что их набор **не требует использования концпеции состояния**.

На самом деле инкапсуляция вообще противоположна состоянию, и её можно применять в декларативном программировании. Состояния же могут обходиться без икапсуляции, к примеру — с помощью создания *глобальных переменных*.

Пришла пора поговорить о cons, а то всё про pros да про pros :)

Добавления концепции состояния к декларативному программированию резко и в разы усложняет понимание самой программы, становится не так просто рассуждать о ней. 

Во-первых мы можем столкнуться с **побочными эффектами** у функций, которые теперь могут менять состояния что не видны во всей остальной программе.

Именно по этой причине явное состояние нужно обязательно **применять в тесной связи с инкапсуляцией**, благодаря чему появляется возможность проектировать stateful-системы корректно. Тут появляется понитие **инварианта**, который всегда выглядит "снаружи" правильно. 

Это возвращает нам возможность рассуждать о подсистемах формально, считая что поведение этой подсистемы не зависит от окружающей среды, тем самым частично возвращая нас в плане рассуждений к декларативному программированию. Тем не менее, одно только введение инвариантов всё ещё не делает программирование с использованием состояний таким же простым и понятным как декларативное.

Потому что инвариант *всего лишь определяет что компонент не ведет себя некорректно*, и никак не гарантируется то, что он помогает в продвижении к решению итоговой задачи. 

Из всего это следует очень важное правило:

Сложные системы нужно проектировать так, чтобы как можно больше количество компонентов этой системы было описано в декларативной парадигме.
{:.info} 

Состояния **должны** быть сконцентрированны в единичных компонентах. Нельзя растягивать состояния по несколькоим компонентам.

---

[Читать продолжение](/2022/06/13/hack_in_imperative_2.html)