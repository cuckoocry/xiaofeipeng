package com.jiang.interview.study.thread;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.LockSupport;
import java.util.concurrent.locks.ReentrantLock;

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
