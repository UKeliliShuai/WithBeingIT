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

## Spring MVC【入门】就这一篇！

[Web开发模式【Mode I 和Mode II的介绍、应用案例】](https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&mid=2247483775&idx=1&sn=c9d7ead744c6e0c3ab2fe55c09bbe61f&chksm=ebd7407edca0c9688f3870d895b760836101271b912899821fb35c5704fe215da2fc5daff2f9#rd)

[Spring MVC【入门】](https://www.jianshu.com/p/91a2d0a1e45a)

[【Spring】Spring MVC原理及配置详解](https://blog.csdn.net/jianyuerensheng/article/details/51258942)

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

SpringBoot单元测试：[使用 Spring 进行单元测试](https://www.ibm.com/developerworks/cn/java/j-lo-springunitest/)、[Spring整合Junit4进行单元测试](https://blog.csdn.net/qq_32786873/article/details/56480880)

[java项目中的classpath到底是什么](https://segmentfault.com/a/1190000015802324)

[JSR 303 - Bean Validation 介绍及最佳实践](https://www.ibm.com/developerworks/cn/java/j-lo-jsr303/index.html)

- 应用程序必须通过某种手段来确保输入进来的数据从语义上来讲是正确的。在通常的情况下，应用程序是分层的，**不同的层由不同的开发人员来完成**。很多时候同样的数据验证逻辑会出现在不同的层，这样就会导致代码冗余和一些管理的问题，比如说语义的一致性等。为了避免这样的情况发生，最好是将验证逻辑与相应的域模型进行绑定。

- | `@NotNull` | 被注释的元素必须不为 `null`    |
  | ---------- | ------------------------------ |
  | `@Email`   | 被注释的元素必须是电子邮箱地址 |

[【小家Spring】Spring注解驱动开发---向Spring Ioc容器中注册Bean的7种方式](https://fangshixiang.blog.csdn.net/article/details/86702407)

自动配置的jackson是什么：[spring boot 最佳实践（一）--使用jackson](https://blog.csdn.net/swordcenter/article/details/72368905)

- 目前java json解析工具有阿里的fastjson，google的GSON，以及SpringMVC 默认的解析工具Jackson。

## Spring Boot---(11)SpringBoot使用Junit单元测试

- [测试方法](https://blog.csdn.net/weixin_39800144/article/details/79241620)
- 测试的时候，整个程序还是处于运行状态，可以从容器中拿东西存东西
  - 简言之：不是破碎的代码块，整个程序仍然是个整体

## [SpringBoot系列: url重定向和转发](https://www.cnblogs.com/harrychinese/p/SpringBoot_redirect_and_forward.html)

## [详解 Spring Session 架构与设计](https://www.ibm.com/developerworks/cn/web/wa-spring-session-architecture-and-design/index.html)

## [使用RESTful风格开发Java Web](https://www.jianshu.com/p/91600da4df95)

[REST风格的软件架构](https://www.jianshu.com/p/ff18818a4c60)

## [分清 URI、URL 和 URN](https://www.ibm.com/developerworks/cn/xml/x-urlni.html)

