(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{598:function(e,t,r){"use strict";r.r(t);var n=r(8),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"p2p-网络例子"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#p2p-网络例子"}},[e._v("#")]),e._v(" P2P 网络例子")]),e._v(" "),r("p",[e._v("::: info")]),e._v(" "),r("p",[e._v("翻译自"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("P2P Network"),r("OutboundLink")],1)]),e._v(" "),r("p",[e._v(":::")]),e._v(" "),r("h2",{attrs:{id:"创建一个布隆过滤器-bloom-filter"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#创建一个布隆过滤器-bloom-filter"}},[e._v("#")]),e._v(" 创建一个布隆过滤器 Bloom Filter")]),e._v(" "),r("p",[e._v("In this section, we’ll use variable names that correspond to the field names in the "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#filterload",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("filterload")]),e._v(" message documentation"),r("OutboundLink")],1),e._v(". Each code block precedes the paragraph describing it.")]),e._v(" "),r("p",[e._v("在本节中，我们将使用与“ filterload”消息文档中的字段名对应的变量名。每个代码块都位于描述它的段落之前。")]),e._v(" "),r("p",[e._v("#!/usr/bin/env python")]),e._v(" "),r("p",[e._v("BYTES_MAX = 36000\nFUNCS_MAX = 50")]),e._v(" "),r("p",[e._v("nFlags = 0")]),e._v(" "),r("p",[e._v("We start by setting some maximum values defined in "),r("a",{attrs:{href:"https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki",target:"_blank",rel:"noopener noreferrer"}},[e._v("BIP37"),r("OutboundLink")],1),e._v(": the maximum number of bytes allowed in a filter and the maximum number of hash functions used to hash each piece of data. We also set nFlags to zero, indicating we don’t want the remote node to update the filter for us. (We won’t use nFlags again in the sample program, but real programs will need to use it.)")]),e._v(" "),r("p",[e._v("我们首先设置一些在 BIP37中定义的最大值: 过滤器中允许的最大字节数和哈希函数用于哈希每个数据块的最大数。我们还将 nFlags 设置为零，表示不希望远程节点为我们更新筛选器。(我们不会在示例程序中再次使用 nFlags，但真正的程序将需要使用它。)")]),e._v(" "),r("p",[e._v("n = 1\np = 0.0001")]),e._v(" "),r("p",[e._v("We define the number (n) of elements we plan to insert into the filter and the false positive rate (p) we want to help protect our privacy. For this example, we will set "),r("em",[e._v("n")]),e._v(" to one element and "),r("em",[e._v("p")]),e._v(" to a rate of 1-in-10,000 to produce a small and precise filter for illustration purposes. In actual use, your filters will probably be much larger.")]),e._v(" "),r("p",[e._v("我们定义计划插入到过滤器中的元素的数量(n)和我们希望帮助保护隐私的假阳性率(p)。对于这个示例，我们将 n 设置为一个元素，将 p 设置为1/10,000，以生成一个小而精确的过滤器，以便进行说明。在实际使用中，您的过滤器可能会大得多。")]),e._v(" "),r("p",[e._v("from math import log\nnFilterBytes = int(min((-1 / log(2)**2 * n * log(p)) / 8, BYTES_MAX))\nnHashFuncs = int(min(nFilterBytes * 8 / n * log(2), FUNCS_MAX))")]),e._v(" "),r("p",[e._v("from bitarray import bitarray  # from pypi.python.org/pypi/bitarray\nvData = nFilterBytes * 8 * bitarray('0', endian=\"little\")")]),e._v(" "),r("p",[e._v("Using the formula described in "),r("a",{attrs:{href:"https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki",target:"_blank",rel:"noopener noreferrer"}},[e._v("BIP37"),r("OutboundLink")],1),e._v(", we calculate the ideal size of the filter (in bytes) and the ideal number of hash functions to use. Both are truncated down to the nearest whole number and both are also constrained to the maximum values we defined earlier. The results of this particular fixed computation are 2 filter bytes and 11 hash functions. We then use "),r("em",[e._v("nFilterBytes")]),e._v(" to create a little-endian bit array of the appropriate size.")]),e._v(" "),r("p",[e._v("使用 BIP37中描述的公式，我们计算过滤器的理想大小(以字节为单位)和要使用的哈希函数的理想数量。两者都被截断为最接近的整数，并且都被限制为我们前面定义的最大值。这种固定计算的结果是2个过滤字节和11个哈希函数。然后，我们使用 nFilterBytes 创建适当大小的小尾位数组。")]),e._v(" "),r("p",[e._v("nTweak = 0")]),e._v(" "),r("p",[e._v("We also should choose a value for "),r("em",[e._v("nTweak")]),e._v(". In this case, we’ll simply use zero.")]),e._v(" "),r("p",[e._v("我们还应该为 nTweak 选择一个值。")]),e._v(" "),r("p",[e._v("import pyhash  # from https://github.com/flier/pyfasthash\nmurmur3 = pyhash.murmur3_32()")]),e._v(" "),r("p",[e._v("def bloom_hash(nHashNum, data):\nseed = (nHashNum * 0xfba4c795 + nTweak) & 0xffffffff\nreturn( murmur3(data, seed=seed) % (nFilterBytes * 8) )")]),e._v(" "),r("p",[e._v("We setup our hash function template using the formula and 0xfba4c795 constant set in "),r("a",{attrs:{href:"https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki",target:"_blank",rel:"noopener noreferrer"}},[e._v("BIP37"),r("OutboundLink")],1),e._v(". Note that we limit the size of the seed to four bytes and that we’re returning the result of the hash modulo the size of the filter in bits.")]),e._v(" "),r("p",[e._v("我们使用 BIP37中的公式和0xfba4c795常量集设置散列函数模板。注意，我们将种子的大小限制为四个字节，并且我们返回的散列模数的结果是以位为单位的过滤器的大小。")]),e._v(" "),r("p",[e._v('data_to_hash = "019f5b01d4195ecbc9398fbf3c3b1fa9" '),r("br"),e._v('\n+ "bb3183301d7a1fb3bd174fcfa40a2b65"\ndata_to_hash = data_to_hash.decode("hex")')]),e._v(" "),r("p",[e._v("For the data to add to the filter, we’re adding a TXID. Note that the TXID is in internal byte order.")]),e._v(" "),r("p",[e._v("对于要添加到过滤器的数据，我们添加一个 TXID。请注意，TXID 是按内部字节顺序排列的。")]),e._v(" "),r("p",[e._v('print "                             Filter (As Bits)"\nprint "nHashNum   nIndex   Filter   0123456789abcdef"\nprint "~~~~~~~~   ~~~~~~   ~~~~~~   ~~~~~~~~~~~~~~~~"\nfor nHashNum in range(nHashFuncs):\nnIndex = bloom_hash(nHashNum, data_to_hash)')]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v("## Set the bit at nIndex to 1\nvData[nIndex] = True\n\n## Debug: print current state\nprint ' {0:2} {1:2} {2} {3}'.format(\n    nHashNum,\n    hex(int(nIndex)),\n    vData.tobytes().encode(\"hex\"),\n    vData.to01()\n)\n")])])]),r("p",[e._v('print\nprint "Bloom filter:", vData.tobytes().encode("hex")')]),e._v(" "),r("p",[e._v("Now we use the hash function template to run a slightly different hash function for "),r("em",[e._v("nHashFuncs")]),e._v(" times. The result of each function being run on the transaction is used as an index number: the bit at that index is set to 1. We can see this in the printed debugging output:")]),e._v(" "),r("p",[e._v("现在，我们使用 hash 函数模板为 nHashFuncs 时间运行稍微不同的 hash 函数。在事务上运行的每个函数的结果都用作索引号: 该索引处的位被设置为1。我们可以在打印的调试输出中看到这一点:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v("                         Filter (As Bits)\n")])])]),r("p",[e._v("nHashNum   nIndex   Filter   0123456789abcdef")]),e._v(" "),r("p",[e._v("~~~~~~~~   ~~~~~~   ~~~~~~   ~~~~~~~~~~~~~~~~\n0      0x7     8000   0000000100000000\n1      0x9     8002   0000000101000000\n2      0xa     8006   0000000101100000\n3      0x2     8406   0010000101100000\n4      0xb     840e   0010000101110000\n5      0x5     a40e   0010010101110000\n6      0x0     a50e   1010010101110000\n7      0x8     a50f   1010010111110000\n8      0x5     a50f   1010010111110000\n9      0x8     a50f   1010010111110000\n10      0x4     b50f   1010110111110000\nBloom filter: b50f")]),e._v(" "),r("p",[e._v("Notice that in iterations 8 and 9, the filter did not change because the corresponding bit was already set in a previous iteration (5 and 7, respectively). This is a normal part of bloom filter operation.")]),e._v(" "),r("p",[e._v("注意，在第8和第9次迭代中，过滤器没有改变，因为相应的位已经在前一次迭代中设置好了(分别是第5和第7次迭代)。这是开花过滤器正常运行的一部分。")]),e._v(" "),r("p",[e._v("We only added one element to the filter above, but we could repeat the process with additional elements and continue to add them to the same filter. (To maintain the same false-positive rate, you would need a larger filter size as computed earlier.)")]),e._v(" "),r("p",[e._v("我们只在上面的过滤器中添加了一个元素，但是我们可以使用其他元素重复这个过程，并继续将它们添加到同一个过滤器中。(为了保持相同的假阳性率，您需要像前面计算的那样使用更大的过滤器大小。)")]),e._v(" "),r("p",[e._v("Note: for a more optimized Python implementation with fewer external dependencies, see "),r("a",{attrs:{href:"https://github.com/petertodd/python-bitcoinlib",target:"_blank",rel:"noopener noreferrer"}},[e._v("python-bitcoinlib’s"),r("OutboundLink")],1),e._v("bloom filter module which is based directly on Bitcoin Core’s C++ implementation.")]),e._v(" "),r("p",[e._v("注意: 如果想要一个外部依赖性更少的优化 Python 实现，请参见 Python-bitcoinlib 的 bloom filter 模块，该模块直接基于 Bitcoin Core 的 c + + 实现。")]),e._v(" "),r("p",[e._v("Using the "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#filterload",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("filterload")]),e._v(" message"),r("OutboundLink")],1),e._v(" format, the complete filter created above would be the binary form of the annotated hexdump shown below:")]),e._v(" "),r("p",[e._v("使用“ filterload”消息格式，上面创建的完整过滤器将是下面所示的带注释的 hexdump 的二进制形式:")]),e._v(" "),r("p",[e._v("02 ......... Filter bytes: 2\nb50f ....... Filter: 1010 1101 1111 0000\n0b000000 ... nHashFuncs: 11\n00000000 ... nTweak: 0/none\n00 ......... nFlags: BLOOM_UPDATE_NONE")]),e._v(" "),r("h2",{attrs:{id:"评估布隆过滤器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#评估布隆过滤器"}},[e._v("#")]),e._v(" 评估布隆过滤器")]),e._v(" "),r("p",[e._v("Using a bloom filter to find matching data is nearly identical to constructing a bloom filter—except that at each step we check to see if the calculated index bit is set in the existing filter.")]),e._v(" "),r("p",[e._v("使用 bloom filter 查找匹配数据几乎与构造 bloom filter 相同ーー除了在每一步我们都要检查计算出的索引位是否设置在现有的 filter 中。")]),e._v(" "),r("p",[e._v('vData = bitarray(endian=\'little\')\nvData.frombytes("b50f".decode("hex"))\nnHashFuncs = 11\nnTweak = 0\nnFlags = 0')]),e._v(" "),r("p",[e._v("Using the bloom filter created above, we import its various parameters. Note, as indicated in the section above, we won’t actually use "),r("em",[e._v("nFlags")]),e._v(" to update the filter.")]),e._v(" "),r("p",[e._v("使用上面创建的 bloom filter，我们导入它的各种参数。注意，如上面一节所示，我们实际上不会使用 nFlags 来更新过滤器。")]),e._v(" "),r("p",[e._v("def contains(nHashFuncs, data_to_hash):\nfor nHashNum in range(nHashFuncs):\n## bloom_hash as defined in previous section\nnIndex = bloom_hash(nHashNum, data_to_hash)")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v('    if vData[nIndex] != True:\n        print "MATCH FAILURE: Index {0} not set in {1}".format(\n            hex(int(nIndex)),\n            vData.to01()\n        )\n        return False\n')])])]),r("p",[e._v("We define a function to check an element against the provided filter. When checking whether the filter might contain an element, we test to see whether a particular bit in the filter is already set to 1 (if it isn’t, the match fails).")]),e._v(" "),r("p",[e._v("我们定义了一个函数，用于根据提供的过滤器检查元素。在检查过滤器是否可能包含元素时，我们会测试过滤器中的特定位是否已经设置为1(如果不是，匹配就失败)。")]),e._v(" "),r("h2",{attrs:{id:"test-1-same-txid-as-previously-added-to-filter"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#test-1-same-txid-as-previously-added-to-filter"}},[e._v("#")]),e._v(" Test 1: Same TXID as previously added to filter")]),e._v(" "),r("p",[e._v('data_to_hash = "019f5b01d4195ecbc9398fbf3c3b1fa9" '),r("br"),e._v('\n+ "bb3183301d7a1fb3bd174fcfa40a2b65"\ndata_to_hash = data_to_hash.decode("hex")\ncontains(nHashFuncs, data_to_hash)')]),e._v(" "),r("p",[e._v("Testing the filter against the data element we previously added, we get no output (indicating a possible match). Recall that bloom filters have a zero false negative rate—so they should always match the inserted elements.")]),e._v(" "),r("p",[e._v("根据我们前面添加的数据元素测试过滤器时，没有得到输出(表示可能的匹配)。回想一下 bloom 过滤器的误报率为零，所以它们应该始终匹配插入的元素。")]),e._v(" "),r("h2",{attrs:{id:"test-2-arbitrary-string"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#test-2-arbitrary-string"}},[e._v("#")]),e._v(" Test 2: Arbitrary string")]),e._v(" "),r("p",[e._v('data_to_hash = "1/10,000 chance this ASCII string will match"\ncontains(nHashFuncs, data_to_hash)')]),e._v(" "),r("p",[e._v("Testing the filter against an arbitrary element, we get the failure output below. Note: we created the filter with a 1-in-10,000 false positive rate (which was rounded up somewhat when we truncated), so it was possible this arbitrary string would’ve matched the filter anyway. It is not possible to set a bloom filter to a false positive rate of zero, so your program will always have to deal with false positives. The output below shows us that one of the hash functions returned an index number of 0x06, but that bit wasn’t set in the filter, causing the match failure:")]),e._v(" "),r("p",[e._v("测试针对任意元素的过滤器，我们得到下面的故障输出。注意: 我们创建了一个1/10,000的假阳性率的过滤器(当我们截断时，这个假阳性率被舍入了一些) ，所以这个任意的字符串可能已经匹配了这个过滤器。不可能将 bloom filter 设置为假阳性率为零，因此您的程序将总是不得不处理假阳性。下面的输出显示，其中一个散列函数返回的索引号为0x06，但是这个位没有在过滤器中设置，导致匹配失败:")]),e._v(" "),r("p",[e._v("MATCH FAILURE: Index 0x6 not set in 1010110111110000")]),e._v(" "),r("h2",{attrs:{id:"retrieving-a-merkleblock-检索-merkleblock"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#retrieving-a-merkleblock-检索-merkleblock"}},[e._v("#")]),e._v(" Retrieving A MerkleBlock 检索 MerkleBlock")]),e._v(" "),r("p",[e._v("For the "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("merkleblock")]),e._v(" message"),r("OutboundLink")],1),e._v(" documentation on the reference page, an actual merkle block was retrieved from the "),r("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),r("OutboundLink")],1),e._v(" and manually processed. This section walks through each step of the process, demonstrating basic "),r("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),r("OutboundLink")],1),e._v(" communication and merkle block processing.")]),e._v(" "),r("p",[e._v("对于参考页面上的"),r("code",[e._v("merkleblock")]),e._v("消息文档，实际的 merkle 块是从网络中检索并手动处理的。本节将介绍该过程的每个步骤，演示基本的网络通信和 merkle 块处理。")]),e._v(" "),r("p",[e._v("#!/usr/bin/env python")]),e._v(" "),r("p",[e._v("from time import sleep\nfrom hashlib import sha256\nimport struct\nimport sys")]),e._v(" "),r("p",[e._v('network_string = "f9beb4d9".decode("hex")  # Mainnet')]),e._v(" "),r("p",[e._v('def send(msg,payload):\n## Command is ASCII text, null padded to 12 bytes\ncommand = msg + ( ( 12 - len(msg) ) * "\\00" )')]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v('## Payload length is a uint32_t\npayload_raw = payload.decode("hex")\npayload_len = struct.pack("I", len(payload_raw))\n\n## Checksum is first 4 bytes of SHA256(SHA256(<payload>))\nchecksum = sha256(sha256(payload_raw).digest()).digest()[:4]\n\nsys.stdout.write(\n    network_string\n    + command\n    + payload_len\n    + checksum\n    + payload_raw\n)\nsys.stdout.flush()\n')])])]),r("p",[e._v("To connect to the P2P "),r("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),r("OutboundLink")],1),e._v(", the trivial Python function above was developed to compute message headers and send payloads decoded from hex.")]),e._v(" "),r("p",[e._v("为了连接到 P2P 网络，开发了上面的微型 Python 函数来计算消息报头并发送由十六进制解码的有效负载。")]),e._v(" "),r("h2",{attrs:{id:"create-a-version-message"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#create-a-version-message"}},[e._v("#")]),e._v(" Create a version message")]),e._v(" "),r("p",[e._v('send("version",\n"71110100" # ........................ Protocol Version: 70001\n+ "0000000000000000" # ................ Services: Headers Only (SPV)\n+ "c6925e5400000000" # ................ Time: 1415484102\n+ "00000000000000000000000000000000"\n+ "0000ffff7f000001208d" # ............ Receiver IP Address/Port\n+ "00000000000000000000000000000000"\n+ "0000ffff7f000001208d" # ............ Sender IP Address/Port\n+ "0000000000000000" # ................ Nonce (not used here)\n+ "1b" # .............................. Bytes in version string\n+ "2f426974636f696e2e6f726720457861"\n+ "6d706c653a302e392e332f" # .......... Version string\n+ "93050500" # ........................ Starting block height: 329107\n+ "00" # .............................. Relay transactions: false\n)')]),e._v(" "),r("p",[e._v("Peers on the "),r("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),r("OutboundLink")],1),e._v(" will not accept any requests until you send them a "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#version",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("version")]),e._v(" message"),r("OutboundLink")],1),e._v(". The receiving node will reply with their "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#version",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("version")]),e._v(" message"),r("OutboundLink")],1),e._v(" and a "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#verack",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("verack")]),e._v(" message"),r("OutboundLink")],1),e._v(".")]),e._v(" "),r("p",[e._v("网络上的对等点将不会接受任何请求，直到您向他们发送“版本”消息。接收节点将用"),r("code",[e._v("version")]),e._v("消息和"),r("code",[e._v("verack")]),e._v("消息进行回复。")]),e._v(" "),r("p",[e._v('sleep(1)\nsend("verack", "")')]),e._v(" "),r("p",[e._v("We’re not going to validate their "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#version",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("version")]),e._v(" message"),r("OutboundLink")],1),e._v(" with this simple script, but we will sleep a short bit and send back our own "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#verack",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("verack")]),e._v(" message"),r("OutboundLink")],1),e._v(" as if we had accepted their "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#version",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("version")]),e._v(" message"),r("OutboundLink")],1),e._v(".")]),e._v(" "),r("p",[e._v("我们不会用这个简单的脚本来验证他们的"),r("code",[e._v("version")]),e._v("消息，但是我们会睡一小会儿，然后发回我们自己的"),r("code",[e._v("verack")]),e._v("消息，就好像我们已经接受了他们的“"),r("code",[e._v("version")]),e._v("息一样。")]),e._v(" "),r("p",[e._v('send("filterload",\n"02"  # ........ Filter bytes: 2\n+ "b50f" # ....... Filter: 1010 1101 1111 0000\n+ "0b000000" # ... nHashFuncs: 11\n+ "00000000" # ... nTweak: 0/none\n+ "00" # ......... nFlags: BLOOM_UPDATE_NONE\n)')]),e._v(" "),r("p",[e._v("We set a bloom filter with the "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#filterload",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("filterload")]),e._v(" message"),r("OutboundLink")],1),e._v(". This filter is described in the two preceeding sections.")]),e._v(" "),r("p",[e._v("我们设置了一个带有“ filterload”消息的 bloom filter。")]),e._v(" "),r("p",[e._v('send("getdata",\n"01" # ................................. Number of inventories: 1\n+ "03000000" # ........................... Inventory type: filtered block\n+ "a4deb66c0d726b0aefb03ed51be407fb"\n+ "ad7331c6e8f9eef231b7000000000000" # ... Block header hash\n)')]),e._v(" "),r("p",[e._v("We request a merkle block for transactions matching our filter, completing our script.")]),e._v(" "),r("p",[e._v("我们为事务请求一个与我们的过滤器匹配的 merkle 块，完成我们的脚本。")]),e._v(" "),r("p",[e._v("To run the script, we simply pipe it to the Unix "),r("code",[e._v("`netcat")]),e._v(" command <"),r("a",{attrs:{href:"https://en.wikipedia.org/wiki/Netcat",target:"_blank",rel:"noopener noreferrer"}},[e._v("netcat - Wikipedia"),r("OutboundLink")],1),e._v(">"),r("code",[e._v("__ or one of its many clones, one of which is available for practically any platform. For example, with the original netcat and using hexdump (")]),e._v("hd`) to display the output:")]),e._v(" "),r("p",[e._v("为了运行这个脚本，我们只需将它通过管道传送到 Unix 的 netcat 命令 < https://en.wikipedia.org/wiki/netcat > ’或者它的许多克隆中的一个，其中一个实际上可用于任何平台。例如，使用原始的 netcat 并使用 hexdump (hd)来显示输出:")]),e._v(" "),r("h2",{attrs:{id:"connect-to-the-bitcoin-core-peer-running-on-localhost"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#connect-to-the-bitcoin-core-peer-running-on-localhost"}},[e._v("#")]),e._v(" Connect to the Bitcoin Core peer running on localhost")]),e._v(" "),r("p",[e._v("python get-merkle.py | nc localhost 8333 | hd")]),e._v(" "),r("p",[e._v("Part of the response is shown in the section below.")]),e._v(" "),r("p",[e._v("响应的一部分显示在下面一节中。")]),e._v(" "),r("h2",{attrs:{id:"parsing-a-merkleblock-解析-merkleblock"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#parsing-a-merkleblock-解析-merkleblock"}},[e._v("#")]),e._v(" Parsing A MerkleBlock 解析 MerkleBlock")]),e._v(" "),r("p",[e._v("In the section above, we retrieved a merkle block from the "),r("a",{attrs:{href:"https://developer.bitcoin.org/devguide/p2p_network.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("network"),r("OutboundLink")],1),e._v("; now we will parse it. Most of the block header has been omitted. For a more complete hexdump, see the example in the "),r("code",[e._v("`merkleblock")]),e._v(" message section <../reference/p2p_networking.html#merkleblock>`__.")]),e._v(" "),r("p",[e._v("在上面的部分中，我们从网络中检索了一个 merkle 块; 现在我们将解析它。大多数块头被省略了。有关更完整的 hexdump，请参见“ merkleblock message”部分中的示例 < 。./reference/p2p _ networking.html # merkleblock > ‘ _。")]),e._v(" "),r("p",[e._v("7f16c5962e8bd963659c793ce370d95f\n093bc7e367117b3c30c1f8fdd0d97287 ... Merkle root\n07000000 ........................... Transaction count: 7\n04 ................................. Hash count: 4\n3612262624047ee87660be1a707519a4\n43b1c1ce3d248cbfc6c15870f6c5daa2 ... Hash #1\n019f5b01d4195ecbc9398fbf3c3b1fa9\nbb3183301d7a1fb3bd174fcfa40a2b65 ... Hash #2\n41ed70551dd7e841883ab8f0b16bf041\n76b7d1480e4f0af9f3d4c3595768d068 ... Hash #3\n20d2a7bc994987302e5b1ac80fc425fe\n25f8b63169ea78e68fbaaefa59379bbf ... Hash #4\n01 ................................. Flag bytes: 1\n1d ................................. Flags: 1 0 1 1 1 0 0 0")]),e._v(" "),r("p",[e._v("We parse the above "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("merkleblock")]),e._v(" message"),r("OutboundLink")],1),e._v(" using the following instructions. Each illustration is described in the paragraph below it.")]),e._v(" "),r("p",[e._v("我们使用下面的说明来解析上面的"),r("code",[e._v("merkleblock")]),e._v("消息。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-001.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id1",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("We start by building the structure of a merkle tree based on the number of transactions in the block.")]),e._v(" "),r("p",[e._v("我们首先根据块中的事务数量构建 merkle 树的结构。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-002.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id2",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("The first flag is a 1 and the merkle root is (as always) a non-TXID node, so we will need to compute the hash later based on this node’s children. Accordingly, we descend into the merkle root’s left child and look at the next flag for instructions.")]),e._v(" "),r("p",[e._v("第一个标志是1，merkle root (一如既往)是非 txid 节点，因此稍后我们需要根据该节点的子节点计算散列。因此，我们下降到 merkle 根的左子节点，查看下一个标志以获取指令。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-003.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id3",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("The next flag in the example is a 0 and this is also a non-TXID node, so we apply the first hash from the "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("merkleblock")]),e._v(" message"),r("OutboundLink")],1),e._v(" to this node. We also don’t process any child nodes—according to the peer which created the "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("merkleblock")]),e._v(" message"),r("OutboundLink")],1),e._v(", none of those nodes will lead to TXIDs of transactions that match our filter, so we don’t need them. We go back up to the merkle root and then descend into its right child and look at the next (third) flag for instructions.")]),e._v(" "),r("p",[e._v("示例中的下一个标志是0，这也是一个非 txid 节点，因此我们将"),r("code",[e._v("merkleblock")]),e._v("消息中的第一个散列应用到该节点。我们也不处理任何子节点ー根据创建“"),r("code",[e._v("merkleblock")]),e._v("息的对等节点，这些节点都不会导致匹配我们过滤器的事务的 txid，因此我们不需要它们。我们返回到 merkle 根，然后下降到它的右子节点，并查看下一个(第三个)标志以获取指令。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-004.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id4",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("The third flag in the example is another 1 on another non-TXID node, so we descend into its left child.")]),e._v(" "),r("p",[e._v("该示例中的第三个标志是另一个非 txid 节点上的另一个1，因此我们深入到它的左子节点。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-005.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id5",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("The fourth flag is also a 1 on another non-TXID node, so we descend again—we will always continue descending until we reach a TXID node or a non-TXID node with a 0 flag (or we finish filling out the tree).")]),e._v(" "),r("p",[e._v("第四个标志也是另一个非 TXID 节点上的1，因此我们再次下降ーー我们将始终继续下降，直到到达一个 TXID 节点或一个带有0标志的非 TXID 节点(或者我们完成了树的填充)。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-006.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id6",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("Finally, on the fifth flag in the example (a 1), we reach a TXID node. The 1 flag indicates this TXID’s transaction matches our filter and that we should take the next (second) hash and use it as this node’s TXID.")]),e._v(" "),r("p",[e._v("最后，在示例(a 1)中的第五个标志上，我们到达一个 TXID 节点。1标志表示这个 TXID 的事务与我们的过滤器匹配，我们应该接受下一个(第二个)散列并将其用作这个节点的 TXID。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-007.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id7",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("The sixth flag also applies to a TXID, but it’s a 0 flag, so this TXID’s transaction doesn’t match our filter; still, we take the next (third) hash and use it as this node’s TXID.")]),e._v(" "),r("p",[e._v("第六个标志也应用于 TXID，但它是一个0标志，因此该 TXID 的事务与我们的过滤器不匹配; 但是，我们仍然使用下一个(第三个)散列并将其作为该节点的 TXID。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-008.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id8",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("We now have enough information to compute the hash for the fourth node we encountered—it’s the hash of the concatenated hashes of the two TXIDs we filled out.")]),e._v(" "),r("p",[e._v("现在我们有足够的信息来计算遇到的第四个节点的哈希值ーー它是我们填写的两个 txid 的连接哈希的哈希值。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-009.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id9",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("Moving to the right child of the third node we encountered, we fill it out using the seventh flag and final hash—and discover there are no more child nodes to process.")]),e._v(" "),r("p",[e._v("移动到我们遇到的第三个节点的正确子节点，我们使用第七个标志和最终散列填充它，然后发现没有更多的子节点需要处理。")]),e._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"Parsing A MerkleBlock","data-src":"https://developer.bitcoin.org/_images/en-merkleblock-parsing-011.svg",loading:"lazy"}})]),e._v(" "),r("p",[e._v("Parsing A MerkleBlock"),r("a",{attrs:{href:"https://developer.bitcoin.org/examples/p2p_networking.html#id10",title:"Permalink to this image",target:"_blank",rel:"noopener noreferrer"}},[r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("解析 MerkleBlock")]),e._v(" "),r("p",[e._v("We hash as appropriate to fill out the tree. Note that the eighth flag is not used—this is acceptable as it was required to pad out a flag byte.")]),e._v(" "),r("p",[e._v("我们根据需要散列以填写这棵树。注意，第八个标志没有被使用ーー这是可以接受的，因为它需要填充一个标志字节。")]),e._v(" "),r("p",[e._v("The final steps would be to ensure the computed merkle root is identical to the merkle root in the header and check the other steps of the parsing checklist in the "),r("a",{attrs:{href:"https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("merkleblock")]),e._v(" message"),r("OutboundLink")],1),e._v(" section.")]),e._v(" "),r("p",[e._v("最后的步骤是确保计算出的 merkle 根与头中的 merkle 根相同，并在"),r("code",[e._v("merkleblock")]),e._v("消息部分中检查解析清单的其他步骤。")])])}),[],!1,null,null,null);t.default=a.exports}}]);