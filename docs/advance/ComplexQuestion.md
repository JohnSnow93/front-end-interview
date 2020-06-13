# 综合问题

[[toc]]
## 从地址栏输入URL到页面加载完成发生了什么
1. DNS查找：先查找本机缓存的记录，如果没有，再向DNS服务器查询（DNS查询是通过UDP协议进行的）
2. TCP 握手，建立连接
3. TLS 握手
4. 发送HTTP请求
5. 浏览器获得响应，开始解析HTML文档（或），构建DOM树
    - 遇到外部的CSS，会进行加载
    - 遇到script标签，会判断是否存在 `async` 或者 `defer` ，前者会并行进行下载并执行 JS，后者会先下载文件，然后等待 HTML 解析完成后顺序执行。如果不存在`async` 或者 `defer`则会阻塞渲染转而去加载和执行JS
6. 解析CSS构建CSSOM树
7. CSSOM 树和 DOM 树构建完成后会开始生成 Render 树，进行渲染

详见：[当···时发生了什么？](https://github.com/skyline75489/what-happens-when-zh_CN)

## 前端路由原理，手动实现前端路由
