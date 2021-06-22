---
layout: post
title: hexo搭建个人主页
index_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPclomfHkbCVFgGlbkHBIaUYQqrC_k7t7yEg&usqp=CAU
banner_img: /img/bg/tag.png
tags:
 - 优化
 - Javascript
---


<center style="color:#3eceb8;font-size:1.5em;font-weight: bold;">
Hexo + Fluid主题 + github page
<br>
搭建个人博客
</center>

看了网上很多有很多不同的搭建个人博客的方式,最终选择Hexo这个大众化的博客,并选了一个简洁而优雅的bluid主题.
<!--more-->
<style>
.markdown-body {
    font-family:"Microsoft YaHei",Georgia, sans, serif;
    font-size: 18px;
  }
 </style>
 
**准备事项: 默认已经安装`node.js`,`git`,有github账号.没有安装可以看一下我的其他的博客**


### [Hexo](https://hexo.io/docs/)安装

- 新建文件夹存放博客文件,比如 `D:\pro\blog`  
- 在该目录下右键`git bash here`中使用命令行安装全局hexo
```
$ npm install -g hexo-cli 
```
- 初始化文件夹,安装必备组件
```
& hexo init
& npm install
```
- 生成静态页面`& hexo generate`,`& hexo server`启动博客[http://localhost:4000/](http://localhost:4000/) (以下命令为缩写)
```
& hexo g
& hexo s
```
- crtl+c关闭本地服务器,或者关闭git控制台.
</br></br>


### 安装[Fluid](https://hexo.fluid-dev.com/docs/)主题
 - 继续使用`git bash here`下载Fluid仓库  (git命令行中粘贴快捷键是`shift+insert`)
```
& git clone https://github.com/fluid-dev/hexo-theme-fluid.git
```
 - 将下载好的文件包剪切到blog下的themes文件夹下,并修改`_config.yml`文件中`theme: fluid`
 - 重新在blog目录下执行 `& hexo g`,`& hexo s`新的主题页就可以看到了
</br></br>

### 连接github page与hexo
 - 创建github page 
新建一个名称为yourname.github.io仓库

![new repo](/img/hexo_github/creatRepo.jpg)

点击`setting`,向下拉到最后有个`GitHub Pages`,就可以有自己的静态主页了.
![github page](/img/hexo_github/githubPage.jpg)

 - 打开blog文件夹,修改最后一行`deploy`的配置(以下账号名称改为个人注册账号名称)
```
deploy:
  type: git
  repo: https://github.com/menghu1994/menghu1994.github.io.git
  branch: master

```

 - 安装连接扩展
```
& npm i hexo-deployer-git
```

 - 清理缓存,生成静态页面,上传到github仓库
```
& hexo clean
& hexo g
& hexo d
```

 - 打开你的[github page](https://menghu1994.github.io)就能看到个人主页,至此个人博客搭建已经结束.


### 写文章并发布
 - 新建文章

 ``` 
& hexo new 'new article'
 ```

 - 在`blog\source\_posts`下可以看到多出的`new article.md`

 - 使用markdown语法写完一篇博客后执行以上的清理缓存,生成静态页面,上传到github仓库的步骤

### 修改Fluid主题配置


### 修改hexo配置





## 参考

[超详细Hexo+Github博客搭建小白教程](https://zhuanlan.zhihu.com/p/35668237)


