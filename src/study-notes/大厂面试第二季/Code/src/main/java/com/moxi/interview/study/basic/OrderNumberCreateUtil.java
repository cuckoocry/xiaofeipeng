package com.moxi.interview.study.basic;

/**
 * @author: 阿飞
 * @create: 2023-03-10
 */
public class OrderNumberCreateUtil {
    private static int num = 0;

    public String getOrderNumber() {
        return "\t 生成订单号：" + (++num);
    }

}
