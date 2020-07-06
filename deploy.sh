#!/usr/bin/env sh

# 这个脚本用于部署到gitee。github配置了netlify，不用此脚本

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://gitee.com/johnsnow93/frontend-interview.git master

cd -

