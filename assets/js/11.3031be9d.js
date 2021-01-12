(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{520:function(t,e,a){t.exports=a.p+"assets/img/20200930185221891.dd702f36.png"},521:function(t,e,a){t.exports=a.p+"assets/img/20200930193014842.b6922904.png"},567:function(t,e,a){"use strict";a.r(e);var n=a(8),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("p",[t._v("成都程序员zhangweis发表了"),n("a",{attrs:{href:"https://powping.com/posts/c0d15afcba341178604327f1069200ac08f24603abd427b7d85c0e0f8ac04e2b",target:"_blank",rel:"noopener noreferrer"}},[t._v("一篇短文（Merkle tree proof based data storage）"),n("OutboundLink")],1),t._v("提出一种使用比特币智能合约来验证数据状态变化的方法。"),n("a",{attrs:{href:"https://medium.com/@xiaohuiliu/scalable-state-storage-in-bsv-smart-contracts-60f9aeb3b1f",target:"_blank",rel:"noopener noreferrer"}},[t._v("sCrypt做了总结"),n("OutboundLink")],1),t._v("。题目是BSV智能合约中可扩展的状态存储（Scalable State Storage in BSV Smart Contracts）。")]),t._v(" "),n("p",[t._v("这种技术可以用于制作基于状态变化的Token，以及预言机（Oracle）。数据状态的正确性由比特币网络做验证。")]),t._v(" "),n("p",[t._v("之前 sCrypt有提出"),n("a",{attrs:{href:"https://medium.com/@xiaohuiliu/utxo-based-layer-1-tokens-on-bitcoin-sv-f5e86a74c1e1",target:"_blank",rel:"noopener noreferrer"}},[t._v("基于UTXO的Token方案"),n("OutboundLink")],1)]),t._v(" "),n("p",[t._v("在这个UTP方案中，数据是保存在每一个UTXO中的，状态的变化就是UTXO被花费，进而生成新UTXO的过程，新数据保存在新的UTXO之中。\n"),n("img",{staticClass:"lazy",attrs:{alt:"在这里插入图片描述","data-src":a(520),loading:"lazy"}})]),t._v(" "),n("p",[t._v("zhangweis的新方案同UTP完全不同。其对状态和数据进行分离，数据在链下（或者在链上）单独保存。而UTXO只进行状态变化的验证，并且保存最新的状态，注意：UTXO中只保存状态，而不保存数据。")]),t._v(" "),n("p",[t._v("示意图如下\n"),n("img",{staticClass:"lazy",attrs:{alt:"在这里插入图片描述","data-src":a(521),loading:"lazy"}})]),t._v(" "),n("p",[t._v("右侧是一个默克尔树，树叶是不同用户的数据，比如包含用户的公钥和余额。\n左侧是一连串的UTXO，一个Utxo花费之后会生成一个新的Utxo，这个过程就像接力棒(Baton)一样。新的UTXO输出里保存了右侧数据的最新状态，即右侧数据的默克尔树根。")]),t._v(" "),n("p",[t._v("在进行Token发行（issue），转账（transfer），销毁（burn）等操作时，首先由钱包修改右侧的数据，再解锁Utxo，将操作的过程作为解锁参数，生成新的Utxo。")]),t._v(" "),n("p",[t._v("比如创世交易首次发行。创建了一棵空的状态树（默克尔树），然后添加了第一个叶子1A，发行100个Token给小李。经过多次发行之后有8个用户的时候，状态树（默克尔树）将分三层，叶子从3A到3H保存8位用户的数据，持有不同数量的Token。这时3A的位置是小李的账号。")]),t._v(" "),n("p",[t._v("假如3A小李给3C的小王转30Token")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("3A Balance - "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),t._v("\n3C Balance + "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),t._v("\n")])])]),n("p",[t._v("橙色背景的叶子是数据修改部分，绿色背景的叶子和节点没有变化，蓝色节点是受到影响而改变的节点。将有颜色的数据和路径，以及树根作为UTXO解锁参数。在解锁过程中根据数据和路径计算树根是否正确。\n如果正确无误，解锁成功，生成新的Baton UTXO，里面保存最新的树根。")]),t._v(" "),n("p",[t._v("演示代码见："),n("a",{attrs:{href:"https://gist.github.com/zhangweis/f651b7e12acaa7171ab087888e116dc6",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://gist.github.com/zhangweis/f651b7e12acaa7171ab087888e116dc6"),n("OutboundLink")],1)]),t._v(" "),n("p",[t._v("可以做如下思考\n1， 因为每个合约Baton UTXO只有一个，如果是各个钱包分散发起转账操作，那么并发性会存在问题。\n解决办法：由合约服务器负责统一组装协调。类似BIP270，由钱包发起转账请求，交易片段发给服务器，服务器排队多个请求，顺序发送。")]),t._v(" "),n("p",[t._v("2，潜在的攻击者可以伪造Baton UTXO，复制完全一样Baton UTXO或者修改其保存的Root状态。\n解决办法：sCrypt提出的"),n("a",{attrs:{href:"https://medium.com/@xiaohuiliu/peer-to-peer-tokens-6508986d9593",target:"_blank",rel:"noopener noreferrer"}},[t._v("防止攻击的方案"),n("OutboundLink")],1),t._v(", 是一个导致解锁交易膨胀的方案，理论可行。再就是由第二层的钱包作出独立验证，因为只有一个单线的UTXO，非常容易识别伪造。")]),t._v(" "),n("p",[t._v("3，预言机（Oracle）。右侧数据不仅仅是Token，还可以是离线的任何数据。只要事先制定好规则，就可以对预言机的数据做链上验证。")]),t._v(" "),n("p",[t._v("4，数据可以在链下也可以在链上保存。适合使用metanet协议保存数据，因为metanet将所有历史记录，数据的各个状态均保存。")]),t._v(" "),n("p",[t._v("总之，这种技术基于Baton UTXO和默克尔树的技术为Bitcoin SV上的代币Token和预言机Oracle带来新的重要的技术方案。")]),t._v(" "),n("blockquote",[n("p",[t._v("享受比特币带来的安全自由， 关注使用"),n("a",{attrs:{href:"https://note.sv",target:"_blank",rel:"noopener noreferrer"}},[t._v("NoteSV"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=r.exports}}]);