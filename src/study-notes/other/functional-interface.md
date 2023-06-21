---
title: 函数式接口
date: 2022-04-24
tags:
 - 书籍
category:
 - 学习笔记
---

::: tip
官网：https://www.oracle.com/java/technologies/javase/8-whats-new.html
:::

## 函数式接口
`functional interface` 函数式接口：也称 SAM 接口，即 `Single Abstract Method interfaces`，**有且只有一个抽象方法**，但可以有多个非抽象方法的接口。


### 简易例子

```java
import java.util.function.Function;

public class FunctionExample {
   public static void main(String[] args) {
      
      // 使用Lambda表达式创建一个Function接口的实例
      Function<String, Integer> strLength = str -> str.length();
      
      // 调用apply方法来计算字符串的长度
      int length = strLength.apply("Hello, world!");
      System.out.println("字符串的长度为：" + length);
   }
}
```

### 去掉if的例子
```java
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class NoIfExample {
    private static final Map<String, Function<String, String>> MAP = new HashMap<>();

    static {
        MAP.put("foo", NoIfExample::foo);
        MAP.put("bar", NoIfExample::bar);
        MAP.put("baz", NoIfExample::baz);
    }

    private static String foo(String value) {
        return "Foo: " + value;
    }

    private static String bar(String value) {
        return "Bar: " + value;
    }

    private static String baz(String value) {
        return "Baz: " + value;
    }

    private static String defaultAction(String value) {
        return "Default: " + value;
    }
    
    public static void main(String[] args) {
        String key = "foo";
        String value = "Hello, world!";
        String result = MAP.getOrDefault(key, NoIfExample::defaultAction).apply(value);
        // 将lambda表达式(v) -> "Default: " + v作为第二个参数传递给getOrDefault方法，它接受一个字符串参数并返回一个带有默认值的字符串。
        // String result = MAP.getOrDefault(key, (v) -> "Default: " + v).apply(value);
        System.out.println(result);
    }


}

```

更多：   

`Supplier`接口： 该接口不接受任何参数，并返回一个值。

```java
private static final Map<String, Supplier<String>> MAP = new HashMap<>();

```

`Consumer`接口：该接口接受一个参数，并不返回任何值。

```java
    private static final Map<String, Consumer<String>> MAP = new HashMap<>();

```


###  实际使用例子

这段Java 8代码是一个以函数式接口为基础的代码段。
首先，创建了一个Map对象queryMap，它的键是Integer类型的，值是`Function<List<String>, Set<CcmxVO>>`类型的。这
意味着对于每个Integer类型的键，都会有一个对应的函数，该函数接受一个`List<String>`参数，返回一个`Set<CcmxVO>`类型的值。

然后，将这些函数添加到`queryMap`中，键是对应的整数类型。

这段代码的重点是使用函数式接口来管理和执行不同类型的查询操作。`queryMap`中的函数可以方便地添加、删除和修改。在循环中，根据当前键获取对应的函数，而无需编写大量的条件语句。

```java

    protected List<CfBdw> queryZxccData(Set<String> ajbhs, LocalDateTime start, LocalDateTime end) {
    
        List<CfBdw> zxCcxxList = zxccMapper.selectByAjbhsAndChangeTime(ajbhs, start, end);


        Map<Integer, List<CfBdw>> lxfz = zxCcxxList.stream().collect(Collectors.groupingBy(CfBdw::getBdwLx));

        Set<CcmxVO> ccmxList = new HashSet<>();

        // 1、每个类型 调用不同的方法，这里使用函数式接口来管理和执行不同类型的查询操作
        Map<Integer, Function<List<String>, Set<CcmxVO>>> queryMap = new HashMap<>();
        queryMap.put(6, zxccMapper::selectFcCcxxMx);
        queryMap.put(26, zxccMapper::selectFcCcxxMx);
        queryMap.put(27, zxccMapper::selectFcCcxxMx);
        queryMap.put(28, zxccMapper::selectFcCcxxMx);
        queryMap.put(5, zxccMapper::selectClCcxxMx);
        queryMap.put(12, zxccMapper::selectCbCcxxMx);
        queryMap.put(13, zxccMapper::selectYcCcxxMx);
        queryMap.put(29, zxccMapper::selectHkqCcxxMx);
        queryMap.put(30, zxccMapper::selectQtjtgjCcxxMx);
        queryMap.put(18, zxccMapper::selectJqsbCcxxMx);
        queryMap.put(19, zxccMapper::selectCpyclCcxxMx);
        queryMap.put(21, zxccMapper::selectGwzhCcxxMx);
        queryMap.put(36, zxccMapper::selectQttdsyqCcxxMx);
        queryMap.put(38, zxccMapper::selectZbysCcxxMx);
        queryMap.put(39, zxccMapper::selectTkckqCcxxMx);
        queryMap.put(255, zxccMapper::selectQtCcxxMx);
        
        // 2、循环遍历Map，Map的key对应queryMap的key
        for (Map.Entry<Integer, List<CfBdw>> entry : lxfz.entrySet()) {
            Integer type = entry.getKey();
            // 组装参数
            List<String> ccbhs = entry.getValue().stream().map(CfBdw::getBh).collect(Collectors.toList());
            // 调用函数接口
            Set<CcmxVO> ccmxVOS = queryMap.getOrDefault(type, (bhs) -> new HashSet<>()).apply(ccbhs);
            ccmxList.addAll(ccmxVOS);
        }
        
        // 其他操作。。。。。
        return zxCcxxList;
    }

```


