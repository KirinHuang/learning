function add (a,b)
    return a+b
end

print(add(1,2))

-- function 可以是变量
vadd = function (a, b) return a+b end

print(vadd(10, 1))

-- return 必须在end之前，如果要放在function中间，可以使用 do return end, 这个例子不好举，还是等我后面补吧
function compare(a, b)
    if a > b then
        --do return a end
        return 1
    end
    
    if a == b then
        return 0
    end
    
    if a < b then
        return -1
    end
end

print(compare(3,4))

-- 可以返回多个值
function mutivalue()
    return 1,2,3,4
end

print(mutivalue())