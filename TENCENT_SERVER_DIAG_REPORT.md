# 腾讯云服务器端口诊断报告

## 1. 实例类型

- 实例类型：轻量应用服务器 Lighthouse
- 实例名称：宝塔Linux面板-CkSh
- 实例 ID：`lhins-aj0x7mrs`
- 地域：上海 / 上海五区
- 公网 IPv4：`106.54.22.80`
- 内网 IPv4：`10.0.0.9`
- 操作系统：OpenCloudOS 9
- 控制台显示域名：
  - `benchmark.vocabfun.cn`
  - `www.benchmark.vocabfun.cn`

## 2. 实例状态

- 实例状态：运行中
- OrcaTerm / WebShell：可免密登录
- 当前登录用户：`root`
- 主机名：`VM-0-9-opencloudos`

## 3. 安全组 / 防火墙是否绑定正确

腾讯云轻量应用服务器防火墙页面确认以下入站规则已绑定到该实例：

- TCP `22`：全部 IPv4 地址，允许
- TCP `80`：全部 IPv4 地址，允许
- TCP `443`：全部 IPv4 地址，允许
- TCP `8888`：全部 IPv4 地址，允许
- ICMP Ping：全部 IPv4 地址，允许

结论：腾讯云控制台层面的轻量应用服务器防火墙规则是正确的。

## 4. 服务器内部检查结果

已通过 OrcaTerm 在服务器内部执行只读检查命令。

### SSH

- `sshd` 状态：active
- `sshd` 开机自启：enabled
- 监听端口：`0.0.0.0:22` 和 `[::]:22`

结论：SSH 服务已启动，且正在监听 22 端口。

### Nginx

- `nginx` 状态：active
- `nginx` 开机自启：enabled
- Nginx 版本：`nginx/1.26.3`
- 监听端口：`0.0.0.0:80` 和 `[::]:80`
- 服务器本机访问 `http://127.0.0.1/`：返回 `HTTP/1.1 200 OK`

结论：Nginx 已安装、已启动，80 端口有服务监听。

### 系统防火墙

- `firewall-cmd`：未安装 / command not found
- `ufw`：未安装 / command not found
- `iptables` INPUT 默认策略：`ACCEPT`

结论：服务器系统内部未发现 firewalld 或 ufw 拦截 22 / 80；iptables 默认允许 INPUT。

### 网站目录 / 宝塔

- `/www`：不存在
- `/www/wwwroot`：不存在
- `/www/server/panel`：不存在
- `bt` 命令：不存在
- Nginx 常规目录存在：
  - `/etc/nginx`
  - `/usr/share/nginx`
  - `/var/log/nginx`
  - `/var/lib/nginx`

结论：虽然实例名称显示“宝塔Linux面板”，但当前系统内未发现宝塔面板目录和 `bt` 命令；不应按宝塔目录假设部署。

## 5. 22 端口不通的可能原因

服务器内部 SSH 正常，腾讯云防火墙也已放行 22。

之前从当前 Windows 环境直连 `106.54.22.80:22` 失败，但这不像服务器内部服务问题。更可能原因：

1. 当前本机网络、代理或安全软件阻止直连云服务器 TCP 22。
2. 当前命令行环境走了本地代理 / DNS 环境，导致直连测试不可靠。
3. 运营商或本地网络策略对 22 端口直连有限制。

服务器侧暂未发现 22 被拦截。

## 6. 80 端口不通的可能原因

服务器内部 Nginx 正常，`127.0.0.1:80` 返回 200，腾讯云防火墙也已放行 80。

之前从当前 Windows 环境访问 `106.54.22.80:80` 失败，更可能原因：

1. 当前本机网络/代理链路无法直连该公网 IP 的 80 端口。
2. 本机 DNS 解析 `benchmark.vocabfun.cn` 时走 `198.18.0.2` 并超时，说明本机代理/DNS 环境会影响检查结果。
3. 外部网络链路问题，而不是服务器内部 Nginx 问题。

服务器侧暂未发现 80 被拦截。

## 7. 是否可以用 WebShell 部署

可以。

OrcaTerm / WebShell 已经可以 root 免密登录，因此即使本地 SSH 直连暂时不通，也可以通过腾讯云控制台 WebShell 执行部署命令。

但本轮只排查，没有上传 `dist`，没有覆盖 `/www/wwwroot/raz-test`，没有修改 Nginx 配置。

## 8. 是否建议改用宝塔部署

暂不建议按宝塔部署。

原因：

- 当前服务器内未发现 `/www/server/panel`
- `bt` 命令不存在
- `/www` 和 `/www/wwwroot` 也不存在

更适合下一步直接使用系统 Nginx 部署到一个明确目录，例如：

```text
/www/wwwroot/raz-test
```

或使用现有 Nginx 风格目录，例如：

```text
/var/www/raz-test
```

部署前再决定最终目录。

## 9. 下一步建议

建议下一步走“WebShell 部署”，而不是等本机 SSH 直连恢复：

1. 在服务器上创建网站目录。
2. 将本地 `dist` 打包成 zip。
3. 通过腾讯云控制台文件管理器或 WebShell 辅助上传 zip。
4. 解压到网站目录。
5. 新增 Nginx 配置：

```nginx
server {
    listen 80;
    server_name benchmark.vocabfun.cn www.benchmark.vocabfun.cn;

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

6. 执行 `nginx -t`。
7. 通过后执行 `systemctl reload nginx`。
8. 再用浏览器和手机验收：
   - `http://benchmark.vocabfun.cn/`
   - `http://benchmark.vocabfun.cn/placement`
   - `http://benchmark.vocabfun.cn/placement/h`
   - `http://benchmark.vocabfun.cn/test/a`
   - `http://benchmark.vocabfun.cn/test/h`
   - PDF 试卷入口

## 10. 本轮未执行的操作

本轮仅排查，没有执行：

- 没有上传 `dist`
- 没有覆盖 `/www/wwwroot/raz-test`
- 没有删除服务器文件
- 没有修改 Nginx 配置
- 没有修改题库数据
- 没有记录任何密码
