---
title: PostgreSQL
date: 2023-04-23
tags:
 - SQL
 - PostgreSQL
category:
 - 学习笔记
---

::: tip
为什么有这篇？项目中用了那么久，还没有系统深入的学习，都不好意思说用过。现阶段网上也很少有视频讲解。所以，这里的学习还是注重官方文档。以及一些自己打的看法。  


官网: https://www.postgresql.org/    
http://www.postgres.cn/v2/document  

中文手册：  http://www.postgres.cn/docs/12/  
菜鸟教程： https://www.runoob.com/postgresql/postgresql-tutorial.html
:::

## MySQL 和 PostgreSQL 的区别是什么

MySQL和PostgreSQL是两种不同的关系型数据库管理系统（RDBMS），它们在以下方面有所不同：

1. 数据类型：PostgreSQL支持更多的数据类型，例如ARRAY、JSON、XML等，而MySQL不支持这些类型。此外，PostgreSQL支持更高级的数据类型处理和操作。

2. 扩展性：PostgreSQL支持更强大的扩展能力，几乎可以对所有功能进行扩展和定制。MySQL扩展能力更弱，不支持用户自定义函数和操作符。

3. 存储引擎：MySQL支持多种存储引擎，包括MyISAM、InnoDB、Memory等，不同的存储引擎可以提供不同的性能特征和功能。而PostgreSQL则只支持一个内置的存储引擎。

4. 性能：在一些特定的场景下，MySQL的性能表现比PostgreSQL要好。例如，MySQL在大量的简单数据读取操作时表现更好，而PostgreSQL在复杂的联合查询和大数据量的操作时表现更好。

5. 完整性：PostgreSQL对数据完整性的支持更好，它提供了更严格和灵活的完整性约束和检查功能。

总的来说，MySQL更适合那些需要高性能和灵活的数据存储的应用，而PostgreSQL则更适合那些需要强大数据完整性、灵活扩展和高级功能的应用。

## 1、PostgreSQL 是什么？

> https://www.postgresql.org/about/

`PostgreSQL` 是一个功能强大的开源对象关系数据库系统，它使用并扩展了 SQL 语言，并结合了许多安全存储和扩展最复杂数据工作负载的功能。

PostgreSQL 是一个免费的对象-关系数据库服务器(`ORDBMS`)，在灵活的`BSD许可证`下发行。

PostgreSQL 的 Slogan 是 "世界上最先进的开源关系型数据库"。

::: tip
`BSD许可证`: BSD许可证，也被称为伯克利软件发行许可证，是一种允许软件自由使用、修改和发行的开源许可证.  
BSD许可证的条款通常包括以下内容。
- 该软件可以用于任何目的，包括商业用途。
- 该软件可以不受任何限制地修改和分发。
- 源代码必须包括在软件的任何分发中。
- 软件的任何分发都必须包括一份许可证的副本。
- 软件的任何分发都必须包括免责声明。
::: 


// TODO 


