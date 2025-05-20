---
layout: post
title: 前端项目部署修改请求地址
tags: ['nginx']
categories:
 - FrontEnd
 - Nginx
---

# 前端项目部署修改请求地址
> 使用nginx部署前端build文件，build文件已经固定了后端请求的地址和端口，前端可以通过.env的环境变量配置来区分改变打包后的请求地址，但是一般只设置开发，测试，生产这几个环境，如果我想打包一份文件，之后再改变后端请求地址，应该如何处理??

## 使用Nginx反向代理 🧡🧡🧡🧡🧡
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /path/to/your/build;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://your-backend-server:port/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

无需修改前端代码
只需修改Nginx配置并重载即可生效
可以灵活处理跨域问题

## 运行时环境变量 🧡🧡🧡
```js
// public/index.html
<script>
  window._env_ = {
    API_URL: '__API_URL__'
  };
</script>

// 然后在你的API请求中使用
const apiUrl = window._env_.API_URL || process.env.API_URL;
```
然后在Nginx中使用sub_filter替换占位符

```nginx
server {
    # ...其他配置
    
    sub_filter '__API_URL__' 'http://your-new-backend-url';
    sub_filter_once off;
}
```

## 使用外部配置文件 🧡🧡🧡
在public目录放置一个配置文件（如config.json），在应用启动时动态加载：
```js
// 在应用初始化时
fetch('/config.json')
  .then(response => response.json())
  .then(config => {
    window.API_BASE_URL = config.apiUrl;
  });
```
可以随时修改config.json文件而无需重新构建。

## 使用Docker环境变量 🧡🧡🧡
如果使用Docker部署，可以在容器启动时传入环境变量
```dockerfile
ENV API_URL=${API_URL}
```
然后在启动脚本中替换配置文件中的占位符。