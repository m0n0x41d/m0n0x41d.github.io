---
title: "Базовая методика дебага"
tags: "Программирование"
lang: ru
show_edit_on_github: false
comment: true
license: false
modify_date: "2022-08-14"
show_subscribe: false
article_header:
  theme: dark
  type: overlay
  align: left
  background_image:
    src: /header_images/debug.png
---

Искусство ловли жуков и прочей нечисти.
<!--more-->

Всех приветствую на этой странице!

Сегодня вашему вниманию я представляю полезную информацию на тему устранения багов.

Возможно некоторые, и даже большая часть, пунктов вам могут показаться "очевидными", итак понятными. Но как правило во многих сложных вещах, да и не очень сложных вещах маркуря в уме некоторые компоненты "простыми и очевидными" мы склонны принижать их значимость и тупо забывать, когда забывать о них не стоит.

Приступим.

# Воспроизведение ошибки

Для устранения некоторой возникающей в системе ошибки, разумеется её нужно воспроизвести. Проблема в том, что далеко не всегда можно логически понять откуда взялась та или иная ошибка, особенно если код написан так, что его в принципе проблематично отладить (например нет логов \ стактрейсов. haha, classic. Не смешно.)

Вывести какой либо *всегда работающий* алгоритм действий для того чтобы перейти от "ошибка N появляется в работе программы B уже несколько раз" к "Мы можем последовательно и многократно воспроизвести эту ошибку на локальной рабочей станции" в принципе невозможно, потому что природа ошибок слишком многогранна и зависит от большого количества обстоятельств.

Тем не менее... Воспроизвести её надо. И навык этого воспроизведения связан *скорее* с объемом опыта дебага и основывающейся на этом опыте "интуцией", чем с какой бы то ни было формальной логикой.

# Воспроизводим ошибку быстро

Ну, понятно, что к этому этапу мы переходим только если вообще способны ошибку воспроизвести. Но ключевой момент здесь это именно быстрота воспроизведения этой ошибки. Если для такого воспроизведения нам нужно покрутиться вокруг своей оси 15 раз, ударить левой пяткой в бубен и громко крикнуть Wubba Lubba Dub Dub, чтобы проверить — помогло ли измнение кода, и повлияло ли вообще на возникновение ошибки, очевидно что это нездоровый и крайне медленный рабочий цикл.

Здесь, если ошибка сложна к воспроизведению, например при отладки веб-системы требуется проивзодить длинную последовательность некоторых действий, нужно использовать средства автоматизации действий, вроде Selenium.

И вообще, автоматизация ключ к ускорению любого flow, автоматизируй то, автоматизируй это.

{:refdef: style="text-align: center;"}
![Дурка](/images/devops_durka.png)
{: refdef}

Нет, я серьезно. Если дебажить долго (а оно долго) —— ошибку придется воспроизводить несколько раз. Проще и лучше написать скрипт или команду, или скрипт из команд которые будут воспроизводить ошибку.

Ещё лучше, но не всегда возможно — написать юнит-тест воспроивзодящий ошибку и добавить его в общий набор тестов.

# Виноват мой код

Признак плохого программиста — винить в ошибке всё что угодно кроме своего кода, искать проблему (или делать вид), где угодно кроме как в собственном коде. Это правда странно.

Неужени мы настолько узколобы, что уверены в том, что настолько умны, и ошибка в сторонней библиотеке, фреймворке, операционной системе. Китайские хакеры взломали наш сервер и внедрили ошибку...

Разумеется есть вероятность ошибок в библиотеках и тд, но в 95% случаев (а наверняка и чаще) виноват именно наш код, который мы написали N-ое время назад.

Поэтому не тратьте время, наберитесь мужества и признайте что *скорее всего* проблема именно в вашем коде.

# Эксперименты

Как всё таки подступиться к воспроизведению ошибки и самому дебагу?

Во-первых, и это вытекает из пункта 3 — нам нужно полностью принять и *осознать* ошибку.

- Что это за ошибка? Что, черт возьми, вообще происходит?
- Когда это происходит?
- Какого поведения программы, вместо ошибки, мы ожидаем? Чего мы вообще ожидаем от программы?
- Когда именно происходит ошибка?

Поломав немного голову об эти вопросы и применив понимание исследуемой системы мы, скорее всего, будем способны предположить что именно могло сломаться и придумать *эксперименты* как проверить свои предположения и убедиться в них, или опровергнуть, поломать голову ещё и вывести новые предположения. И так пока не докопаемся :)

Эксперименты могут заключаться во временных изменениях или удалении частей кода, вызовах API, передача других входных значений, изучение значений в логах отладчика.

Здесь очень важно не распыляться, даже если очень хочется и вы к этому предрасположены. Под распыляться я имею в виду *"многофакторый анализ"*. Это когда мы пытаемся проверять одновременно *несколько предположений*. При многофакторном анализе резко выростает количество вариантов возможных проверок и можно сильно запутаться.

