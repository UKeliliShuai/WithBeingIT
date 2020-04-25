# SpringBoot整合Mybatis 

- 学会从0搭建后端的SpringBoot+mybatis框架
- 实现后端业务逻辑
- 实现本地微信小程序的前端开发
- 前端和后端的关联

## 1.Springboot项目搭建

- web
- MyBatis
- JDBC
- SQL Diver

### 1.1数据库创建与录入

```sql
CREATE DATABASE 数据库名称
USE 数据库名称
# 创建表格
CREATE TABLE `tb_area`(
 `area_id` int(2) NOT NULL AUTO_INCREMENT,
 `area_name` VARCHAR(200) NOT NULL,
 `priority` int(2) NOT NULL DEFAULT '0',
 `create_time` datetime DEFAULT NULL,
 `last_edit_time` datetime DEFAULT NULL,
 PRIMARY KEY(`area_id`),
 UNIQUE KEY`UK_AREA`(`area_name`)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

### 1.2实体类创建

- [Intellij IDEA 通过数据库表生成带注解的实体类详细步骤](https://blog.csdn.net/qq_34371461/article/details/80571281)

  ```java
  //1.数据表属性
  //2.创建setter+getter方法
  package com.wangshuai.springbootmybatis.entity;
  
  import java.util.Date;
  
  public class Area {
      private Integer areaId;
      private String areaName;
      private Integer priority;
      private Date creatTime;
      private Date lastEditTime;
  
      public Integer getAreaId() {
          return areaId;
      }
  
      public void setAreaId(Integer areaId) {
          this.areaId = areaId;
      }
  
      public String getAreaName() {
          return areaName;
      }
  
      public void setAreaName(String areaName) {
          this.areaName = areaName;
      }
  
      public Integer getPriority() {
          return priority;
      }
  
      public void setPriority(Integer priority) {
          this.priority = priority;
      }
  
      public Date getCreatTime() {
          return creatTime;
      }
  
      public void setCreatTime(Date creatTime) {
          this.creatTime = creatTime;
      }
  
      public Date getLastEditTime() {
          return lastEditTime;
      }
  
      public void setLastEditTime(Date lastEditTime) {
          this.lastEditTime = lastEditTime;
      }
  }
  ```

  

## 2.项目开发

- 实现Dao层的增删改查，自底向上开发
- 顺序：配置→接口→mapper→ut及单元测试

### 2.1DAO层实现

#### 1.POM文件配置

```properties
<!--mybatis启动器-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.2</version>
</dependency>
<!--mysql连接驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<!--多线程连接池服务-->
<dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5.5</version>
</dependency>
```

#### 2.Mybatis相关配置

[mybatis官方文档](https://mybatis.org/mybatis-3/zh/getting-started.html)

```xml
<!--参考快速开始：https://mybatis.org/mybatis-3/zh/getting-started.html-->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--配置全局属性-->
    <settings>
        <!--使用jdbc的getGeneratedKeys获取数据库自增主键值-->
        <setting name="useGeneratedKeys" value="true"/>
        <!--使用列标签代替列名。类支持别名-->
        <setting name="useColumnLabel" value="true"/>
        <!--开启驼峰命名转换：Table下划线自动转换为entity的大写字母-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

#### 3.SpringBoot的DAO层相关配置

