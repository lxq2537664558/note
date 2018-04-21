常用的Emmet
------------------------------

###### 后代 >
缩写: nav>ul>li

```php
<nav>
	<ul>
    	<li></li>
    </ul>
</nav>
```

####### 兄弟 +
缩写: div+p+bq

```php
<div></div>
<p></p>
<blockquote></blockquote>
```

###### 上级 ^
缩写: div+div>span+em^bq

```php
<div></div>
<div>
	<p><span></span><em></em></p>
    <blockquote></blockquote>
</div>

缩写: div+div>p>span+em^^bq

```php
<div></div>
<div>
	<p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

###### 分组 ()
缩写: div>(header>ul>li*2>a)+footer>p

```php
<div>
	<header>
    	<ul>
        	<li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
	</header>
    <footer>
    	<p></p>
	</footer>
</div>
```

缩写: (div>dl>(dt+dd)*3)+footer>p

```php
<div>
	<dl>
    	<dt></dt>
        <dd></dd>
    	<dt></dt>
        <dd></dd>
    	<dt></dt>
        <dd></dd>
	</dl>
<div>
<footer>
	<p></p>
</footer>
```

###### 乘法 *
缩写: ul>li*5

```php
<ul>
	<li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

###### 自增符号 $
缩写: ul>li.item$*5

```php
<ul>
	<li class="item1"></li>
	<li class="item2"></li>
	<li class="item3"></li>
	<li class="item4"></li>
	<li class="item5"></li>
</ul>
```

缩写: h$[title=item$]{Header $}*3

```php
<h1 title="item1">Header 1</h1>
<h2 title="item2">Header 2</h2>
<h3 title="item3">Header 3</h3>
```

缩写: ul>li.item$$$*5

```php
<ul>
	<li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```

缩写: ul>li.item$@-*5

```php
<ul>
	<li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

缩写: ul>li.item$@3*5

```php
<ul>
	<li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```

###### ID和类属性
缩写: #header

```php
<div id="header"></div>
```

缩写: .title

```php
<div class="title"></div>
```

缩写: form#search.wide

```php
<form id="search" class="wide"></form>
```

缩写: p.class1.class2.class3

```php
<p class="class1 class2 class3"></p>
```

###### 自定义属性

缩写: p[title="Hello world"]

```php
<p title="hello world"></p>
```

缩写: td[rowspan=2 colspan=3 title]

```php
<td rowspan="2" colspan="3" title=""></td>
```

缩写: [a='value1' b="value2"]

```php
<div a="value1" b="value2"></div>
```

###### 文本 {}

缩写: a{Click me}

```php
<a href="">Click me</a>
```

缩写: p>{Click}+a{here}+{ to continue}

```php
<p>Click <a href="">here</a> to continue</p>
```

###### 隐式标签

缩写: .class

```php
<div class="class"></div>
```

缩写: em>.class

```php
<em><span class="class"></span></em>
```

缩写: ul>.class

```php
<ul>
	<li class="class"></li>
</ul>
```

缩写: table>.row>.col
```php
<table>
	<tr class="row">
    	<td class="col"></td>
	</tr>
</table>
```

###### HTML
所有未知的缩写都会转变成标签, 例如:  `foo` -> `<foo></foo>`

缩写: !

