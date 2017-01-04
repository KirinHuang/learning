#!/usr/bin/env lua

-- 数组 索引从1开始
local a = {1,3,5};
-- equivalent
a = {[1]=2, [2]=4, [3]=6}
for i=1, #a do
    print(a[i]);
end

-- 数组中保存的数据，类型可以不一样
print('-----------------混合数组-----------------')
a = {'a string', 1, false, nil, 99.99}
for i=1, #a do
    print(a[i]);
end

-- lua中的全局变量也是通过table类型来实现的，在_G的table中
globalVar = 'a global variant';
print(_G.globalVar, _G['globalVar']);

-- 遍历table 
print('-------------------------遍历全局变量_G-------------------------')
for k,v in pairs(_G) do
    print(k,v);
end

