

# SpringBoot学习

[TOC]

## 序、基本信息

1. [课程地址](https://www.bilibili.com/video/av38657363)、[Spring Boot参考文档](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features)

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

7. 课程章节（与笔记目录一致）：

   ![1584370115898](D:\GitHub\SAEngineer\SAEngineer\_static\1584370115898.png)

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

  - 注意@Configuration标注的配置类实质是容器中的一个组件@component**—————填坑：有什么用呢？—————**
  - 总结而言，@SpringBootConfiguration与@Configuration甚至与@component类似，实质是标注**容器组件**

- 2. @EnableAutoConfiguration：开启（Enable）自动（Auto）配置功能（Configuration）

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

    - 自动配置类的作用：给容器中导入这个场景需要的所有组件，并配置好这些组件；
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

### 6、使用Spring Initializer快速创建Spring Boot项目

> IDE都支持使用Spring的项目创建向导快速创建一个Spring Boot项目；

#### 1.spring initializr创建向导

![1584410618388](D:\GitHub\SAEngineer\SAEngineer\_static\1584410618388.png)

#### 2.输入相关信息（注意Artifact必须小写）

![1584410969153](D:\GitHub\Notes\WithBeingIT\_static\1584410969153.png)

#### 3.选择开发的对应模块

#### 4.无关文件可以删除

![1584411936631](D:\GitHub\SAEngineer\SAEngineer\_static\1584411936631.png)

#### 5.创建Controller子包

#### 6.写RESTAPI函数

```java
//@ResponseBody
///**
// * 这个类所有方法返回的数据，直接写给浏览器（如果是对象，还可转为Json数据）
// */
//@Controller
@RestController
public class hellocontroller {

    @RequestMapping("/hello")
    public String hello(){
        return "hello world init";
    }
    /**
     * RESTAPI方式：--------填坑--------
     * 也就是发一个请求@RequestMapping("/hello")
     * 把数据直接交给浏览器return "hello world init";
     * 而不是页面跳转
     */
}
```

- @RestController=@ResponseBody+@Controller

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Controller
@ResponseBody
public @interface RestController {
    @AliasFor(
        annotation = Controller.class
    )
    String value() default "";
}
```

#### 总结

> 默认生成的Spring Boot项目；
>
> - 主程序已经生成好了，我们只需要我们自己的逻辑
> - resources文件夹中目录结构
>   - static：保存所有的静态资源； js css  images；
>   - templates：保存所有的模板页面；（Spring Boot默认jar包使用嵌入式的Tomcat，默认不支持JSP页面）；可以使用模板引擎（freemarker、thymeleaf）；
>   - application.properties：Spring Boot应用的配置文件；可以修改一些默认设置；

![1584413298465](D:\GitHub\SAEngineer\SAEngineer\_static\1584413298465.png)

## 二、 Spring Boot配置

>配置文件
>
>加载顺序
>
>配置原理

### 1、配置文件

#### **A.全局的配置文件**:

##### 1.创建

> SpringBoot使用一个全局的配置文件，配置文件名是固定的；
>
> - application.properties
>
> - application.yml
>
>   - YAML（YAML Ain't Markup Language）
>
>     ​	YAML  A Markup Language：是一个标记语言
>
>     ​	YAML   isn't Markup Language：不是一个标记语言；

上述两个配置文件的**目的**：修改SpringBoot自动配置的默认值(SpringBoot在底层都给我们自动配置好)

##### 2.自行创建配置类（或Bean）

##### 3.注解配置类

```java
@Data//第一步
```

##### 4.选择一种全局配置文件

> 经过实验：application.properties的属性值会替代application.yml

##### 5.填写属性值

> .yml与.properties等效
>
> 对于**@ConfigurationProperties(prefix = "person")**和**@Value("${person.lastname}")**等效，即：都能获取到值

- .yml文件

```yaml
server:
  port: 8081

person:
  lastname: xiaoming
  age: 24
  boss: false
  birth: 2020/03/17
  maps: {k1: v1,k2: v2}
  lists:
    - xiaohong
    - xiaowang
    - zhangsan
  mdog:
    name: jhon小狗
    age: 2
```

- .properties文件

```properties
server.port=8081

person.lastname = wangshuai
person.age=23
# 日期格式写错是会编译报错的
person.birth=1996/01/01
person.boss=false
person.maps.k1=value1
person.maps.k2=value2
person.lists=a,b,c
person.m-dog.name= 小狗
person.m-dog.age=3
# 注意：驼峰式名称在.properties文件中是“-小写”形式
```

##### 6.使用注解依赖注入

```java
@Component//加这个注解是因为只有是容器组件才能使用@ConfigurationProperties
@ConfigurationProperties(prefix = "person")
//prefix = "person"表示句首是person的配置内容
```

##### 7.使用单元测试验证

```java
/**
 * 1.Spring单元测试
 *
 * 2.@RunWith(SpringRunner.class)表示用spring驱动器跑程序，而不是junit
 * <dependency>
 *   <groupId>junit</groupId>
 *   <artifactId>junit</artifactId>
 *   <version>RELEASE</version>
 *   <scope>test</scope>
 * </dependency>
 *
 * 3.可以在测试期间类似编码一样很方便的进行自动注入
 */
@RunWith(SpringRunner.class)
@SpringBootTest
class SpringBoot02PropertiesApplicationTests {

    @Autowired
    Person person;

    @Test
    void contextLoads() {
        System.out.println(person);
    }

}
```

#### B.整体注入与分别注入——针对A中第6点

- 访问下文的：@Value获取值和@ConfigurationProperties获取值比较

#### C.自定义配置文件

>也可创建自己的配置文件，采用以下方式进行依赖注入：

##### 1.创建.properties（实验.yml不能读取）

##### 2.依赖注入

```java
@Data
@Component//加这个注解是因为只有是容器组件才能使用@ConfigurationProperties
/**
 * @ConfigurationProperties(prefix = "person")
 * @PropertySource(value = {"classpath:mPerson.properties"})
 * 使用自定义配置文件需要二者配合使用
 */
@ConfigurationProperties(prefix = "person")
@PropertySource(value = {"classpath:mPerson.properties"})
```

### 2、YAML语法：

- 以数据为中心
- 格式简单

#### 1.基本语法

`k:(空格)v`

- 表示一对键值对（空格必须有）；

以**空格**的缩进来控制层级关系；只要是左对齐的一列数据，都是同一个层级的(类似`python`)

```yaml
server:
    port: 8081
    path: /hello
```

属性和值也是**大小写敏感**；

#### 2.值的写法

##### 字面量：普通的值（数字，字符串，布尔）

​	k: v

- 字面直接写；
- 读作键空格值

​		字符串默认不用加上单引号或者双引号；

​		""：双引号；会转义字符串里面的特殊字符；特殊字符会作为本身想表示的意思

​				`name:   "zhangsan \n lisi"：输出；zhangsan 换行  lisi`

​		''：单引号；不会转义特殊字符，特殊字符最终只是一个普通的字符串数据

​				`name:   ‘zhangsan \n lisi’：输出；zhangsan \n  lisi`

##### 对象/Map:（属性和值）（键值对）：

​	k: v

- 写法一：在下一行来写对象的属性和值的关系；**注意缩进**

​		对象还是k: v的方式

```yaml
friends:
		lastName: zhangsan
		age: 20
```

- 写法二：行内写法：

```yaml
friends: {lastName: zhangsan,age: 18}
```

##### 数组（List、Set）：

写法一：用- 值表示数组中的一个元素

- 读作：键杠空格值

```yaml
pets:
 - cat
 - dog
 - pig
```

写法二：行内写法

```yaml
pets: [cat,dog,pig]
```

### 3.配置文件值注入

#### 1.配置文件，使用${key}

- yml
- properties

#### 2.Bean类

- @Component
- @ConfigurationProperties(prefix = "person")

#### 3.@Value获取值和@ConfigurationProperties获取值比较

- @value相当于`<bean>`标签下配置`property`
  - value="`字面量（见上文——>值的写法）`/`${key}从环境变量、配置文件中获取值`/`#{SpEL}即spring表达式`"

|                            | @ConfigurationProperties     | @Value                               |
| -------------------------- | ---------------------------- | ------------------------------------ |
| 功能（应用场景不同）       | 只能批量注入配置文件中的属性 | 一个个指定                           |
| 松散绑定（松散语法）       | 支持                         | 不支持“person.first-name：大写用-等” |
| SpEL                       | 不支持                       | 支持(可以计算“#{11*2}”)              |
| JSR303数据校验             | 支持“@validated下@Email”     | 不支持                               |
| 复杂类型封装（最大的区别） | 支持map                      | 不支持                               |

##### 配置文件注入值数据校验

```java
@Component
@ConfigurationProperties(prefix = "person")
@Validated//配置文件注入值数据校验
public class Person {

    /**
     * <bean class="Person">
     *      <property name="lastName" value="字面量/${key}从环境变量、配置文件中获取值/#{SpEL}"></property>
     * <bean/>
     */

   
    @Email//lastName必须是邮箱格式
    //@Value("${person.last-name}")
    private String lastName;
    //@Value("#{11*2}")
    private Integer age;
    //@Value("true")
    private Boolean boss;

    private Date birth;
    private Map<String,Object> maps;
    private List<Object> lists;
    private Dog dog;
```

### 4.小结

- 配置文件yml还是properties他们都能获取到值；

- 如果说，我们只是在某个业务逻辑中需要获取一下配置文件中的某项值，使用@Value；例如：

  ```java
  @RestController
  public class HelloController {
  
      @Value("${person.lastname}")
      private String lastname;
  
      @RequestMapping("/helloConfig")
      public String hellocontroller(){
          return "hello"+lastname;
      }
  }
  ```

- 如果说，我们专门编写了一个javaBean来和配置文件进行映射，我们就直接使用@ConfigurationProperties；

  - 例如：yml或properties

### 5.Spring与SpringBoot配置文件对比

@**ImportResource**：导入Spring的配置文件，让配置文件里面的内容生效；

Spring Boot里面没有Spring的配置文件，我们自己编写的配置文件，也不能自动识别；

想让Spring的配置文件生效，加载进来；@**ImportResource**标注在一个配置类上

```java
@ImportResource(locations = {"classpath:beans.xml"})
导入Spring的配置文件让其生效
```



不来编写Spring的配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


    <bean id="helloService" class="com.atguigu.springboot.service.HelloService"></bean>
</beans>
```

SpringBoot推荐给容器中添加组件的方式；推荐使用全注解的方式

1、配置类**@Configuration**------>Spring配置文件

2、使用**@Bean**给容器中添加组件

```java
@Configuration
public class mAppConfig {
    /**
     * SprinBoot推荐用配置类替代XML文件配置
     * @Bean 为容器中添加bean组件
     * 1.该方法的返回值是“组件”（@bean将方法的返回值添加到容器中）
     * 2.默认的id就是方法名
     * 3.等价于SpringMVC中<Bean id="" class=""></Bean>
     * @return
     */
    @Bean
    public HelloService helloService(){
        System.out.println("配置类@bean已经添加组件");
        return new HelloService();
    }
}
```

### 6.配置文件的占位符功能

##### 1.随机数

```properties
${random.value}
${random.int}
${random.long}
${random.int(10)}
${random.int[1024,65536]}
```

##### 2.占位符获取之前配置的值，如果没有配置过，则可使用“:+指定默认值”

```properties
person.last-name=张三${random.uuid}
person.age=${random.int}
person.birth=2017/12/15
person.boss=false
person.maps.k1=v1
person.maps.k2=14
person.lists=a,b,c
#${person.hello:hello}无法取值，就只用表达式
person.dog.name=${person.hello:hello}_dog 
person.dog.age=15
```

### 7.Profile

> **应用场景**：**Profile**是Spring对**不同环境提供不同配置功能**的支持，可以通过激活、指定参数等方式快速切换环境
>
> 开发用开发环境
>
> 测试用测试环境
>
> 发行用发行环境等

#### 1.对于properties文件

- 默认：使用application.properties的配置；
- 创建：多个application-{profile}.properties/yml
- 激活：在主配置文件（application.properties）中指定  spring.profiles.active=dev

#### 2.对于yml文件

- 文档块：`---+enter`分割document

- 定义：

  ```yaml
  server:
    port: 8081
  spring:
    profiles:
      active: prod
  
  ---
  server:
    port: 8083
  spring:
    profiles: dev
  
  
  ---
  
  server:
    port: 8084
  spring:
    profiles: prod  #指定属于哪个环境
  ```

- 激活：
  1. `active: prod`
  2. 命令行方式：`--spring.profiles.active=dev`
  3. 虚拟机参数：`-D spring.profiles.active=dev`

![1584455642543](D:\GitHub\Notes\WithBeingIT\_static\1584455642543.png)

### 8.自定义配置文件的加载位置

#### 1.特性一：配置顺序

springboot 启动会扫描以下位置的application.properties或者application.yml文件作为Spring boot的默认配置文件

–file:./config/-------->project目录下

–file:./

–classpath:/config/---------->src下`main`

–classpath:/

优先级由高到底，高优先级的配置会覆盖低优先级的配置；

#### 2.特性二：覆盖+互补配置

- SpringBoot会从上述四个位置加载全部的主配置文件；



#### 3.特性三：通过spring.config.location来改变默认的配置文件位置

**项目打包好以后，我们可以使用命令行参数的形式，启动项目的时候来指定配置文件的新位置；指定配置文件和默认加载的这些配置文件共同起作用形成互补配置；**

java -jar spring-boot-02-config-02-0.0.1-SNAPSHOT.jar --spring.config.location=G:/application.properties

#### 4.外部配置加载顺序

[参考官方文档](https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#boot-features-external-config)

**1.命令行参数**

所有的配置都可以在命令行上进行指定

java -jar spring-boot-02-config-02-0.0.1-SNAPSHOT.jar --server.port=8087  --server.context-path=/abc

多个配置用空格分开； --配置项=值



2.来自java:comp/env的JNDI属性

3.Java系统属性（System.getProperties()）

4.操作系统环境变量

5.RandomValuePropertySource配置的random.*属性值



==**由jar包外向jar包内进行寻找；**==

==**优先加载带profile**==

**6.jar包外部的application-{profile}.properties或application.yml(带spring.profile)配置文件**

**7.jar包内部的application-{profile}.properties或application.yml(带spring.profile)配置文件**



==**再来加载不带profile**==

**8.jar包外部的application.properties或application.yml(不带spring.profile)配置文件**

**9.jar包内部的application.properties或application.yml(不带spring.profile)配置文件**



10.@Configuration注解类上的@PropertySource

11.通过SpringApplication.setDefaultProperties指定的默认属性

所有支持的配置加载来源；

### 9.自动配置原理

知识点要求：

- 配置了什么？
- 能不能修改
- 能修改哪些配置
- 能不能扩展

```
springboot经过2之后
使用getAutoConfigurationEntry函数
```

## 三、日志

> **日志场景/特性**
>
> - 关键数据记录：开关日志、控制台、统一写在文件中
> - 记录运行时信息，每日归档、分类等
> - 不要阻塞收集日志---->异步功能
> - 支持APP的日志框架：统一接口层（类似JDBC（统一接口层）---->数据库驱动（具体实现））

**市面上的常见日志框架（包括日志门面和日志实现）；**

JUL、JCL、Jboss-logging、logback、log4j、log4j2、slf4j....

- **slf4j：**simple logging facade for java

- SpringBoot选用 **SLF4j和logback**；

### 1、SLF4J使用

#### 1.SLF4J的配置文件

[SLF4J官方文档](http://www.slf4j.org/manual.html)

- 每一个日志的实现框架都有自己的配置文件。使用slf4j以后，**配置文件还是做成日志实现框架自己本身的配置文件；**

![img](D:\GitHub\Notes\WithBeingIT\_static\concrete-bindings.png)

#### 2.桥接旧版API

> SLF4J附带了几个桥接模块，使得我的APP依赖的 某些依赖于SLF4J以外的日志API 的组件，变成依赖于SLF4J
>
> 简言之，其他框架（Spring（commons-logging）、Hibernate（jboss-logging）、MyBatis、xxxx），用的抽象层（日志门面）日志框架统一换为SLF4J

[官方文档]()的解决方案

![img](D:\GitHub\Notes\WithBeingIT\_static\legacy.png)

**如何让系统中所有的日志都统一到slf4j；**

1、将系统中其他日志框架**先排除**出去；

2、用**中间包来替换原有的日志框架**；

3、我们导入slf4j其他的实现

## 四、Spring Boot与Web开发（转正的开始）

> 最快把应用用起来（创建HelloWord）
>
> 1. 创建SpringBoot应用，选中我们需要的模块
> 2. SpringBoot已经设置好各种场景（），并且通过XXXAutoConfiguration和XXXProperties自动配置
> 3. 编写自己的业务代码即可

### 1.后续学习思路

- 先实现一个实际开发场景
- 根据上述场景讲解springboot的web开发原理

#### 知识点：

- restful-crud-实验
  - 实现restful增、删、改、查
  - [BootStrap](https://getbootstrap.com/docs/4.4/examples/)：登录页面、仪表板

### 2.SpringBoot对静态文件的映射规则

**关键知识点**

- 静态资源对象：WebView资源（HTML【index.html】,CSS,JavaScript）、栏目窗口图标
- staticPathPattern：静态路径模式
- StaticLocations：静态资源位置
- ResourceHandler：资源处理程序

#### 1.SpringBoot的WebMVCAutoConfigration类

- 查找类快捷键：ctrl+shift+n
- 键入：webMVCAuto*
- 找到AddResourceHandlers：添加资源处理程序

```java
//copy源码：
 public void addResourceHandlers(ResourceHandlerRegistry registry) {
            if (!this.resourceProperties.isAddMappings()) {
                logger.debug("Default resource handling disabled");
            } else {
                Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
                CacheControl cacheControl = this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl();
                if (!registry.hasMappingForPattern("/webjars/**")) {
                    this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{"/webjars/**"}).addResourceLocations(new String[]{"classpath:/META-INF/resources/webjars/"}).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
                }

                String staticPathPattern = this.mvcProperties.getStaticPathPattern();
                if (!registry.hasMappingForPattern(staticPathPattern)) {
                    this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{staticPathPattern}).addResourceLocations(WebMvcAutoConfiguration.getResourceLocations(this.resourceProperties.getStaticLocations())).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
                }

            }
        }
