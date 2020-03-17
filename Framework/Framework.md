# SpringFramework

[TOC]

> 有一个感悟：
>
> - 平时看程序结构太注重程序=右边的结构
> - 而忽略了=左边才是类的骨架（算数的结构）

![img](https://upload-images.jianshu.io/upload_images/788498-358a3764fcbca0e4.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

- 磨刀不误砍柴功之：[Spring框架简介](https://www.jianshu.com/p/7b6a070119c7)

- Spring:[Spring框架介绍及使用](https://blog.csdn.net/qq_22583741/article/details/79589910#2-%E5%85%A5%E9%97%A8%E6%A1%88%E4%BE%8Bioc)（介绍了三种Bean的配置方式----一顿好找）

- Maven:[Maven入门，读完这篇就够了](https://juejin.im/post/5a4a5e2bf265da4322418d7f)

【源码分析——待理解】[Spring IOC 容器源码分析](https://juejin.im/post/5bc5c88df265da0b001f5dee#heading-12)

## SpringBoot

[Spring Boot最核心的27个干货注解，你了解多少？](https://zhuanlan.zhihu.com/p/67976768)

[Spring容器IOC初始化过程---今天终于进行总结了](https://juejin.im/post/5ab30714f265da237b21fbcc#heading-2)

- IoC容器有哪些内容：
  - Resource
  - ResourceLoader
  - BeanDefinition
  - BeanDefinitionReader
  - BeanDefinitionRegistry

- 具象化了组件的概念

- 总结：

  > 1、首先初始化上下文，生成`ClassPathXmlApplicationContext`对象，在获取`resourcePatternResolver`对象将`xml`解析成`Resource`对象。
  >
  > 2、利用1生成的context、resource初始化工厂，并将resource解析成beandefinition,再将beandefinition注册到beanfactory中。

[Spring 资源访问剖析和策略模式应用](https://www.ibm.com/developerworks/cn/java/j-lo-spring-resource/index.html)

- 使用策略模式可以让客户端代码在不同的打折策略之间切换，但也有一个小小的遗憾：客户端代码需要和不同的策略类耦合。

  为了弥补这个不足，我们可以考虑使用配置文件来指定 DiscountContext 使用哪种打折策略——这就彻底分离客户端代码和具体打折策略——这正好是 Spring 框架的强项，Spring 框架采用配置文件来管理 Bean，当然也可以管理资源。

- 归纳起来，如果 Bean 实例需要访问资源，有如下两种解决方案：
  - 代码中获取 Resource 实例。
  - 使用依赖注入。

[Java 代理模式与 AOP](https://juejin.im/post/59bb34ef5188257e8c54e030)

Spring 提供了以下两种不同类型的容器：[IoC 容器](https://wiki.jikexueyuan.com/project/spring/ioc-containers.html)；

- Spring BeanFactory 容器
- Spring ApplicationContext 容器

[SpringBoot-@ Configuration，@ Bean注解的使用详解（配置类的实现）](https://www.hangge.com/blog/cache/detail_2506.html)

- **Spring Boot**推荐使用**java**配置完全代替**XML**配置，**java**配置是通过**@Configration**和**@Bean**注解实现的。

- **使用说明**
  - **@Bean**注解作用在方法上
  - **@Bean**指示一个方法返回一个**Spring**容器管理的**Bean**
  - **@Bean**方法名与返回类名一致，首字母小写
  - **@Bean**一般和**@Component**或者**@Configuration**一起使用
  - **@Bean注解**最小作用域为单例**singleton**作用域，可通过**@Scope（“ prototype”）**设置为原型作用域

- 尚硅谷：配置类也是容器中的一个组件@component
  - 自动配置类的作用：给容器中导入这个场景需要的所有组件，并配置好这些组件；