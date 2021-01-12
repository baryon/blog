(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{532:function(t,s,a){t.exports=a.p+"assets/img/20201019114835459.db336ea7.jpg"},596:function(t,s,a){"use strict";a.r(s);var e=a(8),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("数据序列化，就是将一个数据结构或者对象，按照某种规则组合成一个输出，可以是字节数组，也可以是一个格式文件或者字符串。序列化的目的是为了对象的网络传输，数据存储。")]),t._v(" "),e("p",[t._v("序列化后数据还可以反序列化形成对象。\n"),e("img",{staticClass:"lazy",attrs:{alt:"","data-src":a(532),loading:"lazy"}})]),t._v(" "),e("p",[t._v("举个例子，表示状态的对象")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" state "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'counter'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bytes'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1234'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'flag'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("如果序列化成JSON"),e("a",{attrs:{href:"https://www.json.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.json.org/"),e("OutboundLink")],1),t._v("格式则为：")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"counter"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"bytes"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"flag"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("如果序列化成msgpack"),e("a",{attrs:{href:"https://msgpack.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://msgpack.org/"),e("OutboundLink")],1)]),t._v(" "),e("div",{staticClass:"language-hex extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("83 A7 63 6F 75 6E 74 65 72 0B A5 62 79 74 65 73 A4 31 32 33 34 A4 66 6C 61 67 C3\n")])])]),e("p",[t._v("如果序列化为YAML"),e("a",{attrs:{href:"https://yaml.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://yaml.org/"),e("OutboundLink")],1)]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("counter")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("bytes")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1234'")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("flag")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n")])])]),e("p",[t._v("无论是JSON还是msgpack，yaml都有程序库可以反序列化数据为对象。")]),t._v(" "),e("p",[t._v("在比特币脚本中如何做这种序列化呢？从比特币脚本操作符"),e("a",{attrs:{href:"https://wiki.bsv.info/op-codes",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://wiki.bsv.info/op-codes"),e("OutboundLink")],1),t._v("知道下面几个命令")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("符号")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("值 (十六进制)")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("输入")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("输出")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("1-75")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("0x01-0x4b")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("(special)")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("把接下来的N 个字节压入堆栈中，N 的取值在1 到75 之间")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("OP_PUSHDATA1")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("0x4c")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("(special)")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("下一个字节包括数字N，会将接下来的N 个字节压入堆栈")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("OP_PUSHDATA2")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("0x4d")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("(special)")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("下面两个字节包括数字N，会将接下来的N 个字节压入堆栈")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("OP_PUSHDATA4")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("0x4e")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("(special)")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("下面四个字节包括数字N，会将接下来的N 个字节压入堆栈")])])])]),t._v(" "),e("p",[t._v("sCrypt最新版"),e("a",{attrs:{href:"https://github.com/scrypt-sv/scryptlib",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/scrypt-sv/scryptlib"),e("OutboundLink")],1),t._v("中使用上面的命令做了一个序列化的初步实现。")]),t._v(" "),e("p",[t._v("先看一下下面的代码片段")]),t._v(" "),e("div",{staticClass:"language-plain extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("OP_RETURN 0b 1234 01 0700\n")])])]),e("p",[t._v("这就是上面state对象的序列化结果。按照顺序")]),t._v(" "),e("p",[e("code",[t._v("'counter': 11")]),t._v("对应对应"),e("code",[t._v("0b")])]),t._v(" "),e("p",[e("code",[t._v("'bytes': '1234'")]),t._v("对应"),e("code",[t._v("1234")])]),t._v(" "),e("p",[e("code",[t._v("'flag': true")]),t._v("对应"),e("code",[t._v("01")])]),t._v(" "),e("p",[t._v("注意这里都是hex，而不是整数。")]),t._v(" "),e("p",[t._v("上面代码片断在脚本HEX的表现是")]),t._v(" "),e("div",{staticClass:"language-plain extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("6a010b0212340101020700\n")])])]),e("p",[t._v("我们分割一下，解释")]),t._v(" "),e("div",{staticClass:"language-plain extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("6a 010b 021234 0101 020700\n")])])]),e("p",[e("code",[t._v("6a")]),t._v("是"),e("code",[t._v("OP_RETURN")]),t._v(" "),e("code",[t._v("010b")]),t._v("的"),e("code",[t._v("01")]),t._v("是表示后面有一个字节的数据，数据是"),e("code",[t._v("0b")])]),t._v(" "),e("p",[e("code",[t._v("021234")]),t._v("的"),e("code",[t._v("02")]),t._v("是表示后面有两个字节的数据，数据是"),e("code",[t._v("1234")])]),t._v(" "),e("p",[e("code",[t._v("0101")]),t._v("的"),e("code",[t._v("01")]),t._v("是表示后面有一个字节的数据，数据是"),e("code",[t._v("01")])]),t._v(" "),e("p",[e("code",[t._v("020700")]),t._v("的"),e("code",[t._v("02")]),t._v("是表示后面有两个字节的数据，数据是"),e("code",[t._v("0700")])]),t._v(" "),e("p",[e("code",[t._v("0700")]),t._v("是little endian的数据"),e("code",[t._v("7")]),t._v("，表示前面有多少个字节的数据，"),e("code",[t._v("010b 021234 0101")]),t._v("合计刚好是7个字节。")]),t._v(" "),e("p",[t._v("可以看出来这个序列化的方式是")]),t._v(" "),e("ul",[e("li",[t._v("整体格式"),e("code",[t._v("OP_RETURN + 数据 + 数据长度")])]),t._v(" "),e("li",[t._v("每个数据片断是脚本操作符1-75或者OP_PUSHDATAx + 数据值")]),t._v(" "),e("li",[t._v("数据片断不包含名称'counter','flag'，只有数据值")])]),t._v(" "),e("p",[t._v("序列化的原理就这么多，关键是要理解脚本是如何压数据入栈的。")]),t._v(" "),e("p",[t._v("合约代码和测试代码见GitHub:")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/scrypt-sv/boilerplate/blob/master/contracts/stateSerializer.scrypt",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/scrypt-sv/boilerplate/blob/master/contracts/stateSerializer.scrypt"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("strong",[t._v('注意：在这篇文章写作期间，"scryptlib":"^0.2.10"还不支持超过75个字节的字节数组入栈。\n另外：Varint和OP_PUSHDATA是不同的，不可混淆。')])]),t._v(" "),e("p",[t._v("因为这种序列化之后不包括key，所以顺序就变得非常重要。否则反序列化的时候就不正确了。\n这篇文章写的很好： "),e("a",{attrs:{href:"http://jartto.wang/2016/10/25/does-js-guarantee-object-property-order/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://jartto.wang/2016/10/25/does-js-guarantee-object-property-order/"),e("OutboundLink")],1),t._v("\n下面的对象，序列化顺序的规律你能掌握吗？")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" data "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aaa'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bbb'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ccc'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'测试'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'000'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aaa'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bbb'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ccc'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'测试'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'000'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" data "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'测试'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'000'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aaa'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bbb'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ccc'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aaa'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bbb'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ccc'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'测试'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'000'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" data "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'000'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aaa'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bbb'")]),t._v(","),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ccc'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aaa'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bbb'")]),t._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ccc'")]),t._v(", a: "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'000'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("感兴趣的人看一看更深入的讨论 "),e("a",{attrs:{href:"https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("直接说结论，序列化的对象要保证没有数字作为key，比如不要有 "),e("code",[t._v("'1':'aaa'")]),t._v("\n这样序列化key的顺序就是定义顺序，先写出来的在前面，后写出来的在后面。")]),t._v(" "),e("hr"),t._v(" "),e("p",[t._v("（后记）")]),t._v(" "),e("p",[t._v("既然知道初步实现的序列化有一些问题，那么就贡献自己的代码好了。\n去Fork一个"),e("a",{attrs:{href:"https://github.com/scrypt-sv/scryptlib",target:"_blank",rel:"noopener noreferrer"}},[t._v("sCryptLib"),e("OutboundLink")],1),t._v("的代码，先写"),e("a",{attrs:{href:"https://zh.javascript.info/testing-mocha",target:"_blank",rel:"noopener noreferrer"}},[t._v("BDD驱动"),e("OutboundLink")],1),t._v("的测试代码，然后再做具体实现。")]),t._v(" "),e("p",[t._v("我们希望下面一些用法，把想法都写在BDD测试代码里")]),t._v(" "),e("ul",[e("li",[t._v("不只是对象，也支持数组的序列化")]),t._v(" "),e("li",[t._v("支持反序列化，反序列化的时候可以识别出类型")]),t._v(" "),e("li",[t._v("支持BigInt")]),t._v(" "),e("li",[t._v("支持比特币脚本数字 OP_0 OP_1 OP_1NEGATE OP_2 ... ... OP_16")]),t._v(" "),e("li",[t._v("Bool类型使用OP_TRUE和OP_FALSE")]),t._v(" "),e("li",[t._v("支持OP_Pushdata1,2,4，也就是支持大内容")])]),t._v(" "),e("p",[t._v("写好的测试代码参考\n"),e("a",{attrs:{href:"https://github.com/scrypt-sv/scryptlib/blob/master/test/serializer.test.ts",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/scrypt-sv/scryptlib/blob/master/test/serializer.test.ts"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("然后编写代码，让代码通过测试。3天期间做了多次修改，修改了两个库，完美实现，提交给官方，获得review，再次修改，最终代码合并。新的序列化使用方法请参考测试代码。")]),t._v(" "),e("p",[t._v("同时对合约代码也做了修改\n"),e("a",{attrs:{href:"https://github.com/scrypt-sv/boilerplate/blob/master/contracts/serializer.scrypt",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/scrypt-sv/boilerplate/blob/master/contracts/serializer.scrypt"),e("OutboundLink")],1)]),t._v(" "),e("blockquote",[e("p",[t._v("谢谢大家为更好的比特币做出的贡献\n享受比特币带来的安全自由， 关注使用"),e("a",{attrs:{href:"https://note.sv",target:"_blank",rel:"noopener noreferrer"}},[t._v("NoteSV"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);