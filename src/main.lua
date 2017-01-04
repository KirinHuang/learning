#!/usr/bin/env lua
print('before load module1');
require('module1');
print('after load module1');

--[[
before load module1
module1
after load module1
]]

--[[
说明require在载入后就立马去执行对应的模块，只会去执行一次
如果不想载入后执行，可以使用loadfile函数，在手动执行。举个例子：
module1 = loadfile('module1');
module1();

或者想每次都执行的话，可以使用dofile('module1')
]]

-- TODO 所以想一想，lua也应该会有循环加载的问题就和js里面的require库一样，后期在慢慢研究