```

##### WebMVCAutoConfiguration有两种导入WebJars的方法

1. webjars

   - 默认资源目录

   ```java
   //staticPathPattern
   staticPathPattern = "/webjars/**"
   //StaticLocations
   "classpath:/META-INF/resources/webjars/"
   ```

2. 静态资源文件夹：

   - getStaticLocations---->StaticLocations---->"CLASSPATH_RESOURCE_LOCATIONS"路径（）

   ```java
   //staticPathPattern
   staticPathPattern = "/**"
   //StaticLocations
   private static final String[] CLASSPATH_RESOURCE_LOCATIONS = new String[]{
       "classpath:/META-INF/resources/",
       "classpath:/resources/", 
       "classpath:/static/", 
       "classpath:/public/"
   };
   //以及
   "/"   //------>项目的根目录
   ```
   
   - 以"classpath:/static/"为例：localhost:8080/asserts/js/bootstrap.min.js
     - 注意不能访问localhost:8080/**static/**asserts/js/bootstrap.min.js
   
   - 以"classpath:/META-INF/resources/"为例：localhost:8080/asserts/js/bootstrap.min.js
   
   ![1584672822841](D:\GitHub\SAEngineer\SAEngineer\_static\1584672822841.png)

#### 2.WebJars

##### 1.什么是webjars

- 以jar包的方式引入静态资源
- [WebJars官网](https://www.webjars.org/)
- [WebJars——web端静态资源的jar包](https://blog.csdn.net/eff666/article/details/70183481)

![1584627229475](D:\GitHub\SAEngineer\SAEngineer\_static\1584627229475.png)

##### 2.idea的Maven工程的jquery文件目录

![1584627526957](D:\GitHub\SAEngineer\SAEngineer\_static\1584627526957.png)

##### 3.访问其中一个默认静态资源

- 启动程序
- 浏览器键入：localhost:8080/webjars/jquery/3.4.1/jquery.js

#### 3.欢迎页映射

- 简言之：静态资源文件夹下的index.html会被当作欢迎页访问
- 欢迎页； 静态资源文件夹下的所有index.html页面；被"/**"映射；

- localhost:8080 也可找到index页面

```java
@Bean
public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext, FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
            WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(new TemplateAvailabilityProviders(applicationContext), applicationContext, this.getWelcomePage(), this.mvcProperties.getStaticPathPattern());
            welcomePageHandlerMapping.setInterceptors(this.getInterceptors(mvcConversionService, mvcResourceUrlProvider));
            return welcomePageHandlerMapping;
        }

