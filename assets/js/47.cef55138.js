(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{585:function(e,t,o){"use strict";o.r(t);var r=o(8),n=Object(r.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("p",[e._v("::: info")]),e._v(" "),o("p",[e._v("翻译自"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#mining",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mining"),o("OutboundLink")],1),e._v("\n内容在整理，准确性请自己确认")]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("h1",{attrs:{id:"mining-采矿业"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#mining-采矿业"}},[e._v("#")]),e._v(" Mining 采矿业"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#mining",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("Mining adds new blocks to the block chain, making transaction history hard to modify.")]),e._v(" "),o("p",[e._v("挖掘向块链添加新块，使得事务历史难以修改。")]),e._v(" "),o("h2",{attrs:{id:"introduction-引言"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#introduction-引言"}},[e._v("#")]),e._v(" Introduction 引言"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#introduction",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("Mining today takes on two forms:")]),e._v(" "),o("p",[e._v("今天的采矿有两种形式:")]),e._v(" "),o("ul",[o("li",[o("p",[e._v("Solo mining, where the miner attempts to generate new blocks on his own, with the proceeds from the block reward and transaction fees going entirely to himself, allowing him to receive large payments with a higher variance (longer time between payments)")]),e._v(" "),o("p",[e._v("单独采矿(Solo mining)——这家矿商试图自己生成新的区块，区块奖励和交易费的收益全部归自己所有，这使他能够以更大的方差(两次付款之间的时间更长)获得大笔付款")])]),e._v(" "),o("li",[o("p",[e._v("Pooled mining, where the miner pools resources with other miners to find blocks more often, with the proceeds being shared among the pool miners in rough correlation to the amount of hashing power they each contributed, allowing the miner to receive small payments with a lower variance (shorter time between payments).")]),e._v(" "),o("p",[e._v("集合采矿(pooling mining) ，即矿工与其他矿工集合资源，更经常地寻找区块，收益由集合采矿商分享，大致与他们各自贡献的散热功率相关，从而使矿工获得差异较小的小额付款(付款间隔时间较短)。")])])]),e._v(" "),o("h2",{attrs:{id:"solo-mining-单独采矿"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#solo-mining-单独采矿"}},[e._v("#")]),e._v(" Solo Mining 单独采矿"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#solo-mining",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("As illustrated below, solo miners typically use "),o("code",[e._v("bitcoind")]),e._v(" to get new transactions from the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v(". Their mining software periodically polls "),o("code",[e._v("bitcoind")]),e._v(" for new transactions using the "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate” RPC"),o("OutboundLink")],1),e._v(", which provides the list of new transactions plus the public key to which the coinbase transaction should be sent.")]),e._v(" "),o("p",[e._v("如下所示，独立挖掘者通常使用 bitcoind 从网络中获取新的事务。他们的挖掘软件使用“ getblocktemplate” RPC 定期轮询 bitcoind 以寻找新的事务，这个 RPC 提供了新事务列表和 coinbase 事务应该发送到的公钥。")]),e._v(" "),o("p",[o("img",{staticClass:"lazy",attrs:{alt:"Solo Bitcoin Mining","data-src":"https://developer.bitcoin.org/_images/en-solo-mining-overview.svg",loading:"lazy"}})]),e._v(" "),o("p",[e._v("Solo Bitcoin Mining"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#id1",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("独自挖掘比特币")]),e._v(" "),o("p",[e._v("The mining software constructs a block using the template (described below) and creates a block header. It then sends the 80-byte block header to its mining hardware (an ASIC) along with a target threshold (difficulty setting). The mining hardware iterates through every possible value for the block header nonce and generates the corresponding hash.")]),e._v(" "),o("p",[e._v("挖掘软件使用模板构造一个块(下面描述)并创建一个块头。然后它将80字节的块头连同目标阈值(难度设置)一起发送到它的挖掘硬件(ASIC)。挖掘硬件循环访问块头 nonce 的每个可能值，并生成相应的散列。")]),e._v(" "),o("p",[e._v("If none of the hashes are below the threshold, the mining hardware gets an updated block header with a new merkle root from the mining software; this new block header is created by adding extra nonce data to the coinbase field of the coinbase transaction.")]),e._v(" "),o("p",[e._v("如果所有的散列都没有低于阈值，挖掘硬件就会从挖掘软件中获得一个新的 merkle 根来更新块头; 这个新的块头是通过向 coinbase 事务的 coinbase 字段添加额外的 nonce 数据来创建的。")]),e._v(" "),o("p",[e._v("On the other hand, if a hash is found below the target threshold, the mining hardware returns the block header with the successful nonce to the mining software. The mining software combines the header with the block and sends the completed block to "),o("code",[e._v("bitcoind")]),e._v(" to be broadcast to the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v(" for addition to the block chain.")]),e._v(" "),o("p",[e._v("另一方面，如果哈希值低于目标阈值，挖掘硬件将成功的 nonce 返回到挖掘软件的块头。挖掘软件将头和块组合在一起，并将完成的块发送到位内，以广播到网络中，从而加入块链。")]),e._v(" "),o("h2",{attrs:{id:"pool-mining-游泳池开采"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#pool-mining-游泳池开采"}},[e._v("#")]),e._v(" Pool Mining 游泳池开采"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#pool-mining",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("Pool miners follow a similar workflow, illustrated below, which allows mining pool operators to pay miners based on their share of the work done. The mining pool gets new transactions from the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v(" using "),o("code",[e._v("bitcoind")]),e._v(". Using one of the methods discussed later, each miner’s mining software connects to the pool and requests the information it needs to construct block headers.")]),e._v(" "),o("p",[e._v("游泳池矿工遵循类似的工作流程，如下图所示，该流程允许矿业游泳池经营者根据矿工所完成的工作份额向他们支付报酬。挖掘池使用位外壳从网络获取新的事务。使用后面讨论的方法之一，每个矿工的挖掘软件连接到池并请求构造块头所需的信息。")]),e._v(" "),o("p",[o("img",{staticClass:"lazy",attrs:{alt:"Pooled Bitcoin Mining","data-src":"https://developer.bitcoin.org/_images/en-pooled-mining-overview.svg",loading:"lazy"}})]),e._v(" "),o("p",[e._v("Pooled Bitcoin Mining"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#id2",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("比特币混合挖掘")]),e._v(" "),o("p",[e._v("In pooled mining, the mining pool sets the target threshold a few orders of magnitude higher (less difficult) than the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v(" difficulty. This causes the mining hardware to return many block headers which don’t hash to a value eligible for inclusion on the block chain but which do hash below the pool’s target, proving (on average) that the miner checked a percentage of the possible hash values.")]),e._v(" "),o("p",[e._v("在集合采矿中，采矿池设置的目标阈值比网络难度高几个数量级。这导致挖掘硬件返回许多块头，这些块头不散列为可以包含在块链中的值，但是它们做的散列低于池的目标，证明(平均) miner 检查了可能的散列值的百分比。")]),e._v(" "),o("p",[e._v("The miner then sends to the pool a copy of the information the pool needs to validate that the header will hash below the target and that the block of transactions referred to by the header merkle root field is valid for the pool’s purposes. (This usually means that the coinbase transaction must pay the pool.)")]),e._v(" "),o("p",[e._v("然后，miner 向池发送池需要的信息副本，以验证头部会在目标之下散列，并验证头部 merkle 根字段引用的事务块对于池的目的是否有效。(这通常意味着 coinbase 事务必须支付池。)")]),e._v(" "),o("p",[e._v("The information the miner sends to the pool is called a share because it proves the miner did a share of the work. By chance, some shares the pool receives will also be below the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v(" target—the mining pool sends these to the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v(" to be added to the block chain.")]),e._v(" "),o("p",[e._v("矿业公司发送给游泳池的信息被称为股份，因为它证明了矿业公司分担了一部分工作。偶然的机会，池接收到的一些共享也会低于网络目标ー挖掘池将这些共享发送给网络以添加到块链中。")]),e._v(" "),o("p",[e._v("The block reward and transaction fees that come from mining that block are paid to the mining pool. The mining pool pays out a portion of these proceeds to individual miners based on how many shares they generated. For example, if the mining pool’s target threshold is 100 times lower than the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v(" target threshold, 100 shares will need to be generated on average to create a successful block, so the mining pool can pay 1/100th of its payout for each share received. Different mining pools use different reward distribution systems based on this basic share system.")]),e._v(" "),o("p",[e._v("来自该区块开采的区块奖励和交易费用支付给采矿池。矿业公司根据每个矿工创造的股票数量，将这些收益的一部分支付给每个矿工。例如，如果采矿池的目标阈值比网络目标阈值低100倍，则平均需要生成100个股份才能创建一个成功的区块，这样采矿池就可以为收到的每份股份支付其支出的1/100。基于这种基本的共享制度，不同的矿池使用不同的报酬分配制度。")]),e._v(" "),o("h2",{attrs:{id:"block-prototypes-块原型"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#block-prototypes-块原型"}},[e._v("#")]),e._v(" Block Prototypes 块原型"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#block-prototypes",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("In both solo and pool mining, the mining software needs to get the information necessary to construct block headers. This subsection describes, in a linear way, how that information is transmitted and used. However, in actual implementations, parallel threads and queuing are used to keep ASIC hashers working at maximum capacity.")]),e._v(" "),o("p",[e._v("在独立挖掘和池挖掘中，挖掘软件都需要获得构造块头所需的信息。本节以线性的方式描述了信息是如何传输和使用的。然而，在实际的实现中，并行线程和队列被用来保持 ASIC 散列器工作在最大容量。")]),e._v(" "),o("h3",{attrs:{id:"getwork-rpc-获得工作-rpc"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#getwork-rpc-获得工作-rpc"}},[e._v("#")]),e._v(" getwork RPC 获得工作 RPC"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#getwork-rpc",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("The simplest and earliest method was the now-deprecated Bitcoin Core "),o("code",[e._v("getwork")]),e._v(" "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("RPC"),o("OutboundLink")],1),e._v(", which constructs a header for the miner directly. Since a header only contains a single 4-byte nonce good for about 4 gigahashes, many modern miners need to make dozens or hundreds of "),o("code",[e._v("getwork")]),e._v(" requests a second. Solo miners may still use "),o("code",[e._v("getwork")]),e._v(" on v0.9.5 or below, but most pools today discourage or disallow its use.")]),e._v(" "),o("p",[e._v("最简单和最早的方法是现在已经被废弃的比特币核心 getwork RPC，它直接为矿工构造一个头。由于一个 header 只包含一个4字节的 nonce，可用于大约4千兆哈希，因此许多现代开采者需要在一秒钟内提出数十甚至数百个 getwork 请求。独立开采者仍然可以在0.9.5或更低版本上使用 getwork，但是现在大多数游泳池都不鼓励或者禁止使用它。")]),e._v(" "),o("h3",{attrs:{id:"getblocktemplate-rpc-模板-rpc"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#getblocktemplate-rpc-模板-rpc"}},[e._v("#")]),e._v(" getblocktemplate RPC 模板 RPC"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#getblocktemplate-rpc",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("An improved method is the Bitcoin Core "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate” RPC"),o("OutboundLink")],1),e._v(". This provides the mining software with much more information:")]),e._v(" "),o("p",[e._v("一个改进的方法是比特币核心“ getblocktemplate” RPC，它为挖掘软件提供了更多的信息:")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("The information necessary to construct a coinbase transaction paying the pool or the solo miner’s "),o("code",[e._v("bitcoind")]),e._v(" wallet.")]),e._v(" "),o("p",[e._v("构建一个支付游泳池的硬盘交易或者单独采矿者的 bitcoind 钱包所必需的信息。")])]),e._v(" "),o("li",[o("p",[e._v("A complete dump of the transactions "),o("code",[e._v("bitcoind")]),e._v(" or the mining pool suggests including in the block, allowing the mining software to inspect the transactions, optionally add additional transactions, and optionally remove non-required transactions.")]),e._v(" "),o("p",[e._v("事务位库或采矿池的完全转储表明包括在块中，允许采矿软件检查事务，可选地添加额外的事务，并可选地删除非必需的事务。")])]),e._v(" "),o("li",[o("p",[e._v("Other information necessary to construct a block header for the next block: the block version, previous block hash, and bits (target).")]),e._v(" "),o("p",[e._v("为下一个块构造块头所必需的其他信息: 块版本、前一个块散列和位(目标)。")])]),e._v(" "),o("li",[o("p",[e._v("The mining pool’s current target threshold for accepting shares. (For solo miners, this is the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),o("OutboundLink")],1),e._v("target.)")]),e._v(" "),o("p",[e._v("矿业公司目前接受股票的目标门槛。(对于单独的矿业公司，这是网络目标。)")])])]),e._v(" "),o("p",[e._v("Using the transactions received, the mining software adds a nonce to the coinbase extra nonce field and then converts all the transactions into a merkle tree to derive a merkle root it can use in a block header. Whenever the extra nonce field needs to be changed, the mining software rebuilds the necessary parts of the merkle tree and updates the time and merkle root fields in the block header.")]),e._v(" "),o("p",[e._v("使用接收到的事务，挖掘软件将一个 nonce 添加到 coinbase extra nonce 字段，然后将所有事务转换为一个 merkle 树，从而得到一个可以在块头中使用的 merkle 根。当需要更改额外的 nonce 字段时，挖掘软件将重新构建默克尔树的必要部分，并更新块头中的时间和默克尔根字段。")]),e._v(" "),o("p",[e._v("Like all "),o("code",[e._v("bitcoind")]),e._v(" "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("RPCs"),o("OutboundLink")],1),e._v(", "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate”"),o("OutboundLink")],1),e._v(" is sent over HTTP. To ensure they get the most recent work, most miners use "),o("a",{attrs:{href:"https://en.wikipedia.org/wiki/Push_technology#Long_polling",target:"_blank",rel:"noopener noreferrer"}},[e._v("HTTP longpoll"),o("OutboundLink")],1),e._v(" to leave a "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate”"),o("OutboundLink")],1),e._v(" request open at all times. This allows the mining pool to push a new "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate”"),o("OutboundLink")],1),e._v(" to the miner as soon as any miner on the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("peer-to-peer network"),o("OutboundLink")],1),e._v(" publishes a new block or the pool wants to send more transactions to the mining software.")]),e._v(" "),o("p",[e._v("像所有 bitcoind rpc 一样，“ getblocktemplate”是通过 HTTP 发送的。为了确保获得最新的工作，大多数开矿者使用 HTTP longpoll 随时打开“ getblocktemplate”请求。这允许采矿池在 p2p 网络上的任何矿工发布新块或者采矿池希望向采矿软件发送更多事务时，向矿工推送一个新的“ getblocktemplate”。")]),e._v(" "),o("h2",{attrs:{id:"stratum-地层"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#stratum-地层"}},[e._v("#")]),e._v(" Stratum 地层"),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/mining.html#stratum",title:"Permalink to this headline",target:"_blank",rel:"noopener noreferrer"}},[o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("A widely used alternative to "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate”"),o("OutboundLink")],1),e._v(" is the "),o("a",{attrs:{href:"http://mining.bitcoin.cz/stratum-mining",target:"_blank",rel:"noopener noreferrer"}},[e._v("Stratum mining protocol"),o("OutboundLink")],1),e._v(". Stratum focuses on giving miners the minimal information they need to construct block headers on their own:")]),e._v(" "),o("p",[e._v("“ getblocktemplate”的一个广泛使用的替代方案是“ Stratum mining”协议。他们致力于给矿工提供他们自己构造块头所需的最少信息:")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("The information necessary to construct a coinbase transaction paying the pool.")]),e._v(" "),o("p",[e._v("构造支付池的硬盘事务所必需的信息。")])]),e._v(" "),o("li",[o("p",[e._v("The parts of the merkle tree which need to be re-hashed to create a new merkle root when the coinbase transaction is updated with a new extra nonce. The other parts of the merkle tree, if any, are not sent, effectively limiting the amount of data which needs to be sent to (at most) about a kilobyte at current transaction volume.")]),e._v(" "),o("p",[e._v("当使用新的 nonce 更新 coinbase 事务时，需要重新散列以创建新 merkle 根的 merkle 树部分。默克尔树的其他部分(如果有的话)没有发送，这有效地限制了在当前事务量下需要发送到(最多)大约1 kb 的数据量。")])]),e._v(" "),o("li",[o("p",[e._v("All of the other non-merkle root information necessary to construct a block header for the next block.")]),e._v(" "),o("p",[e._v("为下一个块构造块头所需的所有其他非 merkle 根信息。")])]),e._v(" "),o("li",[o("p",[e._v("The mining pool’s current target threshold for accepting shares.")]),e._v(" "),o("p",[e._v("采矿池当前接受股票的目标阈值。")])])]),e._v(" "),o("p",[e._v("Using the coinbase transaction received, the mining software adds a nonce to the coinbase extra nonce field, hashes the coinbase transaction, and adds the hash to the received parts of the merkle tree. The tree is hashed as necessary to create a merkle root, which is added to the block header information received. Whenever the extra nonce field needs to be changed, the mining software updates and re-hashes the coinbase transaction, rebuilds the merkle root, and updates the header merkle root field.")]),e._v(" "),o("p",[e._v("使用接收到的 coinbase 事务，挖掘软件将一个 nonce 添加到 coinbase extra nonce 字段，对 coinbase 事务进行散列，并将散列添加到 merkle 树的接收部分。根据需要对树进行哈希运算，以创建 merkle 根，并将其添加到所接收的块头信息中。无论何时需要更改额外的 nonce 字段，挖掘软件都会更新并重新散列 coinbase 事务，重新构建 merkle 根，并更新头部 merkle 根字段。")]),e._v(" "),o("p",[e._v("Unlike "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate”"),o("OutboundLink")],1),e._v(", miners using Stratum cannot inspect or add transactions to the block they’re currently mining. Also unlike "),o("a",{attrs:{href:"https://developer.bitcoin.org/reference/rpc/getblocktemplate.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("“getblocktemplate”"),o("OutboundLink")],1),e._v(", the Stratum protocol uses a two-way TCP socket directly, so miners don’t need to use HTTP longpoll to ensure they receive immediate updates from mining pools when a new block is broadcast to the "),o("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("peer-to-peer network"),o("OutboundLink")],1),e._v(".")]),e._v(" "),o("p",[e._v("与“ getblocktemplate”不同，使用“地层”的矿工不能检查或添加交易到他们正在开采的块。同样与“ getblocktemplate”不同的是，Stratum 协议直接使用了一个双向的 TCP 套接字，因此当一个新块广播到对等网络时，矿工不需要使用 HTTP 长波尔来确保他们从挖掘池接收即时更新。")]),e._v(" "),o("p",[o("strong",[e._v("Resources:")]),e._v(" The GPLv3 "),o("a",{attrs:{href:"https://github.com/luke-jr/bfgminer",target:"_blank",rel:"noopener noreferrer"}},[e._v("BFGMiner"),o("OutboundLink")],1),e._v(" mining software and AGPLv3 "),o("a",{attrs:{href:"https://github.com/luke-jr/eloipool",target:"_blank",rel:"noopener noreferrer"}},[e._v("Eloipool"),o("OutboundLink")],1),e._v(" mining pool software are widely-used among miners and pools. The "),o("a",{attrs:{href:"https://github.com/bitcoin/libblkmaker",target:"_blank",rel:"noopener noreferrer"}},[e._v("libblkmaker"),o("OutboundLink")],1),e._v(" C library and "),o("a",{attrs:{href:"https://gitorious.org/bitcoin/python-blkmaker",target:"_blank",rel:"noopener noreferrer"}},[e._v("python-blkmaker"),o("OutboundLink")],1),e._v(" library, both MIT licensed, can interpret GetBlockTemplate for your programs.")]),e._v(" "),o("p",[e._v("资源: GPLv3 BFGMiner 采矿软件和 AGPLv3 Eloipool 采矿池软件在矿工和采矿池中得到广泛使用。都是 MIT 许可的 libblkmaker c 库和 python-blkmaker 库可以为程序解释 GetBlockTemplate。")])])}),[],!1,null,null,null);t.default=n.exports}}]);