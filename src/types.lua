local b = false
local n = 1232
local f = 1.2323
local s = 'a string'
local empty = nil

--print('boolean: '..b) -- 字符串只能和数字连接（整形和浮点）
-- => attempt to concatenate local 'b' (a boolean value)

print("number: "..n) -- 字符串用 "|' 都可以
print('float: '..f)
print('string: '..s)
-- print('empty: '..empty)
-- =>  attempt to call global 'pirnt' (a nil value)

local t = {} -- 关系表类型，相当于是数据字典。key可以是任意类型，除了nil。可以用来表示数组
t[0] = 1
t[1] = 2

-- 写法一
t['tom'] = {age= 27, gender='male'}

-- 写法二
t.John={}  
t.John.Age=27  
t.John.Gender="Male"  

-- 写法三  测试不行，使用的是5.2的版本，可能已经不支持了？
--t.jerry = {}
--t.jerry{Age=27, Gender="Male"}  

print(t)

-- type(x) 获取类型
print(type(t))