//getWelcomePage()函数
private Optional<Resource> getWelcomePage() {
            String[] locations = WebMvcAutoConfiguration.getResourceLocations(this.resourceProperties.getStaticLocations());
            return Arrays.stream(locations).map(this::getIndexHtml).filter(this::isReadable).findFirst();
        }

        private Resource getIndexHtml(String location) {
            return this.resourceLoader.getResource(location + "index.html");
        }
//location+"index.html"
```

#### 4.配置浏览器栏目窗口的图标（springboot2以上函数更名了）

### 3.模板引擎

> 当前SpringBoot项目不支持JPS
>
> - springboot不是web项目
> - springboot嵌入式tomcat不支持JSP

**模板引擎定义简言之：**

- **Template+Data经过TemplateEngine输出为新的HTML**
- SpringBoot推荐的Thymeleaf；

#### 1.Thymeleaf模板引擎

##### 1.引入Thymeleaf

- 查看语法[Thymeleaf官方文档](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)
- Github搜索：thymeleaf（主程序）和thymeleaf-layout-dialect（布局功能主程序）
- 在POM文件中添加依赖（<dependence>），修改默认版本(<properties>)

##### 2.使用Thymeleaf

- 添加controller

  ```java
  
  /**
   * Demo web class
   *
   * @author wangshuai
   * @date 2020/03/20
   */
  @Controller
  public class WebController {
  
      //……………………其他代码
      
      
      /**
       * 设置场景
       * 查出一些数据，在页面显示
       */
      @RequestMapping("/success")
      public String success1(Map<String,Object> map){
          map.put("first","helloword");
          map.put("wangshuai","成功");
          return "success";
      }
  }
  ```
  
- 添加HTML页面

  ```html
  <!DOCTYPE html>
  <html lang="en" xmlns:th="http://www.thymeleaf.org">
  <head>
      <meta charset="UTF-8">
      <title>成功获取数据</title>
  </head>
  <body>
      <h1 th:text="${wangshuai}">标题1</h1>
      <!--以下是thyemleaf语法-->
      <!--th:text="${first}"表示该div标签的text属性会被替换成"${first}"-->
      <!--可用“th:属性”替换HTML任意属性；其次，替换的属性无论原HTML标签是否存在-->
      <div th:text="${first}">此处写欢迎信息(text信息会被th:text="${first}"替换)</div>
      <!--优势1：前端自己写HTML;后端返回数据（此例是map）即可---->前后端分离-->
  </body>
  </html>
  ```

##### 3.Thymeleaf优先级

- `<!--可用“th:属性”替换HTML任意属性；其次，替换的属性无论原HTML标签是否存在-->`

- [属性优先级----官方文档](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#attribute-precedence)

  当您`th:*`在同一个标记中写入多个属性时会发生什么？例如：

  ```html
  <ul>
    <li th:each="item : ${items}" th:text="${item.description}">Item description here...</li>
  </ul>
  ```

  我们希望该`th:each`属性在之前执行，`th:text`以便获得所需的结果，但是考虑到HTML / XML标准没有给标记中的属性写入顺序赋予任何含义，因此*优先级*必须在属性本身中建立机制，以确保这将按预期工作。

  因此，所有Thymeleaf属性都定义了一个数字优先级，该优先级确定了它们在标记中执行的顺序。该命令是：

  ![1584688849353](D:\GitHub\SAEngineer\SAEngineer\_static\1584688849353.png)

##### 4.表达式语法

[官方文档与用例](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#standard-expression-syntax)

我们已经看到了用这种语法表示的两种有效属性值：消息和变量表达式：

```html
<p th:utext="#{home.welcome}">Welcome to our grocery store!</p>

