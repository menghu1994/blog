# Mongodb in docker

## 安装docker desktop
去[官网](https://www.docker.com/products/docker-desktop/)下载docker桌面安装包


## 下载mongodb镜像
1. [去docker镜像库](https://hub.docker.com/)内查询mongodb镜像地址
2. 打开命令行, 执行`docker pull mongo`

## 启动并连接mongodb
1.
2.
3. 添加数据库管理员
```shell
db admin
# 切换到管理员账户
use admin
# 创建超级管理员
db.createUser({
	user: 'root',
	pwd: '594123',
	roles: [{role: 'root', db: 'admin'}]
})
# 切换到超级管理员
use root
```
4. 在本地启动服务连接docker数据库时需要添加地址
``
