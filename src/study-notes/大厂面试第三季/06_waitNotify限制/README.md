---
title: 线程等待唤醒机制
date: 2023-03-18
category:
 - 学习笔记
---


3种让线程等待和唤醒的方法

- 方式1：使用Object中的wait()方法让线程等待，使用object中的notify()方法唤醒线程
- 方式2：使用JUC包中Condition的await()方法让线程等待，使用signal()方法唤醒线程
- 方式3：LockSupport类可以阻塞当前线程以及唤醒指定被阻塞的线程

## wait - Notify限制

Object类中的wait和notify方法实现线程等待和唤醒

```

public class LockSupportDemo {
    static Object objectLock = new Object();

    public static void main(String[] args) {
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
```dockerfile
A	------come in
B	-----通知
A	-----被唤醒

Process finished with exit code 0
```


```
/**
 * @Description: 要求: t1线程等待3秒钟，3秒钟后t2线程唤醒t1线程继续工作
 * <p>
 * 以下异常情况:
 * 2 wait方法和notify方法，两个都去掉同步代码块后看运行效果
 * 2.1 异常惰况
 * Exception in thread "t1" java.Lang.ILlegalLNonitorStateException at java.lang.Object.wait(Native Method)
 * Exception in thread "t2" java.lang.ILlegalWonitorStateException at java.lang.Object.notify(Native Method)
 * <p>
 * 2.2 结论
 * Object类中的wait、notify、notifyALlL用于线程等待和唤醒的方法，都必须在synchronized内部执行（必须用到关键字synchronized)
 */
public class LockSupportDemo {
    static Object objectLock = new Object();

    public static void main(String[] args) {
        new Thread(() -> {
            //synchronized (objectLock) {
            System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
            try {
                objectLock.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            //}
            System.out.println(Thread.currentThread().getName() + "\t" + "-----被唤醒");
        }, "A").start();

        new Thread(() -> {
            //synchronized (objectLock) {
            objectLock.notify();
            System.out.println(Thread.currentThread().getName() + "\t" + "-----通知");
            //}
        }, "B").start();
    }
}
```
```dockerfile
A	------come in
Exception in thread "A" Exception in thread "B" java.lang.IllegalMonitorStateException
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Object.java:502)
	at com.moxi.interview.study.thread.LockSupportDemo.lambda$main$0(LockSupportDemo.java:11)
	at java.lang.Thread.run(Thread.java:748)
java.lang.IllegalMonitorStateException
	at java.lang.Object.notify(Native Method)
	at com.moxi.interview.study.thread.LockSupportDemo.lambda$main$1(LockSupportDemo.java:21)
	at java.lang.Thread.run(Thread.java:748)

Process finished with exit code 0
```

结论：如果不在同步代码块中 wait、notify是不可用的

前面的synchronized铁三角不可以破坏   


![image-20210918201339817](./images\image-20210918201339817.png)



```
/**
 * @Description: 要求: t1线程等待3秒钟，3秒钟后t2线程唤醒t1线程继续工作
 * <p>
 * 以下异常情况:
 * 2 wait方法和notify方法，两个都去掉同步代码块后看运行效果
 * 2.1 异常惰况
 * Exception in thread "t1" java.Lang.ILlegalLNonitorStateException at java.lang.Object.wait(Native Method)
 * Exception in thread "t2" java.lang.ILlegalWonitorStateException at java.lang.Object.notify(Native Method)
 * <p>
 * 2.2 结论
 * Object类中的wait、notify、notifyALlL用于线程等待和唤醒的方法，都必须在synchronized内部执行（必须用到关键字synchronized)
 * <p>
 * <p>
 * 3 将notify放在wait方法前先执行，t1先notify 了，3秒钟后t2线程再执行wait方法
 * 3.1程序一直无法结柬
 * 3.2结论
 * 先wait后notify、notifyall方法，等待中的线程才会被唤醒，否则无法唤醒
 */
public class LockSupportDemo {
    static Object objectLock = new Object();

    public static void main(String[] args) {
        new Thread(() -> {
            //暂停几秒钟线程
            try { TimeUnit.SECONDS.sleep(3);} catch (InterruptedException e) {e.printStackTrace();}
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


结论：wait和notify方法必须要在同步块或者方法里面且成对出现使用，否则会抛出java.lang.IllegalMonitorStateException。

调用顺序要先wait后notify才OK。