Проверять следует по одному предположению за раз, и отбрасывать каждое такое предположение, если оно не подтверждается в ходе экспериментов.

Такой подход к отладке часто приводит к осознанию того что некоторые наши доводы и убеждения касаемо работы системы на самом деле были неверны. Давайте разберем подобные, зачастую заведомо неверные предположения.

- "Эта переменная имеет значение Х", или "Имя этого файла задано правильно".

А, собственно, с какого перепуга мы заранее уверены в том что значение переменной нигде не менялось, как и не менялось имя файла, м? Мы можем быть уверенны в этом лишь изучив от корки до корки всю кодовую базу, и просмотрев каждый этап работы в дебаггере, значение переменной в каждый момент времени.

- "Значение переменной A никак не могло измениться от X к Y".

НУ это вообще что-то из разряда "магического мышления".

- "Этот код раньше работал верно".

Нет, он не работал верно. Просто *раньше* не возникали обстоятельства или последовательность действий\вызовов приводящих к ошибке.

- "Эта функция делает X".

Ага, а в её теле ещё 4 функции вызываются.

- "Я редактирую *правильный* файл"

Да, я же убедился что у него нет никаких зависимостей, конечно.

- "В этой строке не может быть опечаток, это ведь лишь 1 строка кода!"

Неужели ты забыл как, буквально на днях, искал 20 минут причину ошибки компилятора, и никак не мог разглядеть что стоит двоеточие вместо ;?

- "Так написано в документации! Значит это правильно!"
- "Код на который я сейчас смотрю будет когда-то выполняться, обязательно будет!"
- "Вот эти две части кода всегда выполняются последовательно, а не парралельно."
- "Уверен, код работает одинаково при компиляции в режимах debug и release"

И так далее, и тому подобное.

# Пиши код так, чтобы его можно было отладить

Проактивная отладка — это пожалуй самая лучшая по эффективности методика минимизации багов.

Основывается она на, в первую очередь, на такой штуке как **assert()'ы**.

Функция или макрос **assert()** проверяет свой аргумент-булево выражение. Если выражение истинно — ничего не происходит. В противном случае может происходить генерация исключения, вывод диагностического сообщения в лог с указанием строки, или остановка выполнения программы, если мы находимся в отладчике.

Конечно, лучше всего при "непрохождении" ассерта немедленно возвращать сообщение об ошибке и завершать работу программы, вместо того чтобы продолжать её дальнейшую работу непонятно с какими данными, непонятно к чему приводящую.

Продвинутое использования ассертов известно как ***Программирование по контракту (Design by Contract)***. Фишка тут в том, что следуя этой технике мы не просто бездумно-интуитивно натыкиваем ассерты куда попало в коде, а следуем некоторой формальной схеме.

Вообще очень полезно в этом контексте почитать [пост про три уровня размышления о программе](/2022/07/25/thinking_about_program.html), особенно про уровень спецификации :)

Так вот, "минус" использования assert'ов — код становится менее ясным из за большого количества дополнительных проверок и обработчиков ошибок.

НО, это более чем приемлемая цена, ибо доказано и посчитано в какой степени использование ассертов приводит к уменьшению числа багов.

Пруф-ссылка на исследование Microsoft Research [«Assessing the Relationship between Software Assertions and Code Quality: An Empirical Investigation»](https://pdfs.semanticscholar.org/2965/6dc9e68bec659d00cb10f43edeb12954d071.pdf)

Для ленивых:

Если assert в среднем в каждой десятой строке кода — достигаем минимально необходимого уровне обеспечения качества программного продукта. Если assert в кажой пятой — количество багов **стремится к нулю**.

К сожалению это не самая популярная тема в отрасли, а в своей DevOps практике я периодически встречаю приложения которые вообще не пишут нормальный лог.

# Стандартные error messages сами по себе требуют понимания

Не стоит экономить на сопровождающих подробностях пойманной ошибки. Если мы выводим всю доступную информацию в лог, то может вообще не придется ломать голову и искать причину бага. Полезно сохранять в лог весь стэктрейс вызовов, которые привели к сбою.

Кроме того интерпретировать сообщение об ошибки может быть не так легко как кажется. Вот вроде бы "одни и те же", как кажется, по смыслу ошибки могут по разному трактоваться в зависимости от языка программирования, фреймворка и тд.

Короче, пишите нормальный лог наконец!

---

Все что выше написано, как я уже говорил в начале — "многим итак понятно". Но всё же стоит откровенно и самому себе честно признаться, действительно ли я следую этим *очевидным* принципам и рекомендациям, хорошо дебажу свой или чужой код? Очень полезно проследить за собой, порефлексировать и зафиксировать сколько времени и на что именно тратится в процессе дебага. Найдя *удивительно* времязатратный процесс — ищите сопосб его опримизировать, автоматизировать, качественно ускорить.