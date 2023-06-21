---
title: Spring
date: 2023-03-11
tags:
 - spring
category:
 - 学习笔记
---


##  Spring

> 相关视频：[https://www.bilibili.com/video/BV1Hy4y1B78T?p=28&vd_source=7138dfc78c49f602f8d3ed8cfbf0513d](https://www.bilibili.com/video/BV1Hy4y1B78T?p=28&vd_source=7138dfc78c49f602f8d3ed8cfbf0513d)  
> 前提知识：[https://www.pdai.tech/md/spring/spring-x-framework-introduce.html#%E4%BB%80%E4%B9%88%E6%98%AFspring](https://www.pdai.tech/md/spring/spring-x-framework-introduce.html#%E4%BB%80%E4%B9%88%E6%98%AFspring) 

Spring = IOC + AOP + TX 

### 1、Spring Aop 顺序

#### 1.1、Aop 常用注解

Spring 中的 5 个通知

@Before 前置通知: 目标方法之前执行
@After 后置通知: 目标方法之后执行（始终执行）
@AfterReturning 返回后通知: 执行方法结束前执行(异常不执行)
@AfterThrowing 异常通知: 出现异常时候执行
@Around 环绕通知: 环绕目标方法执行

#### 1.2、Spring Aop 面试题

面试官对线环节

1. 你肯定知道 Spring，那说说 Aop 的全部通知顺序 Springboot 或 Springboot2 对 Aop 的执行顺序影响？

2. 说说你使用 Aop 中碰到的坑

   spring4==>5对于AOP的执行顺序是不同的

   boot1 ===>  boot2  底层是  spring4==>5 

#### 1.3、测试前的准备工作

##### 1.3.1、业务类

创建业务接口类：CalcService

```java
   public interface CalcService {
   		public int div(int x, int y);
   }
```

创建业务接口的实现类：CalcServiceImpl

```java

   @Service
   public class CalcServiceImpl implements CalcService {
   @Override
   public int div(int x, int y) {
       int result = x / y;
       System.out.println("=========>CalcServiceImpl被调用了,我们的计算结果：" + result);
       return result;
   }
   }
```

##### 1.3.2、切面类

> **想在除法方法前后各种通知，引入切面编程**

1. `@Aspect`：指定一个类为切面类
2. `@Component`：纳入 Spring 容器管理

> **创建切面类 `MyAspect`**

```java

@Aspect
@Component
public class MyAspect {
    @Before("execution(public int com.heygo.spring.aop.CalcServiceImpl.*(..))")
    public void beforeNotify() {
        System.out.println("******** @Before我是前置通知MyAspect");
    }

    @After("execution(public int com.heygo.spring.aop.CalcServiceImpl.*(..))")
    public void afterNotify() {
        System.out.println("******** @After我是后置通知");
    }

    @AfterReturning("execution(public int com.heygo.spring.aop.CalcServiceImpl.*(..))")
    public void afterReturningNotify() {
        System.out.println("********@AfterReturning我是返回后通知");
    }

    @AfterThrowing("execution(public int com.heygo.spring.aop.CalcServiceImpl.*(..))")
    public void afterThrowingNotify() {
        System.out.println("********@AfterThrowing我是异常通知");
    }

    @Around("execution(public int com.heygo.spring.aop.CalcServiceImpl.*(..))")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object retValue = null;
        System.out.println("我是环绕通知之前AAA");
        retValue = proceedingJoinPoint.proceed();
        System.out.println("我是环绕通知之后BBB");
        return retValue;
    }
}

```

#### 1.4、Spring4 下的测试

##### 1.4.1、POM 文件

> **在 POM 文件中导入 SpringBoot 1.5.9.RELEASE 版本**

SpringBoot 1.5.9.RELEASE 版本的对应的 Spring 版本为 4.3.13 Release

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <!-- <version>2.3.3.RELEASE</version> -->
        <version>1.5.9.RELEASE</version>
        <relativePath/>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.heygo</groupId>
    <artifactId>interview1024</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <!-- <version>1.5.9.RELEASE</version>
               ch/qos/logback/core/joran/spi/JoranException解决方案-->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.1.3</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-access</artifactId>
            <version>1.1.3</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.1.3</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- springboot-jdbc 技术 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <!-- springboot-aop 技术 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
        <!--hutool-->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-captcha</artifactId>
            <version>4.6.8</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

##### 1.4.2、创建主启动类

> **在主包名下创建启动类**

为何要在主包名下创建启动类？其他子包均在主包下面，这样我们就不用使用 `@ComponentScan` 扫扫描包啦~

![image-20210122153117395](./images\d51a89e7e741f70f6e42da46734f5533.png)

Springboot 启动类带上 @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})，至于为啥，等到我复习 SpringBoot 的时候再说吧~