<p>Today is: <span th:text="${today}">13 february 2011</span></p>
```

但是有更多类型的表达式，还有更多有趣的细节可以了解我们已经知道的表达式。首先，让我们看一下标准表达式功能的快速摘要：

- 简单表达式：
  - 变量表达式： `${...}`————>1.变量；2.调用函数；3.数组；4.Map等
  - 选择变量表达式： `*{...}`————>相当于$但是有一项补充功能：this
  - 消息表达： `#{...}`————>获取国际化内容
  - 链接URL表达式： `@{...}`————>定义URL
  - 片段表达式： `~{...}`
- 文字（字面量）
  - 文本文字：`'one text'`，`'Another one!'`，...
  - 数字文字：`0`，`34`，`3.0`，`12.3`，...
  - 布尔文字：`true`，`false`
  - 空文字： `null`
  - 文字标记：`one`，`sometext`，`main`，...
- 文本操作：
  - 字符串串联： `+`
  - 文字替换： `|The name is ${name}|`
- 算术运算：
  - 二元运算符：`+`，`-`，`*`，`/`，`%`
  - 减号（一元运算符）： `-`
- 布尔运算：
  - 二元运算符：`and`，`or`
  - 布尔否定（一元运算符）： `!`，`not`
- 比较运算：
  - 比较：`>`，`<`，`>=`，`<=`（`gt`，`lt`，`ge`，`le`）
  - 等号运算符：`==`，`!=`（`eq`，`ne`）
- 条件运算符：
  - 如果-则： `(if) ? (then)`
  - 如果-则-否则： `(if) ? (then) : (else)`
  - 默认： `(value) ?: (defaultvalue)`
- 特殊令牌：
  - 无操作： `_`

所有这些功能都可以组合和嵌套：

```properties
'User is of type ' + (${user.isAdmin()} ? 'Administrator' : (${user.type} ?: 'Unknown'))
```

### 4.SpringMVC自动配置原理

> SpringBoot底层对SpringMVC
>
> - 做了哪些自动配置
> - 如何扩展
> - 如何定制
>
> 学习方式：
>
> 1. 自己看源码
> 2. 看[官方文档Developing Web Applications](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-developing-web-applications)（当然更可行）

#### 1.了解Spring自动配置项

```
Spring MVC Auto-configuration
Spring Boot provides auto-configuration for Spring MVC that works well with most applications.

The auto-configuration adds the following features on top of Spring’s defaults:

Inclusion of ContentNegotiatingViewResolver and BeanNameViewResolver beans.

Support for serving static resources, including support for WebJars (covered later in this document)).

Automatic registration of Converter, GenericConverter, and Formatter beans.

Support for HttpMessageConverters (covered later in this document).

Automatic registration of MessageCodesResolver (covered later in this document).

Static index.html support.

Custom Favicon support (covered later in this document).

Automatic use of a ConfigurableWebBindingInitializer bean (covered later in this document).

If you want to keep those Spring Boot MVC customizations and make more MVC customizations (interceptors, formatters, view controllers, and other features), you can add your own @Configuration class of type WebMvcConfigurer but without @EnableWebMvc.

If you want to provide custom instances of RequestMappingHandlerMapping, RequestMappingHandlerAdapter, or ExceptionHandlerExceptionResolver, and still keep the Spring Boot MVC customizations, you can declare a bean of type WebMvcRegistrations and use it to provide custom instances of those components.

If you want to take complete control of Spring MVC, you can add your own @Configuration annotated with @EnableWebMvc, or alternatively add your own @Configuration-annotated DelegatingWebMvcConfiguration as described in the Javadoc of @EnableWebMvc.
```

