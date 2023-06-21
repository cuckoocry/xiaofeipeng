package com.moxi.interview.study.ref;

import java.util.HashMap;
import java.util.Map;
import java.util.WeakHashMap;

/**
 * WeakHashMap
 * @author: 阿飞
 * @create: 2023-03-05
 */
public class WeakHashMapDemo {
    public static void main(String[] args) {
        myHashMap();
        System.out.println("==========");
        myWeakHashMap();
    }

    private static void myHashMap() {
        Map<Integer, String> map = new HashMap<>();
        Integer key = 1;
        String value = "HashMap";

        map.put(key, value);
        System.out.println(map);

        // 没卵用
        key = null;

        System.gc();

        System.out.println(map);
    }

    private static void myWeakHashMap() {
        // 弱引用
        Map<Integer, String> map = new WeakHashMap<>();

        Integer key = 1;
        String value = "WeakHashMap";

        map.put(key, value);
        System.out.println(map);

        key = null;

        // 发生了GC
        System.gc();

        System.out.println(map);
    }
}
