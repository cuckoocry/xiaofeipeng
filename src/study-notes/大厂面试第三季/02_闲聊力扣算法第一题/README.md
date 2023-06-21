---
title: 闲聊力扣算法第一题
date: 2023-03-11
---

> https://leetcode.cn/problems/two-sum/

## 闲聊力扣算法第一题（两数求和）

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

你可以按任意顺序返回答案。

```

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

```

## 方式一：TwoSum暴力解法

```java

  /**
     * 方式一：遍历---->暴力破解法。。。。。。。。。。。。
     * 通过双重循环遍历数组中所有元素的两两组合，当出现符合的和时返回两个元素的下标
     *
     */
public static int[] twoSum1(int[] nums,int target){
	for (int i = 0; i < nums.length; i++) {
		for (int j = i + 1; j < nums.length; j++) {
			if(target - nums[i] == nums[j])
				return new int[]{i,j};
	return null;
}
```

## 方式二：哈希（更优解法）
```java
 /**
     * 哈希（更优解法）
     *
     * @param nums
     * @param target
     * @return
     */
    public static int[] twoSum2(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int parentNumber = target - nums[i];
            if (map.containsKey(parentNumber)) {
                return new int[]{map.get(parentNumber), i};
            }
            map.put(nums[i], i);
        }
        return null;
    }

    public static void main(String[] args) {
        int[] nums = new int[]{3, 2, 8, 7, 11, 15};
        int target = 9;
        int[] myIndex = twoSum2(nums, target);
        for (int index : myIndex) {
            System.out.println(index);
        }
    }

```



