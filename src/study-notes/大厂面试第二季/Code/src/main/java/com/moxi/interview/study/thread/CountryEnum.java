package com.moxi.interview.study.thread;

import lombok.Getter;

/**
 * 城市枚举类
 */
@Getter
public enum CountryEnum {
    QI(1, "齐"),
    CHU(2, "楚"),
    YAN(3, "燕"),
    ZHAO(4, "赵"),
    GUI(5, "魏"),
    HAN(6, "韩");

    private final Integer retCode;

    private final String retMessage;


    CountryEnum(Integer retCode, String retMessage) {
        this.retCode = retCode;
        this.retMessage = retMessage;
    }

    /**
     *
     * @param index
     * @return
     */
    public static CountryEnum forEachCountryEnum(int index) {
        CountryEnum [] myArray = CountryEnum.values();
        for (CountryEnum countryEnum : myArray) {
            if(index == countryEnum.getRetCode()) {
                return countryEnum;
            }
        }
        return null;
    }

    /**
     * 直接根据key获取value
     * @param key
     * @return
     */
    public static String getMessage(int key){
        CountryEnum [] myArray = CountryEnum.values();
        for (CountryEnum countryEnum : myArray) {
            if(key == countryEnum.getRetCode()) {
                return countryEnum.getRetMessage();
            }
        }
        return "";
    }
}