```java

   @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
   public class AopStudyApplication {
   public static void main(String[] args) {
       SpringApplication.run(AopStudyApplication.class, args);
   }
   }
```

##### 1.4.3、创建测试类

> **在主启动类所在包下创建子包与测试类**

![](./images\db995436c981db56ca086a195bf0a1ca.png)

**注意**：SpringBoot 1.5.9 版本在测试类上需要加上 `@RunWith(SpringRunner.class)` 注解，单元测试需要导入的包名为 `import org.junit.Test;`

```java
@SpringBootTest
@RunWith(SpringRunner.class)  //1.5.9
public class AopTest {
    @Autowired
    private CalcService calcService;

    @Test
    public void testAop4() {
        System.out.println("spring版本：" + SpringVersion.getVersion() + "\t" + "SpringBoot版本：" + SpringBootVersion.getVersion());
        System.out.println();
        calcService.div(10, 2);
        // calcService.div(10, 0);
    }
}

```

##### 1.4.4、Aop 测试结果

> **正常执行的结果**

环绕通知将前置通知与目标方法包裹住，执行完 `@After` 才执行 `@AfterReturning`

![](./images\e0ac4e887b5c9a1ef5d8ebd4df9b4f1c.png)

> **异常执行的结果**

由于抛出了异常，因此环绕通知后半部分没有执行，执行完 `@After` 才执行 `@AfterThrowing`

![](./images\f59bc596d23c624c45b2ceae46d520f5.png)

注：Spring4 默认用的是 JDK 的动态代理

#### 1.5、Spring 5 下的测试

##### 1.5.1、POM 文件

在 POM 文件中导入 SpringBoot 1.5.9.RELEASE 版本

SpringBoot 2.3.3.RELEASE 版本的对应的 Spring 版本为 5.2.8 Release

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.3.RELEASE</version>
        <!-- <version>1.5.9.RELEASE</version> -->
        <relativePath/>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.heygo</groupId>
    <artifactId>interview1024</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- springboot-jdbc 技术 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <!-- springboot-aop 技术 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
        <!--hutool-->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-captcha</artifactId>
            <version>4.6.8</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

#### 1.5.2、创建主启动类

> **沿用 Spring4 的主启动类**

同样也需要在主启动类上添加 `@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})` 注解

#### 1.5.3、创建测试类

> **在 Spring4 的测试类下修改代码**

注意：SpringBoot 2.3.3 版本下，不需要在测试类上面添加 @RunWith(SpringRunner.class) 直接，单元测试需要导入的包名为 import org.junit.jupiter.api.Test;，不再使用 import org.junit.Test;

```java
@SpringBootTest
public class AopTest {
    @Autowired
    private CalcService calcService;

    @Test
    public void testAop4() {
        System.out.println("spring版本：" + SpringVersion.getVersion() + "\t" + "SpringBoot版本：" + SpringBootVersion.getVersion());
        System.out.println();
        calcService.div(10, 0);
    }

    @Test
    public void testAop5() {
        System.out.println("spring版本：" + SpringVersion.getVersion() + "\t" + "SpringBoot版本：" + SpringBootVersion.getVersion());
        System.out.println();
        calcService.div(10, 5);
    }
}

```

#### 1.5.4、Aop 测试结果

> **正常执行的结果**

感觉 Spring5 的环绕通知才是真正意义上的华绕通知，它将其他通知和方法都包裹起来了，而且 `@AfterReturning` 和 `@After` 之前，合乎逻辑！

![](./images\ca5467f3ea20c7c0697146376f4c3d47.png)

> **异常执行的结果**

由于方法抛出了异常，因此环绕通知后半部分没有执行，并且 `@AfterThrowing` 和 `@After` 之前

![](./images\bb4d946a40e607b8147e6deac8b02ade.png)

### 1.6、Aop 执行顺序总结

> **呐呐呐~~~**

![](./images\c07f348f468d4090bb39b07baf4f377e.png)

