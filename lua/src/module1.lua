print('module1');

local HaosModel = {}
 
local function getname()
    return "Hao Chen"
end
 
function HaosModel.Greeting()
    print("Hello, My name is "..getname())
end
 
return HaosModel