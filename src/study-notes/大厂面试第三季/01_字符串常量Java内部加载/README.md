---
title: 字符串常量Java内部加载
date: 2023-03-11
---

## 字符串常量Java内部加载

### java字符串常量池：

	public class StringPool58Demo  {
	    public static void main(String[] args) {
	
	        String str1 = new StringBuilder("58").append("tongcheng").toString();
	        System.out.println(str1);
	        System.out.println(str1.intern());
	        System.out.println(str1 == str1.intern()); // true
	
	        System.out.println();
	
	        String str2 = new StringBuilder("ja").append("va").toString();
	        System.out.println(str2);
	        System.out.println(str2.intern());
	        System.out.println(str2 == str2.intern()); // false
	        
	       //只有Java为false,其他全部是true
	    }
	}

输出结果：
```dockerfile
58tongcheng
58tongcheng
true

java
java
false
```


```
String.java

public native String intern();

当调用intern方法时，如果字符串常量池已包含等于此{@code string}对象的字符串，由{@link#equals（Object）}方法，则池中的字符串直接返回。否则，此{@code String}对象将添加到并返回对此{@code String}对象的引用。
```

由于运行时常量池是方法区的一部分，所以这两个区域的溢出测试可以放到一起进行。HotSpot从JDK 7开始逐步“去永久代”的计划，并在JDK 8中完全使用元空间来代替永久代的背景故事，在此我们就以测试代码来观察一下，使用"永久代"还是“元空间"来实现方法区，对程序有什么实际的影响。

String:intern()是一个本地方法，它的作用是如果字符串常量池中已经包含一个等于此String对象的字符串，则返回代表池中这个字符串的String对象的引用；否则，会将此String对象包含的字符串添加到常量池中，并且返回此String对象的引用。在JDK 6或更早之前的HotSpot虚拟机中，常量池都是分配在永久代中，我们可以通过-XX:PermSize和-XX:MaxPermSize限制永久代的大小，即可间接限制其中常量池的容量。



按照代码结果，Java字符串答案为false必然是两个不同的java，那另外一个java字符串如何加载进来的?

有一个初始化的Java字符串（JDK出娘胎自带的），在加载sun.misc.Version这个类的时候进入常量池。

递推步骤

rt.jar通过bootstrap根加载器直接加载进来，

System代码解析 System -> initializeSystemClass() -> Version

```

public final class System {

    /* register the natives via the static initializer.
     *
     * VM will invoke the initializeSystemClass method to complete
     * the initialization for this class separated from clinit.
     * Note that to use properties set by the VM, see the constraints
     * described in the initializeSystemClass method.
     */
    private static native void registerNatives();
    注册本地方法通过静态的初始化加载，VM将调用initializeSystemClass方法来完成该类的初始化与clinit分离。
    请注意，要使用VM设置的属性，请参阅约束
    在initializeSystemClass方法中描述。


	//初始化System类。在线程初始化之后调用。
    private static void initializeSystemClass() {

		...
        
        sun.misc.Version.init();

		...
    }
}    
```

```

package sun.misc;

//反编译后的代码
public class Version {
	private static final String launcher_name = "java";
	private static final String java_version = "1.8.0_45";
    private static final String java_runtime_name = "Java(TM) SE Runtime Environment";
    private static final String java_profile_name = "";
    private static final String java_runtime_version = "1.8.0_45-b15";
	...
}


```

为什么java会是false,其他字符串都是true ，因为Java在出娘胎的时候就有launcher_name = "java";然后我们自己又new了一个java,他们两个不同，所以为false。

- 类加载器和rt.jar - 根加载器提前部署加载rt.jar
- OpenJDK8源码
  - http://openjdk.java.net/
  - openjdk8\jdk\src\share\classes\sun\misc
- https://docs.oracle.com/javase/8/docs/
----

出自深入理解Java虚拟机  P63

这段代码在JDK 6中运行，会得到两个false，而在JDK 7中运行，会得到一个true和一个false。产生差异的原因是，在JDK 6中，intern()方法会把首次遇到的字符串实例复制到永久代的字符串常量池中存储，返回的也是永久代里面这个字符串实例的引用，而由StringBuilder创建的字符串对象实例在Java堆上，所以必然不可能是同一个引用，结果将返回false。

而JDK 7(以及部分其他虚拟机，例如JRockit）的intern()方法实现就不需要再拷贝字符串的实例到永久代了，既然字符串常量池已经移到Java堆中，那只需要在常量池里记录一下首次出现的实例引用即可，因此intern()返回的引用和由StringBuilder创建的那个字符串实例就是同一个。而对str2比较返回false，这是因为“java”这个字符串在执行StringBuilder.toString()之前就已经出现过了，字符串常量池中已经有它的引用，不符合intern()方法要求“首次遇到"”的原则，“计算机软件"这个字符串则是首次出现的，因此结果返回true。



sun.misc.Version类会在JDK类库的初始化过程中被加载并初始化，而在初始化时它需要对静态常量字段根据指定的常量值(ConstantValue〉做默认初始化，此时被sun.misc.Version.launcher静态常量字段所引用的"java"字符串字面量就被intern到HotSpot VM的字符串常量池——StringTable里了。

### 更多

:black_cat: 观看宋红康老师的jvm第125集