## 2、Spring 循环依赖

### 2.1、恶心的大厂面试题

> **被面试官暴打**

1. 你解释下spring中的三级缓存？
2. 三级缓存分别是什么？三个Map有什么异同？
3. 什么是循环依赖？请你谈谈？看过 Spring源码吗？一般我们说的 Spring容器是什么？
4. 如何检测是否存在循环依赖？实际开发中见过循环依赖的异常吗？
5. 多例的情况下，循环依赖问题为什么无法解决？
6. 。。。。。。

### 2.2、什么是循环依赖？

> **多个 bean 之间相互依赖，形成了一个闭环**

比如：A 依赖于 B、B 依赖于 C、C 依赖于 A

```
public class CircularDependency {
    class A {
        B b;
    }
    
    class B {
        C c;
    }
    
    class C {
        A a;
    }
}

```

通常来说，如果问 Spring 容器内部如何解决循环依赖， 一定是指默认的单例 Bean 中，属性互相引用的场景。也就是说，Spring 的循环依赖，是 Spring 容器注入时候出现的问题

![](./images\3c328ee84a41d90aa960e5857fc78ddf.png)

### 2.3、两种注入方式对循环依赖的影响

> **[官网对循环依赖的说明](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-dependencies)**

![](./images\2ccae790d89d70f0e8aeeb6630305ed3.png)

**两种注入方式对循环依赖的影响**

构造器注入：容易造成无法解决的循环依赖，不推荐使用（If you use predominantly constructor injection, it is possible to create an unresolvable circular dependency scenario.）

Setter 注入：推荐使用 setter 方式注入单例 bean

结论：我们 AB 循环依赖问题只要 A 的注入方式是 setter 且 singleton，就不会有循环依赖问题

### 2.4、Spring容器循环依赖异常

#### 2.4.1、通过代码理解循环依赖

循环依赖现象在 Spring 容器中 注入依赖的对象，有 2 种情况

> **构造器方式注入依赖**

**代码**

1、`ServiceA`

```java
@Component
public class ServiceA {

    private ServiceB serviceB;

    public ServiceA(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}

```

2、`ServiceB`

```java
@Component
public class ServiceB {

    private ServiceA serviceA;

    public ServiceB(ServiceA serviceA) {
        this.serviceA = serviceA;
    }
}

```

3、`ClientConstructor`

```java
/**
 * 通过构造器的方式注入依赖，构造器的方式注入依赖的bean，下面两个bean循环依赖
 *
 * 测试后发现，构造器循环依赖是无法解决的
 */
public class ClientConstructor {
    public static void main(String[] args) {
        new ServiceA(new ServiceB(new ServiceA(new ServiceB()))); ....
    }
}

```

**结论**：构造器注入没有办法解决循环依赖， 你想让构造器注入支持循环依赖，是不存在的。如果构造器能够解决循环依赖问题，那么我就可以无限套娃~

**形象理解**：各自实例化时都需要对方实例，这就类似于死锁，如果不采取一种办法解决，那么它们将永远互相等待下去

> **Setter 方式注入**

**代码**

1、`ServiceA`

```
@Component
public class ServiceA {

    private ServiceB serviceB;

    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
        System.out.println("A 里面设置了B");
    }
}

```

2、`ServiceB`

```
@Component
public class ServiceB {

    private ServiceA serviceA;

    public void setServiceA(ServiceA serviceA) {
        this.serviceA = serviceA;
        System.out.println("B 里面设置了A");
    }
}

```

3、`ClientConstructor`

```
public class ClientSet {
    public static void main(String[] args) {

        //创建serviceA
        ServiceA serviceA = new ServiceA();

        //创建serviceB
        ServiceB serviceB = new ServiceB();

        //将serviceA注入到serviceB中
        serviceB.setServiceA(serviceA);

        //将serviceB注入到serviceA中
        serviceA.setServiceB(serviceB);

    }
}

```

**结论**：setter 方式可以解决循环依赖问题

#### 2.4.2、演示循环依赖异常

> **环境搭建**

1.`A` 类

```

public class A {
    private B b;

    public B getB() {
        return b;
    }

    public void setB(B b) {
        this.b = b;
    }

    public A() {
        System.out.println("---A created success");
    }
}

```

2.`B` 类