```php
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

缩写: a

```php
<a href=""></a>
```

缩写: a:link

```php
<a href="http://"></a>
```

缩写: a:mail

```php
<a href="mailto:"></a>
```

缩写: abbr

```php
<abbr title=""></abbr>
```

缩写: acronym

```php
<acronym title=""></acronym>
```

缩写: base

```php
<base href="" />
```

缩写: basefont

```php
<basefont />
```

缩写: br

```php
<br />
```

缩写: frame

```php
<frame />
```

缩写: hr

```php
<hr />
```

缩写: bdo

```php
<bdo dir=""></bdo>
```

缩写: bdo:r

```php
<bdo dir="rtl"></bdo>
```

缩写: bdo:l

```php
<bdo dir="ltr"></bdo>
```

缩写: col

```php
<col />
```

缩写: link

```php
<link rel="stylesheet" href="" />
```

缩写: link:css

```php
<lick rel="stylesheet" href="style.css" />
```

缩写: lnk:print

```php
<link rel="stylesheet" href="print.css" media="print" />
```

缩写: link:favicon

```php
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
```

缩写: link:touch

```php
<link rel="apple-touch-icon" href="favicon.png" />
```

缩写: link:rss

```php
<link rel="alternate" type="application/rss+xml" title="Rss" href="rss.xml" />
```

缩写: link:aton

```php
<link rel="alternate" type="application/atom+xml" title="Atom" href="atom.xml" />
```

缩写: mate

```php
<meta />
```

缩写:  meta:utf

```php
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
```

缩写: meta:win

```php
<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />
```

缩写: meta:vp

```php
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0" />
```

缩写: meta:compat

```php
<meta http-equiv="X-UA-Compatible" content="ID=7" />
```

缩写: style

```php
<style></style>
```

缩写: script

```php
<script></script>
```

缩写: img

```php
<img src="" alt="" />
```

缩写: iframe

```php
<iframe scr="" framborder="0"></iframe>
```

缩写: embed

```php
<embed src="" type="" />
```

缩写: object

```php
<object data="" type=""></object>
```

缩写: param

```php
<param name="" calue="" />
```

缩写: map

```php
<map name=""></map>
```

缩写: area

```php
<area shape="" coords="" href="" alt="" />
```

缩写: area:d

```php
<area shape="default" href="" alt="" />
```

缩写: area:c

```php
<area shape="circle" coords="" href="" alt=""  />
```

缩写: area:p

```php
<area shape="poly" coords="" href="" alt="" />
```

缩写: form

```php
<form action=""></form>
```

缩写: form:get

```php
<form action="" method="get"></form>
```

缩写: form:post

```php
<form action="" method="post"></form>
```

缩写: label

```php
<label for=""></label>
```

缩写: input

```php
<input type="text" />
```

缩写: inp

```php
<input type="text" name="" id="" />
```

缩写: input:hidden
别名: input[type=hidden name]

```php
<input type="hidden" name="" />
```

缩写: input:h
别名: input:hidden

```php
<input type="hidden" name="" />
```

缩写: input:text, input:t
别名: inp[type=search]

```php
<input type="text" name="" id="" />
```

缩写: input:search
别名: inp[type=search]

```php
<input type="search" name="" id="" />
```

缩写: input:email
别名: inp[type=email]

```php
<input type="email" name="" id="" />
```

缩写: input:url
别名: inp[type=url]

```php
<input type="url" name="" id="" />
```

缩写: input:pasword
别名: inp[type=password]

```php
<input type="password" name="" id="" />
```

缩写: input:p
别名: input:password

```php
<input type="password" name="" id="" />
```

缩写: inpu:datetime
别名: inp[type=datetime]

```php
<input type="datetime" name="" id="" />
```

缩写: input:date
别名: inp[typ-date]

```php
<input type="date" name="" id="" />
```

缩写: input:datetime-local
别名: inp[type-datetime-local]

```php
<input type="datetime-lcooal" name="" id="" />
```

缩写: input:month
别名: inp[type=month]

```php
<input type="month" name="" id="" />
```php

缩写: input:week
别名: inp[type=week]

```php
<input type="week" name="" id="" />
```

缩写: input:time
别名: inp[type=time]

```php
<imput type="time" name="" id="" />
```

缩写: input:number
别名: inp[type=number]

```php
<input type="number" name="" id="" />
```

缩写: input:color
别名: inp[type=color]

```php
<input type="color" name="" id="" />
```

缩写: input:checkbox
别名: inp[type=checkbox]

```php
<input type="checkbox" name="" id="" />
```

缩写: input:c
别名: input:checkbox

```php
<input type="checkbox" name="" id="" />
```

缩写: input:radio
别名: inp[type=radio]

```php
<input type="radio" name="" id="" />
```

缩写: input:r
别名: input:radio

```php
<input type="radio" name="" id="" />
```

缩写: input:range
别名: inp[type=range]

```php
<input type="range" name="" id="" />
```

缩写: input:file
别名: inp[type=file]

```php
<input type="file" name="" id="" />
```

缩写: input:f
别名: input:file

```php
<input type="submit" value="" />
```

缩写: input:s
别名: input:submit

```php
<input type="submit" value="" />
```

缩写: input:image

```php
<input type="image" src="" alt="" />
```

缩写: input:i
别名: input:image

```php
<input type="image" src="" alt="" />
```

缩写: input:button

```php
<input type="button" value="" />
```

缩写: input:b
别名: input:button

```php
<input type="button" value="" />
```

缩写: isindex

```php
<isindex />
```

缩写: input:reset
别名: input:button[type=reset]

```php
<input type="reset" value="" />
```

缩写: select

```php
<select name="" id=""></select>
```

缩写: option

```php
<option value=""></option>
```

缩写: textarea

```php
<textarea name="" id="" cols="30" rows="10"></textarea>
```

缩写: menu:cotext
别名: menu[type=context]

```php
<menu type="context"></menu>
```

缩写: menu:c
别名: menu:context

```php
<menu type="context"></menu>
```

缩写: menu:toolbar
别名: menu[type=toolbar]

```php
<menu type="toolbar"></menu>
```

缩写: menu:t
别名: menu:toolbar

```php
<menu type="toolbar"></menu>
```

缩写: video

```php
<video src=""></video>
```

缩写: audio

```php
<audio src=""></audio>
```

缩写: html:xml

```php
<html xmlns="http://www.w4.org/1999/xhtml"></html>
```

缩写: keygen

```php
<keygen />
```

缩写: command

```php
<command />
```

缩写: bq
别名: blockquote

```php
<blockquote></blockquote>
```

缩写: acr
别名: acronym

```php
<acronym title=""></acronym>
```

缩写: fig
别名: figure

```php
<figure></figure>
```

缩写: figc
别名: figcaption

```php
<figcaption></figcaption>
```

缩写: ifr
别名: iframe

```php
<iframe src="" frameborder="0"></iframe>
```

缩写: emb
别名: embed

```php
<embed src="" type="" />
```

缩写: obj
别名: object

```php
<object data="" type=""></object>
```

缩写: src
别名: source

```php
<source></source>
```

缩写: cap
别名: caption

```php
<caption></caption>
```

缩写: colg
别名: colgroup

```php
<colgroup></colgroup>
```

缩写: fst, fset
别名: fieldset

```php
<fieldset></fieldset>
```

缩写: btn
别名: button

```php
<button></button>
```

缩写: btn:b
别名: button[type=button]

```php
<button type="bbutton"></button>
```

缩写: btn:r
别名: button[type=reset]

```php
<button type="reset"></button>
```

缩写: btn:s
别名: button[type=submit]

```php
<button type="submit"></button>
```
