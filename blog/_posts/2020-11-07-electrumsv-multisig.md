---
title: ElectrumSV多签重大BUG
summary: WhatsOnChain是精益进取的BSV浏览器，还提供了初步的API
date: 2020-11-07 23:17
category: 安全
tags:
- 比特币

---

昨天夜间，BSV bot的作者([我被盗了 600 BSV | aaron67's log](https://aaron67.cc/2020/11/08/lost-600-bsv/)遭遇了可怕的大量币丢失事件。

这是黑客盗取的交易
https://whatsonchain.com/tx/20adad8bd4cc694cfed4ccadff911433601e55b0f8779e839bc6579cb8d234f9

盗取时间是`时间戳 2020-11-06 15:44:45 utc `。而币是在`时间戳 2020-11-06 14:33:45 utc`， 也就是1个小时之前转入这个多签地址的。
黑客用的解锁脚本居然是`00 00`.

解锁和锁定脚本连起来后，分析结果为

| **行号** | **脚本**                                   | **主栈（左侧是栈底，右侧是栈顶）** | **从栈（左侧是栈底，右侧是栈顶）** | **说明**                                            |
| ------ | ---------------------------------------- | ------------------- | ------------------- | ------------------------------------------------- |
| **1**  | 0                                        | 0                   |                     | 未设置第1个签名和公钥                                       |
| **2**  | 0                                        | 0 0                 |                     | 未设置第2个签名和公钥                                       |
| **3**  | 0                                        | 0 0 0               |                     | 匹配成功的公钥数量，初始值0                                    |
| **4**  | OP_TOALTSTACK                            | 0 0                 | 0                   | 将初始值0放入从栈                                         |
| **5**  | OP_IF                                    |                     |                     | 第2个公钥为假，跳过行6到行14                                  |
| **6**  | OP_DUP                                   |                     |                     |                                                   |
| **7**  | OP_HASH160                               |                     |                     |                                                   |
| **8**  | dd2d89bb9f64cbdf4139ff0e23c4813124af85e6 |                     |                     |                                                   |
| **9**  | OP_EQUALVERIFY                           |                     |                     |                                                   |
| **10** | OP_CHECKSIGVERIFY                        |                     |                     |                                                   |
| **11** | OP_FROMALTSTACK                          |                     |                     |                                                   |
| **12** | OP_1ADD                                  |                     |                     |                                                   |
| **13** | OP_TOALTSTACK                            |                     |                     |                                                   |
| **14** | OP_ENDIF                                 |                     |                     |                                                   |
| **15** | OP_IF                                    | 0                   | 0                   | 第1个公钥为假，跳过行16到行24                                 |
| **16** | OP_DUP                                   |                     |                     |                                                   |
| **17** | OP_HASH160                               |                     |                     |                                                   |
| **18** | aef82c0ef3f0c1d867e12b64e9e8d2ebb983dc81 |                     |                     |                                                   |
| **19** | OP_EQUALVERIFY                           |                     |                     |                                                   |
| **20** | OP_CHECKSIGVERIFY                        |                     |                     |                                                   |
| **21** | OP_FROMALTSTACK                          |                     |                     |                                                   |
| **22** | OP_1ADD                                  |                     |                     |                                                   |
| **23** | OP_TOALTSTACK                            |                     |                     |                                                   |
| **24** | OP_ENDIF                                 |                     |                     |                                                   |
| **25** | OP_2                                     | 2                   | 0                   | 最少需要的公钥数量                                         |
| **26** | OP_FROMALTSTACK                          | 2 0                 |                     | 从栈数据移入主栈                                          |
| **27** | OP_GREATERTHANOREQUAL                    | TRUE                |                     | 最少需要的数量是否小于解锁的公钥数量（这里有错误？应该为 OP_LESSTHANOREQUAL ） |

最后的一行出BUG了。脚本完整的分析见[PDF](https://aaron67-public.oss-cn-beijing.aliyuncs.com/notesv-bug-analysis-multisig-accumulator.pdf)

经推测经纬是，andy写了个多签原型，里面有个条件比较的bug。然后esv没有仔细测试，就作为产品发布了。aaron喜欢新鲜事物，小笔尝试了一下，没问题。大笔存入，一个小时后，黑客出现，挥挥手拿走，不留一分[捂脸]