```

public class B {
    private A a;

    public A getA() {
        return a;
    }

    public void setA(A a) {
        this.a = a;
    }
    
    public B() {
        System.out.println("---B created success");

    }
}

```

3.`ClientSpringContainer` 类

```
/**
 * @ClassName ClientSpringContainer
 * @Description 只有单例的bean会通过三级缓存提前暴露来解决循环依赖的问题，因为单例的时候只有一份，随时复用，那么就放到缓存里面
 * 而多例的bean，每次从容器中荻取都是—个新的对象，都会重B新创建，所以非单例的bean是没有缓存的，不会将其放到三级缓存中。
 */
public class ClientSpringContainer {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        A a = context.getBean("a", A.class);
        B b = context.getBean("b", B.class);
    }
}

```

4.在 resources 文件夹下创建 applicationContext.xml 文件，对 bean 中的属性进行注入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--
        1.spring容器默认的单例模式可以解决循环引用，单例默认支持
        2.spring容器原型依赖模式scope="prototype"多例模式下不能解决循环引用
    -->

    <!--depends-on 的意思就是当前这个bean如果要完成，先看depends-on指定的bean是否已经完成了初始化-->
    <!--scope="prototype"代表每次都要新建一次对象-->
    
    <bean id="a" class="com.heygo.spring.circulardependency.A">
        <property name="b" ref="b"/>
    </bean>

    <bean id="b" class="com.heygo.spring.circulardependency.B">
        <property name="a" ref="a"/>
    </bean>

</beans>

