(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{322:function(t,r,e){"use strict";e.r(r);var v=e(8),_=Object(v.a)({},(function(){var t=this,r=t._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h2",{attrs:{id:"联合文件系统-union-file-system"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#联合文件系统-union-file-system"}},[t._v("#")]),t._v(" 联合文件系统（Union File System）")]),t._v(" "),r("p",[t._v("它可以把多个目录(也叫分支)内容联合挂载到同一个目录下，而目录的物理位置是分开的。UnionFS允许只读和可读写目录并存，就是说可同时删除和增加内容。也就说这个不是docker支持的，而且是docker去运用的。")]),t._v(" "),r("h2",{attrs:{id:"docker-run"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#docker-run"}},[t._v("#")]),t._v(" docker run")]),t._v(" "),r("ul",[r("li",[t._v("检查本地是否存在指定的镜像，不存在就从 registry 下载")]),t._v(" "),r("li",[t._v("利用镜像创建并启动一个容器")]),t._v(" "),r("li",[r("strong",[t._v("分配一个文件系统，并在只读的镜像层外面挂载一层可读写层")])]),t._v(" "),r("li",[t._v("从"),r("strong",[t._v("宿主主机配置的网桥接口中桥接一个虚拟接口到容器")]),t._v("中去")]),t._v(" "),r("li",[t._v("从"),r("strong",[t._v("地址池配置一个 ip 地址给容器")])]),t._v(" "),r("li",[t._v("执行用户指定的应用程序")]),t._v(" "),r("li",[t._v("执行完毕后容器被终止")])]),t._v(" "),r("h2",{attrs:{id:"网络"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#网络"}},[t._v("#")]),t._v(" 网络")]),t._v(" "),r("p",[t._v("Docker 原生网络是基于 Linux 的 网络命名空间（net namespace） 和 虚拟网络设备（veth pair）实现的。当 Docker 进程启动时，会在宿主机上创建一个名称为 docker0 的 虚拟网桥，在该宿主机上启动的 Docker 容器会连接到这个虚拟网桥上。\n虚拟网桥的工作方式和物理交换机类似，宿主机上所有的容器通过虚拟网桥连接在一个二层网络中。\n从 docker0 子网中分配一个 IP 给容器使用，并设置 docker0 的 IP 地址为容器的默认网关。在宿主机上创建一对虚拟网卡 veth pair 设备， Docker 将 veth pair 设备的一端放在新创建的容器中，并命名为 eth0（容器的网卡）， 另一端放在宿主机中，以 vethxxx 类似的名字命名， 并将这个网络设备连接到 docker0 网桥中。\n虚拟网桥 docker0 通过 iptables 配置与宿主机器上的网卡相连，符合条件的请求都会通过 iptables 转发到 docker0, 然后分发给对应的容器。")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",[t._v("名称")]),t._v(" "),r("th",[t._v("描述")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("bridge")]),t._v(" "),r("td",[t._v("默认的网络设备，当应用程序所在的容器需要通信时使用")])]),t._v(" "),r("tr",[r("td",[t._v("host")]),t._v(" "),r("td",[t._v("移除容器与宿主机之间的网络隔离，直接使用宿主机的网络")])]),t._v(" "),r("tr",[r("td",[t._v("overlay")]),t._v(" "),r("td",[t._v("将多个容器连接，并使集群服务能够相互通信")])])])])])}),[],!1,null,null,null);r.default=_.exports}}]);