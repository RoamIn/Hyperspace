# Hyperspace
IP Proxy Pool

![Space](README.gif)

> 有效 IP 的定义根据不同爬取网页的判断是不一样的，可能某人已经在该网页用废了

# Redis

- raw_proxy 未校验的 proxy
- raw_proxy_set  未校验的 proxy 队列（因为 list 不去重，所以使用了 set）

- proxy 已校验的 proxy
- proxy_set  已校验的 proxy 队列（因为 list 不去重，所以使用了 set）