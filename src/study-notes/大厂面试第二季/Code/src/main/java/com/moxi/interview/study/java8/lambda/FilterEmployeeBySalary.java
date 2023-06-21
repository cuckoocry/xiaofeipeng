package com.moxi.interview.study.java8.lambda;

/**
 * 按工资过滤
 *
 * @author: 阿飞
 * @create: 2020-04-05-12:23
 */
public class FilterEmployeeBySalary implements MyPredicte<Employee> {

    @Override
    public boolean test(Employee employee) {
        return employee.getSalary() > 5000;
    }
}
