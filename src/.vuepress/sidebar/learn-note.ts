export const learnNote = [
  //  学习笔记目录
  {
    text: "大厂面试第二季",
    icon: "edit",
    prefix: "大厂面试第二季/",
    collapsible: true,
    children:[
      {
        text: "Volatile",
        icon: "edit",
        prefix: "1_谈谈Volatile/",
        collapsible: true,
        children:[
          "1_Volatile和JMM内存模型的可见性/",
          "2_Volatile不保证原子性/",
          "3_Volatile禁止指令重排/",
          "4_Volatile的应用/",
        ]
      },
      "2_谈谈CAS/5_CAS底层原理/",
      "3_谈谈原子类的ABA问题/6_原子类AtomicInteger的ABA问题/",
      "4_ArrayList为什么线程不安全/ArrayList线程不安全的举例/",
      {
        text: "Java的锁",
        icon: "edit",
        collapsible: true,
        prefix: "6_Java的锁/",
        children:[
          { text: "Java锁之读写锁", icon: "edit", link: "Java锁之读写锁/" },
          "Java锁之公平锁和非公平锁/",
          "Java锁之可重入锁和递归锁/",
          "Java锁之自旋锁/",
          "乐观锁和悲观锁"
        ]
      },
      "7_CountDownLatch_CyclicBarrier_Semaphore使用/CountDownLatch/",
      "7_CountDownLatch_CyclicBarrier_Semaphore使用/CyclicBarrier/",
      "7_CountDownLatch_CyclicBarrier_Semaphore使用/Semaphore/",
      "8_阻塞队列/",
      "9_Synchronized和Lock的区别与好处/",
      "10_线程池/",
      "11_死锁编码及快速定位/",
      {
        text: "JVM",
        icon: "edit",
        collapsible: true,
        prefix: "12_JVM/",
        children:[
          "JVM体系结构/",
          "JVM面试题汇总/1_什么是GCRoots能做什么/",
          "JVM面试题汇总/2_JVM参数调优/",
          "JVM面试题汇总/3_Java中的强引用_软引用_弱引用_虚引用分别是什么/",
          "JVM面试题汇总/4_Java内存溢出OOM/",
          "JVM面试题汇总/5_垃圾回收器/",
        ]
      },
      "13_Linux相关命令/",
      "14_Github学习/"
    ]

  },
  {
    text: "大厂面试第三季",
    icon: "edit",
    prefix: "大厂面试第三季/",
    collapsible: true,
    children: [
      "",
      "01_字符串常量Java内部加载/",
      "02_闲聊力扣算法第一题/",
      "04_可重入锁理论/",
      "05_LockSupport是什么/",
      "06_waitNotify限制/",
      "07_awaitSignal限制/",
      "08_LockSupport方法介绍/",
      "09_AbstractQueuedSynchronizer之_AQS/",
      "10_Spring/",
      "11_redis/",
      "12_集群高并发情况下如何保证分布式唯一全局Id生成/"
    ],

  },
  {
    text: "JVM",
    icon: "edit",
    prefix: "JVM/",
    collapsible: true,
    children: [
       "",
      {
        text: "内存与垃圾回收篇",
        icon: "edit",
        prefix: "1_内存与垃圾回收篇/",
        collapsible: true,
        children:[
            "",
            "1_JVM与Java体系结构/",
            "2_类加载子系统/",
            "3_运行时数据区概述及线程/",
            "4_程序计数器/",
            "5_虚拟机栈/",
            "6_本地方法接口/",
            "7_本地方法栈/",
            "8_堆/",
            "9_方法区/",
            "10_对象实例化内存布局与访问定位/",
            "11_直接内存/",
            "12_执行引擎/",
            "13_StringTable/",
            "14_垃圾回收概述/",
            "15_垃圾回收相关算法/",
            "16_垃圾回收相关概念/",
            "17_垃圾回收器/",
        ]
      },
      {
        text: "字节码与类的加载篇",
        icon: "edit",
        prefix: "2_字节码与类的加载篇/",
        collapsible: true,
        children:[
            "",
            "01-class文件结构/",
            "02-字节码指令集/",
            "03-类的加载过程（类的生命周期）详解/",
            "04-再谈类的加载器/",
        ]
      },
      {
        text: "性能监控与调优篇",
        icon: "edit",
        prefix: "3_性能监控与调优篇/",
        collapsible: true,
        children:[
          "01-概述篇/",
          "02-JVM监控及诊断工具-命令行篇/",
          "03-JVM监控及诊断工具-GUI篇/",
          "04-JVM运行时参数/",
          "05-分析GC日志/",
          "补充：使用OQL语言查询对象信息/",
          "补充：浅堆深堆与内存泄露/"
        ]
      },
    ],

  },
  {
    text: "计算机网络",
    icon: "network",
    prefix: "计算机网络/",
    collapsible: true,
    children: [
      "",
      "1_三次握手和四次挥手/",
      "2_https和http/",
      "3_TCP中的拥塞控制和流量控制/",
      "4_物理层/",
      "5_数据链路层/",
      "http中的状态码/",
    ],

  },
  {
    text: "SpringBoot",
    icon: "edit",
    prefix: "SpringBoot/",
    collapsible: true,
    children: [
      "",
    ],

  },
  {
    text: "SpringCloud",
    icon: "edit",
    prefix: "SpringCloud/",
    collapsible: true,
    children: [
      "",
      "1_SpringCloud是什么/",
      "2_搭建一个SpringCloud项目/",
      "3_搭建Eureka集群/",
      "4_Eureka停更后的替换/",
      "5_Ribbon负载均衡/",
      "6_OpenFeign实现服务调用/",
      "7_Hystrix中的服务降级和熔断/",
      "8_服务网关Gateway/",
      "9_分布式配置中心SpringCloudConfig/",
      "10_消息总线Bus/",
      "11_消息驱动SpringCloudStream/",
      "12_SpringCloudSleuth分布式请求链路跟踪/",
      "13_Nacos是什么/",
      "14_SpringCloudAlibabaSentinel实现熔断和限流/",
      "15_SpringCloudAlibabaSeata处理分布式事务/"
    ],

  },
  {
    text: "ElasticStack技术栈",
    icon: "edit",
    prefix: "ElasticStack/",
    collapsible: true,
    children: [
      "",
      "1_ElasticSearch介绍与安装/",
      "2_Beats入门简介/",
      "3_Kibana安装与介绍/",
      "4_Logstash入门简介/",
      "5_ElasticStack综合案例/",
      "6_使用ELK搭建蘑菇博客日志收集/"
    ],

  },
  {
    text: "RocketMQ",
    icon: "edit",
    prefix: "RocketMQ/",
    collapsible: true,
    children: [
      ""
    ],

  },
  {
    text: "Redis",
    icon: "edit",
    prefix: "Redis/",
    collapsible: true,
    children: [
      "",
      {
        text: "入门篇",
        icon: "edit",
        collapsible: true,
        prefix: "入门篇/",
        children:[
          "",
          "Redis安装说明"
        ]
      },
      "实战篇/",
      {
        text: "高级篇",
        icon: "edit",
        collapsible: true,
        prefix: "高级篇/",
        children:[
          "01-分布式缓存/",
          "02-多级缓存/",
          "03-Redis最佳实践/"
        ]
      },
      "原理篇/",
    ],

  },
  {
    text: "其他",
    icon: "edit",
    prefix: "other/",
    collapsible: true,
    children: [
      "functional-interface"
    ],

  },
];
