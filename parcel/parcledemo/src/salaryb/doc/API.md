# 日工资api
获取日工资版本
"/version"
获取当前登录用户的已经配置日工资的彩种。
"/salaryLottery"
查询日工资配置 0表示全部彩种日工资配置
"/systemSalary/{lotteryId}"
获取当前登陆用户的日工资基本信息
"/mySalaryInfo/{lotteryId}"
获取当前登陆用户的可用日工资列表（低于当前配置的日工资列表）
"/salaryList"  Integer lotteryId, Integer currPage, Integer pageSize
查询当前登陆用户的团队（直接下属并包含自身）的日工资发放记录。
"/salaryRecord"  String subUserName, String start, String end, Integer status, Integer lotteryId,
            Integer currPage, Integer pageSize
获取当前登录用户的日工资发放记录
"/mySalaryRecord"  String start, String end, Integer status, Integer lotteryId, Integer currPage,
            Integer pageSize
团队日工资配置
"/teamSalaris"   String subUserName, Integer userType, Integer lotteryId, Integer status,
            Integer currPage, Integer pageSize
获取下级日工资已配置和未配日工资
"/subUserSalaryInfo/{subUserId}"    
批量设置日工资
"/setSubUserSalary"     Long subUserId, Integer[] salaryId