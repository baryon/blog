(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{565:function(a,t,_){"use strict";_.r(t);var e=_(8),s=Object(e.a)({},(function(){var a=this,t=a.$createElement,_=a._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("h2",{attrs:{id:"比特币脚本执行环境"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#比特币脚本执行环境"}},[a._v("#")]),a._v(" 比特币脚本执行环境")]),a._v(" "),_("p",[a._v("比特币提供一种程序执行环境，它有")]),a._v(" "),_("ul",[_("li",[a._v("分割为两段的脚本")]),a._v(" "),_("li",[a._v("多个脚本操作符")]),a._v(" "),_("li",[a._v("两个栈，叫做主栈(MainStack)和从栈(AltStack)")])]),a._v(" "),_("p",[a._v("废话不多说，直接看程序，只需基础的程序知识就可以理解。")]),a._v(" "),_("h2",{attrs:{id:"两段脚本"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#两段脚本"}},[a._v("#")]),a._v(" 两段脚本")]),a._v(" "),_("p",[a._v("下面一段完整的脚本执行"),_("code",[a._v("2+3=5")])]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_2\nOP_3\nOP_ADD\nOP_5\nOP_EQUAL\n")])])]),_("p",[a._v("这是一种基于栈的计算方式。猜测就可以知道写的"),_("code",[a._v("2 3 + 5 =")])]),a._v(" "),_("p",[a._v("这种没有括号，数字在前面，操作符在后面的写法叫做逆波兰表达式。有人说这证明了中本聪是日本人，因为日语就是 名词在前面，动词在后面。其实计算机在解释编译数学表达式，程序语言的时候都使用的这种方式。")]),a._v(" "),_("p",[a._v("在比特币中分割这个脚本为下面两段，一个叫做解锁脚本，一个叫做锁定脚本。")]),a._v(" "),_("p",[a._v("第一段")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_2\n")])])]),_("p",[a._v("第二段")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_3\nOP_ADD\nOP_5\nOP_EQUAL\n")])])]),_("p",[a._v("第一段叫做解锁脚本，第二段叫做锁定脚本。")]),a._v(" "),_("p",[_("strong",[a._v("锁定脚本的意思是：什么东西加上3等于5？")])]),a._v(" "),_("p",[_("strong",[a._v("解锁脚本回答：2")])]),a._v(" "),_("p",[a._v("解锁脚本同锁定脚本连起来结果为“真”，说明解锁成功。")]),a._v(" "),_("p",[a._v("这里的解锁脚本答案显然是唯一的，只有2加3才为5。")]),a._v(" "),_("h2",{attrs:{id:"第二种分法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#第二种分法"}},[a._v("#")]),a._v(" 第二种分法")]),a._v(" "),_("p",[a._v("第一段解锁脚本")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_2\nOP_3\n")])])]),_("p",[a._v("第二段锁定脚本")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_ADD\nOP_5\nOP_EQUAL\n")])])]),_("p",[_("strong",[a._v("锁定脚本的意思是：哪两个数加起来等于5？")])]),a._v(" "),_("p",[_("strong",[a._v("这时候就有多个答案")]),a._v("，"),_("code",[a._v("2+3=5")]),a._v("， "),_("code",[a._v("3+2=5")]),a._v("， "),_("code",[a._v("1+4=5")]),a._v("，"),_("code",[a._v("4+1=5")]),a._v("，"),_("code",[a._v("0+5=5")]),a._v("， "),_("code",[a._v("5+0=5")]),a._v("，这些都是答案")]),a._v(" "),_("p",[a._v("所以解锁脚本就可以有6种，比如 "),_("code",[a._v("1+4=5")])]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_1\nOP_4\n")])])]),_("h2",{attrs:{id:"第三种分法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#第三种分法"}},[a._v("#")]),a._v(" 第三种分法")]),a._v(" "),_("p",[a._v("第一段解锁脚本")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_2\nOP_3\nOP_ADD\n")])])]),_("p",[a._v("第二段锁定脚本")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_5\nOP_EQUAL\n")])])]),_("p",[_("strong",[a._v("锁定脚本的意思是：什么东西等于5？")])]),a._v(" "),_("p",[a._v("显然5等于5，而不是第一段的"),_("code",[a._v("2+3")]),a._v("，最简单的解锁脚本是")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_5\n")])])]),_("p",[a._v("合起来运行就是")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_5\nOP_5\nOP_EQUAL\n")])])]),_("p",[a._v("第一段的"),_("code",[a._v("2+3")]),a._v("说明解锁可以是个函数，甚至很复杂，只要结果等于"),_("code",[a._v("5")]),a._v("，解锁脚本可以是任何东西。比如"),_("code",[a._v("6-4+3=5")])]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v("OP_6\nOP_4\nOP_SUB\nOP_3\nOP_ADD\n")])])]),_("h2",{attrs:{id:"换一种语言"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#换一种语言"}},[a._v("#")]),a._v(" 换一种语言")]),a._v(" "),_("p",[a._v("上面的脚本使用原生的比特币脚本关键字，不容易记忆理解。下面使用forth语言重写。")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v(": main \n  1 2 +\n  5 =\n  ;\n")])])]),_("p",[a._v("上面的程序使用"),_("a",{attrs:{href:"https://github.com/Ljzn/mini_forth",target:"_blank",rel:"noopener noreferrer"}},[a._v("mini forth"),_("OutboundLink")],1),a._v("语法书写。")]),a._v(" "),_("blockquote",[_("p",[_("code",[a._v(": main")]),a._v("表示：主函数，程序从main函数开始执行\n"),_("code",[a._v("1 2 +")]),a._v("表示：进行 1+2操作\n"),_("code",[a._v("5 =")]),a._v("表示：判断是否等于5\n"),_("code",[a._v(";")]),a._v("表示：函数结束")])]),a._v(" "),_("h3",{attrs:{id:"改成两段脚本"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#改成两段脚本"}},[a._v("#")]),a._v(" 改成两段脚本")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v(": unlock\n  2 3\n  ;\n: locking\n  + 5 =\n  ;\n: main\n  unlock\n  locking\n  ;\n")])])]),_("p",[a._v("上面的程序创造了两个函数，unlock是解锁函数，locking是锁定函数。")]),a._v(" "),_("blockquote",[_("p",[a._v("main函数顺序调用解锁和锁定两个函数，将把两个函数连接在一起执行。\nlocking函数表示“哪两个数加起来等于5？”\nunlock函数提供了2和3两个数字")])]),a._v(" "),_("p",[a._v("显然"),_("strong",[a._v("locking的函数语义用其他的高级语言难以描述")]),a._v("。这就是forth语言的奇妙之处。")]),a._v(" "),_("h3",{attrs:{id:"解锁函数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#解锁函数"}},[a._v("#")]),a._v(" 解锁函数")]),a._v(" "),_("div",{staticClass:"language-plain extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[a._v(": unlock\n  6 4 -\n  3 +\n  ;\n: locking\n  5 =\n  ;\n: main\n  unlock\n  locking\n  ;\n")])])]),_("p",[a._v("这段代码实现了 "),_("code",[a._v("6-4+3=5")]),a._v("\n解锁脚本不只是数据，而是一个函数， 解锁代码提供了"),_("code",[a._v("6-4+3")]),a._v("这个答案。")]),a._v(" "),_("blockquote",[_("p",[a._v("享受比特币带来的安全自由， 关注使用"),_("a",{attrs:{href:"https://note.sv",target:"_blank",rel:"noopener noreferrer"}},[a._v("NoteSV"),_("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=s.exports}}]);