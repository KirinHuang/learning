#合并两个git厂库
1. 合并之后需要保留日志
2. 第二个厂库作为一个子目录存在

#处理步骤
假如是仓库`repo1`,`repo2`

1. 把`repo1`的目录结构改成subdir/[原来仓库所有的文件] `git mv`
2. 在`repo2`中添加`repo1`远程仓库 `git remote add repo1 ../repo1`
3. 从`repo1`抓取数据到本仓库 `git fetch repo1`
4. 把抓取的`repo1/master`作为新的分支添加到本地 `git checkout repo1 repo1/master`
5. 切换到`master`分支
5. 合并分支 `git merge repo1`

> 可能会碰到文件冲突的情况，可以使用如下步骤解决
  1. git checkout --theirs YOUR_BINARY_FILES OR git checkout --ours YOUR_BINARY_FILES
  2. git add YOUR_BINARY_FILES
  3. git commit
