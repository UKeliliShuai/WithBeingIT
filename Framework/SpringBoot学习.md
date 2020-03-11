# SpringBoot学习

[TOC]

## 序、基本信息

1. [课程地址](https://www.bilibili.com/video/av38657363)

3. [课程资料](https://pan.baidu.com/s/1KvNHadguK00zEc0xldZgfw )→提取码：5iae 、[课程笔记](https://cloudlandboy.github.io/myNote/#/backend/springboot/helloworld)、SpringBoot笔记_尚硅谷

3. 本文开发环境：IntelliJ-IDEA2018、JDK1.8、Apache Maven 3.3.9

   > Maven设置文件：apache-maven-3.X.X/conf/setting.xml
   >
   > <profiles>标签设置

   ```xml
   <profile>
     <id>jdk-1.8</id>
     <activation>
       <activeByDefault>true</activeByDefault>
       <jdk>1.8</jdk>
     </activation>
     <properties>
       <maven.compiler.source>1.8</maven.compiler.source>
       <maven.compiler.target>1.8</maven.compiler.target>
       <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
     </properties>
   </profile>
   ```

   > IDEA设置:整合maven进来；

4. SpringBoot相关网址

   > 课程笔记：[SYL的笔记](https://cloudlandboy.github.io/myNote/)
   >
   > 微服务博客：[微服务](https://martinfowler.com/articles/microservices.html#MicroservicesAndSoa)

5. 官方环境约束

   >– jdk1.8：Spring Boot 推荐jdk1.7及以上；
   >
   >– maven3.x：maven 3.3以上版本；
   >
   >– SpringBoot 1.5.9 RELEASE

6. 学习前提

   > -Spring框架使用经验
   >
   > -熟练使用Maven进行项目构建呵依赖管理
   >
   > -熟练使用IDEA

## 一、SpringBoot入门

### 1.单体应用vs微服务

单体应用：ALL IN ONE

微服务：每一个功能元素最终都是一个可独立替换和独立升级的软件单元；

[详细参照微服务文档](https://martinfowler.com/articles/microservices.html#MicroservicesAndSoa)

### 2.微服务工作方式及其问题

![1583822638866](D:\GitHub\Notes\WithBeingIT\_static\1583822638866.png)

##### 微服务架构存在的问题：

- 大型微服务网络的部署和运维存在极大的问题

##### [Spring](https://spring.io/)提供的解决方案：

- Spring Boot：Build anything
- Spring Cloud：Coordinate anything
- Spring Cloud Data Flow：connect anything

### 3.Spring helloworld

>功能：浏览器发送hello请求，服务器接受请求并处理，响应Hello World字符串；

#### 1.创建一个maven工程

- 问题1:无法导入maven工程

  ![img](D:\GitHub\Notes\WithBeingIT\_static\1221599-20180721092923942-1359307497.png)

  - 解决方案:[可能是端口被占用——重启电脑](https://www.cnblogs.com/zealousness/p/9345650.html)

#### 2.导入springboot相关的相关依赖

- 问题2:[maven配置多仓库镜像](https://blog.csdn.net/haohaizijhz/article/details/72841489)
  - 国内访问maven默认远程中央镜像特别慢
  - 用阿里的镜像替代远程中央镜像
  - 大部分jar包都可以在阿里镜像中找到，部分jar包在阿里镜像中没有，需要单独配置镜像

- 结果：maven工程文件会导入40M的依赖文件

![1583838950645](D:\GitHub\Notes\WithBeingIT\_static\1583838950645.png)

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.9.RELEASE</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
```

#### 3.编写主程序

- 启动springboot应用

```java
package com.wangshuai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @SpringBootApplication标注一个主程序，来说明这是一个Spring boot应用
 */
@SpringBootApplication
public class helloworldmainAPP {
    //psvm----->main函数关键词
    public static void main(String[] args) {
        //spring应用启动起来
        SpringApplication.run(helloworldmainAPP.class,args);
    }
}
```

#### 4.编写相关的Controller、Service

```java
package com.wangshuai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    @ResponseBody
    @RequestMapping("/hello")
    public String hello(){
        return "hello world";
    }
}
```

#### 5.运行主程序测试

```html
访问以下网址：
http://localhost:8080/hello
```

#### 6.简化部署

- 将以下maven插件导入springboot---pom文件

```xml
<!-- 这个插件，可以将应用打包成一个可执行的jar包；-->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

![1583916847690](D:\GitHub\Notes\WithBeingIT\_static\1583916847690.png)

- 将这个应用打成jar包，直接使用java -jar的命令进行执行；
  - 在IDEA---->Target文件夹下，包名.jar包
  - Boot-INFO：classes文件夹下是自己写的类、lib文件夹下是导入Springboot依赖时导入进来的（包括Tomcat-embed）
  - win+r打开cmd，进入目标目录
  - java -jar spring-boot-01-helloworld-1.0-SNAPSHOT.jar运行程序

### 4.HelloWorld探究

#### 1、POM文件

##### 1、父项目

```xml
 <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.9.RELEASE</version>
 </parent>
 <--!--点击spring-boot-starter-parent></--!-->
"spring-boot-starter-parent"他的父项目是:
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-dependencies</artifactId>
  <version>1.5.9.RELEASE</version>
  <relativePath>../../spring-boot-dependencies</relativePath>
</parent>
由上述parent内容(spring-boot-dependencies)来真正管理Spring Boot应用里面的所有依赖版本；
```

**Spring Boot的版本仲裁中心；**

- 优势：以后我们导入依赖默认是不需要写版本号；
- 缺陷：没有在dependencies里面管理的依赖自然需要声明版本号