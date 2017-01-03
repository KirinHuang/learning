#注释
1. 单行 --
2. 多行 --[[multiline]]

#分隔符
语句之间的分隔符;或者空白，在同一行建议;

#语句块
do some code end
some code 可以试试单行，也可以是多行

#控制语句
1. if
    if 条件 then 代码
    elseif 条件 then 代码 
    else 代码 end
2. while
    while 条件
    do 代码 end
3. repeat
    repeat
    代码
    until 条件
4. for
    for 变量=初值, 终点值, 步进
    do 代码 end

#赋值
1. 多变量赋值
a,b,c,d = 1,2,3,4
a,b = b,a

2. 局部变量
local a,b,c = 1,2,c

#运算符
1. 计算 + - x % ^
2. 拼接 ..
3. 比较
    < > <= >= == ~=不等于
4. 逻辑运算符
    and or not
    lua中只有false和nil是false，其他都是true包括0。lua中没有三元运算符，但是相当于x = a and b or c;