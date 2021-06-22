## Hexo Blog

### 在线预览

[在线预览](https://menghu1994.github.io/)

### Fork指南
Fork 本项目之后，还需要做一些事情才能让你的页面「正确」跑起来。

1.正确设置项目名称与分支。

按照 GitHub Pages 的规定，名称为 username.github.io 的项目的 master 分支，或者其它名称的项目的 gh-pages 分支可以自动生成 GitHub Pages 页面。

2.修改配置。

网站的配置基本都集中在 _config.yml 文件中，将其中与个人信息相关的部分替换成你自己的，比如网站的 url、title、subtitle 和第三方评论模块的配置等。
评论模块： 目前支持 disqus、gitment 和 gitalk，选用其中一种就可以了，推荐使用 gitalk。它们各自的配置指南链接在 _config.yml 文件的 Comments 一节里都贴出来了。
注意： 如果使用 disqus，因为 disqus 处理用户名与域名白名单的策略存在缺陷，请一定将 disqus.username 修改成你自己的，否则请将该字段留空。我对该缺陷的记录见 Issues#2。

3.删除我的文章与图片。

如下文件夹中可以全部删除，然后添加你自己的内容。
_posts 文件夹中是我已发布的博客文章。
_drafts 文件夹中是我尚未发布的博客文章。
images 文件夹中是我的文章和页面里使用的图片。

4.修改「关于」页面。

pages/about.md 文件内容对应网站的「关于」页面，里面的内容多为个人相关，将它们替换成你自己的信息，包括 _data 目录下的 skills.yml 和 social.yml 文件里的数据。

### 联系我

如果对本博客模板或者内容有任何建议，可以通过 Issues 或者微信公众号「饥荒老菜鸟」与我取得联系。
