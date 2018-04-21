[TOC]

####段落 标题
Markdown支持两种标题语法,Setext和atx形式.
Setext形式是用底线的形式,利用 `=` (最高阶标题) 和 `-` (第二阶标题)
任何数量的 `=` 和 `-` 都可以有效果

Atx形式在行首插入1到6个 `#` ,对应到标题1到6阶
你可以选择性地 (闭合) 类atx样式的标题,这纯粹只是美观用的,若是觉得这样看起来比较舒适,你就可以在行尾加上`#`,而行尾的`#`数量也不用和开头一样(行首的井字符数量决定标题的阶数)

####区块引用 Blockquotes
Markdown标记区块引用是使用类似email中用`>`的引用方式.如果你还熟悉在email信件中的引言部分,你就知道怎么在Markdown文件中建立一个区块引用,那会看起来像是你自己先断好行,然后在每行的最前面加上`>`

区块引用可以嵌套

    > > 区块引用则使用 email 形式的'>'角括号

引用的区块内也可以使用其他的 Markdown 语法, 包括标题 列表 代码区块等

####列表
无序列表使用星号 加号 减号 来作为列表的项目标记

    * Candy
    + Gum
    - Booze

有序列表则是使用一般的数字接着一个英文句号点作为项目标记
列表标记上使用的数字并不会影响输出的HTML结果

    1. Red
    2. Green
    3. Blue

如果你项目之间插入空行,那项目的内容会用`<p>`包起来,你也可以在一个项目内放上多个段落,只要在他前面缩排4个空白或1个tab

如果要在列表项目内放进引用,那`>`就需要缩进

如果要放代码区块的话,该区块就需要缩进两次,也就是8个空格或2个制表符

需要避免 行首出现数字-点-空白 的情况 可以在 点 前面加上反斜杠

	1968\. What a great season.

####代码区块
和程序相关的写作或是标签语言原始码通常会有已经排版好的代码区块,通常这些区块我们并不希望它以一般段落文件的方式去排版,而是照原来的样子显示, Markdown 会用`<pre>`和`<code>`标签来把代码区块包起来

在Markdown中建立代码区块很简单, 只要简单地缩进4个空格或是1个制表符就可以

一个代码区块会一直持续到没有缩进的哪一行(或是文件结尾)

代码区块中, 一般的 Markdown 语法不会被转换, 像是星号便是星号, 这表示你可以很容易地以 Markdown 语法撰写 Markdown 语法相关的文件

		code

添加语种如 php 可以使代码高亮
    ```语种
    code
    ```

####分割线
你可以在一行中用三个以上的星号 减号 底线来建立一个分割线, 行内不能有其他东西. 你也可以在星号或是减号中间插入空格

    ***
    - - -
    _ _ _

####链接
Markdown支持两种形式的链接语法 行内和参考两种形式,两种都是使用角括号来把文字转成链接