```

> **scope = “singleton”，默认的单例(Singleton)的场景是支持循环依赖的，不报错**

每个 bean 的 `scope` 实行默认不写就是 `singleton`，

![](./images\cfaefc7fed81fd85d5073f2bf7ba885f.png)

beanA 和 beanB 都创建成功了，程序没有抛异常

![](./images\423cccda2d480fb7a03e196eb27419a4.png)

> **scope = “prototype”，原型(Prototype)的场景是不支持循环依赖的，报错**

将 bean 的生命周期改为 `prototype`

![](./images\80e12d13479fca5b69ae47c3d245c7cc.png)

啊哦，抛异常了：Exception in thread "main" org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'a' defined in class path resource [applicationContext.xml]: Cannot resolve reference to bean 'b' while setting bean property 'b'; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'b' defined in class path resource [applicationContext.xml]: Cannot resolve reference to bean 'a' while setting bean property 'a'; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'a': Requested bean is currently in creation: Is there an unresolvable circular reference?


![](./images\2acabec357c596d4be199c94024aed13.png)

#### 2.4.3、循环依赖的解决办法

> **重要结论：Spring 内部通过 3 级缓存来解决循环依赖**

所谓的三级缓存其实就是 Spring 容器内部用来解决循环依赖问题的三个 Map，这三个 Map 在 `DefaultSingletonBeanRegistry` 类中

![](./images\a9e8b9f5544d53d088e6a53106fb453e.png)

第一级缓存：Map<String, Object> singletonObjects，我愿称之为成品单例池，常说的 Spring 容器就是指它，我们获取单例 bean 就是在这里面获取的，存放已经经历了完整生命周期的Bean对象

第二级缓存：Map<String, Object> earlySingletonObjects，存放早期暴露出来的Bean对象，Bean的生命周期未结束（属性还未填充完整，可以认为是半成品的 bean）

第三级缓存：Map<String, ObiectFactory<?>> singletonFactories，存放可以生成Bean的工厂，用于生产（创建）对象

### 2.5、源码 Deug 前置知识

#### 2.5.1、实例化 & 初始化

> **实例化和初始化的区别**

1.实例化：堆内存中申请一块内存空间

租赁好房子，自己的家具东西还没有搬进去

![](./images\d381ecf29e4f454195a84b4b654b56b9.png)

2.初始化：完成属性的填充

装修家具家电进场

![](./images\fc14ffa11f07f0cbf735b99cf8fa96df.png)

#### 2.5.2、3个Map & 4个方法

> **三级缓存 + 四大方法**

![](./images\6c9cbc1541cfa0198879b84c37740971.png)

三级缓存

第一级缓存：Map<String, Object> singletonObjects，存放的是已经初始化好了的Bean，bean名称与bean实例相对应，即所谓的单例池。表示已经经历了完整生命周期的Bean对象

第二级缓存：Map<String, Object> earlySingletonObjects，存放的是实例化了，但是未初始化的Bean，bean名称与bean实例相对应。表示Bean的生命周期还没走完（Bean的属性还未填充）就把这个Bean存入该缓存中。也就是实例化但未初始化的bean放入该缓存里

第三级缓存：Map<String, ObiectFactory<?>> singletonFactories，表示存放生成bean的工厂，存放的是FactoryBean，bean名称与bean工厂对应。假如A类实现了FactoryBean，那么依赖注入的时候不是A类，而是A类产生的Bean

四大方法

getSingleton()：从容器里面获得单例的bean，没有的话则会创建 bean   
doCreateBean()：执行创建 bean 的操作（在 Spring 中以 do 开头的方法都是干实事的方法）   
populateBean()：创建完 bean 之后，对 bean 的属性进行填充   
addSingleton()：bean 初始化完成之后，添加到单例容器池中，下次执行 getSingleton() 方法时就能获取到   
注：关于三级缓存 Map<String, ObjectFactory<?>> singletonFactories的说明，singletonFactories 的 value 为 ObjectFactory 接口实现类的实例。ObjectFactory 为函数式接口，在该接口中定义了一个 getObject() 方法用于获取 bean，这也正是工厂思想的体现（工厂设计模式）
![](./images\359ec993b520b2d8c81c1bfef615a27d.png)

#### 2.5.3、 对象在三级缓存中的迁移

> **A/B 两对象在三级缓存中的迁移说明**

- A创建过程中需要B，于是A将自己放到三级缓存里面，去实例化B

- B实例化的时候发现需要A，于是B先查一级缓存，没有，再查二级缓存，还是没有，再查三级缓存，找到了A，然后把三级缓存里面的这个A放到二级缓存里面，并删除三级缓存里面的A

- B顺利初始化完毕，将自己放到一级缓存里面（此时B里面的A依然是创建中状态），然后回来接着创建A，此时B已经创建结束，直接从一级缓存里面拿到B，然后完成创建，并将A自己放到一级缓存里面。


### 2.6、详细 Debug 流程

#### 2.6.1、beanA 的实例化

> **技巧：如何阅读框架源码？答：打断点 + 看日志**

在 ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml"); 代码处打上断点，逐步执行（Step Over），发现执行 new ClassPathXmlApplicationContext("applicationContext.xml") 操作时，beanA 和 beanB 都已经被创建好了，因此我们需要进入 new ClassPathXmlApplicationContext("applicationContext.xml") 中
![](./images\ea31ed933323897e3380cdb77ed0e0c7.png)

> **进入 `new ClassPathXmlApplicationContext("applicationContext.xml")` 中**

点击 Step Into，首先进入了静态代码块中，不管我们的事，使用 Step Out 退出此方法

![](./images\ae2dd47e47d9481e8e32b0cdc098bce0.png)

再次 Step Into，进入 `ClassPathXmlApplicationContext` 类的构造函数，该构造函数使用 this 调用了另一个重载构造函数

![](./images\afb4740ac2e70e7365b9927033c24ac9.png)

继续 Step Into，进入重载构造函数后单步 Step Over，发现执行完 `refresh()` 方法后输出如下日志，于是我们将断点打在 `refresh()` 那一行

![](./images\2b8db2d76a9bb8da9192712ac15761af.png)

> **进入 `refresh()` 方法**

Step Into 进入 `refresh()` 方法，发现执行完 `finishBeanFactoryInitialization(beanFactory)` 方法后输出日志，于是我们将断点打在

`finishBeanFactoryInitialization(beanFactory)` 那一行

从注释也可以看出本方法完成了非懒加载单例 bean的初始化（Instantiate all remaining (non-lazy-init) singletons.）

![](./images\21daaaa9ae688d7ee417c954a9f3bd4f.png)

**进入 `finishBeanFactoryInitialization(beanFactory)` 方法**

Step Into 进入 finishBeanFactoryInitialization(beanFactory) 方法，发现执行完 beanFactory.preInstantiateSingletons() 方法后输出日志，于是我们将断点打在 beanFactory.preInstantiateSingletons() 那一行

从注释也可以看出本方法完成了非懒加载单例 bean的初始化（Instantiate all remaining (non-lazy-init) singletons.）

![](./images\4d72208071e80b07f7b9707861420ab0.png)

> **进入 `beanFactory.preInstantiateSingletons()` 方法**

Step Into 进入 `beanFactory.preInstantiateSingletons()` 方法，发现执行完 `getBean(beanName)` 方法后输出日志，于是我们将断点打在 `getBean(beanName)` 那一行

![](./images\08c8543bf7424f4d1b34f41ece0f7eb8.png)

> **进入 `getBean(beanName)` 方法**

`getBean(beanName)` 调用了 `doGetBean(name, null, null, false)` 方法，也就是前面说过的：在 Spring 里面，以do 开头的方法都是干实事的方法

![](./images\81285879cc70cbd4b7dff97312bade78.png)

> **进入 `doGetBean(name, null, null, false)` 方法**

我们可以给 bean 配置别名，这里的 `transformedBeanName(name)` 方法就是将用户别名转换为 bean 的真实名称

![](./images\7030af09224d7acb8e6f7dbb63ed85f2.png)

> **进入 `getSingleton(beanName)` 方法**

有必要讲一下 `getSingleton(beanName)` 方法

![](./images\85d5ddcb783d854668b2a2622336d68f.png)

调用了其重载的方法，allowEarlyReference == true 表示可以从三级缓存 earlySingletonObjects 中获取 bean，allowEarlyReference == false 表示不可以从三级缓存 earlySingletonObjects 中获取 bean，
![](./images\69241ba42f45fb2a94c9b9fb8b8ccbf1.png)

getSingleton(beanName, true) 方法尝试从一级缓存 singletonObjects 中获取 beanA，beanA 现在还没有开始造呢（isSingletonCurrentlyInCreation(beanName) 返回 false），获取不到返回 null
![](./images\4a1637a018c3a77634eee01a899ab31d.png)

> **回到 `doGetBean(name, null, null, false)` 方法中**

getSingleton(beanName)` 方法返回 `null

![](./images\8290a9483ec124dadabe3929e6a2d979.png)

我们所说的 bean 对于 Spring 来说就是一个个的 `RootBeanDefinition` 实例

![](./images\9a9efeb3c98d2c9a536d39cf9f1b6f35.png)

这个 `dependsOn` 变量对应于 bean 的 `depends-on=""` 属性，我们没有配置过，因此为 `null`

![](./images\0e97745c55bbd9dcd3a6b4d2619798e7.png)

转了一圈发现并没有 beanA，终于要开始准备创建 beanA 啦

![](./images\843b23b517e0348601c8f9bea5a39371.png)

> **进入 `getSingleton(beanName, () -> {... }` 方法**

在 IDEA 2020 中，点击 Step Into 可以手动选择要进入的方法，因此我们需要使用鼠标左键点击 `getSingleton()` 方法

![](./images\0085b5de41682d3ece60f14128670317.png)

首先尝试从一级缓存 singletonObjects 获取 beanA，那肯定是获取不到的啦，因此 singletonObject == null，那么就需要创建 beanA，此时日志会输出：【Creating shared instance of singleton bean ‘a’】
![](./images\692f53b08decc2f8c273126505d31ebf.png)

当执行完 singletonObject = singletonFactory.getObject(); 时，会输出【—A created success】，这说明执行 singletonFactory.getObject() 方法时将会实例化 beanA，并且根据代码变量名可得知单例工厂创建的，这个单例工厂就是我们传入的 Lambda 表达式


![](./images\0406b72e8fd11c1c29171c14562de754.png)

> **进入 `createBean(beanName, mbd, args)` 方法**

我们 Step Into 进入 `createBean(beanName, mbd, args)` 方法中，`mbdToUse` 将用于创建 beanA

![](./images\49f16f165454a2a06ab0fa1c05d13b71.png)

> **进入 `doCreateBean(beanName, mbdToUse, args)` 方法**

Step Into 进入 `doCreateBean(beanName, mbdToUse, args)` 方法，在 在 factoryBeanInstanceCache 中并不存在 beanA 对应的 Wrapper 缓存，instanceWrapper == null，因此我们要去创建 beanA 对应的 instanceWrapper，Wrapper 由包裹之意思，instanceWrapper 翻译过来为实例包裹器的意思，形象理解为：beanA 实例化需要经过 instanceWrapper 之手，beanA 实例被 instanceWrapper 包裹在其中
![](./images\d61cbb3f465a1faeee808dbf83b2f55a.png)

> **进入 `createBeanInstance(beanName, mbd, args)` 方法**

这一看就是反射的操作啊

![](./images\cf1fd627a5f95866a19524d10e10580b.png)

这里有个 resolved 变量，写着注释：Shortcut when re-creating the same bean…，我个人理解是 resolved 标志该 bean 是否已经被实例化了，如果已经被实例化了，那么 resolved == true，这样就不用重复创建同一个 bean 了
![](./images\b3d8d8e59730bdf6b36bde1072ac1e36.png)

Candidate constructors for autowiring? 难道是构造器自动注入？在 return 的时候调用 `instantiateBean(beanName, mbd)` 方法实例化 beanA，并将其返回

![](./images\638387916cf2559906201754d698b820.png)

> **进入 `instantiateBean(beanName, mbd)` 方法**

`getInstantiationStrategy().instantiate(mbd, beanName, this)` 方法完成了 beanA 的实例化

![](./images\b85ea37494142bb53c48f7ffa0b68313.png)

> **进入 `getInstantiationStrategy().instantiate(mbd, beanName, this)` 方法**

首先获取已经解析好的构造器 `bd.resolvedConstructorOrFactoryMethod`，这是第一次创建，当然还没有啦，因此 `constructorToUse == null`。然后获取 A 的类型，如果发现是接口则直接抛异常。最后获取 A 的公开构造器，并将其赋值给 `bd.resolvedConstructorOrFactoryMethod`

![](./images\6a2bb392c384f4d4db863c5b4ba45650.png)

获取构造器的目的当然是为了实例化 beanA 啦

![](./images\c736fa961c08f2a62b0455a167f6fc3d.png)

> **进入 `BeanUtils.instantiateClass(constructorToUse)` 方法**

通过构造器创建 beanA 实例，Step Over 后会输出：【—A created success】，并且会回到`getInstantiationStrategy().instantiate(mbd, beanName, this)` 方法中

![](./images\e9e6040168ec3daa5a0233017f70fd74.png)

> **回到 `getInstantiationStrategy().instantiate(mbd, beanName, this)` 方法中**

在 `BeanUtils.instantiateClass(constructorToUse)` 方法中创建好了 beanA 实例，不过还没有进行初始化，可以看到属性 `b = null`，Step Over 后会回到 `instantiateBean(beanName, mbd)` 方法中

![](./images\10593da4c5751b30fd8b21a12150c20b.png)

> **回到 `instantiateBean(beanName, mbd)` 方法中**

得到刚才创建的 beanA 实例，但其属性并未被初始化

![](./images\d20d180e9c5d7591093b43581731f923.png)

将实例化的 beanA 装进 BeanWrapper 中并返回 `bw`

![](./images\09a722184363e1018e9f2676f56f69a5.png)

> **回到 `createBeanInstance(beanName, mbd, args)` 方法中**

得到刚才创建的 `beanWrapper` 实例，该 `beanWrapper` 包裹（封装）了刚才创建的 beanA 实例

![](./images\2e11011dbccd693bcfd53d9b810622aa.png)

> **回到 `doCreateBean(beanName, mbdToUse, args)` 方法中**

在 `doCreateBean(beanName, mbdToUse, args)` 方法获得 `BeanWrapper instanceWrapper`，用于封装 beanA 实例

![](./images\edac7b49ece5cb1e491b63f9067082a6.png)

获取并记录 A 的全类名

![](./images\bac8654b3f9e491823f2bc172cf1169f.png)

执行 `BeanPostProcessor`

![](./images\4b217710f3f2214b7de1cee5d1494e01.png)

如果该 bean 是单例 bean（mbd.isSingleton()），并且允许循环依赖（this.allowCircularReferences），并且当前 bean 正在创建过程中（isSingletonCurrentlyInCreation(beanName)），那么就就允许提前暴露该单例 bean（earlySingletonExposure = true），则会执行 addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean)) 方法将该 bean 放到三级缓存 singletonFactories 中

![](./images\de8cb0631d168ee788992dbf07d8b608.png)

> **进入 `addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean))` 方法**

首先去一级缓存 `singletonObjects` 中找一下有没有 beanA，肯定没有啦~然后将 beanA 添加到三级缓存 singletonFactories 中，并将 beanA 从二级缓存 earlySingletonObjects 中移除，最后将 beanName 添加至 registeredSingletons 中，表示该 bean 实例已经被注册
![](./images\71fa0e9d7441fb7d39e922f02797c58c.png)

#### 2.6.2、beanA 的属性填充

> **回到 `doCreateBean(beanName, mbdToUse, args)` 方法中**

接着回到 `doCreateBean(beanName, mbdToUse, args)` 方法中，需要执行 `populateBean(beanName, mbd, instanceWrapper)` 方法对 beanA 中的属性进行填充

![](./images\ed73ccc4c1dda8e7cb74c34c6215fe28.png)

> **进入 `populateBean(beanName, mbd, instanceWrapper)` 方法**

获取 beanA 的属性列表

![](./images\6f7e7f0cee224ad4d17cbbe937abdc2c.png)

执行 `applyPropertyValues(beanName, mbd, bw, pvs)` 方法完成 beanA 属性的填充

![](./images\cc1624181da4c9f8ab26ffaeb9a0d6b7.png)

> **进入 `applyPropertyValues(beanName, mbd, bw, pvs)` 方法**

获取到 beanA 的属性列表，发现有个属性为 `b`

![](./images\074046757a0d38eb0aa96d0d617951c3.png)

遍历每一个属性，并对每一个属性进行注入，valueResolver.resolveValueIfNecessary(pv, originalValue) 的作用：Given a PropertyValue, return a value, resolving any references to other beans in the factory if necessary.
![](./images\097d8cfe27bda2e8f4aa428c7db26651.png)

> **进入 `valueResolver.resolveValueIfNecessary(pv, originalValue)` 方法**

通过 `resolveReference(argName, ref)` 解决依赖注入的问题

> **进入 `resolveReference(argName, ref)` 方法**

先获得属性 `b` 的名称，再通过 `this.beanFactory.getBean(resolvedName)` 方法获取 beanB 的实例

![](./images\40fb3e07ab7b85d744f88e254914188a.png)

#### 2.6.3、beanB 的实例化

> **进入 `this.beanFactory.getBean(resolvedName)` 方法**

哦，这熟悉的 `doGetBean(name, null, null, false)` 方法，这就开始递归了呀

![](./images\bbf2a2f9e9ffbc55033b3f8b0c14c293.png)

> **再次执行 `doGetBean(name, null, null, false)` 方法**

beanB 还没有实例化，因此 `getSingleton(beanName)` 方法返回 `null`

![](./images\d4232b6200fc5e47f83b231675554b80.png)

呐，又来到了这个熟悉的地方，先尝试获取 beanB 实例，获取不到就执行 `createBean()` 的操作

![](./images\f2fdc13f836deabe04b5b213b1cf08c9.png)

### 3、小总结
1. 调用doGetBean()方法，想要获取beanA，于是调用getSingleton()方法从缓存中查找beanA
2. 在getSingleton()方法中，从一级缓存中查找，没有，返回null
3. doGetBean()方法中获取到的beanA为null，于是走对应的处理逻辑，调用getSingleton()的重载方法(参数为ObjectFactory的)
4. 在aetSingleton()方法中，先将beanAname添加到一个集合中，用于标记该bean正在创建中。然后回调展名内部类的creatBean方法
5. 进入AbstractAutowireCapableBeanFactory#doCreateBean，先反射调用构造器创建出beanA的实例，然后判断:是否为单例、是否允许提前禁发引用(对干单例一股为tre)。是否正在创建中(即基杏在第四步的集合中)。到新为tell将beanA本加到(二级经在)中
6. 对beanA进行属性填充，此时检测到beanA依赖于beanB，于是开始查找beanB
7. 调用doGetBean()方法，和上面beanA的过程一样，到级存中查找beanB，没有则创建，然后给beanB填充属性
8. 此时beanB依赖干beanA，调用getSingleton()获取beanA，依次从一级、二级、三级经存中找，此时从三级缓存中获取到beanA的创建工厂，通过创建工厂获取到singletonObject，此时这个singletonObject指向的就是上面在doCreateBean()方法中实例化的beanA9 这样beanB就获取到了beanA的依赖，于是beanB顺利完成实例化，并将beanA从三级缓存移动到二级缓存中
10. 随后beanA继续他的属性填充工作，此时也获取到了beanB，beanA也随之完成了创建。回到getSingleton()方法中继续向下执行，将beanA从级缓存移动到一级缓存中

