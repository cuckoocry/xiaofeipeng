---
title: LockSupport方法介绍
date: 2023-03-18
category:
 - 学习笔记
---
## LockSupport方法介绍

传统的synchronized和Lock实现等待唤醒通知的约束

- 线程先要获得并持有锁，必须在锁块(synchronized或lock)中
- 必须要先等待后唤醒，线程才能够被唤醒

LockSupport类中的park等待和unpark唤醒

1. 是什么
2. 主要方法
3. 代码
4. 重点说明
5. 面试题



### 1、是什么

通过park(和unpark(thread)方法来实现阻塞和唤醒线程的操作。

官网解释

```
Basic thread blocking primitives for creating locks and other synchronization classes.

This class associates, with each thread that uses it, a permit (in the sense of the Semaphore class). A call to park will return immediately if the permit is available, consuming it in the process; otherwise it may block. A call to unpark makes the permit available, if it was not already available. (Unlike with Semaphores though, permits do not accumulate. There is at most one.)

LockSupport是用来创建锁和其他同步类的基本线程阻塞原语。

LockSupport类使用了一种名为Permit（许可）的概念来做到阻塞和唤醒线程的功能，每个线程都有一个许可（permit），permit只有两个值1和零，默认是零。

可以把许可看成是一种(0.1)信号量（Semaphore），但与Semaphore不同的是，许可的累加上限是1。
```

### 2.主要方法

1. API  

   ![image-20210919140018198](./images\image-20210919140018198.png)

2. 阻塞

   1. **阻塞：park()/park(Object blocker) 的底层都是unsafe类，作用：阻塞当前线程 / 阻塞传入的具体线程**

      ![image-20210919140328881](./images\image-20210919140328881.png)

      permit默认是0，所以一开始调用park()方法，当前线程就会阻塞，直到别的线程将当前线程的permit设置为1时，park方法会被唤醒，然后会将permit再次设置为0并返回。

      

3. 唤醒

   unpark(Thread thread) - 唤醒处于阻塞状态的指定线程

![image-20210919140651128](./images\image-20210919140651128.png)

调用unpark(thread)方法后，就会将thread线程的许可permit设置成1（注意多次调用unpark方法，不会累加，pemit值还是1）会自动唤醒thead线程，即之前阻塞中的LockSupport.park()方法会立即返回。

### 3.代码

案例解析：

1. 正常+无锁块要求

```java
public class LockSupportDemo {
   static Object objectLock = new Object();

   static Lock lock = new ReentrantLock();
   static Condition condition = lock.newCondition();
   public static void main(String[] args) {
      //synchronizedWaitNotify();
      //lockAwaitSingal();

      lockSupportTest();
   }

   private static void lockSupportTest() {
      Thread a = new Thread(() -> {
         System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
         //被阻塞。。。。等待通知或放行，他要通过需要许可证
         LockSupport.park();
         System.out.println(Thread.currentThread().getName() + "\t" + "------被唤醒");

      }, "a");
      a.start();

      //暂停3秒钟后
      try {
         TimeUnit.SECONDS.sleep(3L);
      } catch (InterruptedException e) {
         e.printStackTrace();
      }

      Thread b = new Thread(() -> {
         LockSupport.unpark(a);
         System.out.println(Thread.currentThread().getName() + "\t" + "------b线程发出唤醒通知");

      }, "b");
      b.start();
   }

   private static void lockAwaitSingal() {
      new Thread(() -> {
         //    try { TimeUnit.SECONDS.sleep(3);} catch (InterruptedException e) {e.printStackTrace();}
         lock.lock();
         System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
         try {
            condition.await();
         } catch (InterruptedException e) {
            e.printStackTrace();
         }finally {
            lock.unlock();
         }
         System.out.println(Thread.currentThread().getName() + "\t" + "-----被唤醒");
      }, "A").start();


      new Thread(() -> {
         lock.lock();
         try {
            condition.signal();
            System.out.println(Thread.currentThread().getName() + "\t" + "-----通知");
         }finally {
            lock.unlock();
         }
      }, "B").start();
   }

   private static void synchronizedWaitNotify() {
      new Thread(() -> {
         synchronized (objectLock) {
            System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
            try {
               objectLock.wait();
            } catch (InterruptedException e) {
               e.printStackTrace();
            }
         }
         System.out.println(Thread.currentThread().getName() + "\t" + "-----被唤醒");
      }, "A").start();

      new Thread(() -> {
         synchronized (objectLock) {
            objectLock.notify();
            System.out.println(Thread.currentThread().getName() + "\t" + "-----通知");
         }
      }, "B").start();
   }
}

```
结果：
```dockerfile
a	------come in
b	------b线程发出唤醒通知
a	------被唤醒

Process finished with exit code 0
```

`LockSupport不需要锁块，单纯阻塞线程`

	

2.之前错误的先唤醒后等待，LockSupport照样支持

```java
 private static void lockSupportTest() {
        Thread a = new Thread(() -> {
        try { TimeUnit.SECONDS.sleep(3);} catch (InterruptedException e) {e.printStackTrace();}

        System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
        //被阻塞。。。。等待通知或放行，他要通过需要许可证
        LockSupport.park();
        System.out.println(Thread.currentThread().getName() + "\t" + "------被唤醒");

        }, "a");
        a.start();

        //暂停3秒钟后
//        try {
//            TimeUnit.SECONDS.sleep(3L);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        Thread b = new Thread(() -> {
        LockSupport.unpark(a);
        System.out.println(Thread.currentThread().getName() + "\t" + "------b线程发出唤醒通知");

        }, "b");
        b.start();
        }
```
结果：先唤醒，后等待  也可以
```dockerfile
b	------b线程发出唤醒通知
a	------come in
a	------被唤醒

Process finished with exit code 0
```
结论：不需要锁块，也不需要顺序。


### 4.重点说明

`LockSupport是用来创建锁和共他同步类的基本线程阻塞原语。`

LockSuport是一个线程阻塞工具类，所有的方法都是静态方法，可以让线程在任意位置阻塞，阻寨之后也有对应的唤醒方法。归根结底，LockSupport调用的Unsafe中的native代码。

`LockSupport提供park()和unpark()方法实现阻塞线程和解除线程阻塞的过程.`

LockSupport和每个使用它的线程都有一个许可(permit)关联。permit相当于1，0的开关，默认是0，

调用一次unpark就加1变成1，

调用一次park会消费permit，也就是将1变成0，同时park立即返回。

如再次调用park会变成阻塞(因为permit为零了会阻塞在这里，一直到permit变为1)，这时调用unpark会把permit置为1。每个线程都有一个相关的permit, permit最多只有一个，**重复调用unpark也不会积累凭证**。



```java

private static void lockSupportTest() {
        Thread a = new Thread(() -> {

            System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
            //被阻塞。。。。等待通知或放行，他要通过需要许可证
            LockSupport.park();
            LockSupport.park();
            System.out.println(Thread.currentThread().getName() + "\t" + "------被唤醒");

        }, "a");
        a.start();

        //暂停3秒钟后
        try {
            TimeUnit.SECONDS.sleep(3L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Thread b = new Thread(() -> {
            LockSupport.unpark(a);
            LockSupport.unpark(a);

            System.out.println(Thread.currentThread().getName() + "\t" + "------b线程发出唤醒通知");

        }, "b");
        b.start();
    }
```

结果： 会被阻塞
```dockerfile
a	------come in
b	------b线程发出唤醒通知

```


形象的理解
线程阻塞需要消耗凭证(permit)，这个凭证最多只有1个。

当调用park方法时

1. 如果有凭证，则会直接消耗掉这个凭证然后正常退出。
2. 如果无凭证，就必须阻塞等待凭证可用。

而unpark则相反，它会增加一个凭证，但凭证最多只能有1个，累加无放。

### 5.面试题

1. **为什么可以先唤醒线程后阻塞线程**？

   因为unpark获得了一个凭证，之后再调用park方法，就可以名正言顺的凭证消费，故不会阻塞。

2. **为什么唤醒两次后阻塞两次**，但最终结果还会阻塞线程？

   因为凭证的数量最多为1（不能累加），连续调用两次 unpark和调用一次 unpark效果一样，只会增加一个凭证；而调用两次park却需要消费两个凭证，证不够，不能放行。