org.springframework.boot.autoconfigure.web：web场景的所有配置

#### 2.扩展SpringMVC配置

**==编写一个配置类（@Configuration），是WebMvcConfigurerAdapter类型；不能标注@EnableWebMvc==**;

既保留了所有的自动配置，也能用我们扩展的配置；

```java
//使用WebMvcConfigurerAdapter可以来扩展SpringMVC的功能
@Configuration
public class MyMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
       // super.addViewControllers(registry);
        //浏览器发送 /atguigu 请求来到 success
        registry.addViewController("/atguigu").setViewName("success");
    }
}
```

原理：

​	1）、WebMvcAutoConfiguration是SpringMVC的自动配置类

​	2）、在做其他自动配置时会导入；@Import(**EnableWebMvcConfiguration**.class)

​	3）、注意知识点：@Autowired(required = false)装配在方法上，则方法的参数都在容器中获取（正确的SpringBoot思维是：由容器自动注入）

```java
//WebMvcAutoConfiguration.java
@Configuration(proxyBeanMethods = false)
	@Import(EnableWebMvcConfiguration.class)
	@EnableConfigurationProperties({ WebMvcProperties.class, ResourceProperties.class })
	@Order(0)
	public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer {
//EnableWebMvcConfiguration.class,它继承自“DelegatingWebMvcConfiguration：委派Web Mvc配置”
@Configuration
	public static class EnableWebMvcConfiguration extends DelegatingWebMvcConfiguration {
      private final WebMvcConfigurerComposite configurers = new WebMvcConfigurerComposite();

	 //从容器中获取所有的WebMvcConfigurer对象
      @Autowired(required = false)
      public void setConfigurers(List<WebMvcConfigurer> configurers) {
          if (!CollectionUtils.isEmpty(configurers)) {
              
              //configurers实例类型它是WebMvcConfigurerComposite：Web Mvc配置复合类
              
              this.configurers.addWebMvcConfigurers(configurers);
            	//一个参考实现；将所有的WebMvcConfigurer相关配置都来一起调用；  
            	//@Override
             // public void addViewControllers(ViewControllerRegistry registry) {
              //    for (WebMvcConfigurer delegate : this.delegates) {
               //       delegate.addViewControllers(registry);
               //   }
              }
          }
	}
```

​	3）、容器中所有的WebMvcConfigurer都会一起起作用；

​	4）、我们的配置类也会被调用；

​	效果：SpringMVC的自动配置和我们的扩展配置都会起作用；

#### 3.全面接管SpringMVC配置

SpringBoot对SpringMVC的自动配置不需要了，所有都是我们自己配置；所有的SpringMVC的自动配置都失效了

**我们需要在配置类中添加@EnableWebMvc即可；**

```java
//使用WebMvcConfigurerAdapter可以来扩展SpringMVC的功能
@EnableWebMvc
@Configuration
public class MyMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
       // super.addViewControllers(registry);
        //浏览器发送 /atguigu 请求来到 success
        registry.addViewController("/atguigu").setViewName("success");
    }
}
```

原理：

为什么@EnableWebMvc自动配置就失效了；

1）@EnableWebMvc的核心

```java
//导入了DelegatingWebMvcConfiguration.class
@Import(DelegatingWebMvcConfiguration.class)
public @interface EnableWebMvc {
```

2）

```java
@Configuration
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport {
```

3）回到WebMvcAutoConfigeration类，方法签名如下：

```java
@Configuration
@ConditionalOnWebApplication
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class,
		WebMvcConfigurerAdapter.class })
//容器中没有这个组件的时候，这个自动配置类才生效
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)


@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class,
		ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration {
```

4）、@EnableWebMvc将WebMvcConfigurationSupport组件导入进来；即，这句话@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)

5）、导入的WebMvcConfigurationSupport只是SpringMVC最基本的功能；

### 5、如何修改SpringBoot的默认配置

模式：

​	1）、SpringBoot在自动配置很多组件的时候，先看容器中有没有用户自己配置的（@Bean、@Component）如果有就用用户配置的，如果没有，才自动配置；如果有些组件可以有多个（ViewResolver）将用户配置的和自己默认的组合起来；

​	2）、在SpringBoot中会有非常多的xxxConfigurer帮助我们进行扩展配置

​	3）、在SpringBoot中会有很多的xxxCustomizer帮助我们进行定制配置

### 6、CRUD实验

- 功能1：默认访问首页

#### 功能1：设置默认访问首页

