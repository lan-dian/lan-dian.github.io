(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{327:function(e,o,t){"use strict";t.r(o);var v=t(8),r=Object(v.a)({},(function(){var e=this,o=e._self._c;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h2",{attrs:{id:"存储引擎"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#存储引擎"}},[e._v("#")]),e._v(" 存储引擎")]),e._v(" "),o("p",[e._v("底层存储引擎是基于LSM-Tree数据结构设计的。写入数据时会先写WAL日志，再将数据写到写缓存MemStore中，等写缓存达到一定规模后或满足其他触发条件才会flush刷写到磁盘，这样就将磁盘随机写变成了顺序写，提高了写性能。"),o("strong",[e._v("每一次刷写磁盘都会生成新的HFile文件")]),e._v("。\n随着时间推移，写入的HFile会越来越多，查询数据时就会因为要进行多次io导致性能降低，为了提升读性能，HBase会定期执行compaction操作以"),o("strong",[e._v("合并HFile")]),e._v("。")]),e._v(" "),o("blockquote",[o("p",[e._v("读优化")])]),e._v(" "),o("p",[e._v("此外，HBase在读路径上也有诸多设计，其中一个重要的点是设计了"),o("strong",[e._v("BlockCache读缓存")]),e._v("。这样以后，读取数据时会依次从BlockCache、MemStore以及HFile中seek数据，再加上一些其他设计比如"),o("strong",[e._v("布隆过滤器、索引")]),e._v("等，保证了HBase的高性能。")]),e._v(" "),o("h2",{attrs:{id:"写流程"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#写流程"}},[e._v("#")]),e._v(" 写流程")]),e._v(" "),o("ol",[o("li",[e._v("访问Zookeeper获取具体交互的服务器地址，并且缓存在客户端。")]),e._v(" "),o("li",[e._v("追加到WAL中，写在MemStore中"),o("strong",[e._v("并且排序")]),e._v("。\n"),o("ol",[o("li",[e._v("会先写WAL再写内存，如果同步日志失败，那么内存也会被回滚")])])]),e._v(" "),o("li",[e._v("MemStore刷盘(基本上包含了所以刷盘的可能性，非常值得学习)\n"),o("ol",[o("li",[e._v("Region的"),o("strong",[e._v("memstore太大")]),e._v("了会刷盘")]),e._v(" "),o("li",[o("strong",[e._v("写入的太快会阻塞写入")]),e._v("，抛出异常，并且刷新memstore")]),e._v(" "),o("li",[e._v("总的RegionServer太大也会刷盘，因为都在一个JVM内存里面，所以在"),o("strong",[e._v("内存占用过高的时候，减少gc的影响")]),e._v("，从大到小开始刷数据")]),e._v(" "),o("li",[o("strong",[e._v("定时刷新")]),e._v("，避免如果没有数据写入就不刷新到磁盘的问题")]),e._v(" "),o("li",[o("strong",[e._v("更新次数太多")]),e._v("，如果更新的量很小，但是更新的次数多，也不会导致内存扩张，所以在更新次数多的时候也刷盘")]),e._v(" "),o("li",[o("strong",[e._v("WAL文件太大")]),e._v("的时候也会刷新")])])])]),e._v(" "),o("h2",{attrs:{id:"读流程"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#读流程"}},[e._v("#")]),e._v(" 读流程")]),e._v(" "),o("ol",[o("li",[e._v("访问Zookeeper获取具体交互的服务器地址，并且缓存在客户端。")]),e._v(" "),o("li",[e._v("分别在 Block Cache（读缓存），MemStore 和 Store File（HFile）中查询目标数据，并将查到的所有数据进行合并。"),o("strong",[e._v("此处所有数据是指同一条数据的不同版本（time stamp）或者不同的类型（Put/Delete）")]),e._v("。")])]),e._v(" "),o("h3",{attrs:{id:"block-cahce"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#block-cahce"}},[e._v("#")]),e._v(" Block Cahce")]),e._v(" "),o("p",[e._v("HBase缓存不像对传统缓存理解的一样读了内存如果有数据就不再读磁盘，因为它是以时间戳进行版本控制的，所以"),o("strong",[e._v("不能只读内存")]),e._v("。\nHBase读数据无论如何都会扫描HDFS磁盘，只是在 BlockCache 中存在的数据不再读取，"),o("strong",[e._v("BlockCache 只是提高了读磁盘的效率")]),e._v("。如：磁盘中有数据A和B，BlockCache 中有数据A，则扫描磁盘时只读取B，不再读取A。\n所以 HBase 是写比读快（读不仅扫磁盘，还要合并选取数据）。")]),e._v(" "),o("h2",{attrs:{id:"合并"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#合并"}},[e._v("#")]),e._v(" 合并")]),e._v(" "),o("p",[e._v("由于memstore每次刷写都会生成一个新的HFile，"),o("strong",[e._v("且同一个字段的不同版本（timestamp）和不同类型（Put/Delete）有可能会分布在不同的 HFile 中，因此查询时需要遍历所有的 HFile")]),e._v("。\n为了减少 HFile 的个数，以及清理掉过期和删除的数据，会进行 StoreFile Compaction。Compaction 分为两种，分别是 Minor Compaction 和 Major Compaction。")]),e._v(" "),o("blockquote",[o("p",[e._v("Minor Compaction")])]),e._v(" "),o("p",[e._v("Minor Compaction 是指选取一些"),o("strong",[e._v("小的、相邻的 HFile 将他们合并成一个更大的 HFile")]),e._v("。默认情况下，Minor Compaction 会删除所合并 HFile 中的 TTL 过期数据，但是不会删除手动删除（也就是 Delete 标记作用的数据）不会被删除。")]),e._v(" "),o("blockquote",[o("p",[e._v("Major Compaction")])]),e._v(" "),o("p",[e._v("Major Compaction 是指将一个 "),o("strong",[e._v("Store 中所有的 HFile 合并成一个 HFile")]),e._v("，这个过程会清理三类没有意义的数据："),o("strong",[e._v("被删除的数据")]),e._v("（打了 Delete 标记的数据）、"),o("strong",[e._v("TTL 过期数据")]),e._v("、"),o("strong",[e._v("版本号超过设定版本号的数据")]),e._v("。\n另外，一般情况下，Major Compaction 时间会持续比较长，整个过程会消耗大量系统资源，对上层业务有比较大的影响。因此，生产环境下通常关闭自动触发 Major Compaction 功能，改为手动在业务低峰期触发。")]),e._v(" "),o("h3",{attrs:{id:"触发时机"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#触发时机"}},[e._v("#")]),e._v(" 触发时机")]),e._v(" "),o("blockquote",[o("p",[e._v("MemStore Flush")])]),e._v(" "),o("p",[e._v("HBase 每次Flush 之后，都会判断是否要进行 Compaction，一旦满足 Minor Compaction 或 Major Compaction 的条件便会触发执行。")]),e._v(" "),o("blockquote",[o("p",[e._v("后台线程周期性检查")])]),e._v(" "),o("p",[e._v("这里主要考虑的是一段时间内没有写入仍然需要做 Compact 检查。")]),e._v(" "),o("blockquote",[o("p",[e._v("手动触发")])]),e._v(" "),o("p",[e._v("compact、major_compact")]),e._v(" "),o("h2",{attrs:{id:"数据切分"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#数据切分"}},[e._v("#")]),e._v(" 数据切分")]),e._v(" "),o("p",[e._v("默认情况下，"),o("strong",[e._v("每个 Table 起初只有一个 Region，随着数据的不断写入，Region 会自动进行拆分")]),e._v("。刚拆分时，"),o("strong",[e._v("两个子 Region 都位于当前的 Region Server")]),e._v("，但处于负载均衡的考虑，"),o("strong",[e._v("HMaster 有可能会将某个 Region 转移给其他的 Region Server")]),e._v("。\n数据切分会造成数据倾斜（region 大小分布不均），带来热点数据问题。所以建表时进行预分区来尽量避免这种问题。")]),e._v(" "),o("h2",{attrs:{id:"hfile结构"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#hfile结构"}},[e._v("#")]),e._v(" Hfile结构")]),e._v(" "),o("p",[e._v("HFile中包含了"),o("strong",[e._v("一个多层索引系统")]),e._v("。这个多层索引是的HBase可以"),o("strong",[e._v("在不读取整个文件的情况下查找数据")]),e._v("。这一多层索引类似于一个B+树。\n文件结尾指向meta block。因为meta block是在数据写入硬盘操作的结尾写入该文件中的。文件的结尾同时还包含一些别的信息。比如 bloom filter 及时间信息。bloom filter可以帮助HBase加速数据查询的速度。因为HBase可以利用 bloom filter 跳过不包含当前查询的键的文件。时间信息则可以帮助HBase在查询时跳过读操作所期望的时间区域之外的文件。HFile的索引在HFile被打开时会被读取到内存中。这样就可以保证数据检索只需一次硬盘查询操作。")]),e._v(" "),o("h2",{attrs:{id:"并发控制"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#并发控制"}},[e._v("#")]),e._v(" 并发控制")]),e._v(" "),o("blockquote",[o("p",[e._v("写写并发")])]),e._v(" "),o("p",[e._v("多个写入/更新同时进行会导致数据不一致的问题，HBase通过获取"),o("strong",[e._v("行锁")]),e._v("来实现写写并发，如果获取不到，就需要不断重试等待或者自旋等待，直至其他线程释放该锁。拿到锁之后开始写入数据，写入完成之后释放行锁即可。这种行锁机制是实现写写并发控制最常用的手段，MySQL也使用了行锁来实现写写并发。")]),e._v(" "),o("blockquote",[o("p",[e._v("读写并发")])]),e._v(" "),o("p",[e._v("HBase中"),o("strong",[e._v("MVCC")]),e._v("机制实现主要分为两步：\n(1) 为每一个写入/更新事务分配一个"),o("strong",[e._v("Region级别自增的序列号")]),e._v("。\n(2) 为每一个读请求分配一个已完成的最大写事务序列号。")]),e._v(" "),o("h2",{attrs:{id:"宕机恢复"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#宕机恢复"}},[e._v("#")]),e._v(" 宕机恢复")]),e._v(" "),o("p",[e._v("当Region Server宕机的时候，其所管理的region在这一故障被发现并修复之前是不可访问的。ZooKeeper负责根据服务器的"),o("strong",[e._v("心跳信息")]),e._v("来监控服务器的工作状态。当某一服务器下线之后，ZooKeeper会发送该服务器下线的通知。HMaster收到这一通知之后会进行恢复操作。\nHMaster会首先将宕机的Region Server所管理的region分配给其他仍在工作的活跃的Region Server。然后HMaster会将该服务器的"),o("strong",[e._v("WAL分割并分别分配给相应的新分配的Region Server进行存储")]),e._v("。新的Region Server会读取并顺序执行WAL中的数据操作，从而重新创建相应的MemStore。")]),e._v(" "),o("h2",{attrs:{id:"高可用"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#高可用"}},[e._v("#")]),e._v(" 高可用")]),e._v(" "),o("p",[e._v("HBase使用Hadoop的HDFS作为底层存储，数据被分散存储在多个RegionServer上。每个RegionServer都负责管理一部分数据，这些数据通过HBase的分区机制进行划分。同时，"),o("strong",[e._v("HBase还使用了Hadoop的复制机制，将数据复制到多个RegionServer上，以实现数据的冗余备份")]),e._v("。当一个RegionServer出现故障时，系统可以从其他RegionServer上获取备份数据，实现高可用性。")])])}),[],!1,null,null,null);o.default=r.exports}}]);