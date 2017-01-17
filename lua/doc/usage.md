#安装
```bash
ubuntu -> sudo apt-get install lua5.2
```

#使用
1. 使用lua命令
```shell
$lua file.lua
$lua
>print('hello, world!')
```

2. 作为脚本执行
添加 #!/usr/bin/env lua
```shell
chmod u+x file.lua
./file.lua
```