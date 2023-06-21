---
title: await - signal限制
date: 2023-03-18
category:
 - 学习笔记
---

## await - signal限制

方式2：使用JUC包中Condition的await()方法让线程等待，使用signal()方法唤醒线程

```
/**
 * @Author xiaofeipeng
 * @Date 2023/3/07
 * @Description: 要求: t1线程等待3秒钟，3秒钟后t2线程唤醒t1线程继续工作
 * <p>
 */
public class LockSupportDemo {

    static Lock lock = new ReentrantLock();
    static Condition condition = lock.newCondition();


    public static void main(String[] args) {

        new Thread(() -> {
            lock.lock();
            try {
                System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
                try {
                    condition.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName() + "\t" + "------被唤醒");
            } finally {
                lock.unlock();
            }
        }, "A").start();

        new Thread(() -> {
            lock.lock();
            try {
                condition.signal();
                System.out.println(Thread.currentThread().getName() + "\t" + "------通知");
            } finally {
                lock.unlock();
            }
        }, "B").start();

    }

}
```


```
/**
 * @Description: await()和signal()也要和lock.lock();和lock.unlock();组队出现
 */
public class LockSupportDemo {

    static Lock lock = new ReentrantLock();
    static Condition condition = lock.newCondition();


    public static void main(String[] args) {

        new Thread(() -> {
            //lock.lock();
            try {
                System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
                try {
                    condition.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName() + "\t" + "------被唤醒");
            } finally {
                //lock.unlock();
            }
        }, "A").start();

        new Thread(() -> {
            //lock.lock();
            try {
                condition.signal();
                System.out.println(Thread.currentThread().getName() + "\t" + "------通知");
            } finally {
                //lock.unlock();
            }
        }, "B").start();

    }

}
```

```dockerfile
Exception in thread "B" Exception in thread "A" java.lang.IllegalMonitorStateException
	at java.util.concurrent.locks.ReentrantLock$Sync.tryRelease(ReentrantLock.java:151)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.release(AbstractQueuedSynchronizer.java:1261)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.fullyRelease(AbstractQueuedSynchronizer.java:1723)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2036)
	at com.moxi.interview.study.thread.LockSupportDemo.lambda$lockAwaitSingal$0(LockSupportDemo.java:22)
	at java.lang.Thread.run(Thread.java:748)
java.lang.IllegalMonitorStateException
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.signal(AbstractQueuedSynchronizer.java:1939)
	at com.moxi.interview.study.thread.LockSupportDemo.lambda$lockAwaitSingal$1(LockSupportDemo.java:35)
	at java.lang.Thread.run(Thread.java:748)
A	------come in

Process finished with exit code 0
```


```
/**
 * @Author gpc
 * @Date 2021/9/19
 * @Version 1.0
 * @Description: 
 */
public class LockSupportDemo {

    static Lock lock = new ReentrantLock();
    static Condition condition = lock.newCondition();


    public static void main(String[] args) {

        new Thread(() -> {
         //暂停几秒钟后
            try { TimeUnit.SECONDS.sleep(3);} catch (InterruptedException e) {e.printStackTrace();}
            lock.lock();
            try {
                System.out.println(Thread.currentThread().getName() + "\t" + "------come in");
                try {
                    condition.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName() + "\t" + "------被唤醒");
            } finally {
                lock.unlock();
            }
        }, "A").start();

        new Thread(() -> {
            lock.lock();
            try {
                condition.signal();
                System.out.println(Thread.currentThread().getName() + "\t" + "------通知");
            } finally {
                lock.unlock();
            }
        }, "B").start();

    }

}
```


await和signal方法必须要在同步块或者方法里面且成对出现使用，否则会抛出java.lang.IllegalMonitorStateException。

调用顺序要先await后signal才行。