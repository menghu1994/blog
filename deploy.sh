#!/bin/bash

# Hexo 博客部署脚本
# 功能：
# 1. 本地生成静态文件 (hexo g)
# 2. 同步到远程服务器
# 3. 保持文件权限

# --------------------------
# 配置区域（根据实际情况修改）
# --------------------------
REMOTE_USER="root"          # 服务器用户名
REMOTE_HOST="129.204.224.75"        # 服务器IP
LOCAL_HEXO_DIR=""  # 本地Hexo项目目录
REMOTE_WEB_DIR="/var/www/blog"       # 服务器目标目录

# --------------------------
# 脚本开始
# --------------------------

echo "🚀 开始部署Hexo博客到服务器..."

# 1. 进入Hexo目录
cd "$LOCAL_HEXO_DIR" || { echo "❌ 无法进入Hexo目录"; exit 1; }

# 2. 清理并生成静态文件
echo "🛠️  正在生成静态文件..."
hexo clean && hexo g || { echo "❌ Hexo生成失败"; exit 1; }

# 同步文件（带重试）
retry=0
while [ $retry -lt $MAX_RETRIES ]; do
    echo "🔄 Attempt $((retry+1))/$MAX_RETRIES: Syncing files..."
    if rsync -avz --delete --progress \
        -e "ssh -o TCPKeepAlive=yes -o ServerAliveInterval=60 -o ConnectTimeout=10" \
        ./public/ \
        "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_WEB_DIR}"; then
        echo "✅ Sync completed!"
        exit 0
    fi
    sleep $RETRY_DELAY
    ((retry++))
done

# 如果 rsync 失败，尝试 tar
echo "⚠️ Rsync failed, trying tar over SSH..."
tar czf - -C ./public . | ssh -p 22 "${REMOTE_USER}@${REMOTE_HOST}" "tar xzf - -C ${REMOTE_WEB_DIR}" && {
    echo "✅ Tar sync succeeded!"
    exit 0
} || {
    echo "❌ All sync attempts failed!"
    exit 1
}

echo "🎉 博客部署完成！访问地址：http://${REMOTE_HOST}/blog"