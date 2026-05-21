# 腾讯云部署报告

## 1. 是否部署成功

已部署成功。

本次通过腾讯云 OrcaTerm WebShell 使用后台托管方式部署，部署脚本写入 `/root/raz_deploy.sh`，日志写入 `/root/raz_deploy.log`。后台任务完成时间：

```text
===DONE 2026-05-20 12:03:37===
```

## 2. 服务器网站目录

```text
/www/wwwroot/raz-test
```

最终发布目录结构已确认：

```text
/www/wwwroot/raz-test/index.html
/www/wwwroot/raz-test/assets/
/www/wwwroot/raz-test/raw/
/www/wwwroot/raz-test/_redirects
```

没有发布成 `/www/wwwroot/raz-test/dist/index.html`。

## 3. Nginx 配置文件路径

```text
/etc/nginx/conf.d/raz-test.conf
```

配置内容使用 HTTP 80：

```nginx
server {
    listen 80;
    server_name benchmark.vocabfun.cn www.benchmark.vocabfun.cn 106.54.22.80;

    root /www/wwwroot/raz-test;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /raw/ {
        try_files $uri =404;
    }
}
```

`nginx -t` 通过，并已 reload nginx。

## 4. 访问地址

- http://106.54.22.80/
- http://benchmark.vocabfun.cn/
- https://benchmark.vocabfun.cn/
- https://www.benchmark.vocabfun.cn/

HTTPS 已通过 Let's Encrypt / Certbot 配置成功。证书路径：

```text
/etc/letsencrypt/live/benchmark.vocabfun.cn/fullchain.pem
/etc/letsencrypt/live/benchmark.vocabfun.cn/privkey.pem
```

证书到期时间：

```text
2026-08-18
```

Certbot 已设置自动续期任务。

## 5. 路由是否正常

服务器本机检查结果：以下路由均返回 `HTTP/1.1 200 OK`：

- `/`
- `/placement`
- `/placement/h`
- `/test/a`
- `/test/h`

Chrome 线上检查结果：

- `https://benchmark.vocabfun.cn/`：首页正常打开
- `https://benchmark.vocabfun.cn/placement`：插班测试页面正常打开
- `https://benchmark.vocabfun.cn/placement/h`：H级插班测试正常进入
- `https://benchmark.vocabfun.cn/test/a`：A级升级测试正常进入
- `https://benchmark.vocabfun.cn/test/h`：显示“级别暂未开放”，没有回退到 A
- `http://benchmark.vocabfun.cn/`：会自动跳转到 `https://benchmark.vocabfun.cn/`
- `http://106.54.22.80/`：首页正常打开
- `http://106.54.22.80/placement`：插班测试页面正常打开
- `http://106.54.22.80/placement/h`：H级插班测试正常进入
- `http://106.54.22.80/test/a`：A级升级测试正常进入
- `http://106.54.22.80/test/h`：显示“级别暂未开放”，没有回退到 A
- `http://benchmark.vocabfun.cn/`：首页正常打开
- `http://benchmark.vocabfun.cn/placement`：插班测试页面正常打开
- `http://benchmark.vocabfun.cn/placement/h`：H级插班测试正常进入
- `http://benchmark.vocabfun.cn/test/a`：A级升级测试正常进入
- `http://benchmark.vocabfun.cn/test/h`：显示“级别暂未开放”，没有回退到 A

首页显示升级测试级别：

```text
A / D / G / K / O
```

插班测试页面显示：

```text
B / C / E / F / H / I / J / L / M / N / P / Q
```

## 6. PDF 是否正常

已随机抽查首页 A 级别的“下载PDF打印”按钮。

打开地址：

```text
https://benchmark.vocabfun.cn/raw/A/A%E7%BA%A7%E5%88%AB-%E5%85%A5%E9%97%A8-%E5%8D%87%E7%BA%A7-%E6%B5%8B%E8%AF%95.pdf
```

Chrome 标题显示：

```text
A级别-入门-升级-测试.pdf
```

PDF 可以正常打开。

## 7. 手机端是否正常

本次已确认线上测试页包含移动端需要的关键入口和结构：

- 顶部可见 `PDF试卷`
- 测试页显示文章内容和题目内容
- 级别卡片显示 `在线做题` 和 `下载PDF打印`
- H级插班测试页面可进入
- A级升级测试页面可进入

说明：本次主要通过 Chrome 页面内容和路由检查完成线上验收，未使用真实手机实机访问。建议后续用手机直接访问 `http://benchmark.vocabfun.cn/` 再做一次实机点按确认。

## 8. 发现的问题

1. 服务器从 GitHub clone 速度较慢，普通 WebShell 会断线。
2. 开启后台托管后，clone/build/deploy 可以完成。
3. 浏览器标题当前显示为 `Stacey老师RAZ入门测试`，如需完全统一为 `Stacey老师 RAZ测试系统`，后续可单独调整。

## 9. 是否建议发给家长试用

建议可以先小范围发给家长试用 HTTPS 地址：

```text
https://benchmark.vocabfun.cn/
```

正式大范围使用前，建议再完成：

1. 用真实手机访问并提交一次测试。
2. 随机再抽查 2-3 个 PDF 试卷。
3. 如需要集中查看所有家长提交记录，需要单独部署后端统计服务。
