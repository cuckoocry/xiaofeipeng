package com.atguigu.java.chapter02;

/**
 * @author: 阿飞
 * @create: 2020-07-05-10:32
 */
public class CustomClassLoader extends ClassLoader{
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        return super.findClass(name);
    }
}
