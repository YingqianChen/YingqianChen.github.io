---
title: "Stata笔记"
date: 2024-03-05T10:14:45+08:00
slug: Stata
summary: "校选课Stata课堂笔记"
draft: false
toc: true
featured_image: 
tags:
  - "Stata"
---

## CH1 绪论

### 数据导入

- 文件->打开
- `use "D:\HS300.dta"`
- 直接拖入窗口
- 双击.dta文件
- 导入其他格式文件

### 描述、列出、汇总数据

- 描述数据：`describe`
- 列出数据：`list in 1/10`
- 汇总数据：`summarize`
  - 输出：均值、标准差、最值
  - 语法：<u>sum</u>marize [valist] [if] [in] [weight] [, options]
    - 下划线表示缩写
    - varlist：列出待分析变量
    - if：设置条件
    - in：观察范围
    - weight：数据加权
    - options：选项
      - detail：列出详细的描述性统计结果
  - eg. `sum Turnover, detail`

### 日志文件

- 要记录操作过程和结果，需事先打开log文件
- 默认`.smcl`格式，可加后缀`.log`设成文本格式
- 要替换原有日志文件，只保留最后一次结果
  - `log using HS300, replace`
- 要添加日志，保留每次结果
  - `log using result1, append`
- 使用`log close`关闭文件（必需项）

### do文件

- 开头声明所使用的Stata版本
- 运行clear
- 打开log文件，最后要记得关闭
- 不熟悉时可以：
  - 使用菜单操作，将对应命令复制到do文件
  - 使用help学习相应命令

```stata
log using HS300.smcl, replace
clear
cd "工作目录"
use HS300.dta, clear
describe
list in 1/10
sum
sum Turnover, detail
log close
```

## CH2 数据管理

### 数据类型

1. 数值型

- `display`：显示数值或字符，以标量形式呈现
- 默认`float`
- 按精度区分：

| 存储数据类型 | 最小值                         | 最大值                         | 字节 |
|--------------|---------------------------------|---------------------------------|------|
| byte         | -127                            | 100                            | 1    |
| int          | -32,767                         | 32,740                         | 2    |
| long         | -2,147,483,647                  | 2,147,483,620                  | 4    |
| float        | -1.70141173319x10^38            | 1.70141173319x10^38            | 4    |
| double       | -8.9884656743x10^307            | 8.9884656743x10^307            | 8    |

- 存储类型转换
  - `compress`：压缩信息，使占用空间尽量小
  - `recast`：强制转换

```stata
. clear

. set obs 1
Number of observations (_N) was 0, now
1.

. generate a = 1

. describe

Contains data
 Observations:             1            
>       
    Variables:             1            
>       
----------------------------------------
Variable      Storage   Display    Value
    name         type    format    label
>       Variable label
----------------------------------------
a               float   %9.0g           
                    >       
----------------------------------------
Sorted by: 
     Note: Dataset has changed since las
> t saved.

. compress
  variable a was float now byte
  (3 bytes saved)

. replace a = 101
variable a was byte now int
(1 real change made)

. replace a = 32741
variable a was int now long
(1 real change made)

. recast double a

. gen double b=1

```

- 显示格式 (`format`)：
  - 一般格式 (g)：灵活显示，`format varlist %w.dg`
  - 固定格式 (f)：用于正式统计报告，`format varlist %w.df`
  - 科学计数格式 (e)：`format varlist %w.de`
  - 加负号 (-)：左对齐，默认右对齐
  - 加0：用0补齐到指定位数
  - 加c：每三位加逗号分隔符

2. 字符型

- 字符用双引号 (" ")标注
- 由字母/特殊符号/数字组成

```stata
. disp "2+2"
2+2

. disp 2+2
4
```

- 根据长度区分：

| 存储数据型 | 最大长度       | 字节         |
|------------|----------------|--------------|
| str1       | 1              | 1            |
| str2       | 2              | 2            |
| ...        | ...            | ...          |
| str2045    | 2045           | 2045         |
| strL       | 2,000,000,000  | 2,000,000,000|

3. 日期型

- 不是独立的类型，可为字符型/数值型
- 1960年1月1日被定义为第0天
- 日期函数：`date(s1,s2,[,Y])`，返回日期型数据

```stata
. display date("01011960", "DMY")
0

. display date("01021960", "MDY")
1

. display date("12/31/1959", "MDY")
-1
```

```stata
. set obs 1
Number of observations (_N) was 0, now 1.

. gen var1 = 0 in 1

. set obs 2
Number of observations (_N) was 1, now 2.

. replace var1 = 1 in 2
(1 real change made)

. set obs3
-set obs3- not allowed; 'obs3' not recognized
r(199);

.  set obs 3
Number of observations (_N) was 2, now 3.

. replace var1 = 2 in 3
(1 real change made)

. set obs 4
Number of observations (_N) was 3, now 4.

. replace var1 = 23078 in 4
(1 real change made)

. format %td var1

. list

     +-----------+
     |      var1 |
     |-----------|
  1. | 01jan1960 |
  2. | 02jan1960 |
  3. | 03jan1960 |
  4. | 09mar2023 |
     +-----------+

```

4. 缺失数据

- 来源缺失，或不合逻辑
- `.`，大于所有非缺失数据
- `.a .b .c ... .z`，依次增大

### 表达式

1. 算数符号：加：`+`，减：`-`，乘：`*`，除：`/`，乘方：`^`

2. 关系符号

- `=`：赋值
- `==`：等于
- `!=`：不等于
- `>`：大于
- `<`：小于
- `>=`：大于等于
- `<=`：小于等于

3. 逻辑符号：与：`&`，或：`|`，非：`!`，等于：`==`...

### 创建数据集

1. 批量输入数据

```stata
clear
input id str20 name female wage //str20 大约能显示10个汉字
    1 Alice 1 40
    2 Chris 0 80
    3 Tom 0 20
    4 Jack 0 70
    5 Mary 1 40
end
```

2. 手动输入数据

`edit`：打开数据编辑器

```stata
set obs 1
generate var1 = 1 in 1

```

3. 生成新变量

语法：<u>gen</u>erate [type] newvar=exp [if] [in]

- type：指定变量类型，默认为`float`
- newvar：指定变量名，如变量名已存在则报错
- exp：变量赋值表达式
- in：观测值范围
- if：在一定条件下生成新变量

4. 修改已有变量
