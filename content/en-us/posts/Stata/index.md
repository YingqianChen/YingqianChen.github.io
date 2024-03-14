+++
title = 'Stata_note'
date = 2024-03-05T10:14:45+08:00
draft = true
+++

## CH1

- do文件相关事项
  - 开头声明所使用的Stata版本
  - 运行clear
  - 打开log文件，最后要记得关闭
  - 不熟悉时可以：
    - 使用菜单操作，将对应命令复制到do文件
    - 使用help学习相应命令

## CH2 数据管理

### 数据类型

- 数值型
  - `display`：显示数值或字符，以标量形式呈现
- 字符型
- 日期型

#### 数值型

按精度区分：

```
. clear

. set obs 1
Number of observations (_N) was 0, now 1.

. generate a=1

. describe

Contains data
 Observations:             1                  
    Variables:             1                  
----------------------------------------------------------------------------------------------------------------------------------------
Variable      Storage   Display    Value
    name         type    format    label      Variable label
----------------------------------------------------------------------------------------------------------------------------------------
a               float   %9.0g                 
----------------------------------------------------------------------------------------------------------------------------------------
Sorted by: 
     Note: Dataset has changed since last saved.
```

`compress`：压缩信息，使占用空间尽量小
`recast`：强制转换

显示格式：

- 一般格式 (g)：灵活显示
- 固定格式 (f)：用于正式统计报告
- 加负号 (-)：左对齐，默认右对齐
- 加0：用0补齐到指定位数
- 加e：使用科学计数法

#### 字符型

字符用双引号 ("")

```
. disp "2+2"
2+2

. disp 2+2
4
```

#### 日期型

- 不是独立的类型，可为字符型/数值型
- 日期函数：`data(s1,s2,[,Y])`，返回日期型数据

```
. display date("01011960", "DMY")
0

. display date("01021960", "MDY")
1

. display date("12/31/1959", "MDY")
-1
```

#### 缺失数据

- 来源缺失，或不合逻辑
- `.`，大于所有非缺失数据
- `.a .b .c ... .z`，依次增大

### 表达式

#### 运算符号

加：`+`，减：`-`，乘：`*`，除：`/`，乘方：`^`

#### 逻辑符号

与：`&`，或：`|`，非：`!`，等于：`==`...

### 创建数据集

- 批量输入数据

```
clear
input id str20 name female wage //str20 大约能显示10个汉字
    1 Alice 1 40
    2 Chris 0 80
    3 Tom 0 20
    4 Jack 0 70
    5 Mary 1 40
end
```

- 生成新变量
`generate`