行内形式是直接在后面用括号直接接上链接

	This is an [example link](http://example.com/).

你也可以加上title属性

	This is an [example link](http://example.com/ "With a Title")

参考形式的链接让你可以为链接定一个名称,之后你可以在文件的其他地方定义该链接的内容

    I get 10 times more traffic from [Google][1] than from [Yahoo][2] or [MSN][3]
    [1]: http://google.com/ "Google"
    [2]: http://search.yahoo.com/ "Uahoo Search"
    [3]: http://search.msn.com/ "MSN Search"

隐式链接标记功能让你可以省略指定链接标记, 这种情形下, 链接标记会视为等同与链接文字, 要用隐式链接标记只要在链接文字后面加上一个空的方括号

	[google][]

定义链接内容

	[google]: http://google.com/

title属性是选择性的,链接名称可以用字母,数字和空格,但是不分大小写

使用 Markdown 的参考式链接, 可以让文件更像是浏览器最后产生的结果, 让你可以把一些标记相关的元素局移到段落文字之外,你就可以增加链接而不让文章的阅读感觉被打断

####强调

####修辞和强调
Markdown 使用星号`*`和底线`_`作为标记强调字词的符号,被`*`或`_`包围的字词会被转成用`<em>`标签包围, 用两个`*`或`_`包起来的话, 则会被转成`<strong>`

	*斜体*
    _斜体_
    **加粗**
    __加粗__
    ++下划线++
    ~~删除线~~
    ==标记==
    ^上标^
    ~下标~

如果要在文字前后直接插入普通的星号或底线, 可以用反斜线

	\*this text is surrounded bu literal asterisks\*

####代码
如果要标记一小段行内代码,你可以用反引号把它包起来(`` ` ``)

如果要在代码区段内插入反引号,你可以用多个反引号来开启和结束代码区段

代码区段的起始和结束端都可以放入一个空白, 起始端后面一个, 结束端前面一个, 这样你就可以在区段的一开始就插入反引号

在一般的段落文字中,你可以使用反引号 \` 来标记代码区段,区段内的`&` `<` `>` 都会被自动的转换成HTML实体,这项特性让你可以很容易的在代码区段内插入HTML代码

如果要建立一个已经格式化号的代码区块,只要每行都缩进4个空格或是一个tab就可以了,而`&` `<` `>` 也一样会自动转换成HTML实体

####图片
行内形式(title是选择性的)

	![alt text](/path/to/img.jpg "Title")
    ![](http://bit.ly/1g1oUFW "title" "width:200px;height:100px")
    ![](http://bit.ly/1g1oUFW "right" "width:200px;height:100px;float:right;padding-left:10px;")

参考形式

    ![alt text][id]
	[id]: /path/to/img.jpg "Title"

目前为止, Markdown 还没有办法指定图片的宽高,需要的话可以使用普通的`<img>`标签

####自动链接
Markdown 支持以比较剪短的自动链接形式来处理网址和电子邮件信箱, 只要用尖括号包起来, Markdown 就会自动把它转成链接

	<http://example.com/>

邮址的自动链接也很类似, 只是 Markdown 会先做一个编码转换的过程, 把文字字符转换成 16 进位码的 HTML 实体, 这样的格式可以糊弄一些不好的邮址收集机器人

在浏览器里面, 这段字串 (其实是<a href="mailto:address@example.com">address@example.com</a>) 会变成一个可以点击的 address@example.com 链接
>这种做法虽然可以糊弄不少的机器人, 但并不能全部挡下来, 不过总比什么都不做好些. 不管怎么样, 公开你的信箱终究会引来广告信件的

####反斜杠
Markdown 可以利用反斜杠来插入一些在语法中有其他意义的符号

	\*literal asterisks\*

Markdown 支持一下这些符号前面加上反斜杠来班组插入普通的符号
	\	反斜杠
    `	反引号
    *	星号
    _	底线
    #	井字号
    +	加号
    -	减号
    .	点
    !	惊叹号
    {}	花括号
    []	方括号
    ()	括弧

####任务清单
    - [x] 吃饭
    - [ ] 睡觉
    - [ ] 打**
    - [ ] 嘿嘿嘿

####脚注
需要在设置开启脚注功能

    That's some text with a footnote. [^123]
    That's some text with a footnote. [^abcd]

脚注说明需要加在文件最后

    [^123]: And that's the footnote.
    [^abcd]: And that's the footnote.

####目录
    [toc] or [TOC]

    靠右显示
    [TOC "float:right"]

####媒体嵌入
使用@[]()语法链接到外部资源

    @[caption](content-url 'stylesheets')
    @[](http://www.youtube.com/watch?v=jo_B4LTHi3I)
    @[](http://www.flickr.com/photos/bees/2362225867/ 'width:300px')

使用方法
http://pad.haroopress.com/page.html?f=samples

####音频
支持 MP3 和 OGG 格式

    ![audio](http://v2v.cc/~j/theora_testsuite/320x240.ogg)

####视频
支持 MP4 OGV WEBM 格式

	![video](http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm)

####表格
`|---:|`局右`|:---:|`居中`|:---|`局左

 	| column | column |
    |--------|--------|
    |    1    |    2    |
    |    1    |    2    |
    |    1    |    2    |

####图语法
(简书)
流程图
```flow
st=>start: Start
e=>end
op=>operation: My Operation
cond=>condition: Yes or No?


st->op->cond
cond(yes)->e
cond(no)->op
```
时顺图
```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am thanks!
```

```seq
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```
```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end

st->op->cond
cond(yes)->e
cond(no)->op
```

http://pad.haroopress.com/page.html?f=how-to-draw-diagram

####LaTeX 公式
$表示行内公式
$$表示整行公式