> 两种方式：
>
> 1. 修改配置：通过WebMvcConfigurer配置类（推荐，可扩展性强）
> 2. 增加控制器：添加controller
>
> 实现接口不用实现全部方法：[java8新特性--接口中default方法详细解读](https://blog.csdn.net/weixin_43434729/article/details/103248464)

1. ##### 修改配置（一劳永逸版本）

   ```java
   @Configuration
   public class MyMvcConfig implements WebMvcConfigurer {
       /**
        * MyMvcConfig配置类下的WebMvcConfigurer配置组件
        * 属性1是：addViewControllers
        * @return webMvcConfigurer
        */
       @Bean
       public WebMvcConfigurer webMvcConfigurer(){
           WebMvcConfigurer webMvcConfigurer = new WebMvcConfigurer() {
               @Override
               public void addViewControllers(ViewControllerRegistry registry) {
                   registry.addViewController("/").setViewName("login");
                   registry.addViewController("/index.html").setViewName("login");
               }
           };
           return webMvcConfigurer;
       }
   }
   ```

2. ##### 增加控制器（简单）

   ```java
       /**20200323
        * 上述疑问的实质是模板引擎的拼接字符串操作
        * 前缀：XXXXtemplates
        * 后缀：.html
        * 中间：return的字符串
        */
       @RequestMapping({"/","/index.html"})
       public String index(){
           return "index";
       }
   ```

3. 为前端html代码增加bootstrap core css

   ```xml
   <!--pom文件->
   <!--第四步：引入webjars的bootstrap模块-->
           <dependency>
               <groupId>org.webjars</groupId>
               <artifactId>bootstrap</artifactId>
               <version>4.4.1-1</version>
           </dependency>
   ```

   ```html
   # login.html
   <!DOCTYPE html>
   <html lang="en" xmlns:th="http://www.thymeleaf.org">
   	<head>
   		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   		<meta name="description" content="">
   		<meta name="author" content="">
   		<title>Signin Template for Bootstrap</title>
   		<!-- Bootstrap core CSS -->
   		<link href="asserts/css/bootstrap.min.css" th:href="@{webjars/bootstrap/4.4.1-1/css/bootstrap.css}" rel="stylesheet">
   		<!-- Custom styles for this template -->
   		<link href="asserts/css/signin.css" th:href="@{/asserts/css/signin.css}" rel="stylesheet">
   	</head>
   ```

   ```properties
   # 现在项目的路径名统一改为/crud/**
   server.servlet.context-path=/crud
   ```

#### 功能2：页面国际化

> 原springMVC
>
> 1）、**编写国际化配置文件；**(主要第一步需要自己做)
>
> 2）、使用ResourceBundleMessageSource管理国际化资源文件
>
> 3）、在页面使用fmt:message取出国际化内容

1）、 国际化配置文件

- 基础文件名
- 基础文件名 _ 语言 _ 国家

2）、看源码MessageSourceAutoConfigeration

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnMissingBean(name = AbstractApplicationContext.MESSAGE_SOURCE_BEAN_NAME, search = SearchStrategy.CURRENT)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@Conditional(ResourceBundleCondition.class)
@EnableConfigurationProperties
public class MessageSourceAutoConfiguration {

	private static final Resource[] NO_RESOURCES = {};

	@Bean
	@ConfigurationProperties(prefix = "spring.messages")
	public MessageSourceProperties messageSourceProperties() {
		return new MessageSourceProperties();
	}
//组件——MessageSourceProperties：
public class MessageSourceProperties {

	/**
	 * Comma-separated list of basenames (essentially a fully-qualified classpath
	 * location), each following the ResourceBundle convention with relaxed support for
	 * slash based locations. If it doesn't contain a package qualifier (such as
	 * "org.mypackage"), it will be resolved from the classpath root.
	 */
	private String basename = "messages";

	/**
	 * Message bundles encoding.
	 */
	private Charset encoding = StandardCharsets.UTF_8;
```

3）、在页面使用fmt:message取出国际化内容（themleaf使用#{message}）

- springboot的WebMvcAutoConfigration配置了public LocaleResolver localeResolver(){}

  ```java
  //类
  @Configuration(proxyBeanMethods = false)
  @ConditionalOnWebApplication(type = Type.SERVLET)
  @ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
  @ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
  @AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
  @AutoConfigureAfter({ DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class,
  		ValidationAutoConfiguration.class })
  public class WebMvcAutoConfiguration {
      
      
      //……………………
  @Bean
  		@ConditionalOnMissingBean
  		@ConditionalOnProperty(prefix = "spring.mvc", name = "locale")
  		public LocaleResolver localeResolver() {
  			if (this.mvcProperties.getLocaleResolver() == WebMvcProperties.LocaleResolver.FIXED) {
  				return new FixedLocaleResolver(this.mvcProperties.getLocale());
  			}
  			AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
  			localeResolver.setDefaultLocale(this.mvcProperties.getLocale());
  			return localeResolver;
  		}
  ```

- LocaleResolver（区域解析器）设置的源码：

  - 如果defaultLocale存在就是使用，且请求头的Accept-Language== null
  - 否则使用请求头的request.getLocale();
  - return defaultLocale;、return supportedLocale;、return requestLocale;

  ```java
  public Locale resolveLocale(HttpServletRequest request) {
          Locale defaultLocale = this.getDefaultLocale();
          if (defaultLocale != null && request.getHeader("Accept-Language") == null) {
              return defaultLocale;
          } else {
              Locale requestLocale = request.getLocale();
              List<Locale> supportedLocales = this.getSupportedLocales();
              if (!supportedLocales.isEmpty() && !supportedLocales.contains(requestLocale)) {
                  Locale supportedLocale = this.findSupportedLocale(request, supportedLocales);
                  if (supportedLocale != null) {
                      return supportedLocale;
                  } else {
                      return defaultLocale != null ? defaultLocale : requestLocale;
                  }
              } else {
                  return requestLocale;
              }
          }
      }
  ```

  

![1584966814432](D:\GitHub\Notes\WithBeingIT\_static\1584966814432.png)

- 自定义webMvc的自动配置类下的public LocaleResolver localeResolver() {即可：

#### 功能3：登录功能

> 功能描述：
>
> 1. 设置用户名和密码（就不访问数据库了）
> 2. 登录到后台主页
> 3. 点击列表页面展示所有的员工记录

##### 1.添加Controller

```java
@Controller
public class LoginController {

    /**
     * 原映射方式为(比较麻烦)：
     * @RequestMapping(value = "/user/login",method = RequestMethod.POST)
     * 使用RESTful风格处理请求
     * @return
     */
    @PostMapping("/user/login")
    /**
     * @RequestParam
     * 1.表示请求参数必须提交
     * 2.且返回值类型必须为String：修改html<name="username"   name="password">
     */
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        Map<String ,Object> map){
        if(!StringUtils.isEmpty(username) && password.equals("wangshuai")){
            return "dashboard";
        }else{
            map.put("msg","用户名密码错误");
            return "login";
        }
    }
    /**问题1：为什么登录失败后样式变了
     * css使用相对路径
     * 修改<link href="asserts/css/bootstrap.min.css" th:href="@{webjars/bootstrap/4.4.1-1/css/bootstrap.css}" rel="stylesheet">
     * 为<link href="asserts/css/bootstrap.min.css" th:href="@{/webjars/bootstrap/4.4.1-1/css/bootstrap.css}" rel="stylesheet">
     * 表示从当前项目资源寻找
     */
    /**问题2：为什么点击sign in按钮就能发送“http://localhost:8080/crud/user/login”请求
     * [Form表单、四种常见的POST请求提交数据方式](https://blog.csdn.net/bigtree_3721/article/details/82809459)
     */
}
```

##### 2.表单提交

```html
login.html文件夹下


<form class="form-signin" action="dashboard.html" th:action="@{/user/login}" method="post">
			<img class="mb-4" src="asserts/img/bootstrap-solid.svg" th:src="@{/asserts/img/bootstrap-solid.svg}" alt="" width="72" height="72">
			<h1 class="h3 mb-3 font-weight-normal" th:text="#{login.tip}">Please sign in</h1>
			<!--1.设置颜色2.取出消息3.增加显示时机判断(if的优先级+工具对象)-->
			<p style="color: red;" th:text="${msg}" th:if="${not #strings.isEmpty(msg)}"></p>
			<label class="sr-only" th:text="#{login.username}">Username</label>
			<input type="text" name="username" class="form-control" placeholder="Username" th:placeholder="#{login.username}" required="" autofocus="">
			<label class="sr-only"th:text="#{login.password}">Password</label>
			<input type="password" name="password" class="form-control" placeholder="Password" th:placeholder="#{login.password}" required="">
			<div class="checkbox mb-3">
				<label>
			<!--单标签不能用th:text="#{login.remember}"-->
          <input type="checkbox" value="remember-me" > [[#{login.remember}]]
        </label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit" th:text="#{login.btn}">Sign in</button>
			<p class="mt-5 mb-3 text-muted">© 2017-2018</p>
			<!--注意此处一定是请求index.html,因为之前的路由请求就是这个-->
			<a class="btn btn-sm" th:href="@{/index.html(l='zh_CN')}">中文</a>
			<a class="btn btn-sm" th:href="@{/index.html(l='en_US')}">English</a>
		</form>
```

##### 3.加载CSS样式资源

```java
/**问题1：为什么登录失败后样式变了(没加载出来)
     * css使用相对路径
     * 修改<link href="asserts/css/bootstrap.min.css" th:href="@{webjars/bootstrap/4.4.1-1/css/bootstrap.css}" rel="stylesheet">
     * 为<link href="asserts/css/bootstrap.min.css" th:href="@{/webjars/bootstrap/4.4.1-1/css/bootstrap.css}" rel="stylesheet">
     * 表示从当前项目资源寻找
     */
```

##### 4.重定向（与转发）

> 场景：
>
> - 表单提交的url为：http://localhost:8080/crud/user/login
>
> - 目前刷新页面会一直提示：是否重新提交表单
>
> 解决方案：重定向，思想：
>
> - SpringMVC配置中增加
>
>   `registry.addViewController("/main.html").setViewName("dashboard");`
>
> - 请求的是http://localhost:8080/crud/user/login，但是控制器返回"redirect:/main.html"（原本是返回视图名“dashboard"）
>
> - 也就是“重定向到---->当前项目下---->main.html路径”
>
> 重定向与转发的区别：
>
> - [SpringBoot系列: url重定向和转发](https://www.cnblogs.com/harrychinese/p/SpringBoot_redirect_and_forward.html)
>
> - redirect 和 forward的区别:
>
>   1.重定向 redirect: 完整的重定向包含两次request-response过程, 第一次是访问原始url, 第二次是服务器通知客户端访问重定向后的url. 重定向完成后, 浏览器的地址是重定向后的url, 而不是原始的url.
>
>   - 重定向的使用场景: 因为重定向会修改浏览器地址, 所以 form 提交应该使用重定向, 以免用户刷新页面导致form重复提交.
>
>   2. 转发 forward: 完整的转发仅包含一次 request-response 过程, 用户发出request后, 服务器端视图函数先处理自己的逻辑, 然后在服务器端又调用另一个视图函数, 最后将response返回给浏览器.

```java
if(!StringUtils.isEmpty(username) && password.equals("wangshuai")){
            /**
             * redirect:表示前缀
             * /表示当前项目
             * main.html表示urlpath
             */
            return "redirect:/main.html";
        }else{
            map.put("msg","用户名密码错误");
            return "login";
        }
```

##### 5.拦截器机制

> 登陆状态检查
>
> 做登录状态检查必须添加HttpSession session来记住请求的状态
>
> 补充：[从零开始的Spring Session(一)](http://blog.didispace.com/spring-session-xjf-1/)、[详解 Spring Session 架构与设计](https://www.ibm.com/developerworks/cn/web/wa-spring-session-architecture-and-design/index.html)
>
> 注意： registry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**")
>         .excludePathPatterns("/index.html","/","/user/login").excludePathPatterns("/asserts/**");

第一步：增加会话形参

```java
public String login(@RequestParam String username,
                        @RequestParam String password,
                        Map<String ,Object> map,
                        HttpSession session){
```

第二步：实现拦截器组件

```
public class LoginHandlerInterceptor implements HandlerInterceptor {
    /**
     * 目标方法执行之前执行
     * 弹幕中说：AOP和这个是一个原理，我看也挺像的！
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        /**操作request可以获取到的属性有：
         * session
         * Attribute
         */
        Object user = request.getSession().getAttribute("userLogined");
        if(user == null){
            request.setAttribute("msg","请先登录您的账户！");
            /**未登录，返回登陆首页
             * getRequestDispatcher获取请求转发器
             *      其中getRequestDispatcher不像普通javaBean获取属性值，不带参数
             *      而是获取有指向的RequestDispatcher("/index.html")----->理解为向量
             * 将操作完的request转发(forward)
             */
            request.getRequestDispatcher("/index.html").forward(request,response);
            /**系统调试
             * 问题：为什么getRequestDispatcher要加上String类型
             * 结果：通过观看源码难以接受，似懂非懂的
             * 方式：
             * 1.查看声明与实现，注意接口集成关系
             * 2.直接debug调试
             */
            return false;
        }else{
            //已登录，放行请求
            return true;
        }
    }
}
```

第三步：配置WebMvc拦截器

```java
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        /**SpringBoot自动拦截静态资源
         * 拦截器机制的理解：
         * 1.除了excludePathPatterns("/index.html","/","/user/login")
         * 2.所有的addPathPatterns("/**")都要经过拦截器
         * 3.自定义拦截器内部的public boolean preHandle(...)函数
         * 4.springboot2.0以上要设置静态资源放行
         */
        registry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**")
        .excludePathPatterns("/index.html","/","/user/login").excludePathPatterns("/asserts/**");
    }
```

##### 6.设置主页用户名

- dashboard.html:`th:text="${session.userLogined}"`

#### 功能4：员工列表

##### 1.实验要求：

1）、RestfulCRUD：CRUD满足Rest风格；

- [使用RESTful风格开发Java Web](https://www.jianshu.com/p/91600da4df95)

URI：  /资源名称/资源标识       HTTP请求方式区分对资源CRUD操作

|      | 普通CRUD（uri来区分操作） | RestfulCRUD       |
| ---- | ------------------------- | ----------------- |
| 查询 | getEmp                    | emp---GET         |
| 添加 | addEmp?xxx                | emp---POST        |
| 修改 | updateEmp?id=xxx&xxx=xx   | emp/{id}---PUT    |
| 删除 | deleteEmp?id=1            | emp/{id}---DELETE |

2）、实验的请求架构;

| 实验功能                             | 请求URI | 请求方式 |
| ------------------------------------ | ------- | -------- |
| 查询所有员工                         | emps    | GET      |
| 查询某个员工(来到修改页面)           | emp/1   | GET      |
| 来到添加页面                         | emp     | GET      |
| 添加员工                             | emp     | POST     |
| 来到修改页面（查出员工进行信息回显） | emp/1   | GET      |
| 修改员工                             | emp     | PUT      |
| 删除员工                             | emp/1   | DELETE   |

##### 2.员工列表

> 概述
>
> 1. 在后台主页面，点击Customers查询所有员工信息
> 2. 查出所有员工，来到列表页面
> 3. 在列表页面对员工信息进行增删改查

- 思考了：@Autowired原理
- 思考了：Model Map ModelMap 页面传值
- 技巧：按下alt+enter，自动introduce local variable(引入局部变量)

```java
package com.wangshuai.springboot.controller;

import com.wangshuai.springboot.dao.EmployeeDao;
import com.wangshuai.springboot.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collection;

@Controller
public class EmployeeController {
    /**
     * @Autowired
     * 我所疑问的是，它
     * 1.自动装配了什么
     * 2.如何实现自动装配的
     * 3.自己完全没有意识到什么时候该用 @Autowired
     * 一点发现：
     * @Autowired 注解的作用是由AutowiredAnnotationBeanPostProcessor实现的
     * 它可以被标注在构造函数、属性、setter方法或配置方法上，用于实现依赖自动注入。
     * 至于依赖注入，在一个类中很少去使用new关键字去创建对象了
     * 而是通过IoC解耦
     * --------------------------
     * 其实最后的挣扎为什么？凭什么使用@Autowired注解
     * EmployeeDao employeeDao;是一个声明，如果不实例化，并不能调用实例方法
     * 但是有了@Autowired注解，容器帮我们管理EmployeeDao实例
     * **总结：从容器中拿，避免了在不同类中凌乱地创建多个对象**
     * 至于装配错误，Google有很多解释方法
     */
    @Autowired
    EmployeeDao employeeDao;
    /**
     *
     * @return 查询所有员工,并返回列表页面
     */
    @GetMapping("/emps")
    public String list(Model model){
        /**技巧
         * 写出employeeDao.getAll();表达式
         * 按下alt+enter
         * 自动introduce local variable(引入局部变量)
         */
        Collection<Employee> employees = employeeDao.getAll();
        /**页面传值
         * employees要放在请求域中共享
         */
        model.addAttribute("emps", employees);
        return "emp/list";
    }
}
```

##### 3.侧边栏与顶边栏目公共部分抽取出来

> 参考Thymleaf官方文档：8 Template Layout

1. Defining and referencing fragments

   **定义：**

   ```html
   方式1:使用片段名
   <!DOCTYPE html>
   
   <html xmlns:th="http://www.thymeleaf.org">
   
     <body>
     
       <div th:fragment="copy">
         &copy; 2011 The Good Thymes Virtual Grocery
       </div>
     
     </body>
     
   </html>
   方式2：使用选择器（对应下文的写法3）
   ...
   <div id="copy-section">
     &copy; 2011 The Good Thymes Virtual Grocery
   </div>
   ...
   ```

   **引入：**

   ```html
   写法1：
   <body>
   
     ...
   
     <div th:insert="~{footer :: copy}"></div>
     
   </body>
   <!-------------------------------------------------->
   写法2：
   <body>
   
     ...
   
     <div th:insert="footer :: copy"></div>
     
   </body>
   <!-------------------------------------------------->
   写法3：
   <body>
   
     ...
   
     <div th:insert="~{footer :: #copy-section}"></div>
     
   </body>
   ```

2. Difference between th:insert and th:replace (and th:include)

   - `th:insert` 最简单：它将简单地将指定的片段作为其host标签的主体插入。
   - `th:replace`实际上*将*其主机标签*替换*为指定的片段。
   - `th:include`与相似`th:insert`，但不插入片段，而是仅插入该片段的*内容*。

   **原标签如下：**

   ```html
   <footer th:fragment="copy">
     &copy; 2011 The Good Thymes Virtual Grocery
   </footer>
 
   ```
   **引入方式：**

   ```html
   <body>
   
     ...
   
     <div th:insert="footer :: copy"></div>
   
     <div th:replace="footer :: copy"></div>
   
     <div th:include="footer :: copy"></div>
     
   </body>
   ```
   **显示结果：**
   
```html
   
   <body>
     ...
   
     <div>
       <footer>
         &copy; 2011 The Good Thymes Virtual Grocery
       </footer>
     </div>
   
     <footer>
       &copy; 2011 The Good Thymes Virtual Grocery
     </footer>
   
     <div>
       &copy; 2011 The Good Thymes Virtual Grocery
     </div>
     
   </body>
```


##### 小结

- 最合理的做法是将页面公共部分（顶栏与侧边栏）抽取出来，单独成一个文件
  - 优点是：充分解耦，设置跳转、高亮连接更方便、简化HTML

##### 4.连接高亮

> 参考官方文档：8.2可参数化的片段签名
>
> - 原理：通过修改<a classs= "nav-link">为<a classs= "nav-link active">高亮

```html
bar.html下，做判断：

<a class="nav-link active" th:class="${activeUri=='main.html'?'nav-link active':'nav-link'}"
```

```html
具体页面下，定义并赋值：

<div th:replace="~{commons/bar::#sidebar(activeUri='main.html')}"></div>
```



##### 5.列表内容循环展示

- th:each="emp:${emps}"

- thymeleaf的Expression Utility Objects(表达式实体对象)，用于日期显示格式化

  `<td th:text="${#dates.format(emp.birth, 'yyyy-MM-dd')}"></td>`

```html
<table class="table table-striped table-sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>lastName</th>
									<th>email</th>
									<th>gender</th>
									<th>departmentName</th>
									<th>birth</th>
									<th>Operation</th>
								</tr>
							</thead>
							<!--属性参照public class Employee属性名取值-->
							<tbody>
								<tr th:each="emp:${emps}">
									<td th:text="${emp.id}"></td>
									<td th:text="${emp.lastName}"></td>
									<td th:text="${emp.email}"></td>
									<td th:text="${emp.gender}==0?'女':'男'"></td>
									<td th:text="${emp.department.departmentName}"></td>
									<td th:text="${#dates.format(emp.birth, 'yyyy-MM-dd')}"></td>
									<td>
										<button class="btn btn-sm btn-primary">编辑</button>
										<button class="btn btn-sm btn-danger">删除</button>
									</td>
								</tr>
							</tbody>
```

##### 6.添加员工界面

- 前端按钮：<a>本来就是GET方法

```html
<h2><a class="btn btn-sm btn-success" th:href="@{/emp}">添加员工</a></h2>
```

- 前端：制作添加页面表单

```html
<select name="department.id" class="form-control">
<option th:value="${dept.id}" th:each="dept:${depts}" th:text="${dept.departmentName}">1</option>
							</select>
```

- 后端：添加控制器方法

```java
/**
     * 转到添加页面
     */
    @GetMapping("/emp")
    public String addPage(Model model){
        Collection<Department> departments = departmentDao.getDepartments();
        model.addAttribute("depts",departments);
        return "emps/add";
    }
```

##### 7.添加员工（注意用户输入必定存在错误）

- 添加控制器
  - ` employeeDao.save(employee);`会保存在内存中
  - `return "redirect:/emps";`又会刷新页面到员工列表页面

```java
/**
     * 1.问题是：重定向默认是使用Get请求方式吗？
     * 如何令重定向为POST？
     *
     * 2.知识点：SpringMVC自动将请求参数（html）和入参对象（employee）的属性一一绑定
     *          要求请求参数名与javaBean入参的属性名一致
     * @return 来到员工列表页面
     */
    @PostMapping("/emp")
    public String addEmp(Employee employee){
        System.out.println("保存的员工信息"+employee.toString());
        employeeDao.save(employee);
        return "redirect:/emps";
    }
```

- 日期格式小插曲

```html
# springMVC日期格式
spring.mvc.date-format=yyyy-MM-dd
```



##### 8.编辑员工页面

- URL路径变量（批量路径）：@PathVariable
  - [@RequestParam，@PathParam，@PathVariable等注解区别](https://blog.csdn.net/u011410529/article/details/66974974)

##### 9.页面重用为编辑页面

- 需要区分是员工修改还是员工添加（否则产生空指针异常）
- <input>标签的hidden属性
- 控制器的入参封装与传参Model

##### 10.页面删除

- 使用JS代码

## 附录

### 1.重要快捷键

- 按照名称查找类快捷键：ctrl+shift+n
- 在类中按方法名称查找：ctrl+F12--->直接输入方法名