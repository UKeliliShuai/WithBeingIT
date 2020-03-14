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
<!--由上述parent内容(spring-boot-dependencies)来真正管理Spring Boot应用里面的所有依赖版本；-->
```

**Spring Boot的版本仲裁中心；**

- 优势：以后我们导入依赖默认是不需要写版本号；
- 缺陷：没有在dependencies里面管理的依赖自然需要声明版本号

##### 2、启动器

> 父项目只是作为版本仲裁
>
> 问题：那jar包是由谁导入的呢?

1.**spring-boot-starter**+2.**web**

```xml
		<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

- **spring-boot-starter**:称为springboot场景启动器
  - 由它导入帮我们导入了web模块正常运行所依赖的组件；
  - 版本号由父项目仲裁
  - [查看spring的场景启动器](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter)，点击POM可以查看对应的github代码

- 总结：

  > Spring Boot将所有的功能场景都抽取出来，做成一个个的starters（启动器），只需要在项目里面引入这些starter相关场景的所有依赖都会导入进来。要用什么功能就导入什么场景的启动器

#### 2、主程序类，主入口类@SpringBootApplication

```java
/**
 *  @SpringBootApplication 来标注一个主程序类，说明这是一个Spring Boot应用
 */
@SpringBootApplication
public class HelloWorldMainApplication {

    public static void main(String[] args) {

        // Spring应用启动起来
        SpringApplication.run(HelloWorldMainApplication.class,args);
    }
}
```

@**SpringBootApplication**: Spring Boot应用标注在某个类上说明这个类是SpringBoot的主配置类，SpringBoot就应该**运行这个类的main方法**来启动SpringBoot应用；

1. @**SpringBootApplication**组合注解:

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration//-----------下文有解释
@EnableAutoConfiguration//------------下文有解释
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {
   ……等等属性
}
```

- 1. @SpringBootConfiguration——Springboot的配置类：

  ```java
  @Target({ElementType.TYPE})
  @Retention(RetentionPolicy.RUNTIME)
  @Documented
  @Configuration
  public @interface SpringBootConfiguration {
  }
  ```

  - @Configuration是spring的底层注解

    > 配置文件太多----->替换为“配置类”
    >
    > 也就是用@Configuration标注这个类

  - 注意@Configuration标注的配置类实质是容器中的一个组件@component**—————填坑—————**
  - 总结而言，@SpringBootConfiguration与@Configuration甚至与@component类似，实质是标注**容器组件**

- 2. @EnableAutoConfiguration：开启自动配置功能

  - 效果是：springMVC启动起来了、spring应用可以使用、包扫描已完成	

    ```java
    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @Inherited
    @AutoConfigurationPackage
    @Import({EnableAutoConfigurationImportSelector.class})
    public @interface EnableAutoConfiguration {
    ```

  - @AutoConfigurationPackage，文意：自动配置包

    - @Import({Registrar.class})——spring的底层注解，给容器中导入括号中的内容，例如“{Registrar.class}”**—————填坑—————**
    - ctrl+左键点击“Registrar.class”后，对该函数（AutoConfigurationPackages.register）加入断点，debug可查看导入的包名
    - 运行时计算：选中表达式，右键“Evaluate Expression”

    ![1584178065524](D:\GitHub\Notes\WithBeingIT\_static\1584178065524.png)

    - 总结作用：**将主配置类/Springboot主程序类（@SpringBootApplication标注的类）的所在包及下面所有子包里面的所有组件扫描到Spring容器；**
      - 如果组件注解与“**@SpringBootApplication标注的类**”不是子包或者不在同一个包，经过实验是无法扫描组件的

- 3. @ComponentScan**—————填坑：配置、XML--->自动配置类、类加载器机制—————**

     - AutoConfigurationExcludeFilter.class

       - ```
         AutoConfigurationImportSelector//导入哪些组件的选择器
         ```

     - ```
       org.springframework.boot.autoconfigure-----MAVEN目录下
       ```

     ![1584180226335](D:\GitHub\Notes\WithBeingIT\_static\1584180226335.png)

![1584180348273](D:\GitHub\Notes\WithBeingIT\_static\1584180348273.png)

- **J2EE的整体整合解决方案和自动配置都在spring-boot-autoconfigure-1.5.9.RELEASE.jar；**

![1584180964543](D:\GitHub\Notes\WithBeingIT\_static\1584180964543.png)

