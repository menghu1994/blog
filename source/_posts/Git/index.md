---
layout: post
title: git config
date: 2023-10-16 21:41:38
tags: git
---

# Mac
config file `/User/{username}/.gitconfig`

### error
1. `Failed to connect to github.com port 443:connection timed out`
 + Enter System Path `/private/etc/hosts` and add
  ```shell
  140.82.114.3 github.com
  199.232.69.194 github.global.ssl.fastly.net
  185.199.108.153 assets-cdn.github.com
  185.199.109.153 assets-cdn.github.com
  185.199.110.153 assets-cdn.github.com
  ```
 + `sudo killall -HUP mDNSResponder` to update hosts

2. `HTTP/2 stream 1 was not closed cleanly before end of the underlying stream`
 - use `sudo git config --system http.version HTTP/1.1`
