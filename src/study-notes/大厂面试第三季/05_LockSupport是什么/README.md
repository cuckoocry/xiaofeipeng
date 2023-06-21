---
title: LockSupport
date: 2023-03-18
category:
 - 学习笔记
---
## LockSupport是什么

1. 为什么要学习LockSupport
   1.  Java -------jvm
   2.  JUC ------- AQS ------> （前置知识、可重入锁、LockSupport）
2. 学习方法
   1. 是什么
   2. 能干吗
   3. 去哪下
   4. 怎么玩
3. AB -> after/ before

### **AB -> after/ before**

![image-20210918201339817](./images\image-20210918201339817.png)


### 学习方法

API网站地址：https://www.apiref.com/java11-zh/java.base/module-summary.html

找到 java.util.concurrent.locks ---->  LockSupport  (用于创建锁和其他同步类的基本线程阻塞原语。)

该类与使用它的每个线程关联一个许可证（在[`Semaphore`](https://www.apiref.com/java11-zh/java.base/java/util/concurrent/Semaphore.html)类的意义上）。

```dockerfile
模块  java.base
软件包  java.util.concurrent.locks


java.lang.Object
java.util.concurrent.locks.LockSupport
public class LockSupport
extends Object
用于创建锁和其他同步类的基本线程阻塞原语。
该类与使用它的每个线程关联一个许可证（在Semaphore类的意义上）。 如果许可证可用，将立即返回park ，并在此过程中消费; 否则可能会阻止。 如果尚未提供许可，则致电unpark获得许可。 （与Semaphores不同，许可证不会累积。最多只有一个。）可靠的使用需要使用volatile（或原子）变量来控制何时停放或取消停放。 对于易失性变量访问保持对这些方法的调用的顺序，但不一定是非易失性变量访问。

方法park和unpark提供了阻止和解除阻塞线程的有效方法，这些线程没有遇到导致不推荐使用的方法Thread.suspend和Thread.resume无法用于此类目的的问题：一个线程调用park和另一个线程尝试unpark将保留活跃性，由于许可证。 此外，如果调用者的线程被中断，则会返回park ，并且支持超时版本。 park方法也可以在任何其他时间返回，“无理由”，因此通常必须在返回时重新检查条件的循环内调用。 在这个意义上， park可以作为“忙碌等待”的优化，不会浪费太多时间旋转，但必须与unpark配对才能生效。

三种形式的park每个也支持blocker对象参数。 在线程被阻塞时记录此对象，以允许监视和诊断工具识别线程被阻止的原因。 （此类工具可以使用方法getBlocker(Thread)访问阻止程序 。）强烈建议使用这些表单而不是没有此参数的原始表单。 在锁实现中作为blocker提供的正常参数是this 。

这些方法旨在用作创建更高级别同步实用程序的工具，并且对于大多数并发控制应用程序本身并不有用。 park方法仅用于以下形式的构造：

   while (!canProceed()) { // ensure request to unpark is visible to other threads ... LockSupport.park(this); } 
在调用park之前，线程没有发布请求park需要锁定或阻塞。 因为每个线程只有一个许可证，所以任何中间使用park ，包括隐式地通过类加载，都可能导致无响应的线程（“丢失unpark”）。
```

简言之LockSupport就是线程等待唤醒机制（wait/notify）的改良加强版

`LockSupport中的park()和 unpark()的作用分别是阻塞线程和解除阻塞线程。`

总之，比wait/notify，await/signal更强。



