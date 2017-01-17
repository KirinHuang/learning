#!/usr/bin/env lua
-- 只有false和nil被认为是false
if false == false then
    io.write('false == false is true \r\n');
end

-- == 只有在同类型的情况下才回去比较值
if false == nil then
    io.write('false == nil is true \r\n');
else
    io.write('false != nil \r\n');
end

if nil == nil then
    io.write('nil == nil is true \r\n');
end

if 0 then
    io.write('0 is true \r\n');
end

-- 不同类型的值，比较都是false
if 0 ~= false then
    io.write('0 ~= false is true \r\n');
end