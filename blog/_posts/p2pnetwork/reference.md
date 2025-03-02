---
title: P2P 网络（2）技术参考
summary: 本节描述比特币 P2P 网络协议(但它不是一个规范)。它没有描述已经停止使用的 ip 到 ip 直接支付协议、不推荐使用的 BIP70支付协议、 GetBlockTemplate 挖掘协议，或者任何从未在官方版本的比特币核心中实现的网络协议
date: 2020-11-02 11:00
tags:
- 比特币
- 翻译

---

# P2P 网络技术参考

::: info

翻译自[P2P Network](https://developer.bitcoin.org/reference/p2p_networking.html)

:::

本节描述比特币 P2P 网络协议(但它不是一个规范)。它没有描述已经停止使用的 ip 到 ip 直接支付协议[IP-to-IP payment protocol](https://en.bitcoin.it/wiki/IP_Transactions), 不推荐使用的 BIP70支付协议 [BIP70 payment protocol](https://developer.bitcoin.org/glossary.html#term-Payment-protocol)、不推荐使用的 BIP70支付协议[BIP70 payment protocol](https://developer.bitcoin.org/glossary.html#term-Payment-protocol)、 GetBlockTemplate 挖掘协议[GetBlockTemplate mining protocol](https://developer.bitcoin.org/devguide/mining.html#getblocktemplate-rpc)，或者任何从未在官方版本的比特币核心中实现的网络协议。

所有对等通信都完全通过 TCP 进行。

**注意**: 除非它们的描述另有说明，否则本节中提到的所有多字节整数都是按小端顺序(little-endian order)传输的。

## 常量和默认值

下面的常量和默认值取自比特币核心的 [chainparams.cpp](https://github.com/bitcoin/bitcoin/blob/master/src/chainparams.cpp) 源代码文件。

| 网络      | 默认端口  | 开始字符串      | Max nBits   |
| ------- | ----- | ---------- | ----------- |
| Mainnet | 8333  | 0xf9beb4d9 | 0x1d00ffff  |
| Testnet | 18333 | 0x0b110907 | 0x1d00ffff  |
| Regtest | 18444 | 0xfabfb5da | 0x207ffffff |

注意: 上面的 testnet 开始字符串和 nBits 是用于 testnet3的; 原始的 testnet 使用了不同的字符串和更高(难度更小)的 nBits。

Command line parameters can change what port a node listens on (see `-help`). Start strings are hardcoded constants that appear at the start of all messages sent on the Bitcoin [network](https://developer.bitcoin.org/devguide/p2p_network.html); they may also appear in data files such as Bitcoin Core’s block database. The nBits displayed above are in big-endian order; they’re sent over the [network](https://developer.bitcoin.org/devguide/p2p_network.html) in little-endian order.

命令行参数可以更改节点监听的端口(请参阅帮助)。开始字符串是硬编码的常量，出现在比特币网络发送的所有消息的开始; 它们也可能出现在数据文件中，比如比特币核心的块数据库。上面显示的 nBits 是以 big-endian 顺序显示的; 它们以 little-endian 顺序通过网络发送。

Bitcoin Core’s [chainparams.cpp](https://github.com/bitcoin/bitcoin/blob/master/src/chainparams.cpp) also includes other constants useful to programs, such as the hash of the genesis blocks for the different networks.

比特币核心的 chainparams.cpp 还包括其他对程序有用的常量，比如不同网络的起源块散列。

## 协议版本

The table below lists some notable versions of the P2P [network](https://developer.bitcoin.org/devguide/p2p_network.html) protocol, with the most recent versions listed first. (If you know of a protocol version that implemented a major change but which is not listed here, please [open an issue](https://github.com/bitcoin-dot-org/bitcoin.org/issues).)

下表列出了 P2P 网络协议的一些著名版本，首先列出了最新版本。(如果您知道一个协议版本实现了一个重大更改，但是没有在这里列出，请打开一个问题。)

As of Bitcoin Core 0.18.0, the most recent protocol version is 70015.

在比特币核心0.18.0中，最新的协议版本是70015。

| 版本    | 首次发布                                                                                                                 | 主要改变                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 70015 | [Bitcoin Core 0.13.2](https://bitcoin.org/en/release/v0.13.2) (Jan 2017)                                             | - New banning behavior for invalid compact blocks [#9026](https://github.com/bitcoin/bitcoin/pull/9026) in v0.14.0, Backported to v0.13.2 in [#9048](https://github.com/bitcoin/bitcoin/pull/9048).新的禁止行为无效的紧凑块 # 9026在0.14.0，回移植到0.13.2在 # 9048。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 70014 | [Bitcoin Core 0.13.0](https://bitcoin.org/en/release/v0.13.0) (Aug 2016)                                             | [BIP152](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki): • Added `sendcmpct`, `cmpctblock`, `getblocktxn`, [`blocktxn` messages](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn) • Added [“MSG_CMPCT_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-cmpct-block) inventory type to [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata).152: •添加 sendcmpct，cmpctblock，getblocktxn，`blocktxn`消息•添加“ MSG _ cmpct _ block”目录类型到`getdata`消息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 70013 | [Bitcoin Core 0.13.0](https://bitcoin.org/en/release/v0.13.0) (Aug 2016)                                             | [BIP133](https://github.com/bitcoin/bips/blob/master/bip-0133.mediawiki): • Added [`feefilter` message](https://developer.bitcoin.org/reference/p2p_networking.html#feefilter). • Removed [`alert` message](https://developer.bitcoin.org/reference/p2p_networking.html#alert) system. See [Alert System Retirement](https://bitcoin.org/en/alert/2016-11-01-alert-retirement)BIP133: •添加`feefilter`消息•删除`alert`消息系统                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 70012 | [Bitcoin Core 0.12.0](https://bitcoin.org/en/release/v0.12.0) (Feb 2016)                                             | [BIP130](https://github.com/bitcoin/bips/blob/master/bip-0130.mediawiki): • Added [`sendheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#sendheaders).130: •添加`sendheaders`消息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 70011 | [Bitcoin Core 0.12.0](https://bitcoin.org/en/release/v0.12.0) (Feb 2016)                                             | [BIP111](https://github.com/bitcoin/bips/blob/master/bip-0111.mediawiki): • `filter*` messages are disabled without NODE_BLOOM after and including this version.111: •过滤器 * 消息被禁用后没有节点 bloom，并包括这个版本。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 70002 | [Bitcoin Core 0.9.0](https://bitcoin.org/en/release/v0.9.0) (Mar 2014)                                               | - Send multiple [`inv` messages](https://developer.bitcoin.org/reference/p2p_networking.html#inv) in response to a [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool) if necessary [BIP61](https://github.com/bitcoin/bips/blob/master/bip-0061.mediawiki): • Added [“reject” message](https://developer.bitcoin.org/reference/p2p_networking.html#reject)发送多个`inv`消息来响应一个`mempool`消息(如果必要的话) BIP61: •添加“拒绝”消息                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 70001 | [Bitcoin Core 0.8.0](https://bitcoin.org/en/release/v0.8.0) (Feb 2013)                                               | - Added [`notfound` message](https://developer.bitcoin.org/reference/p2p_networking.html#notfound). [BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki): • Added [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload). • Added [`filteradd` message](https://developer.bitcoin.org/reference/p2p_networking.html#filteradd). • Added [`filterclear` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterclear). • Added [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock). • Added relay field to [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version) • Added [“MSG_FILTERED_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block) inventory type to [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata).添加了“未找到”信息。BIP37: •添加“过滤加载”信息。•添加了`filteradd`信息。•添加了“过滤/清除”信息。•添加了`merkleblock`信息。•在`version`消息中添加中继字段•在`getdata`消息中添加“ MSG _ filtered _ block”库存类型。 |
| 60002 | [Bitcoin Core 0.7.0](https://bitcoin.org/en/release/v0.7.0) (Sep 2012)                                               | [BIP35](https://github.com/bitcoin/bips/blob/master/bip-0035.mediawiki): • Added [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool). • Extended [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) to allow download of memory pool transactionsBIP35: •添加了`mempool`消息•扩展的`getdata`消息允许下载内存池事务                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 60001 | [Bitcoin Core 0.6.1](https://bitcoin.org/en/release/v0.6.1) (May 2012)                                               | [BIP31](https://github.com/bitcoin/bips/blob/master/bip-0031.mediawiki): • Added nonce field to [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) • Added [`pong` message](https://developer.bitcoin.org/reference/p2p_networking.html#pong)BIP31: •在`ping`消息中添加 nonce 字段•添加`pong`消息                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 60000 | [Bitcoin Core 0.6.0](https://bitcoin.org/en/release/v0.6.0) (Mar 2012)                                               | [BIP14](https://github.com/bitcoin/bips/blob/master/bip-0014.mediawiki): • Separated protocol version from Bitcoin Core version14: •从比特币核心版本中分离出协议版本                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 31800 | [Bitcoin Core 0.3.18](https://github.com/bitcoin/bitcoin/commit/82201801336f64ee77851b9eaab9383ee4e442f0) (Dec 2010) | - Added [`getheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#getheaders) and [`headers` message](https://developer.bitcoin.org/reference/p2p_networking.html#headers).增加了`getheaders`的消息和“头”的消息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 31402 | [Bitcoin Core 0.3.15](https://github.com/bitcoin/bitcoin/commit/c891967b6fcab2e8dc4ce0c787312b36c07efa4d) (Oct 2010) | - Added time field to [`addr` message](https://developer.bitcoin.org/reference/p2p_networking.html#addr).添加时间字段到`addr`消息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 311   | [Bitcoin Core 0.3.11](https://github.com/bitcoin/bitcoin/commit/343328c6b8db85e58a1feea85f0d10e62967fa19) (Aug 2010) | - Added [`alert` message](https://developer.bitcoin.org/reference/p2p_networking.html#alert).增加了“警报”信息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 209   | [Bitcoin Core 0.2.9](https://github.com/bitcoin/bitcoin/commit/42605ce8bcc9bd01b86491c74fee14de77960868) (May 2010)  | - Added checksum field to message headers, added [`verack` message](https://developer.bitcoin.org/reference/p2p_networking.html#verack), and added starting height field to [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version).向消息标题添加校验和字段，添加`verack`消息，并向`version`消息添加起始高度字段。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 106   | [Bitcoin Core 0.1.6](https://github.com/bitcoin/bitcoin/commit/cc0b4c3b62367a2aebe5fc1f4d0ed4b97e9c2ac9) (Oct 2009)  | - Added transmitter IP address fields, nonce, and User Agent (subVer) to [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version).增加了发射机 IP 地址字段，nonce，和用户代理(subVer)的“版本”消息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## 消息头

All messages in the [network](https://developer.bitcoin.org/devguide/p2p_network.html) protocol use the same container format, which provides a required multi-field message header and an optional payload. The message header format is:

网络协议中的所有消息使用相同的容器格式，它提供了所需的多字段消息头和可选的有效负载。消息头格式如下:

| 字节  | Name姓名       | Data Type | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --- | ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4   | start string | char[4]   | Magic bytes indicating the originating [network](https://developer.bitcoin.org/devguide/p2p_network.html); used to seek to next message when stream state is unknown.指示原始网络的神奇字节; 用于在流状态未知时寻找下一条消息。                                                                                                                                                                                                                                                                                                         |
| 12  | command name | char[12]  | ASCII string which identifies what message type is contained in the payload. Followed by nulls (0x00) to pad out byte count; for example: `version\0\0\0\0\0`.ASCII 字符串，标识有效负载中包含的消息类型。后面跟着 nulls (0x00)来填充字节计数; 例如: version 000000。                                                                                                                                                                                                                                                                        |
| 4   | payload size | uint32    | Number of bytes in payload. The current maximum number of bytes ([“MAX_SIZE”](https://github.com/bitcoin/bitcoin/blob/60abd463ac2eaa8bc1d616d8c07880dc53d97211/src/serialize.h#L23)) allowed in the payload by Bitcoin Core is 32 MiB—messages with a payload size larger than this will be dropped or rejected.有效载荷中的字节数。目前，比特币核心的有效载荷允许的最大字节数(“ MAX _ size”)为32 mib ーー有效载荷大于此的消息将被删除或拒绝。                                                                                                                  |
| 4   | checksum     | char[4]   | *Added in*[protocol version 209](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* First 4 bytes of SHA256(SHA256(payload)) in internal byte order. If payload is empty, as in `verack` and [`getaddr` messages](https://developer.bitcoin.org/reference/p2p_networking.html#getaddr), the checksum is always 0x5df6e0e2 (SHA256(SHA256())).增加了协议版本209。以内部字节顺序排列的 SHA256(SHA256(有效负载))的前4个字节。如果有效负载为空，就像在 verack 和`getaddr`消息中一样，校验和总是为0x5df6e0e2(SHA256(SHA256(< 空字符串 >))。 |

The following example is an annotated hex dump of a mainnet message header from a [`verack` message](https://developer.bitcoin.org/reference/p2p_networking.html#verack) which has no payload.

下面的示例是一个带注释的十六进制转储，它来自一个没有任何负载的`verack`消息，其中包含一个 mainnet 消息头。

f9beb4d9 ................... Start string: Mainnet
76657261636b000000000000 ... Command name: verack + null padding
00000000 ................... Byte count: 0
5df6e0e2 ................... Checksum: SHA256(SHA256())

## 数据信息

The following [network](https://developer.bitcoin.org/devguide/p2p_network.html) messages all request or provide data related to transactions and blocks.

以下网络消息都请求或提供与事务和块相关的数据。

![Overview Of P2P Protocol Data Request And Reply Messages](https://developer.bitcoin.org/_images/en-p2p-data-messages.svg)

Overview Of P2P Protocol Data Request And Reply Messages[](https://developer.bitcoin.org/reference/p2p_networking.html#id1 "Permalink to this image")

P2P 协议数据请求和应答消息概述

Many of the data messages use [inventories](https://developer.bitcoin.org/glossary.html#term-Inventory) as unique identifiers for transactions and blocks. Inventories have a simple 36-byte structure:

许多数据信息使用存货作为交易和存货的唯一标识符。存货有一个简单的36字节结构:

| Bytes字节 | Name姓名          | Data Type数据类型 | Description描述                                                                                   |
| ------- | --------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| 4       | type identifier | uint32        | The type of object which was hashed. See list of type identifiers below.被散列的对象类型。请参阅下面的类型标识符列表。 |
| 32      | hash            | char[32]      | SHA256(SHA256()) hash of the object in internal byte order.对象的内部字节顺序 SHA256(SHA256())哈希。        |

The currently-available type identifiers are:

目前可用的类型标识符是:

| 类型标识符 | Name                                                                                                     | Description描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | [“MSG_TX”](https://developer.bitcoin.org/terms.html#term-msg-tx)                                         | The hash is a TXID.散列是一个 TXID。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2     | [“MSG_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block)                                   | The hash is of a block header.散列是块头的。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 3     | [“MSG_FILTERED_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block)                          | The hash is of a block header; identical to [“MSG_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block). When used in a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata), this indicates the response should be a [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) rather than a [`block` message](https://developer.bitcoin.org/reference/p2p_networking.html#block) (but this only works if a bloom filter was previously configured). **Only for use in**[`getdata` messages](https://developer.bitcoin.org/reference/p2p_networking.html#getdata)**.**散列是块头的; 与“ MSG _ block”相同。当在`getdata`消息中使用时，这表明响应应该是`merkleblock`消息，而不是`block`消息(但这只适用于以前配置 bloom 过滤器的情况)。仅用于“`getdata`息。 |
| 4     | [“MSG_CMPCT_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-cmpct-block)                       | The hash is of a block header; identical to [“MSG_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block). When used in a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata), this indicates the response should be a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock). **Only for use in**[`getdata` messages](https://developer.bitcoin.org/reference/p2p_networking.html#getdata)**.**散列是块头的; 与“ MSG _ block”相同。在`getdata`消息中使用时，这表示响应应该是`cmpctblock`消息。仅用于“`getdata`息。                                                                                                                                                                                                                |
| 1†    | [“MSG_WITNESS_TX”](https://developer.bitcoin.org/terms.html#term-msg-witness-tx)                         | The hash is a TXID. When used in a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata), this indicates the response should be a transaction message, if the witness structure is nonempty, the witness serialization will be used. **Only for use in**[`getdata` messages](https://developer.bitcoin.org/reference/p2p_networking.html#getdata)**.**散列是一个 TXID。在`getdata`消息中使用时，这表明响应应该是一个事务消息，如果见证结构非空，则将使用见证序列化。仅用于“`getdata`息。                                                                                                                                                                                                                                                                                                                 |
| 2†    | [“MSG_WITNESS_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-witness-block)                   | The hash is of a block header; identical to [“MSG_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block). When used in a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata), this indicates the response should be a block message with transactions that have a witness using witness serialization. **Only for use in**[`getdata` messages](https://developer.bitcoin.org/reference/p2p_networking.html#getdata)**.**散列是块头的; 与“ MSG _ block”相同。当在`getdata`消息中使用时，这表明响应应该是一个块消息，其中包含使用见证序列化的具有见证的事务。仅用于“`getdata`息。                                                                                                                                                                                                                   |
| 3†    | [“MSG_FILTERED_WITNESS_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-filtered-witness-block) | Reserved for future use, not used as of [Protocol Version 70015](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions).保留供将来使用，不作为协议版本70015使用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

† These are the same as their respective type identifier but with their 30th bit set to indicate witness. For example MSG_WITNESS_TX = 0x01000040.

†这些数字与它们各自的类型标识符相同，但第30位设置为表示见证人。0x01000040.

Type identifier zero and type identifiers greater than seven are reserved for future implementations. Bitcoin Core ignores all inventories with one of these unknown types.

类型标识符0和大于7的类型标识符被保留用于未来的实现。比特币核心忽略所有库存与这些未知类型之一。

### Block

The [`block` message](https://developer.bitcoin.org/reference/p2p_networking.html#block) transmits a single serialized block in the format described in the [serialized blocks section](https://developer.bitcoin.org/reference/block_chain.html#serialized-blocks). See that section for an example hexdump. It can be sent for two different reasons:

`block`消息按照序列化块部分中描述的格式传输单个序列化块。查看该部分的示例 hexdump。它可以由两个不同的原因发送:

1. **GetData Response:** Nodes will always send it in response to a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) that requests the block with an inventory type of [“MSG_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block) (provided the node has that block available for relay).
   
   GetData Response: 节点总是发送它来响应`getdata`消息，该消息请求带有“ MSG _ block”目录类型的块(只要节点有可用于中继的块)。

2. **Unsolicited:** Some miners will send unsolicited [`block` messages](https://developer.bitcoin.org/reference/p2p_networking.html#block) broadcasting their newly-mined blocks to all of their peers. Many mining pools do the same thing, although some may be misconfigured to send the block from multiple nodes, possibly sending the same block to some peers more than once.
   
   主动提供的: 一些矿工将主动向所有同行发送“封锁”信息，广播他们新开采的矿石。许多挖掘池做同样的事情，尽管有些可能配置错误，从多个节点发送块，可能多次将同一块发送给一些对等点。

### GetBlocks

The [`getblocks` message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocks) requests an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) that provides block header hashes starting from a particular point in the block chain. It allows a peer which has been disconnected or started for the first time to get the data it needs to request the blocks it hasn’t seen.

`getblocks`消息请求一个`inv`消息，该消息提供从块链中的特定点开始的块头散列。它允许已断开连接或第一次启动的对等点获取它需要的数据，以请求它没有看到的块。

Peers which have been disconnected may have stale blocks in their locally-stored block chain, so the [`getblocks` message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocks) allows the requesting peer to provide the receiving peer with multiple header hashes at various heights on their local chain. This allows the receiving peer to find, within that list, the last header hash they had in common and reply with all subsequent header hashes.

已断开连接的对等点在其本地存储的块链中可能有陈旧的块，因此`getblocks`消息允许请求对等点在其本地链上的不同高度向接收对等点提供多个头散列。这允许接收端在该列表中查找它们共有的最后一个头散列，并用所有后续头散列回复。

Note: the receiving peer itself may respond with an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) containing header hashes of stale blocks. It is up to the requesting peer to poll all of its peers to find the best block chain.

注意: 接收端本身可能会响应一个`inv`消息，其中包含陈旧块的头散列。这取决于要求对等点调查其所有的对等点，以找到最好的块链。

If the receiving peer does not find a common header hash within the list, it will assume the last common block was the genesis block (block zero), so it will reply with in [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) containing header hashes starting with block one (the first block after the genesis block).

如果接收端没有在列表中找到一个公共头哈希，它将假定最后一个公共块是 genesis 块(block zero) ，因此它将在`inv`消息中回复包含头哈希的消息，从 block 1开始(genesis 块后的第一个块)。

| Bytes    | Name                | Data Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------- | ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4        | version             | uint32           | The protocol version number; the same as sent in the [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version).协议版本号; 与“版本”消息中发送的相同。                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| *Varies* | hash count          | compactSize uint | The number of header hashes provided not including the stop hash. There is no limit except that the byte size of the entire message must be below the [“MAX_SIZE”](https://github.com/bitcoin/bitcoin/blob/60abd463ac2eaa8bc1d616d8c07880dc53d97211/src/serialize.h#L23) limit; typically from 1 to 200 hashes are sent.提供的标题散列数不包括停止散列。除了整个消息的字节大小必须低于“ max_size”限制外，没有其他限制; 通常发送1到200个散列。                                                                                                                                                                                                                                              |
| *Varies* | block header hashes | char[32]         | One or more block header hashes (32 bytes each) in internal byte order. Hashes should be provided in reverse order of block height, so highest-height hashes are listed first and lowest-height hashes are listed last.按内部字节顺序排列的一个或多个块头散列(每个32字节)。散列应该按照块高度的相反顺序提供，因此最高高度的散列列在前，最低高度的散列列在后。                                                                                                                                                                                                                                                                                                                                             |
| 32       | stop hash           | char[32]         | The header hash of the last header hash being requested; set to all zeroes to request an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) with all subsequent header hashes (a maximum of 500 will be sent as a reply to this message; if you need more than 500, you will need to send another [`getblocks` message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocks) with a higher-height header hash as the first entry in block header hash field).请求的最后一个头哈希的头哈希; 将所有零设置为请求包含所有后续头哈希的`inv`消息(最多500将作为对此消息的回复发送; 如果需要超过500个头哈希，则需要发送另一个`getblocks`消息，高度较高的头哈希作为块头哈希字段中的第一个条目)。 |

The following annotated hexdump shows a [`getblocks` message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocks). (The message header has been omitted.)

下面带注释的 hexdump 显示了一条`getblocks`消息(消息头被省略了。)

71110100 ........................... Protocol version: 70001
02 ................................. Hash count: 2
d39f608a7775b537729884d4e6633bb2
105e55a16a14d31b0000000000000000 ... Hash #1
5c3e6403d40837110a2e8afb602b1c01
714bda7ce23bea0a0000000000000000 ... Hash #2
00000000000000000000000000000000
00000000000000000000000000000000 ... Stop hash

### GetData

The [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) requests one or more data objects from another node. The objects are requested by an inventory, which the requesting node typically received previously by way of an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv).

`getdata`消息从另一个节点请求一个或多个数据对象。对象由库存请求，请求节点通常以前通过`inv`消息的方式接收该库存。

The response to a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) can be a [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx), [`block` message](https://developer.bitcoin.org/reference/p2p_networking.html#block), [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock), [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock), or [`notfound` message](https://developer.bitcoin.org/reference/p2p_networking.html#notfound).

对`getdata`消息的响应可以是`tx`消息、`block`消息、`merkleblock`消息、`cmpctblock`消息或`notfound`消息。

This message cannot be used to request arbitrary data, such as historic transactions no longer in the memory pool or relay set. Full nodes may not even be able to provide older blocks if they’ve pruned old transactions from their block database. For this reason, the [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) should usually only be used to request data from a node which previously advertised it had that data by sending an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv).

此消息不能用于请求任意数据，例如不再位于内存池或中继集中的历史事务。如果完整的节点已经从它们的块数据库中删除了旧的事务，那么它们甚至不能提供旧的块。出于这个原因，`getdata`消息通常应该只用于从以前通过发送`inv`消息宣布拥有该数据的节点请求数据。

The format and maximum size limitations of the [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) are identical to the [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv); only the message header differs.

`getdata`消息的格式和最大大小限制与`inv`消息相同; 只是消息头不同。

### GetHeaders

*Added in*[protocol version 31800](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.*

增加了协议版本31800。

The [`getheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#getheaders) requests a [`headers` message](https://developer.bitcoin.org/reference/p2p_networking.html#headers) that provides block headers starting from a particular point in the block chain. It allows a peer which has been disconnected or started for the first time to get the headers it hasn’t seen yet.

`getheaders`信息请求一个“头”信息，提供从块链的特定点开始的块头。它允许已断开连接或第一次启动的对等点获取它还没有看到的报头。

The [`getheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#getheaders) is nearly identical to the [`getblocks` message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocks), with one minor difference: the `inv`reply to the [`getblocks` message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocks) will include no more than 500 block header hashes; the `headers` reply to the [`getheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#getheaders) will include as many as 2,000 block headers.

`getheaders`消息与`getblocks`消息几乎完全相同，只有一个小小的区别: 对“`getblocks`息的 inv 回复将不超过500个块头散列; 对“`getheaders`息的标题回复将包括多达2000个块头。

### Headers

*Added in*[protocol version 31800](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.*

增加了协议版本31800。

The [`headers` message](https://developer.bitcoin.org/reference/p2p_networking.html#headers) sends block headers to a node which previously requested certain headers with a [`getheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#getheaders). A headers message can be empty.

“ header”消息向先前请求某些 header 的节点发送块 header，并附带`getheaders`消息。标题消息可以是空的。

| Bytes字节    | Name姓名   | Data Type数据类型         | Description描述                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Varies*不同 | count计数  | compactSize uint紧凑型尺寸 | Number of block headers up to a maximum of 2,000. Note: headers-first sync assumes the sending node will send the maximum number of headers whenever possible.最多为2,000的块标题数。注意: 头部优先同步假设发送节点将尽可能多地发送头部。                                                                                                                                                                                                                                           |
| *Varies*不同 | headers头 | block_header块头        | Block headers: each 80-byte block header is in the format described in the [block headers section](https://developer.bitcoin.org/reference/block_chain.html#block-headers) with an additional 0x00 suffixed. This 0x00 is called the transaction count, but because the headers message doesn’t include any transactions, the transaction count is always zero.块标题: 每个80字节的块标题都是块标题部分中描述的格式，并带有额外的0x00后缀。这个0x00被称为事务计数，但是因为消息头不包含任何事务，所以事务计数总是为零。 |

The following annotated hexdump shows a [`headers` message](https://developer.bitcoin.org/reference/p2p_networking.html#headers). (The message header has been omitted.)

下面带注释的 hexdump 显示了一个“ header”消息(消息头被省略了。)

01 ................................. Header count: 1
02000000 ........................... Block version: 2
b6ff0b1b1680a2862a30ca44d346d9e8
910d334beb48ca0c0000000000000000 ... Hash of previous block's header
9d10aa52ee949386ca9385695f04ede2
70dda20810decd12bc9b048aaab31471 ... Merkle root
24d95a54 ........................... [Unix time][unix epoch time]: 1415239972
30c31b18 ........................... Target (bits)
fe9f0864 ........................... Nonce
00 ................................. Transaction count (0x00)

### Inv

The [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) (inventory message) transmits one or more inventories of objects known to the transmitting peer. It can be sent unsolicited to announce new transactions or blocks, or it can be sent in reply to a [`getblocks` message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocks) or [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool).

`inv`消息(库存消息)传输发送端已知的一个或多个对象库存。它可以被主动发送来宣布新的交易或块，或者它可以被发送来回复`getblocks`消息或`mempool`消息。

The receiving peer can compare the inventories from an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) against the inventories it has already seen, and then use a follow-up message to request unseen objects.

接收方可以将来自`inv`消息的库存与它已经看到的库存进行比较，然后使用后续消息请求未看到的对象。

| Bytes字节    | Name姓名      | Data Type数据类型         | Description描述                                                                          |
| ---------- | ----------- | --------------------- | -------------------------------------------------------------------------------------- |
| *Varies*不同 | count计数     | compactSize uint紧凑型尺寸 | The number of inventory entries.存货记录的数量。                                               |
| *Varies*不同 | inventory存货 | inventory存货           | One or more inventory entries up to a maximum of 50,000 entries.一项或多项最多可达50,000项的存货记录。 |

The following annotated hexdump shows an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) with two inventory entries. (The message header has been omitted.)

下面带注释的 hexdump 显示了一个带有两个库存条目的`inv`消息(消息头被省略了。)

02 ................................. Count: 2
01000000 ........................... Type: MSG_TX
de55ffd709ac1f5dc509a0925d0b1fc4
42ca034f224732e429081da1b621f55a ... Hash (TXID)
01000000 ........................... Type: MSG_TX
91d36d997037e08018262978766f24b8
a055aaf1d872e94ae85e9817b2c68dc7 ... Hash (TXID)

### MemPool

*Added in*[protocol version 60002](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.*

在协议版本60002中添加。

The [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool) requests the TXIDs of transactions that the receiving node has verified as valid but which have not yet appeared in a block. That is, transactions which are in the receiving node’s memory pool. The response to the [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool) is one or more [`inv` messages](https://developer.bitcoin.org/reference/p2p_networking.html#inv) containing the TXIDs in the usual inventory format.

`mempool`消息请求接收节点已验证为有效但尚未出现在块中的事务的 txid。也就是说，处于接收节点内存池中的事务。对“`mempool`息的响应是一个或多个`inv`消息，其中以通常的库存格式包含 txid。

Sending the [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool) is mostly useful when a program first connects to the [network](https://developer.bitcoin.org/devguide/p2p_network.html). Full nodes can use it to quickly gather most or all of the unconfirmed transactions available on the [network](https://developer.bitcoin.org/devguide/p2p_network.html); this is especially useful for miners trying to gather transactions for their transaction fees. SPV clients can set a filter before sending a `mempool` to only receive transactions that match that filter; this allows a recently-started client to get most or all unconfirmed transactions related to its wallet.

当程序第一次连接到网络时，发送`mempool`消息是最有用的。完整的节点可以使用它快速收集网络上大部分或全部可用的未经证实的交易; 这对于试图收集交易以获取交易费的矿工特别有用。SPV 客户机可以在发送记忆池之前设置一个过滤器，以便只接收匹配该过滤器的事务; 这允许最近启动的客户机获取与其钱包相关的大部分或所有未确认的事务。

The `inv` response to the [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool) is, at best, one node’s view of the [network](https://developer.bitcoin.org/devguide/p2p_network.html)—not a complete list of unconfirmed transactions on the [network](https://developer.bitcoin.org/devguide/p2p_network.html). Here are some additional reasons the list might not be complete:

对`mempool`消息的 inv 响应充其量只是一个节点对网络的看法ーー不是网络上未经证实的事务的完整列表。下面是一些其他原因，列表可能不完整:

- Before [Bitcoin Core 0.9.0](https://bitcoin.org/en/release/v0.9.0), the response to the [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool) was only one [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv). An [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv) is limited to 50,000 inventories, so a node with a memory pool larger than 50,000 entries would not send everything. Later versions of Bitcoin Core send as many [`inv` messages](https://developer.bitcoin.org/reference/p2p_networking.html#inv) as needed to reference its complete memory pool.
  
  在比特币核心0.9.0之前，对`mempool`消息的响应只有一条`inv`消息。“`inv`息限于5万个库存，因此内存池大于5万个条目的节点不会发送所有内容。后来的比特币核心版本根据需要发送尽可能多的“ `inv`，以引用其完整的内存池。

- The [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool) is not currently fully compatible with the [`filterload` message’s](https://developer.bitcoin.org/reference/p2p_networking.html#filterload)`BLOOM_UPDATE_ALL` and `BLOOM_UPDATE_P2PUBKEY_ONLY` flags. Mempool transactions are not sorted like in-block transactions, so a transaction (tx2) spending an output can appear before the transaction (tx1) containing that output, which means the automatic filter update mechanism won’t operate until the second-appearing transaction (tx1) is seen—missing the first-appearing transaction (tx2). It has been proposed in [Bitcoin Core issue #2381](https://github.com/bitcoin/bitcoin/issues/2381) that the transactions should be sorted before being processed by the filter.
  
  `mempool`消息目前与`filterload`消息的 BLOOM _ update _ all 和 BLOOM _ update _ p2pubkey _ only 标志不完全兼容。Mempool 事务不像块内事务那样进行排序，因此消耗输出的事务(tx2)可以出现在包含该输出的事务(tx1)之前，这意味着自动过滤器更新机制在第二个出现的事务(tx1)被发现丢失了第一个出现的事务(tx2)之前不会运行。比特币核心 # 2381中提出，交易在被过滤器处理之前应该被分类。

There is no payload in a [`mempool` message](https://developer.bitcoin.org/reference/p2p_networking.html#mempool). See the [message header section](https://developer.bitcoin.org/reference/p2p_networking.html#message-headers) for an example of a message without a payload.

在`mempool`消息中没有有效负载。有关无负载消息的示例，请参见消息头部分。

### MerkleBlock

*Added in*[protocol version 70001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)*.*

增加了协议版本70001，如 bip37所描述。

The [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) is a reply to a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) which requested a block using the inventory type `MSG_MERKLEBLOCK`. It is only part of the reply: if any matching transactions are found, they will be sent separately as [`tx` messages](https://developer.bitcoin.org/reference/p2p_networking.html#tx).

`merkleblock`消息是对使用目录类型 MSG _ merkleblock 请求块的`getdata`消息的答复。这只是回复的一部分: 如果找到任何匹配的事务，它们将作为`tx`消息单独发送。

If a filter has been previously set with the [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload), the [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) will contain the TXIDs of any transactions in the requested block that matched the filter, as well as any parts of the block’s merkle tree necessary to connect those transactions to the block header’s merkle root. The message also contains a complete copy of the block header to allow the client to hash it and confirm its proof of work.

如果以前用`filterload`消息设置过滤器，那么`merkleblock`消息将包含所请求块中匹配过滤器的任何事务的 txid，以及块的 merkle 树中将这些事务连接到块头的 merkle 根所必需的任何部分。该消息还包含块标头的完整副本，以便客户机对其进行散列并确认其工作证明。

| Bytes字节    | Name姓名                | Data Type数据类型         | Description描述                                                                                                                                                                                                                                                                                                                                |
| ---------- | --------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 80         | block header集箱        | block_header块头        | The block header in the format described in the [block header section](https://developer.bitcoin.org/reference/block_chain.html#block-headers).块头部分中描述的格式的块头。                                                                                                                                                                                |
| 4图4        | transaction count交易计数 | uint32_t32t           | The number of transactions in the block (including ones that don’t match the filter).块中的事务数(包括不匹配过滤器的事务)。                                                                                                                                                                                                                                    |
| *Varies*不同 | hash count杂凑计数        | compactSize uint紧凑型尺寸 | The number of hashes in the following field.下列字段中的散列数。                                                                                                                                                                                                                                                                                       |
| *Varies*不同 | hashes散列              | char[32][32]          | One or more hashes of both transactions and merkle nodes in internal byte order. Each hash is 32 bytes.事务和 merkle 节点按内部字节顺序排列的一个或多个散列，每个散列为32字节。                                                                                                                                                                                             |
| *Varies*不同 | flag byte count标志字节计数 | compactSize uint紧凑型尺寸 | The number of flag bytes in the following field.下列字段中的标志字节数。                                                                                                                                                                                                                                                                                 |
| *Varies*不同 | flags旗帜               | byte[]字节[]            | A sequence of bits packed eight in a byte with the least significant bit first. May be padded to the nearest byte boundary but must not contain any more bits than that. Used to assign the hashes to particular nodes in the merkle tree as described below.一个位序列在一个字节中包含了八个位，首先是最低有效位。可以填充到最近的字节边界，但不能包含超过该边界的任何位。用于将散列分配给默克尔树中的特定节点，如下所述。 |

The annotated hexdump below shows a [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) which corresponds to the examples below. (The message header has been omitted.)

下面带注释的 hexdump 显示了一个`merkleblock`消息，它对应于下面的示例(消息头被省略了。)

01000000 ........................... Block version: 1
82bb869cf3a793432a66e826e05a6fc3
7469f8efb7421dc88067010000000000 ... Hash of previous block's header
7f16c5962e8bd963659c793ce370d95f
093bc7e367117b3c30c1f8fdd0d97287 ... Merkle root
76381b4d ........................... Time: 1293629558
4c86041b ........................... nBits: 0x04864c * 256**(0x1b-3)
554b8529 ........................... Nonce
07000000 ........................... Transaction count: 7
04 ................................. Hash count: 4
3612262624047ee87660be1a707519a4
43b1c1ce3d248cbfc6c15870f6c5daa2 ... Hash #1
019f5b01d4195ecbc9398fbf3c3b1fa9
bb3183301d7a1fb3bd174fcfa40a2b65 ... Hash #2
41ed70551dd7e841883ab8f0b16bf041
76b7d1480e4f0af9f3d4c3595768d068 ... Hash #3
20d2a7bc994987302e5b1ac80fc425fe
25f8b63169ea78e68fbaaefa59379bbf ... Hash #4
01 ................................. Flag bytes: 1
1d ................................. Flags: 1 0 1 1 1 0 0 0

Note: when fully decoded, the above [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) provided the TXID for a single transaction that matched the filter. In the [network](https://developer.bitcoin.org/devguide/p2p_network.html) traffic dump this output was taken from, the full transaction belonging to that TXID was sent immediately after the [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) as a [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx).

注意: 完全解码后，上面的`merkleblock`消息为匹配过滤器的单个事务提供了 TXID。在网络通信转储中，这个输出是从`tx`消息中获取的，属于这个 TXID 的完整事务是在“`merkleblock`息之后立即发送的。

#### Parsing A MerkleBlock Message

As seen in the annotated hexdump above, the [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) provides three special data types: a transaction count, a list of hashes, and a list of one-bit flags.

如上面带注释的 hexdump 所示，`merkleblock`消息提供了三种特殊的数据类型: 事务计数、散列列表和一位标志列表。

You can use the transaction count to construct an empty merkle tree. We’ll call each entry in the tree a node; on the bottom are TXID nodes—the hashes for these nodes are TXIDs; the remaining nodes (including the merkle root) are non-TXID nodes—they may actually have the same hash as a TXID, but we treat them differently.

您可以使用事务计数来构造一个空的 merkle 树。我们将树中的每个条目称为一个节点; 底部是 TXID 节点ー这些节点的散列是 TXID; 其余的节点(包括 merkle 根)是非 TXID 节点ー它们实际上可能拥有与 TXID 相同的散列，但我们对它们的处理不同。

![Example Of Parsing A MerkleBlock Message](https://developer.bitcoin.org/_images/animated-en-merkleblock-parsing.gif)

Example Of Parsing A MerkleBlock Message[](https://developer.bitcoin.org/reference/p2p_networking.html#id2 "Permalink to this image")

解析 MerkleBlock 消息的示例

Keep the hashes and flags in the order they appear in the [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock). When we say “next flag” or “next hash”, we mean the next flag or hash on the list, even if it’s the first one we’ve used so far.

将散列和标志保持在`merkleblock`消息中出现的顺序。当我们说“下一个标志”或“下一个散列”时，我们指的是列表上的下一个标志或散列，即使它是我们迄今为止使用的第一个。

Start with the merkle root node and the first flag. The table below describes how to evaluate a flag based on whether the node being processed is a TXID node or a non-TXID node. Once you apply a flag to a node, never apply another flag to that same node or reuse that same flag again.

从 merkle 根节点和第一个标志开始。下表描述了如何根据正在处理的节点是 TXID 节点还是非 TXID 节点来计算标志。将标志应用于节点后，不要将另一个标志应用于同一个节点，或者再次使用同一个标志。

| Flag国旗 | TXID NodeTXID 节点                                                                                                          | Non-TXID Node非 txid 节点                                                                                                                                                                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0**  | Use the next hash as this node’s TXID, but this transaction didn’t match the filter.使用下一个散列作为此节点的 TXID，但此事务与筛选器不匹配。       | Use the next hash as this node’s hash. Don’t process any descendant nodes.使用下一个散列作为此节点的散列。不处理任何子代节点。                                                                                                                                                                                   |
| **1**  | Use the next hash as this node’s TXID, and mark this transaction as matching the filter.使用下一个散列作为此节点的 TXID，并将此事务标记为匹配筛选器。 | The hash needs to be computed. Process the left child node to get its hash; process the right child node to get its hash; then concatenate the two hashes as 64 raw bytes and hash them to get this node’s hash.需要计算散列值。处理左子节点以获得其散列; 处理右子节点以获得其散列; 然后将两个散列连接为64个原始字节并对其进行散列以获得该节点的散列。 |

Any time you begin processing a node for the first time, evaluate the next flag. Never use a flag at any other time.

当您第一次开始处理一个节点时，计算下一个标志。在任何时候都不要使用旗帜。

When processing a child node, you may need to process its children (the grandchildren of the original node) or further-descended nodes before returning to the parent node. This is expected—keep processing depth first until you reach a TXID node or a non-TXID node with a flag of 0.

在处理子节点时，在返回父节点之前，可能需要处理其子节点(原始节点的子节点)或进一步下降的节点。这是预期的ー首先保持处理深度，直到到达 TXID 节点或标志为0的非 TXID 节点。

After you process a TXID node or a non-TXID node with a flag of 0, stop processing flags and begin to ascend the tree. As you ascend, compute the hash of any nodes for which you now have both child hashes or for which you now have the sole child hash. See the [merkle tree section](https://developer.bitcoin.org/reference/block_chain.html#merkle-trees) for hashing instructions. If you reach a node where only the left hash is known, descend into its right child (if present) and further descendants as necessary.

处理 TXID 节点或标志为0的非 TXID 节点后，停止处理标志并开始攀登树。在提升过程中，计算现在有两个子散列或现在有唯一子散列的任何节点的散列。有关散列指令，请参阅 merkle 树部分。如果到达一个只知道左散列的节点，则下降到它的右子节点(如果存在) ，并根据需要进一步下降到其子节点。

However, if you find a node whose left and right children both have the same hash, fail. This is related to [CVE-2012-2459](https://en.bitcoin.it/wiki/CVEs#CVE-2012-2459).

但是，如果发现某个节点的左右子节点都具有相同的散列值，则失败。这与 CVE-2012-2459有关。

Continue descending and ascending until you have enough information to obtain the hash of the merkle root node. If you run out of flags or hashes before that condition is reached, fail. Then perform the following checks (order doesn’t matter):

继续降序和升序，直到获得足够的信息来获取 merkle 根节点的散列。如果在达到该条件之前用完了标志或散列，则失败。然后执行以下检查(顺序无关紧要) :

- Fail if there are unused hashes in the hashes list.
  
  如果哈希表中有未使用的哈希，则失败。

- Fail if there are unused flag bits—except for the minimum number of bits necessary to pad up to the next full byte.
  
  如果有未使用的标志位，则失败ーー除非最小位数需要填充到下一个完整字节。

- Fail if the hash of the merkle root node is not identical to the merkle root in the block header.
  
  如果 merkle 根节点的哈希值与块头中的 merkle 根不相同，则失败。

- Fail if the block header is invalid. Remember to ensure that the hash of the header is less than or equal to the target threshold encoded by the nBits header field. Your program should also, of course, attempt to ensure the header belongs to the best block chain and that the user knows how many confirmations this block has.
  
  如果块头无效，则失败。请记住，要确保标头的散列小于或等于 nBits 标头字段编码的目标阈值。当然，您的程序还应该尝试确保标头属于最好的块链，并确保用户知道这个块有多少个确认项。

For a detailed example of parsing a [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock), please see the corresponding [merkle block examples section](https://developer.bitcoin.org/examples/p2p_networking.html#parsing-a-merkleblock).

有关解析`merkleblock`消息的详细示例，请参阅相应的 merkle block examples 部分。

#### Creating A MerkleBlock Message

It’s easier to understand how to create a [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) after you understand how to parse an already-created message, so we recommend you read the parsing section above first.

在理解了如何解析已经创建的消息之后，更容易理解如何创建`merkleblock`消息，因此我们建议您首先阅读上面的解析部分。

Create a complete merkle tree with TXIDs on the bottom row and all the other hashes calculated up to the merkle root on the top row. For each transaction that matches the filter, track its TXID node and all of its ancestor nodes.

创建一个完整的 merkle 树，在下面一行使用 txid，并且所有其他散列都计算到上面一行的 merkle 根。对于匹配筛选器的每个事务，跟踪其 TXID 节点及其所有祖先节点。

![Example Of Creating A MerkleBlock Message](https://developer.bitcoin.org/_images/animated-en-merkleblock-creation.gif)

Example Of Creating A MerkleBlock Message[](https://developer.bitcoin.org/reference/p2p_networking.html#id3 "Permalink to this image")

创建 MerkleBlock 消息的示例

Start processing the tree with the merkle root node. The table below describes how to process both TXID nodes and non-TXID nodes based on whether the node is a match, a match ancestor, or neither a match nor a match ancestor.

开始处理带有 merkle 根节点的树。下表描述了如何根据节点是匹配的、匹配的或既不匹配也不匹配的祖先来处理 TXID 节点和非 TXID 节点。

|                                                | TXID NodeTXID 节点                                                                                     | Non-TXID Node非 txid 节点                                                                                                                                                                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Neither Match Nor Match Ancestor**既不匹配也不匹配祖先 | Append a 0 to the flag list; append this node’s TXID to the hash list.将0附加到标志列表; 将该节点的 TXID 附加到哈希列表。 | Append a 0 to the flag list; append this node’s hash to the hash list. Do not descend into its child nodes.将0附加到标志列表; 将该节点的哈希附加到哈希列表。不要下降到它的子节点。                                                                                             |
| **Match Or Match Ancestor**匹配或匹配祖先             | Append a 1 to the flag list; append this node’s TXID to the hash list.将1附加到标志列表; 将该节点的 TXID 附加到哈希列表。 | Append a 1 to the flag list; process the left child node. Then, if the node has a right child, process the right child. Do not append a hash to the hash list for this node.在标志列表中追加1; 处理左边的子节点。然后，如果节点有一个正确的子节点，则处理正确的子节点。不要在此节点的哈希列表中追加哈希。 |

Any time you begin processing a node for the first time, a flag should be appended to the flag list. Never put a flag on the list at any other time, except when processing is complete to pad out the flag list to a byte boundary.

当您第一次开始处理一个节点时，应该在标志列表中添加一个标志。在任何时候都不要在列表上放置标志，除非处理完成后将标志列表填充到字节边界。

When processing a child node, you may need to process its children (the grandchildren of the original node) or further-descended nodes before returning to the parent node. This is expected—keep processing depth first until you reach a TXID node or a node which is neither a TXID nor a match ancestor.

在处理子节点时，在返回父节点之前，可能需要处理其子节点(原始节点的子节点)或进一步下降的节点。这是预期的ー首先保持处理深度，直到到达 TXID 节点或既不是 TXID 也不是匹配祖先的节点。

After you process a TXID node or a node which is neither a TXID nor a match ancestor, stop processing and begin to ascend the tree until you find a node with a right child you haven’t processed yet. Descend into that right child and process it.

处理 TXID 节点或既不是 TXID 也不是匹配祖先的节点后，停止处理并开始提升树，直到找到一个具有尚未处理的正确子节点。深入那个正确的孩子，并处理它。

After you fully process the merkle root node according to the instructions in the table above, processing is complete. Pad your flag list to a byte boundary and construct the [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) using the template near the beginning of this subsection.

根据上面表中的指令完全处理 merkle 根节点后，处理就完成了。将标志列表填充到字节边界，并使用本小节开头附近的模板构造`merkleblock`消息。

### CmpctBlock

*Added in*[protocol version 70014](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP152](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)*.*

增加了协议版本70014as described by bip152。

**Version 1 compact blocks are pre-segwit (txids)** **Version 2 compact blocks are post-segwit (wtxids)**

版本1紧凑块是 pre-segwit (txids)版本2紧凑块是 post-segwit (wtxids)

The [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) is a reply to a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) which requested a block using the inventory type [“MSG_CMPCT_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-cmpct-block). If the requested block was recently announced and is close to the tip of the best chain of the receiver and after having sent the requesting peer a [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct), nodes respond with a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) containing data for the block.

`cmpctblock`消息是对`getdata`消息的回复，该消息使用目录类型“ MSG _ cmpct _ block”请求一个块。如果所请求的块是最近宣布的，并且接近接收方最佳链条的末端，在向请求对等方发送“ sendcmpct”消息之后，节点用一个包含块的数据的“`cmpctblock`息进行响应。

**If the requested block is too old, the node responds with a full non-compact block**

如果请求的块太旧，节点将用一个完整的非紧凑块进行响应

Upon [receipt](https://developer.bitcoin.org/terms.html#term-receipt) of a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock), after sending a [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct), nodes should calculate the short transaction ID for each unconfirmed transaction they have available (ie in their mempool) and compare each to each short transaction ID in the [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock). After finding already-available transactions, nodes which do not have all transactions available to reconstruct the full block should request the missing transactions using a [“getblocktxn” message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn).

在收到`cmpctblock`消息后，在发送“ sendcmpct”消息后，节点应该计算每个可用的未确认事务的短事务 ID (即在它们的 mempool 中) ，并将每个事务 ID 与“`cmpctblock`息中的每个短事务 ID 进行比较。在找到已经可用的事务之后，没有所有可用事务来重构完整块的节点应该使用“ getblocktxn”消息请求丢失的事务。

A node must not send a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) unless they are able to respond to a [“getblocktxn” message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn)which requests every transaction in the block. A node must not send a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) without having validated that the header properly commits to each transaction in the block, and properly builds on top of the existing, fully-validated chain with a valid proof-of-work either as a part of the current most-work valid chain, or building directly on top of it. A node may send a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) before validating that each transaction in the block validly spends existing UTXO set entries.

节点不能发送`cmpctblock`消息，除非它们能够响应“ getblocktxn”消息，该消息请求块中的每个事务。一个节点不能发送一个“`cmpctblock`息，除非已经验证了标头正确地提交给块中的每个事务，并且正确地构建在现有的、经过充分验证的链的顶部，具有有效的工作证明，或者作为当前工作量最大的有效链的一部分，或者直接构建在它的顶部。在确认块中的每个事务有效地使用现有的 UTXO 集条目之前，节点可以发送“ `cmpctblock`。

The [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) contains a vector of [“PrefilledTransaction”](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) whose structure is defined below.

`cmpctblock`消息包含“ prefiledtransaction”的向量，其结构在下面定义。

| Bytes字节    | Name姓名  | Data Type数据类型         | Description描述                                                              |
| ---------- | ------- | --------------------- | -------------------------------------------------------------------------- |
| *Varies*不同 | index索引 | compactSize uint紧凑型尺寸 | The index into the block at which this transaction is located.此事务所在的块中的索引。 |
| *Varies*不同 | tx      | Transaction交易         | The transaction which is in the block at the index.在索引块中的事务。               |

The [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) is compromised of a serialized [“HeaderAndShortIDs”](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) structure which is defined below. A [“HeaderAndShortIDs”](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) structure is used to relay a block header, the short transactions IDs used for matching already-available transactions, and a select few transactions which we expect a peer may be missing.

`cmpctblock`消息是一个序列化的“ HeaderAndShortIDs”结构，该结构在下面定义。“ HeaderAndShortIDs”结构用于中继块头、用于匹配已有可用事务的短事务 id，以及我们预计可能缺少的少数事务。

| Bytes字节    | Name姓名                         | Data Type数据类型                 | Description描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 80         | block header集箱                 | block_header块头                | The block header in the format described in the [block header section](https://developer.bitcoin.org/reference/block_chain.html#block-headers).块头部分中描述的格式的块头。                                                                                                                                                                                                                                                                                                                                                           |
| 8图8        | nonce现在                        | uint64_t64t                   | A nonce for use in short transaction ID calculations.用于短事务 ID 计算的 nonce。                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| *Varies*不同 | shortids length短路长度            | compactSize uint紧凑型尺寸         | The number of short transaction IDs in the following field.下列字段中的短事务 id 数。                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| *Varies*不同 | shortids矮子                     | byte[]字节[]                    | The short transaction IDs calculated from the transactions which were not provided explicitly in prefilledtxn. Vector of 6-byte integers in the spec, padded with two null-bytes so it can be read as an 8-byte integer. **In version 2 of compact blocks, shortids should use the wtxid instead of txid as defined by**[BIP141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)根据事务计算的短事务 id，在预文件 txn 中没有显式提供。规范中的6字节整数向量，用两个空字节填充，这样它就可以作为一个8字节的整数读取。在紧凑块的版本2中，shortids 应该使用 wtxid 而不是 bip141定义的 txid |
| *Varies*不同 | prefilled txn length预填充 txn 长度 | compactSize uint紧凑型尺寸         | The number of prefilled transactions in the following field.下面字段中预填充事务的数量。                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| *Varies*不同 | prefilled txn预填充的 txn          | PrefilledTransaction[]预存档交易[] | Used to provide the coinbase transaction and a select few which we expect a peer may be missing. Vector of [“PrefilledTransaction”](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock)structures defined above.用于提供 coinbase 事务和一些我们期望对等方可能缺少的选择项。上面定义的“ prefiledtransaction”结构的向量。                                                                                                                                                                                                                |

**Important**[protocol version 70015](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)**notes regarding Compact Blocks**

70015版本关于紧凑块的注释

New banning behavior was added to the compact block logic in [protocol version 70015](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions) to prevent node abuse, the new changes are outlined below as defined in [BIP152](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki).

新的禁止行为被添加到协议版本70015中的紧凑块逻辑中，以防止节点滥用，新的变化概述如下所定义的 BIP152。

Any undefined behavior in this spec may cause failure to transfer block to, peer disconnection by, or self-destruction by the receiving node. A node receiving non-minimally-encoded CompactSize encodings should make a best-effort to eat the sender’s cat.

本规范中的任何未定义行为都可能导致接收节点传输阻塞到、对等断开连接或自毁。接收非最小编码的 CompactSize 编码的节点应尽最大努力吞噬发送方的 cat。

As high-bandwidth mode permits relaying of [`cmpctblock` messages](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) prior to full validation (requiring only that the block header is valid before relay), nodes SHOULD NOT ban a peer for announcing a new block with a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) that is invalid, but has a valid header.

由于高带宽模式允许在完全验证之前中继`cmpctblock`消息(只要求在中继之前块头有效) ，因此节点不应禁止对等节点宣布一个新块，该块带有无效的“`cmpctblock`息，但有一个有效的头。

For avoidance of doubt, nodes SHOULD bump their [peer-to-peer](https://developer.bitcoin.org/devguide/p2p_network.html) protocol version to 70015 or higher to signal that they will not ban or punish a peer for announcing compact blocks prior to full validation, and nodes SHOULD NOT announce a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) to a peer with a version number below 70015 before fully validating the block.

为了避免怀疑，节点应该将它们的对等协议版本提高到70015或更高，以表明它们不会禁止或惩罚在完全验证之前宣布紧凑块的对等节点，并且在完全验证块之前，节点不应该向版本号低于70015的对等节点宣布`cmpctblock`消息。

**Version 2 compact blocks notes**

版本2紧凑地阻止注释

Transactions inside [`cmpctblock` messages](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) (both those used as direct announcement and those in response to getdata) and in [`blocktxn` messages](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn) should include witness data, using the same format as responses to getdata [“MSG_WITNESS_TX”](https://developer.bitcoin.org/terms.html#term-msg-witness-tx), specified in [BIP144](https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki).

`cmpctblock`消息(包括用于直接通知的消息和用于响应 getdata 的消息)和`blocktxn`消息中的事务应该包括证人数据，使用与在 BIP144中指定的 getdata“ MSG _ witness _ tx”响应相同的格式。

Upon [receipt](https://developer.bitcoin.org/terms.html#term-receipt) of a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) containing a request for a [“MSG_CMPCT_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-cmpct-block) object for which a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) is not sent in response, the block message containing the requested block in non-compact form MUST be encoded with witnesses (as is sent in reply to a [“MSG_WITNESS_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-witness-block)) if the protocol version used to encode the [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) would have been 2, and encoded without witnesses (as is sent in response to a [“MSG_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-block)) if the protocol version used to encode the [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock)would have been 1.

一旦收到`getdata`消息，其中包含对“ MSG _ cmpct _ block”对象的请求，而`cmpctblock`消息没有作为响应发送，则包含请求块的非紧凑形式的块消息必须用见证人进行编码(作为对“ MSG _ witness _ block”的回复发送) ，如果用于编码“`cmpctblock`息的协议版本为2，如果用于编码“ `cmpctblock`的协议版本为1，则没有见证人进行编码(作为对“ MSG _ block”的回应发送)。

**Short Transaction ID calculation**

短期交易 ID 计算

Short transaction IDs are used to represent a transaction without sending a full 256-bit hash. They are calculated as follows,

短事务 id 用于表示不发送完整的256位哈希的事务,

- A single-SHA256 hashing the block header with the nonce appended (in little-endian)
  
  一个单一的 sha256哈希块头，并附加 nonce (在 little-endian 中)

- Running SipHash-2-4 with the input being the transaction ID (**wtxid in version 2 of compact blocks**) and the keys (k0/k1) set to the first two little-endian 64-bit integers from the above hash, respectively.
  
  运行 SipHash-2-4，输入为事务 ID (紧凑块版本2中的 wtxid) ，键(k0/k1)分别设置为上述散列的前两个 little-endian 64位整数。

- Dropping the 2 most significant bytes from the SipHash output to make it 6 bytes.
  
  从 SipHash 输出中删除2个最重要的字节，使其为6字节。

- Two null-bytes appended so it can be read as an 8-byte integer.
  
  附加两个空字节，以便可以读取为一个8字节的整数。

### SendCmpct

*Added in*[protocol version 70014](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP152](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)*.*

增加了协议版本70014as described by bip152。

The [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct) is defined as a message containing a 1-byte integer followed by a 8-byte integer. The first integer is interpreted as a boolean and should have a value of either 1 or 0. The second integer is be interpreted as a little-endian version number.

“ sendcmpct”消息定义为包含一个1字节的整数，后跟一个8字节的整数的消息。第一个整数被解释为一个布尔值，它的值应该是1或0。第二个整数被解释为 little-endian 版本号。

Upon [receipt](https://developer.bitcoin.org/terms.html#term-receipt) of a [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct) with the first and second integers set to 1, the node should announce new blocks by sending a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock).

当收到第一个和第二个整数设置为1的“ sendcmpct”消息时，节点应该通过发送`cmpctblock`消息来通知新的块。

Upon [receipt](https://developer.bitcoin.org/terms.html#term-receipt) of a [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct) with the first integer set to 0, the node shouldn’t announce new blocks by sending a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock), but instead announce new blocks by sending invs or headers, as defined by [BIP130](https://github.com/bitcoin/bips/blob/master/bip-0130.mediawiki).

当收到第一个整数设置为0的“ sendcmpct”消息时，节点不应该通过发送`cmpctblock`消息来通知新块，而是通过发送 invs 或 header 来通知新块，这是由 BIP130定义的。

Upon [receipt](https://developer.bitcoin.org/terms.html#term-receipt) of a [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct) with the second integer set to something other than 1, nodes should treat the peer as if they had not received the message (as it indicates the peer will provide an unexpected encoding in [`cmpctblock` messages](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock), and/or other, messages). This allows future versions to send duplicate [“sendcmpct” messages](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct) with different versions as a part of a version handshake for future versions.

当收到第二个整数设置为不是1的“ sendcmpct”消息时，节点应当将对方视为未收到消息(因为它表明对方将在`cmpctblock`消息和/或其他消息中提供意外的编码)。这允许将来的版本使用不同的版本发送重复的“ sendcmpct”消息，作为将来版本握手的一部分。

Nodes should check for a protocol version of >= 70014 before sending [“sendcmpct” messages](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct). Nodes shouldn’t send a request for a [“MSG_CMPCT_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-cmpct-block) object to a peer before having received a [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct)from that peer. Nodes shouldn’t request a [“MSG_CMPCT_BLOCK”](https://developer.bitcoin.org/terms.html#term-msg-cmpct-block) object before having sent all [“sendcmpct” messages](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct) to that peer which they intend to send, as the peer cannot know what version protocol to use in the response.

在发送“ sendcmpct”消息之前，节点应该检查 > = 70014的协议版本。在接收到“ sendcmpct”消息之前，节点不应该向对等节点发送对“ MSG _ cmpct _ block”对象的请求。节点在将所有“ sendcmpct”消息发送给要发送的对等节点之前，不应该请求“ MSG _ cmpct _ block”对象，因为对等节点不知道在响应中使用什么版本的协议。

The structure of a [“sendcmpct” message](https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct) is defined below.

下面定义了“ sendcmpct”消息的结构。

| Bytes字节 | Name姓名     | Data Type数据类型 | Description描述                                                                                                                                              |
| ------- | ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | announce宣布 | bool布尔        | An integer representing a boolean value, must be 0x01 (true) or 0x00 (false).表示布尔值的整数必须是0x01(true)或0x00(false)。                                            |
| 8图8     | version版本  | uint64_t64t   | A little-endian representation of a version number. **Version 2 compact blocks should be specified by setting version to 2**版本号的小尾数表示。版本2紧凑块应该通过将版本设置为2来指定 |

### GetBlockTxn

*Added in*[protocol version 70014](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP152](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)*.*

增加了协议版本70014as described by bip152。

The [“getblocktxn” message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn) is defined as a message containing a serialized [“BlockTransactionsRequest”](https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn)message. Upon [receipt](https://developer.bitcoin.org/terms.html#term-receipt) of a properly-formatted [“getblocktxn” message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn), nodes which recently provided the sender of such a message a [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) for the block hash identified in this message must respond with either an appropriate [`blocktxn` message](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn), or a full block message.

“ getblocktxn”消息被定义为包含序列化的“ BlockTransactionsRequest”消息的消息。在收到格式正确的“ getblocktxn”消息后，最近为此类消息的发送方提供此消息中标识的块散列的`cmpctblock`消息的节点必须以适当的`blocktxn`消息或完整的块消息作出响应。

A [`blocktxn` message](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn) response must contain exactly and only each transaction which is present in the appropriate block at the index specified in the [“getblocktxn” message](https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn) indexes list, in the order requested.

`blocktxn`消息响应必须按照请求的顺序，准确且仅包含在“ getblocktxn”消息索引列表中指定的索引处的适当块中的每个事务。

The structure of [“BlockTransactionsRequest”](https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn) is defined below.

“ BlockTransactionsRequest”的结构定义如下。

| Bytes字节    | Name姓名             | Data Type数据类型         | Description描述                                                                                                                                                                                                                                                                                                                             |
| ---------- | ------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 32图32      | block hash块散列      | binary blob二进制斑点      | The blockhash of the block which the transactions being requested are in.被请求的交易所在区块的 blockkhash。                                                                                                                                                                                                                                          |
| *Varies*不同 | indexes length索引长度 | compactSize uint紧凑型尺寸 | The number of transactions being requested.被请求的事务数。                                                                                                                                                                                                                                                                                       |
| *Varies*不同 | indexes索引          | compactSize uint[][]  | Vector of compactSize containing the indexes of the transactions being requested in the block. **In version 2 of compact blocks, the wtxid should be used instead of the txid as defined by**[BIP141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)compactSize 的向量，包含块中请求的事务的索引。在紧凑块的版本2中，应该使用 wtxid 而不是 bip141定义的 txid |

### BlockTxn

*Added in*[protocol version 70014](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP152](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)*.*

增加了协议版本70014as described by bip152。

The [`blocktxn` message](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn) is defined as a message containing a serialized [“BlockTransactions”](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn) message. Upon [receipt](https://developer.bitcoin.org/terms.html#term-receipt) of a properly-formatted requested [`blocktxn` message](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn), nodes should attempt to reconstruct the full block by taking the prefilledtxn transactions from the original [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock) and placing them in the marked positions, then for each short transaction ID from the original [`cmpctblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock), in order, find the corresponding transaction either from the [`blocktxn` message](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn) or from other sources and place it in the first available position in the block then once the block has been reconstructed, it shall be processed as normal, keeping in mind that short transaction IDs are expected to occasionally collide, and that nodes must not be penalized for such collisions, wherever they appear.

`blocktxn`消息被定义为包含序列化的“ BlockTransactions”消息的消息。在收到格式正确的请求“`blocktxn`息后，节点应该尝试从原始的`cmpctblock`消息获取预文件 txn 事务并将它们放置在标记位置，然后对于原始的“`cmpctblock`息中的每个短事务 ID，按顺序从“ `blocktxn`或其他来源查找相应的事务，并将其放置在块中的第一个可用位置，然后一旦块被重构，它将被正常处理，同时铭记短事务 ID 预计偶尔会发生冲突，而且无论在哪里出现，节点都不能因为这种冲突而受到惩罚。

The structure of [“BlockTransactions”](https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn) is defined below.

“区块交易”的结构定义如下。

| Bytes字节    | Name姓名                  | Data Type数据类型         | Description描述                                                                                                                                                                                                                           |
| ---------- | ----------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 32图32      | block hash块散列           | binary blob二进制斑点      | The blockhash of the block which the transactions being provided are in.提供交易的区块的区块。                                                                                                                                                     |
| *Varies*不同 | transactions length事务长度 | compactSize uint紧凑型尺寸 | The number of transactions being provided.所提供的事务数。                                                                                                                                                                                      |
| *Varies*不同 | transactions交易          | Transactions[]交易[]    | Vector of transactions, for an example hexdump of the raw transaction format, see the [raw transaction section](https://developer.bitcoin.org/reference/transactions.html#raw-transaction-format).事务的向量，有关原始事务格式的 hexdump 示例，请参见原始事务部分。 |

### NotFound

*Added in*[protocol version 70001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.*

在协议版本70001中添加。

The [`notfound` message](https://developer.bitcoin.org/reference/p2p_networking.html#notfound) is a reply to a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) which requested an object the receiving node does not have available for relay. (Nodes are not expected to relay historic transactions which are no longer in the memory pool or relay set. Nodes may also have pruned spent transactions from older blocks, making them unable to send those blocks.)

`notfound`消息是对`getdata`消息的回复，该消息请求接收节点没有可用于中继的对象。(节点不被期望中继不再在内存池或中继集中的历史事务。节点还可能从较旧的块中删除已使用的事务，使它们无法发送这些块

The format and maximum size limitations of the [`notfound` message](https://developer.bitcoin.org/reference/p2p_networking.html#notfound) are identical to the [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv); only the message header differs.

`notfound`消息的格式和最大大小限制与`inv`消息相同; 只是消息头不同。

### Tx

The [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx) transmits a single transaction in the raw transaction format. It can be sent in a variety of situations;

`tx`消息以原始事务格式发送单个事务。它可以在各种情况下发送;

- **Transaction Response:** Bitcoin Core and [BitcoinJ](http://bitcoinj.github.io/) will send it in response to a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) that requests the transaction with an inventory type of [“MSG_TX”](https://developer.bitcoin.org/terms.html#term-msg-tx).
  
  交易响应: 比特币核心和 BitcoinJ 将发送它作为对`getdata`消息的响应，该消息请求交易的库存类型为“ MSG _ tx”。

- **MerkleBlock Response:** Bitcoin Core will send it in response to a [`getdata` message](https://developer.bitcoin.org/reference/p2p_networking.html#getdata) that requests a merkle block with an inventory type of `MSG_MERKLEBLOCK`. (This is in addition to sending a [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock).) Each [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx) in this case provides a matched transaction from that block.
  
  默克尔布洛克响应: 比特币核心将发送它作为对`getdata`消息的响应，该消息请求一个 merkle 块，其库存类型为 MSG _ MerkleBlock。(这是发送`merkleblock`消息的补充。)在这种情况下，每个`tx`消息都提供来自该块的匹配事务。

- **Unsolicited:** [BitcoinJ](http://bitcoinj.github.io/) will send a [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx) unsolicited for transactions it originates.
  
  未经请求: BitcoinJ 将发送一个`tx`消息未经请求的交易来源。

For an example hexdump of the raw transaction format, see the [raw transaction section](https://developer.bitcoin.org/reference/transactions.html#raw-transaction-format).

有关原始事务格式的 hexdump 示例，请参见原始事务部分。

## Control Messages

The following [network](https://developer.bitcoin.org/devguide/p2p_network.html) messages all help control the connection between two peers or allow them to advise each other about the rest of the [network](https://developer.bitcoin.org/devguide/p2p_network.html).

下面的网络消息都有助于控制两个对等点之间的连接，或允许它们互相通知网络的其余部分。

![Overview Of P2P Protocol Control And Advisory Messages](https://developer.bitcoin.org/_images/en-p2p-control-messages.svg)

Overview Of P2P Protocol Control And Advisory Messages[](https://developer.bitcoin.org/reference/p2p_networking.html#id4 "Permalink to this image")

P2P 协议控制与咨询消息综述

Note that almost none of the control messages are authenticated in any way, meaning they can contain incorrect or intentionally harmful information. In addition, this section does not yet cover P2P protocol operation over the [Tor network](https://en.wikipedia.org/wiki/Tor_%28anonymity_network%29); if you would like to contribute information about Tor, please [open an issue](https://github.com/bitcoin-dot-org/bitcoin.org/issues).

请注意，几乎没有任何控制消息以任何方式进行身份验证，这意味着它们可能包含不正确或有意的有害信息。此外，本节还不包括 Tor 网络上的 P2P 协议操作; 如果您想提供有关 Tor 的信息，请打开一个问题。

### Addr

The `addr` (IP address) message relays connection information for peers on the [network](https://developer.bitcoin.org/devguide/p2p_network.html). Each peer which wants to accept incoming connections creates an [`addr` message](https://developer.bitcoin.org/reference/p2p_networking.html#addr) providing its connection information and then sends that message to its peers unsolicited. Some of its peers send that information to their peers (also unsolicited), some of which further distribute it, allowing decentralized peer discovery for any program already on the [network](https://developer.bitcoin.org/devguide/p2p_network.html).

Addr (IP 地址)消息为网络上的对等点中继连接信息。每个希望接受传入连接的对等点创建一个`addr`消息，提供其连接信息，然后将该消息未经请求地发送给它的对等点。其中一些节点将这些信息发送给它们的节点(也是未经请求的) ，其中一些节点进一步分发这些信息，允许对网络上已经存在的任何程序进行分散的节点发现。

An [`addr` message](https://developer.bitcoin.org/reference/p2p_networking.html#addr) may also be sent in response to a [`getaddr` message](https://developer.bitcoin.org/reference/p2p_networking.html#getaddr).

也可以发送`addr`消息来响应`getaddr`消息。

| Bytes字节    | Name姓名                  | Data Type数据类型                                                                         | Description描述                                                                                                                                                                     |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Varies*不同 | IP address countIP 地址计数 | compactSize uint紧凑型尺寸                                                                 | The number of IP address entries up to a maximum of 1,000.最多为1,000的 IP 地址条目的数量。                                                                                                   |
| *Varies*不同 | IP addressesIP 地址       | [network](https://developer.bitcoin.org/devguide/p2p_network.html) IP address网络 IP 地址 | IP address entries. See the table below for the format of a Bitcoin [network](https://developer.bitcoin.org/devguide/p2p_network.html) IP address.IP 地址条目。有关比特币网络 IP 地址的格式，请参阅下表。 |

Each encapsulated [network](https://developer.bitcoin.org/devguide/p2p_network.html) IP address currently uses the following structure:

每个封装的网络 IP 地址目前使用以下结构:

| Bytes字节 | Name姓名          | Data Type数据类型 | Description描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------- | --------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4图4     | time时间          | uint32        | *Added in*[protocol version 31402](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* A time in [Unix epoch time](https://en.wikipedia.org/wiki/Unix_time) format. Nodes advertising their own IP address set this to the current time. Nodes advertising IP addresses they’ve connected to set this to the last time they connected to that node. Other nodes just relaying the IP address should not change the time. Nodes can use the time field to avoid relaying old [`addr` messages](https://developer.bitcoin.org/reference/p2p_networking.html#addr). Malicious nodes may change times or even set them in the future.增加了协议版本31402。一种 Unix 新纪元时间格式的时间。宣布自己 IP 地址的节点将此设置为当前时间。宣布已连接的 IP 地址的节点将其设置为最后一次连接到该节点。其他只转发 IP 地址的节点不应该改变时间。节点可以使用时间域来避免转发旧的`addr`消息。恶意节点可能会改变时间，甚至在将来设置时间。 |
| 8图8     | services服务      | uint64_t64t   | The services the node advertised in its [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version).在其“版本”消息中公布的节点的服务。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 16图16   | IP addressIP 地址 | char[16][16]  | IPv6 address in **big endian byte order**. IPv4 addresses can be provided as [IPv4-mapped IPv6 addresses](http://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses)IPv6地址以大端字节顺序提供。 IPv4地址可以作为 IPv4映射的 IPv6地址提供                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2图2     | port港口          | uint16_t16t   | Port number in **big endian byte order**. Note that Bitcoin Core will only connect to nodes with non-standard port numbers as a last resort for finding peers. This is to prevent anyone from trying to use the [network](https://developer.bitcoin.org/devguide/p2p_network.html) to disrupt non-Bitcoin services that run on other ports.端口号以大端字节顺序排列。请注意，比特币核心将只连接到非标准端口号的节点，作为寻找对等点的最后手段。这是为了防止任何人试图使用该网络破坏在其他端口上运行的非比特币服务。                                                                                                                                                                                                                                                                                                                                                                                            |

The following annotated hexdump shows part of an [`addr` message](https://developer.bitcoin.org/reference/p2p_networking.html#addr). (The message header has been omitted and the actual IP address has been replaced with a [RFC5737](http://tools.ietf.org/html/rfc5737) reserved IP address.)

下面带注释的 hexdump 显示了`addr`消息的一部分。(消息头被省略，实际 IP 地址被 RFC5737保留 IP 地址替换。)

fde803 ............................. Address count: 1000
d91f4854 ........................... [Epoch time][unix epoch time]: 1414012889
0100000000000000 ................... Service bits: 01 ([network][network] node)
00000000000000000000ffffc0000233 ... IP Address: ::ffff:192.0.2.51
208d ............................... Port: 8333
[...] .............................. (999 more addresses omitted)

### Alert

*Added in*[protocol version 311](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* *Removed in*[protocol version 70013](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*and released in*[Bitcoin Core 0.13.0](https://bitcoin.org/en/release/v0.13.0)

在协议版本311中添加，在协议版本70013中删除，在比特币核心0.13.0中发布

The legacy p2p [network](https://developer.bitcoin.org/devguide/p2p_network.html) alert messaging system has been retired; however, internal alerts, partition detection warnings and the `-alertnotify` option features remain. See [Alert System Retirement](https://bitcoin.org/en/alert/2016-11-01-alert-retirement) for details.

遗留的 p2p 网络警报消息传递系统已经退役; 但是，内部警报、分区检测警告和-alertnotify 选项特性仍然保留。详情请参阅警报系统退休。

### FeeFilter

*Added in*[protocol version 70013](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP133](https://github.com/bitcoin/bips/blob/master/bip-0133.mediawiki)*.*

在协议版本70013中添加，如 bip133所描述。

The [`feefilter` message](https://developer.bitcoin.org/reference/p2p_networking.html#feefilter) is a request to the receiving peer to not relay any transaction inv messages to the sending peer where the fee rate for the transaction is below the fee rate specified in the feefilter message.

`feefilter`消息是对接收端的一个请求，要求它不要将任何交易转发给发送端，因为该交易的费率低于“`feefilter`息中指定的费率。

`feefilter` was introduced in [Bitcoin Core 0.13.0](https://bitcoin.org/en/release/v0.13.0) following the introduction of mempool limiting in [Bitcoin Core 0.12.0](https://bitcoin.org/en/release/v0.12.0). Mempool limiting provides protection against attacks and spam transactions that have low fee rates and are unlikely to be included in mined blocks. The [`feefilter` messages](https://developer.bitcoin.org/reference/p2p_networking.html#feefilter) allows a node to inform its peers that it will not accept transactions below a specified fee rate into its mempool, and therefore that the peers can skip relaying inv messages for transactions below that fee rate to that node.

在引入了比特币核心0.12.0的 mempool 限制之后，比特币核心0.13.0引入了 feefilter。内存池限制提供了针对攻击和垃圾邮件交易的保护，这些攻击和垃圾邮件交易的费用较低，不太可能包含在雷区块中。`feefilter`消息允许一个节点通知其对等节点，它将不接受低于指定费率的交易进入其记忆池，因此对等节点可以跳过将低于该费率的交易转发到该节点。

| Bytes字节 | Name姓名    | Data Type数据类型 | Description描述                                                                                                                                 |
| ------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 8图8     | feerate发热 | uint64_t64t   | The fee rate (in satoshis per kilobyte) below which transactions should not be relayed to this peer.费率(以 satoshis/kb 为单位) ，低于该费率的交易不应转发到该对等方。 |

The receiving peer may choose to ignore the message and not filter transaction inv messages.

接收端可以选择忽略消息，而不过滤 v 消息中的事务。

The fee filter is additive with bloom filters. If an SPV client loads a bloom filter and sends a feefilter message, transactions should only be relayed if they pass both filters.

该费用过滤器是附加的布鲁姆过滤器。如果一个 SPV 客户端加载了一个 bloom filter 并发送了一个 feefilter 消息，那么只有事务同时通过两个过滤器才应该被中继。

Note however that feefilter has no effect on block propagation or responses to getdata messages. For example, if a node requests a merkleblock from its peer by sending a getdata message with inv type MSG_FILTERED_BLOCK and it has previously sent a feefilter to that peer, the peer should respond with a merkleblock containing *all* the transactions matching the bloom filter, even if they are below the feefilter fee rate.

但是请注意，feefilter 对块传播或对获取数据消息的响应没有影响。例如，如果一个节点通过发送带有 inv 类型 MSG filtered block 的 getdata 消息来请求一个 merkleblock，并且它之前已经向该节点发送了一个 feefilter，那么该节点应该用一个 merkleblock 来响应，该 merkleblock 包含所有匹配 bloom filter 的事务，即使它们低于 feefilter fee 费率。

inv messages generated from a mempool message are subject to a fee filter if it exists.

从 mempool 消息生成的 inv 消息如果存在的话，将接受一个费用过滤器。

The annotated hexdump below shows a [`feefilter` message](https://developer.bitcoin.org/reference/p2p_networking.html#feefilter). (The message header has been omitted.)

下面带注释的 hexdump 显示了一个`feefilter`消息(消息头被省略了。)

7cbd000000000000 ... satoshis per kilobyte: 48,508

### FilterAdd

*Added in*[protocol version 70001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)*.*

增加了协议版本70001，如 bip37所描述。

The [`filteradd` message](https://developer.bitcoin.org/reference/p2p_networking.html#filteradd) tells the receiving peer to add a single element to a previously-set bloom filter, such as a new public key. The element is sent directly to the receiving peer; the peer then uses the parameters set in the [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload) to add the element to the bloom filter.

`filteradd`消息告诉接收端向以前设置的 bloom 筛选器添加单个元素，例如新的公钥。元素被直接发送到接收对等点; 然后对等点使用在`filterload`消息中设置的参数将元素添加到 bloom 过滤器中。

Because the element is sent directly to the receiving peer, there is no obfuscation of the element and none of the plausible-deniability privacy provided by the bloom filter. Clients that want to maintain greater privacy should recalculate the bloom filter themselves and send a new [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload) with the recalculated bloom filter.

因为元素被直接发送到接收端，所以元素不会被模糊，也没有 bloom 过滤器提供的貌似合理的可否认隐私。想要保持更大隐私的客户应该自己重新计算布鲁姆过滤器，并用重新计算的布鲁姆过滤器发送一个新的“过滤加载”消息。

| Bytes字节    | Name姓名            | Data Type数据类型         | Description描述                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ----------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *Varies*不同 | element bytes元素字节 | compactSize uint紧凑型尺寸 | The number of bytes in the following element field.下列元素字段中的字节数。                                                                                                                                                                                                                                                                                                                                                                      |
| *Varies*不同 | element元素         | uint8_t[][]           | The element to add to the current filter. Maximum of 520 bytes, which is the maximum size of an element which can be pushed onto the stack in a pubkey or signature script. Elements must be sent in the byte order they would use when appearing in a raw transaction; for example, hashes should be sent in internal byte order.要添加到当前筛选器的元素。最大520字节，这是可以在 pubkey 或签名脚本中推入堆栈的元素的最大大小。元素必须以它们在原始事务中出现时使用的字节顺序发送; 例如，哈希值应该以内部字节顺序发送。 |

Note: a [`filteradd` message](https://developer.bitcoin.org/reference/p2p_networking.html#filteradd) will not be accepted unless a filter was previously set with the [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload).

注意: `filteradd`消息将不被接受，除非以前用`filterload`消息设置过滤器。

The annotated hexdump below shows a [`filteradd` message](https://developer.bitcoin.org/reference/p2p_networking.html#filteradd) adding a TXID. (The message header has been omitted.) This TXID appears in the same block used for the example hexdump in the [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock); if that [`merkleblock` message](https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock) is re-sent after sending this [`filteradd` message](https://developer.bitcoin.org/reference/p2p_networking.html#filteradd), six hashes are returned instead of four.

下面带注释的 hexdump 显示了添加 TXID 的`filteradd`消息。(消息头被省略了。)这个 TXID 出现在`merkleblock`消息中示例 hexdump 使用的相同块中; 如果在发送此“`filteradd`息后重新发送“`merkleblock`息，则返回六个散列，而不是四个。

20 ................................. Element bytes: 32
fdacf9b3eb077412e7a968d2e4f11b9a
9dee312d666187ed77ee7d26af16cb0b ... Element (A TXID)

### FilterClear

*Added in*[protocol version 70001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)*.*

增加了协议版本70001，如 bip37所描述。

The [`filterclear` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterclear) tells the receiving peer to remove a previously-set bloom filter. This also undoes the effect of setting the relay field in the [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version) to 0, allowing unfiltered access to [`inv` messages](https://developer.bitcoin.org/reference/p2p_networking.html#inv)announcing new transactions.

`filterclear`消息告诉接收端删除以前设置的 bloom 筛选器。这还取消了将`version`消息中的中继字段设置为0的效果，允许未经过滤的访问`inv`消息，以宣布新的事务。

Bitcoin Core does not require a [`filterclear` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterclear) before a replacement filter is loaded with `filterload`. It also doesn’t require a [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload) before a [`filterclear` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterclear).

比特币核心在替换过滤器加载过滤负载之前不需要“过滤/清除”消息。它也不需要在`filterclear`消息之前提供`filterload`消息。

There is no payload in a [`filterclear` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterclear). See the [message header section](https://developer.bitcoin.org/reference/p2p_networking.html#message-headers) for an example of a message without a payload.

在`filterclear`消息中没有有效负载。有关无负载消息的示例，请参见消息头部分。

### FilterLoad

*Added in*[protocol version 70001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)*.*

增加了协议版本70001，如 bip37所描述。

The [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload) tells the receiving peer to filter all relayed transactions and requested merkle blocks through the provided filter. This allows clients to receive transactions relevant to their wallet plus a configurable rate of false positive transactions which can provide plausible-deniability privacy.

`filterload`消息告诉接收端过滤所有中继事务，并通过提供的过滤器请求 merkle 块。这使得客户可以接收与他们的钱包相关的交易，以及一个可配置的假阳性交易率，这可以提供貌似合理的否认隐私。

| Bytes字节    | Name姓名           | Data Type数据类型         | Description描述                                                                                                                                                                                                                        |
| ---------- | ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *Varies*不同 | nFilterBytes     | compactSize uint紧凑型尺寸 | Number of bytes in the following filter bit field.下列筛选器位字段中的字节数。                                                                                                                                                                     |
| *Varies*不同 | filter过滤器        | uint8_t[][]           | A bit field of arbitrary byte-aligned size. The maximum size is 36,000 bytes.任意字节对齐大小的位字段。最大大小为36,000字节。                                                                                                                             |
| 4图4        | nHashFuncs国家人权机构 | uint32_t32t           | The number of hash functions to use in this filter. The maximum value allowed in this field is 50.要在此筛选器中使用的散列函数数目。该字段允许的最大值为50。                                                                                                     |
| 4图4        | nTweak           | uint32_t32t           | An arbitrary value to add to the seed value in the hash function used by the bloom filter.要添加到 bloom 筛选器使用的哈希函数中的种子值的任意值。                                                                                                            |
| 1          | nFlags           | uint8_t我不知道           | A set of flags that control how outpoints corresponding to a matched pubkey script are added to the filter. See the table in the Updating A Bloom Filter subsection below.一组标志，用于控制如何向筛选器添加与匹配的 pubkey 脚本相对应的断点。请参阅下面更新布鲁姆过滤器小节中的表格。 |

The annotated hexdump below shows a [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload). (The message header has been omitted.) For an example of how this payload was created, see the [filterload example](https://developer.bitcoin.org/examples/p2p_networking.html#creating-a-bloom-filter).

下面带注释的 hexdump 显示了一条`filterload`消息。(消息头被省略了。)有关如何创建此有效负载的示例，请参见过滤加载示例。

02 ......... Filter bytes: 2
b50f ....... Filter: 1010 1101 1111 0000
0b000000 ... nHashFuncs: 11
00000000 ... nTweak: 0/none
00 ......... nFlags: BLOOM_UPDATE_NONE

**Initializing A Bloom Filter**

初始化 Bloom Filter

Filters have two core parameters: the size of the bit field and the number of hash functions to run against each data element. The following formulas from [BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki) will allow you to automatically select appropriate values based on the number of elements you plan to insert into the filter (*n*) and the false positive rate (*p*) you desire to maintain plausible deniability.

过滤器有两个核心参数: 位字段的大小和针对每个数据元素运行的散列函数的数量。根据你计划插入到过滤器中的元素数量(n)和你希望保持的假阳性率(p) ，BIP37中的以下公式可以让你自动选择合适的似是而非的否认。

- Size of the bit field in bytes (*nFilterBytes*), up to a maximum of 36,000: `(-1 / log(2)**2 * n *log(p)) / 8`
  
  位域的字节大小(nFilterBytes) ，最大为36,000: (- 1/log (2) * * 2 * n * log (p))/8

- Hash functions to use (*nHashFuncs*), up to a maximum of 50: `nFilterBytes * 8 / n * log(2)`
  
  要使用的散列函数(nHashFuncs) ，最多为50: nFilterBytes * 8/n * log (2)

Note that the filter matches parts of transactions (transaction elements), so the false positive rate is relative to the number of elements checked—not the number of transactions checked. Each normal transaction has a minimum of four matchable elements (described in the comparison subsection below), so a filter with a false-positive rate of 1 percent will match about 4 percent of all transactions at a minimum.

请注意，过滤器匹配部分事务(事务元素) ，因此假阳性率是相对于检查的元素数量而言的，而不是检查的事务数量。每个正常事务至少有四个可匹配元素(在下面的比较小节中进行描述) ，因此，假阳性率为1% 的筛选器至少将匹配所有事务的4% 。

According to [BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki), the formulas and limits described above provide support for bloom filters containing 20,000 items with a false positive rate of less than 0.1 percent or 10,000 items with a false positive rate of less than 0.0001 percent.

根据 BIP37的说法，上述公式和限制为 bloom filters 提供了支持，这些 bloom filters 包含20,000个虚假阳性率小于0.1% 的项目，或者10,000个虚假阳性率小于0.0001% 的项目。

Once the size of the bit field is known, the bit field should be initialized as all zeroes.

一旦知道了位字段的大小，就应该将位字段初始化为所有零。

**Populating A Bloom Filter**

填充一个花朵过滤器

The bloom filter is populated using between 1 and 50 unique hash functions (the number specified per filter by the *nHashFuncs* field). Instead of using up to 50 different hash function implementations, a single implementation is used with a unique seed value for each function.

Bloom 过滤器使用1到50个唯一的散列函数(nHashFuncs 字段为每个过滤器指定的数字)填充。与使用多达50种不同的散列函数实现不同，单个实现为每个函数使用唯一的种子值。

The seed is `nHashNum * 0xfba4c795 + nTweak` as a *uint32_t*, where the values are:

种子是 nHashNum * 0xfba4c795 + nTweak as a uint32 t，其中的值是:

- **nHashNum** is the sequence number for this hash function, starting at 0 for the first hash iteration and increasing up to the value of the *nHashFuncs* field (minus one) for the last hash iteration.
  
  nHashNum 是这个 hash 函数的序列号，在第一次 hash 迭代中从0开始，在最后一次 hash 迭代中增加到 nHashFuncs 字段的值(减1)。

- **0xfba4c795** is a constant optimized to create large differences in the seed for different values of *nHashNum*.
  
  0xfba4c795是一个常量优化，以创建不同的 nHashNum 值在种子大的差异。

- **nTweak** is a per-filter constant set by the client to require the use of an arbitrary set of hash functions.
  
  nTweak 是由客户机设置的每个过滤器常量，用于要求使用任意一组散列函数。

If the seed resulting from the formula above is larger than four bytes, it must be truncated to its four most significant bytes (for example, `0x8967452301 & 0xffffffff → 0x67452301`).

如果由上面的公式产生的种子大于4个字节，则必须将其截断为其最有意义的4个字节(例如，0x8967452301 & 0xffffffff →0x67452301)。

The actual hash function implementation used is the [32-bit Murmur3 hash function](https://en.wikipedia.org/wiki/MurmurHash).

实际使用的散列函数实现是32位 Murmur3散列函数。

![Warning icon](https://developer.bitcoin.org/_images/icon_warning.svg) **Warning:** the Murmur3 hash function has separate 32-bit and 64-bit versions that produce different results for the same input. Only the 32-bit Murmur3 version is used with Bitcoin bloom filters.

警告: Murmur3散列函数具有单独的32位和64位版本，对于相同的输入会产生不同的结果。只有32位 Murmur3版本与比特币开花过滤器一起使用。

The data to be hashed can be any transaction element which the bloom filter can match. See the next subsection for the list of transaction elements checked against the filter. The largest element which can be matched is a script data push of 520 bytes, so the data should never exceed 520 bytes.

要散列的数据可以是 bloom 筛选器可以匹配的任何事务元素。有关根据筛选器检查的事务元素列表，请参阅下一小节。可以匹配的最大元素是520字节的脚本数据推送，因此数据不应超过520字节。

The example below from Bitcoin Core [bloom.cpp](https://github.com/bitcoin/bitcoin/blob/cbf28c6619fe348a258dfd7d08bdbd2392d07511/src/bloom.cpp#L46) combines all the steps above to create the hash function template. The seed is the first parameter; the data to be hashed is the second parameter. The result is a uint32_t modulo the size of the bit field in bits.

下面的例子来自比特币核心 bloom.cpp，它结合了上面的所有步骤来创建散列函数模板。Seed 是第一个参数; 要散列的数据是第二个参数。结果是以位为单位的 uint32 _ t 模块化位域的大小。

MurmurHash3(nHashNum * 0xFBA4C795 + nTweak, vDataToHash) % (vData.size() * 8)

Each data element to be added to the filter is hashed by *nHashFuncs* number of hash functions. Each time a hash function is run, the result will be the index number (*nIndex*) of a bit in the bit field. That bit must be set to 1. For example if the filter bit field was `00000000` and the result is 5, the revised filter bit field is `00000100` (the first bit is bit 0).

每个要添加到过滤器的数据元素都由 nHashFuncs 数的散列函数散列。每次运行哈希函数时，结果将是位字段中一个位的索引号(nIndex)。那个位必须设置为1。例如，如果过滤器位字段是00000000，结果是5，修改后的过滤器位字段是00000100(第一位是0位)。

It is expected that sometimes the same index number will be returned more than once when populating the bit field; this does not affect the algorithm—after a bit is set to 1, it is never changed back to 0.

预计在填充位域时，有时会返回相同的索引号不止一次，这不会影响算法ーー当一个位被设置为1后，就不会再被更改为0。

After all data elements have been added to the filter, each set of eight bits is converted into a little-endian byte. These bytes are the value of the *filter* field.

将所有数据元素添加到过滤器后，每组八位将转换为一个小尾位字节。这些字节是筛选器字段的值。

**Comparing Transaction Elements To A Bloom Filter**

事务元素与 Bloom 过滤器的比较

To compare an arbitrary data element against the bloom filter, it is hashed using the same parameters used to create the bloom filter. Specifically, it is hashed *nHashFuncs* times, each time using the same *nTweak* provided in the filter, and the resulting output is modulo the size of the bit field provided in the *filter* field. After each hash is performed, the filter is checked to see if the bit at that indexed location is set. For example if the result of a hash is `5` and the filter is `01001110`, the bit is considered set.

要将任意数据元素与 bloom 过滤器进行比较，需要使用用于创建 bloom 过滤器的相同参数对其进行散列。具体来说，它是 hashed nHashFuncs 时间，每次使用过滤器中提供的相同 nTweak，结果输出是过滤器字段中提供的位字段大小的模数。执行每个哈希后，将检查筛选器，以查看是否设置了该索引位置的位。例如，如果散列的结果为5，过滤器为01001110，则认为位已设置。

If the result of every hash points to a set bit, the filter matches. If any of the results points to an unset bit, the filter does not match.

如果每个散列的结果指向一个设置位，则过滤器匹配。如果任何结果指向未设置的位，则筛选器不匹配。

The following transaction elements are compared against bloom filters. All elements will be hashed in the byte order used in blocks (for example, TXIDs will be in internal byte order).

下面的事务元素将与 bloom 过滤器进行比较。所有元素将按块中使用的字节顺序散列(例如，txid 将按内部字节顺序散列)。

- **TXIDs:** the transaction’s SHA256(SHA256()) hash.
  
  TXIDs: 事务的 SHA256(SHA256())散列。

- **Outpoints:** each 36-byte outpoint used this transaction’s input section is individually compared to the filter.
  
  出发点: 使用此事务的输入部分的每个36字节出发点都将单独与过滤器进行比较。

- **Signature Script Data:** each element pushed onto the stack by a data-pushing opcode in a signature script from this transaction is individually compared to the filter. This includes data elements present in P2SH redeem scripts when they are being spent.
  
  签名脚本数据(Signature Script Data) : 该事务的签名脚本中的数据推送操作码将每个元素推送到堆栈上，并与过滤器进行单独比较。这包括在使用 P2SH 赎回脚本时出现的数据元素。

- **PubKey Script Data:** each element pushed onto the the stack by a data-pushing opcode in any pubkey script from this transaction is individually compared to the filter. (If a pubkey script element matches the filter, the filter will be immediately updated if the `BLOOM_UPDATE_ALL` flag was set; if the pubkey script is in the P2PKH format and matches the filter, the filter will be immediately updated if the `BLOOM_UPDATE_P2PUBKEY_ONLY` flag was set. See the subsection below for details.)
  
  PubKey 脚本数据: 通过事务中的任何 PubKey 脚本中的数据推送操作码推送到堆栈上的每个元素都单独与过滤器进行比较。(如果一个 pubkey 脚本元素与过滤器匹配，那么如果设置了 BLOOM _ update _ all 标志，过滤器将立即更新; 如果 pubkey 脚本是 P2PKH 格式并与过滤器匹配，那么如果设置了 BLOOM _ update _ p2pubkey _ only 标志，过滤器将立即更新。详情请参阅下面的小节。)

The following annotated hexdump of a transaction is from the [raw transaction format section](https://developer.bitcoin.org/reference/transactions.html#raw-transaction-format); the elements which would be checked by the filter are emphasized in bold. Note that this transaction’s TXID (**``01000000017b1eab[…]``**) would also be checked, and that the outpoint TXID and index number below would be checked as a single 36-byte element.

下面带注释的事务 hexdump 来自原始事务格式部分; 过滤器将检查的元素以粗体显示。注意，这个事务的 TXID (“0100000017b1eab [ ... ]”)也将被检查，下面的 outpoint TXID 和索引号将被检查为单个36字节的元素。

```
01000000 ................................... Version

01 ......................................... Number of inputs
|
| 7b1eabe0209b1fe794124575ef807057
| c77ada2138ae4fa8d6c4de0398a14f3f ......... Outpoint TXID
| 00000000 ................................. Outpoint index number
|
| 49 ....................................... Bytes in sig. script: 73
| | 48 ..................................... Push 72 bytes as data
| | | 30450221008949f0cb400094ad2b5eb3
| | | 99d59d01c14d73d8fe6e96df1a7150de
| | | b388ab8935022079656090d7f6bac4c9
| | | a94e0aad311a4268e082a725f8aeae05
| | | 73fb12ff866a5f01 ..................... Secp256k1 signature
|
| ffffffff ................................. Sequence number: UINT32_MAX

01 ......................................... Number of outputs
| f0ca052a01000000 ......................... Satoshis (49.99990000 BTC)
|
| 19 ....................................... Bytes in pubkey script: 25
| | 76 ..................................... OP_DUP
| | a9 ..................................... OP_HASH160
| | 14 ..................................... Push 20 bytes as data
| | | cbc20a7664f2f69e5355aa427045bc15
| | | e7c6c772 ............................. PubKey hash
| | 88 ..................................... OP_EQUALVERIFY
| | ac ..................................... OP_CHECKSIG

00000000 ................................... locktime: 0 (a block height)
```

**Updating A Bloom Filter**

更新 Bloom Filter

Clients will often want to track inputs that spend outputs (outpoints) relevant to their wallet, so the filterload field *nFlags* can be set to allow the filtering node to update the filter when a match is found. When the filtering node sees a pubkey script that pays a pubkey, address, or other data element matching the filter, the filtering node immediately updates the filter with the outpoint corresponding to that pubkey script.

客户机通常希望跟踪与其钱包相关的输出(断点) ，因此可以设置 filterload 字段 nFlags，以允许筛选节点在找到匹配项时更新筛选器。当过滤节点看到一个 pubkey 脚本支付一个 pubkey、地址或其他与过滤器匹配的数据元素时，过滤节点立即用与该 pubkey 脚本对应的 outpoint 更新过滤器。

![Automatically Updating Bloom Filters](https://developer.bitcoin.org/_images/en-bloom-update.svg)

Automatically Updating Bloom Filters[](https://developer.bitcoin.org/reference/p2p_networking.html#id5 "Permalink to this image")

自动更新 Bloom Filters

If an input later spends that outpoint, the filter will match it, allowing the filtering node to tell the client that one of its transaction outputs has been spent.

如果输入稍后使用了该 outpoint，则过滤器将匹配该 outpoint，从而允许过滤节点告诉客户端它的一个事务输出已经使用。

The *nFlags* field has three allowed values:

nFlags 字段有三个允许的值:

| Value价值 | Name姓名                                 | Description描述                                                                                                                                                                                                                                                        |
| ------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0       | BLOOM_UPDATE_NONE更新/更新/none            | The filtering node should not update the filter.筛选节点不应更新筛选器。                                                                                                                                                                                                         |
| 1       | BLOOM_UPDATE_ALL更新所有                   | If the filter matches any data element in a pubkey script, the corresponding outpoint is added to the filter.如果筛选器匹配 pubkey 脚本中的任何数据元素，则将相应的输出点添加到筛选器中。                                                                                                              |
| 2图2     | BLOOM_UPDATE_P2PUBKEY_ONLY2pubkey only | If the filter matches any data element in a pubkey script and that script is either a P2PKH or non-P2SH pay-to-multisig script, the corresponding outpoint is added to the filter.如果过滤器匹配 pubkey 脚本中的任何数据元素，并且该脚本是 P2PKH 或非 p2sh pay-to-multisig 脚本，则将相应的输出点添加到过滤器中。 |

In addition, because the filter size stays the same even though additional elements are being added to it, the false positive rate increases. Each false positive can result in another element being added to the filter, creating a feedback loop that can (after a certain point) make the filter useless. For this reason, clients using automatic filter updates need to monitor the actual false positive rate and send a new filter when the rate gets too high.

此外，由于过滤器大小保持不变，即使添加了其他元素，误报率也会增加。每一个假阳性都会导致另一个元素被加入到过滤器中，从而产生一个反馈循环，使得过滤器(在某一点之后)失效。因此，使用自动过滤器更新的客户端需要监视实际的误报率，并在误报率过高时发送一个新的过滤器。

### GetAddr

The [`getaddr` message](https://developer.bitcoin.org/reference/p2p_networking.html#getaddr) requests an [`addr` message](https://developer.bitcoin.org/reference/p2p_networking.html#addr) from the receiving node, preferably one with lots of IP addresses of other receiving nodes. The transmitting node can use those IP addresses to quickly update its database of available nodes rather than waiting for unsolicited [`addr` messages](https://developer.bitcoin.org/reference/p2p_networking.html#addr) to arrive over time.

`getaddr`消息从接收节点请求一条`addr`消息，最好是一条具有其他接收节点大量 IP 地址的消息。发送节点可以使用这些 IP 地址快速更新可用节点的数据库，而不是等待未经请求的“`addr`息随时间到达。

There is no payload in a [`getaddr` message](https://developer.bitcoin.org/reference/p2p_networking.html#getaddr). See the [message header section](https://developer.bitcoin.org/reference/p2p_networking.html#message-headers) for an example of a message without a payload.

`getaddr`消息中没有有效负载。有关无负载消息的示例，请参见消息头部分。

### Ping

The [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) helps confirm that the receiving peer is still connected. If a TCP/IP error is encountered when sending the [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) (such as a connection timeout), the transmitting node can assume that the receiving node is disconnected. The response to a [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) is the [`pong` message](https://developer.bitcoin.org/reference/p2p_networking.html#pong).

`ping`消息有助于确认接收端仍然连接。如果在发送“`ping`息时遇到 TCP/IP 错误(例如连接超时) ，发送节点可以假定接收节点已断开连接。对“ `ping`的响应是`pong`消息。

Before [protocol version 60000](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions), the [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) had no payload. As of [protocol version 60001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions) and all later versions, the message includes a single field, the nonce.

在协议版本60000之前，`ping`消息没有负载。在协议版本60001和所有更新版本中，消息包含一个字段 nonce。

| Bytes字节 | Name姓名  | Data Type数据类型 | Description描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------- | ------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8图8     | nonce现在 | uint64_t64t   | *Added in*[protocol version 60001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP31](https://github.com/bitcoin/bips/blob/master/bip-0031.mediawiki)*.* Random nonce assigned to this [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping). The responding [`pong` message](https://developer.bitcoin.org/reference/p2p_networking.html#pong) will include this nonce to identify the [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) to which it is replying.在协议版本60001中添加，如 bip31所描述。分配给这个`ping`消息的 Random nonce。响应的`pong`邮件将包含此 nonce，以标识它正在回复的“`ping`件。 |

The annotated hexdump below shows a [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping). (The message header has been omitted.)

下面带注释的 hexdump 显示了一条`ping`消息(消息头被省略了。)

0094102111e2af4d ... Nonce

### Pong

*Added in*[protocol version 60001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP31](https://github.com/bitcoin/bips/blob/master/bip-0031.mediawiki)*.*

在协议版本60001中添加，如 bip31所描述。

The [`pong` message](https://developer.bitcoin.org/reference/p2p_networking.html#pong) replies to a [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping), proving to the pinging node that the ponging node is still alive. Bitcoin Core will, by default, disconnect from any clients which have not responded to a [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) within 20 minutes.

`pong`消息回复`ping`消息，向 ping 节点证明 ponging 节点仍然活着。默认情况下，比特币核心将在20分钟内与任何没有回复“`ping`息的客户断开连接。

To allow nodes to keep track of latency, the [`pong` message](https://developer.bitcoin.org/reference/p2p_networking.html#pong) sends back the same nonce received in the [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping) it is replying to.

为了允许节点跟踪延迟，`pong`消息发回它正在回复的`ping`消息中收到的相同 nonce。

The format of the [`pong` message](https://developer.bitcoin.org/reference/p2p_networking.html#pong) is identical to the [`ping` message](https://developer.bitcoin.org/reference/p2p_networking.html#ping); only the message header differs.

`pong`消息的格式与`ping`消息相同; 只是消息头不同。

### Reject

*Added in*[protocol version 70002](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP61](https://github.com/bitcoin/bips/blob/master/bip-0061.mediawiki)*.*

在协议版本70002中添加了由 bip61描述的内容。

*Deprecated in Bitcoin Core 0.18.0.*

比特币核心0.18.0中的弃用。

The [“reject” message](https://developer.bitcoin.org/reference/p2p_networking.html#reject) informs the receiving node that one of its previous messages has been rejected.

“拒绝”消息通知接收节点其以前的消息之一已被拒绝。

| Bytes字节    | Name姓名            | Data Type数据类型         | Description描述                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ----------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Varies*不同 | message bytes信息字节 | compactSize uint紧凑型尺寸 | The number of bytes in the following message field.下列消息字段中的字节数。                                                                                                                                                                                                                                                                                                                                                      |
| *Varies*不同 | message信息         | string弦               | The type of message rejected as ASCII text *without null padding*. For example: `tx`, `block`, or `version`.消息类型拒绝作为没有空填充的 ASCII 文本。例如: `tx`、`block`或`version`。                                                                                                                                                                                                                                                      |
| 1          | code代码            | char炭                 | The reject message code. See the table below.拒绝消息代码。请参见下表。                                                                                                                                                                                                                                                                                                                                                           |
| *Varies*不同 | reason bytes原因字节  | compactSize uint紧凑型尺寸 | The number of bytes in the following reason field. May be 0x00 if a text reason isn’t provided.以下原因字段中的字节数。如果没有提供文本原因，则可能为0x00。                                                                                                                                                                                                                                                                                      |
| *Varies*不同 | reason原因          | string弦               | The reason for the rejection in ASCII text. This should not be displayed to the user; it is only for debugging purposes.ASCII 文本中拒绝的原因。这不应该显示给用户; 它只是用于调试目的。                                                                                                                                                                                                                                                         |
| *Varies*不同 | extra data额外数据    | *varies*变化            | Optional additional data provided with the rejection. For example, most rejections of [`tx` messages](https://developer.bitcoin.org/reference/p2p_networking.html#tx) or [`block` messages](https://developer.bitcoin.org/reference/p2p_networking.html#block) include the hash of the rejected transaction or block header. See the code table below.拒绝时提供的可选附加数据。例如，`tx`消息或`block`消息的大多数拒绝包括拒绝事务或块标头的散列。请参阅下面的代码表。 |

The following table lists message reject codes. Codes are tied to the type of message they reply to; for example there is a 0x10 reject code for transactions and a 0x10 reject code for blocks.

下表列出了消息拒绝代码。代码与它们回复的消息类型绑定在一起; 例如，事务有一个0x10拒绝代码，块有一个0x10拒绝代码。

| Code代码       | In Reply To回覆                                                                                  | Extra Bytes额外字节 | Extra Type额外类型 | Description描述                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01第一季，第1集  | *any message*任何信息                                                                              | 0               | N/A不适用         | Message could not be decoded. Be careful of [“reject” message](https://developer.bitcoin.org/reference/p2p_networking.html#reject)feedback loops where two peers each don’t understand each other’s [“reject” messages](https://developer.bitcoin.org/reference/p2p_networking.html#reject) and so keep sending them back and forth forever.无法解码信息。要小心“拒绝”消息反馈循环，其中两个对等点彼此都不理解对方的“拒绝”消息，因此不断地来回发送它们。 |
| 0x10第一季，第10集 | [`block` message](https://developer.bitcoin.org/reference/p2p_networking.html#block)”屏蔽”信息     | 32图32           | char[32][32]   | Block is invalid for some reason (invalid proof-of-work, invalid signature, etc). Extra data may include the rejected block’s header hash.块由于某些原因无效(无效的工作证明、无效的签名等)。额外的数据可能包括被拒绝块的头散列。                                                                                                                                                                                                               |
| 0x10第一季，第10集 | [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx)`tx`留言           | 32图32           | char[32][32]   | Transaction is invalid for some reason (invalid signature, output value greater than input, etc.). Extra data may include the rejected transaction’s TXID.事务由于某种原因无效(签名无效、输出值大于输入等)。额外的数据可能包括被拒绝事务的 TXID。                                                                                                                                                                                            |
| 0x11第一季，第11集 | [`block` message](https://developer.bitcoin.org/reference/p2p_networking.html#block)”屏蔽”信息     | 32图32           | char[32][32]   | The block uses a version that is no longer supported. Extra data may include the rejected block’s header hash.该块使用不再支持的版本。额外的数据可能包括被拒绝块的标题散列。                                                                                                                                                                                                                                                        |
| 0x11第一季，第11集 | [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version)”版本”信息 | 0               | N/A不适用         | Connecting node is using a protocol version that the rejecting node considers obsolete and unsupported.连接节点正在使用被拒绝节点认为已过时和不受支持的协议版本。                                                                                                                                                                                                                                                                 |
| 0x12第一季，第12集 | [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx)`tx`留言           | 32图32           | char[32][32]   | Duplicate input spend (double spend): the rejected transaction spends the same input as a previously-received transaction. Extra data may include the rejected transaction’s TXID.重复输入开销(重复开销) : 被拒绝的事务花费的输入与以前接收的事务相同。额外的数据可能包括被拒绝事务的 TXID。                                                                                                                                                         |
| 0x12第一季，第12集 | [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version)”版本”信息 | 0               | N/A不适用         | More than one [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version) received in this connection.在此连接中接收到多个“版本”消息。                                                                                                                                                                                                                                                 |
| 0x40         | [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx)`tx`留言           | 32图32           | char[32][32]   | The transaction will not be mined or relayed because the rejecting node considers it non-standard—a transaction type or version unknown by the server. Extra data may include the rejected transaction’s TXID.由于拒绝节点认为事务类型或版本不为服务器所知，因此事务不会被挖掘或中转。额外的数据可能包括被拒绝事务的 TXID。                                                                                                                              |
| 0x41         | [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx)`tx`留言           | 32图32           | char[32][32]   | One or more output amounts are below the dust threshold. Extra data may include the rejected transaction’s TXID.一个或多个输出量低于尘埃阈值。额外的数据可能包括被拒绝事务的 TXID。                                                                                                                                                                                                                                                 |
| 0x42         | [`tx` message](https://developer.bitcoin.org/reference/p2p_networking.html#tx)`tx`留言           |                 | char[32][32]   | The transaction did not have a large enough fee or priority to be relayed or mined. Extra data may include the rejected transaction’s TXID.这项交易没有足够大的费用或优先权来进行中继或监听。额外的数据可能包括被拒绝事务的 TXID。                                                                                                                                                                                                            |
| 0x43         | [`block` message](https://developer.bitcoin.org/reference/p2p_networking.html#block)”屏蔽”信息     | 32图32           | char[32][32]   | The block belongs to a block chain which is not the same block chain as provided by a compiled-in checkpoint. Extra data may include the rejected block’s header hash.该块属于一个块链，该块链与编译入检查点提供的块链不同。额外的数据可能包括被拒绝块的标题散列。                                                                                                                                                                                 |

The annotated hexdump below shows a [“reject” message](https://developer.bitcoin.org/reference/p2p_networking.html#reject). (The message header has been omitted.)

下面带注释的 hexdump 显示了一个“ reject”消息(消息头被省略了。)

02 ................................. Number of bytes in message: 2
7478 ............................... Type of message rejected: tx
12 ................................. Reject code: 0x12 (duplicate)
15 ................................. Number of bytes in reason: 21
6261642d74786e732d696e707574732d
7370656e74 ......................... Reason: bad-txns-inputs-spent
394715fcab51093be7bfca5a31005972
947baf86a31017939575fb2354222821 ... TXID

### SendHeaders

The [`sendheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#sendheaders) tells the receiving peer to send new block announcements using a [`headers` message](https://developer.bitcoin.org/reference/p2p_networking.html#headers) rather than an [`inv` message](https://developer.bitcoin.org/reference/p2p_networking.html#inv).

`sendheaders`消息告诉接收端使用`headers`消息而不是`inv`消息发送新的块公告。

There is no payload in a [`sendheaders` message](https://developer.bitcoin.org/reference/p2p_networking.html#sendheaders). See the [message header section](https://developer.bitcoin.org/reference/p2p_networking.html#message-headers) for an example of a message without a payload.

`sendheaders`消息中没有有效负载。有关无负载消息的示例，请参见消息头部分。

### VerAck

*Added in*[protocol version 209](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.*

增加了协议版本209。

The [`verack` message](https://developer.bitcoin.org/reference/p2p_networking.html#verack) acknowledges a previously-received [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version), informing the connecting node that it can begin to send other messages. The [`verack` message](https://developer.bitcoin.org/reference/p2p_networking.html#verack) has no payload; for an example of a message with no payload, see the [message headers section](https://developer.bitcoin.org/reference/p2p_networking.html#message-headers).

`verack`消息确认以前收到的`version`消息，通知连接节点它可以开始发送其他消息。“`verack`息没有有效负载; 有关没有有效负载的消息的示例，请参阅消息头部分。

### Version

The [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version) provides information about the transmitting node to the receiving node at the beginning of a connection. Until both peers have exchanged [`version` messages](https://developer.bitcoin.org/reference/p2p_networking.html#version), no other messages will be accepted.

“版本”消息在连接开始时向接收节点提供有关发送节点的信息。在两个对等点交换“版本”消息之前，不会接受其他消息。

If a [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version) is accepted, the receiving node should send a [`verack` message](https://developer.bitcoin.org/reference/p2p_networking.html#verack)—but no node should send a [`verack` message](https://developer.bitcoin.org/reference/p2p_networking.html#verack) before initializing its half of the connection by first sending a [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version).

如果一个`version`消息被接受，接收节点应该发送一个`verack`消息ー但是任何节点在初始化它的一半连接之前都不应该发送一个“`version`息。

| Bytes    | Name                  | Data Type        | Required/Optional                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------- | --------------------- | ---------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4        | version               | int32            | Required                                            | The highest protocol version understood by the transmitting node. See the [protocol version section](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions).传输节点可以理解的最高协议版本。请参阅协议版本部分。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 8        | services              | uint64           | Required                                            | The services supported by the transmitting node encoded as a bitfield. See the list of service codes below.传输节点支持的服务被编码为位字段。请参阅下面的服务代码列表。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 8        | timestamp             | int64            | Required                                            | The current [Unix epoch time](https://en.wikipedia.org/wiki/Unix_time) according to the transmitting node’s clock. Because nodes will reject blocks with timestamps more than two hours in the future, this field can help other nodes to determine that their clock is wrong.根据传输节点的时钟计算当前 Unix 新纪元的时间。因为节点在将来会拒绝时间戳超过两个小时的块，所以这个字段可以帮助其他节点确定他们的时钟是错误的。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 8        | addr_recv services    | uint64           | Required                                            | The services supported by the receiving node as perceived by the transmitting node. Same format as the ‘services’ field above. Bitcoin Core will attempt to provide accurate information. [BitcoinJ](http://bitcoinj.github.io/)will, by default, always send 0.发送节点感知到的接收节点所支持的服务。与上面的“服务”字段的格式相同。比特币核心将试图提供准确的信息。默认情况下，BitcoinJ 总是发送0。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 16       | addr_recv IP address  | char[16]         | Required                                            | The IPv6 address of the receiving node as perceived by the transmitting node in **big endian byte order**. IPv4 addresses can be provided as [IPv4-mapped IPv6 addresses](http://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses). Bitcoin Core will attempt to provide accurate information. [BitcoinJ](http://bitcoinj.github.io/)will, by default, always return ::ffff:127.0.0.1发送节点感知到的接收节点的 IPv6地址，大端字节顺序。IPv4地址可以作为 IPv4-映射的 IPv6地址提供。比特币核心将试图提供准确的信息。在默认情况下，BitcoinJ 总是返回: : 127.0.0.0.1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2        | addr_recv port        | uint16           | Required                                            | The port number of the receiving node as perceived by the transmitting node in **big endian byte order**.发送节点感知到的接收节点的端口号，以大尾数字节顺序排列。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 8        | addr_trans services   | uint64           | Required                                            | *Added in*[protocol version 106](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* The services supported by the transmitting node. Should be identical to the ‘services’ field above.在协议版本106中添加。传输节点支持的服务。应该与上面的“服务”字段相同。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 16       | addr_trans IP address | char[16]         | Required                                            | *Added in*[protocol version 106](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* The IPv6 address of the transmitting node in **big endian byte order**. IPv4 addresses can be provided as [IPv4-mapped IPv6 addresses](http://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses). Set to ::ffff:127.0.0.1 if unknown.在协议版本106中添加。传输节点 IPv6地址的大端字节顺序。IPv4地址可以作为 IPv4-映射的 IPv6地址提供。设置为: : ffff: 127.0.0.1，如果未知。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2        | addr_trans port       | uint16           | Required                                            | *Added in*[protocol version 106](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* The port number of the transmitting node in **big endian byte order**.在协议版本106中增加。传输节点的端口号以大端字节顺序排列。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 8        | nonce                 | uint64           | Required                                            | *Added in*[protocol version 106](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* A random nonce which can help a node detect a connection to itself. If the nonce is 0, the nonce field is ignored. If the nonce is anything else, a node should terminate the connection on receipt of a [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version)with a nonce it previously sent.在协议版本106中添加。一个可以帮助节点检测到自身连接的随机 nonce。如果 nonce 为0，则忽略 nonce 字段。如果 nonce 是其他任何东西，那么节点应该在收到`version`消息时终止连接，并在此前发送 nonce 消息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| *Varies* | user_agent bytes      | compactSize uint | Required                                            | *Added in*[protocol version 106](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* Number of bytes in following user_agent field. If 0x00, no user agent field is sent.在协议版本106中添加。在下面的 user _ agent 字段中的字节数。如果是0x00，则不发送用户代理字段。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| *Varies* | user_agent            | string           | Required if user_agent bytes > 0如果用户 _ 代理字节 > 0，则需要 | *Added in*[protocol version 106](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*. Renamed in*[protocol version 60000](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* User agent as defined by [BIP14](https://github.com/bitcoin/bips/blob/master/bip-0014.mediawiki). Previously called subVer.在协议版本106中添加。在协议版本60000中重命名。用户代理由 BIP14定义。以前称为 subVer。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 4        | start_height          | int32            | Required                                            | *Added in*[protocol version 209](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*.* The height of the transmitting node’s best block chain or, in the case of an SPV client, best block header chain.增加了协议版本209。发送节点的最佳块链的高度，或者在 SPV 客户端的情况下，最佳块头链的高度。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1        | relay                 | bool             | Optional                                            | *Added in*[protocol version 70001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions)*as described by*[BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)*.* Transaction relay flag. If 0x00, no [`inv` messages](https://developer.bitcoin.org/reference/p2p_networking.html#inv) or [`tx` messages](https://developer.bitcoin.org/reference/p2p_networking.html#tx) announcing new transactions should be sent to this client until it sends a [`filterload` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterload) or [`filterclear` message](https://developer.bitcoin.org/reference/p2p_networking.html#filterclear). If the relay field is not present or is set to 0x01, this node wants [`inv` messages](https://developer.bitcoin.org/reference/p2p_networking.html#inv) and [`tx` messages](https://developer.bitcoin.org/reference/p2p_networking.html#tx) announcing new transactions.增加了协议版本70001，如 bip37所描述。事务中继标志。如果是0x00，在该客户端发送`filterload`消息或`filterclear`消息之前，不应向该客户端发送宣布新事务的`inv`消息或`tx`消息。如果中继字段不存在或设置为0x01，则该节点需要“`inv`息和“`tx`息来宣布新的事务。 |

The following service identifiers have been assigned.

分配了以下服务标识符。

| Value  | Name                     | Description                                                                                                                                                                                                                                                                                                                      |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x00   | *Unnamed*未命名的            | This node is not a full node. It may not be able to provide any data except for the transactions it originates.此节点不是完整的节点。它可能不能提供任何数据，除非它发起的事务。                                                                                                                                                                                  |
| 0x01   | NODE_NETWORK节点网络         | This is a full node and can be asked for full blocks. It should implement all protocol features available in its self-reported protocol version.这是一个完整的节点，可以请求完整的块。它应该实现其自我报告的协议版本中可用的所有协议特性。                                                                                                                                    |
| 0x02   | NODE_GETUTXO节点/getutxo   | This is a full node capable of responding to the getutxo protocol request. This is not supported by any currently-maintained Bitcoin node. See [BIP64](https://github.com/bitcoin/bips/blob/master/bip-0064.mediawiki) for details on how this is implemented.这是一个能够响应 getutxo 协议请求的完整节点。这不支持任何目前维护的比特币节点。有关如何实现的详细信息，请参阅 BIP64。 |
| 0x04   | NODE_BLOOM节点布鲁姆          | This is a full node capable and willing to handle bloom-filtered connections. See [BIP111](https://github.com/bitcoin/bips/blob/master/bip-0111.mediawiki) for details.这是一个能够并且愿意处理开花过滤连接的完整节点。详细信息请参阅 BIP111。                                                                                                                   |
| 0x08   | NODE_WITNESS节点目击者        | This is a full node that can be asked for blocks and transactions including witness data. See [BIP144](https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki) for details.这是一个完整的节点，可以请求它提供包括见证数据在内的块和事务。                                                                                                               |
| 0x10   | NODE_XTHIN节点 xthin       | This is a full node that supports Xtreme Thinblocks. This is not supported by any currently-maintained Bitcoin node.这是一个支持 Xtreme Thinblocks 的完整节点，目前任何维护的比特币节点都不支持它。                                                                                                                                                            |
| 0x0400 | NODE_NETWORK_LIMITED节点网络 | This is the same as NODE_NETWORK but the node has at least the last 288 blocks (last 2 days). See [BIP159](https://github.com/bitcoin/bips/blob/master/bip-0159.mediawiki) for details on how this is implemented.这与 NODE _ network 相同，但是该节点至少有最近的288个块(最后2天)。有关如何实施的详细信息，请参阅 BIP159。                                            |

**Note:** [Protocol version 70001](https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions) introduced the optional `relay` field, adding the possibility of an additional byte to the [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version). This introduces an incompatibility with implementations of lower protocol versions which validate the [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version) size. When implementing support for protocol versions less than 70001 you may want to handle the case of a peer potentially sending an extra byte, treating it as invalid only in the case of a requested protocol version less than 70001.

注意: Protocol version 70001引入了可选的中继字段，为`version`消息增加了一个附加字节的可能性。这将导致与验证“版本”消息大小的低协议版本的实现不兼容。当实现对小于70001的协议版本的支持时，您可能希望处理对方可能发送一个额外字节的情况，只有在请求的协议版本小于70001的情况下才将其视为无效。

The following annotated hexdump shows a [`version` message](https://developer.bitcoin.org/reference/p2p_networking.html#version). (The message header has been omitted and the actual IP addresses have been replaced with [RFC5737](http://tools.ietf.org/html/rfc5737) reserved IP addresses.)

下面带注释的 hexdump 显示了一条`version`消息。(消息头被省略，实际 IP 地址已被 RFC5737保留 IP 地址替换。)

```
72110100 ........................... Protocol version: 70002
0100000000000000 ................... Services: NODE_NETWORK
bc8f5e5400000000 ................... [Epoch time][unix epoch time]: 1415483324
0100000000000000 ................... Receiving node's services
00000000000000000000ffffc61b6409 ... Receiving node's IPv6 address
208d ............................... Receiving node's port number
0100000000000000 ................... Transmitting node's services
00000000000000000000ffffcb0071c0 ... Transmitting node's IPv6 address
208d ............................... Transmitting node's port number
128035cbc97953f8 ................... Nonce
0f ................................. Bytes in user agent string: 15
2f5361746f7368693a302e392e332f ..... User agent: /Satoshi:0.9.3/
cf050500 ........................... Start height: 329167
01 ................................. Relay flag: true
```
