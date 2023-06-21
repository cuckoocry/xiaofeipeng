---
title: IDEA注释模板
date: 2022-04-20
tags:
 - 工具
---

> 其他关于IDEA的使用技巧：https://gitee.com/SnailClimb/awesome-idea-tutorial

## 1、关闭IDEA格式化注释
>IDEA在格式化模板的时候会把注释一起格式化，导致排好序的方法或者类注释顺序错乱。

设置方法：打开IDEAFile-> Setting -> Editor -> Code Style -> Java -> JavaDoc，找到Enable JavaDoc Formatting，将勾选取消掉即可。


## 2、类注释

### 2.1、在 File-> Setting -> Editor -> File and Code Templates -> Includes新建 `XiaoFeiPengJavaFile` （类名随意）
```shell
/**
* @projectName ${PROJECT_NAME}
* @package ${PACKAGE_NAME}
* @className ${PACKAGE_NAME}.${NAME}
* @copyright Copyright 2022 XiaoFeiPeng, Inc All rights reserved.
*/

```
### 2.2、在File-> Setting -> Editor -> File and Code Templates -> Includes新建 `XiaoFeiPengJavaClass`

```shell
/**
* ${NAME}
* @description ${description}
* @author xiaofeipeng
* @date ${DATE} ${TIME}
* @version 1.0
*/

```
### 2.3、在File-> Setting -> Editor -> File and Code Templates -> Files编辑以下项：

> * class
```shell
#parse("XiaoFeiPengJavaFile.java")
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

#parse("XiaoFeiPengJavaClass.java")
public class ${NAME} {
}


```
> * Interface
```shell
#parse("XiaoFeiPengJavaFile.java")
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

#parse("XiaoFeiPengJavaClass.java")
public interface ${NAME} {
}

```
> * Enum
```shell
#parse("XiaoFeiPengJavaFile.java")
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

#parse("XiaoFeiPengJavaClass.java")
public enum ${NAME} {
}

```
> * AnnotationType
```
#parse("XiaoFeiPengJavaFile.java")
        #if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

        #parse("XiaoFeiPengJavaClass.java")
public @interface ${NAME} {
        }


```

## 3、方法注释

### 3.1、新建Live Template：File-> Setting -> Editor -> Live Template，选择或者新建一个组，点击加号新建Live Template：
>说明：
Abbreviation是触发模板提示的符号。
Applicable In 这里是设置在什么内容中能触发本模板的提示，我设置的是在Java的注释中可以触发。
Expand with是触发提示后，选中提示然后加Enter键就可以生成模板，我设置的是Enter，也可以设置Tab和Space。

### 3.2、在新建的Live Template 的Template text内编写模板,注意空格：
```shell
*
 * 
 * $name$  
 *
 * @description $END$$params$$return$
 * @date $date$ $time$
 * @author XiaoFeiPeng
 * @version 1.0 
 */

```

### 3.3、点击EDIT VARIABLES，编辑参数：

比较特殊的两个,这两个是个groovy脚本：

* params参数：
```shell
groovyScript("def result=''; def params=\"${_1}\".replaceAll('\\\\[|\\\\]|\\\\s','').split(',').toList(); for(i = 0; i < params.size(); i++) {if(params[i].size()==0)continue;result+='\\n * @param ' + params[i] +' '}; return result", methodParameters())

```

* return参数：
```shell
groovyScript("def p=\"${_1}\";if(p=='null'||p=='void'){null}else{'\\n * @return '+\"${_1}\"}", methodReturnType())
```

### 3.4、记得勾选使用范围 `java`