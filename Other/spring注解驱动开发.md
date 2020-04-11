# 注解使用归纳

### [Spring 注解大全与详解（实时更新中）](https://blog.csdn.net/weixin_37490221/article/details/78406810)

[Spring中注解大全和应用](https://juejin.im/post/5b8ac1c76fb9a019da27d910#heading-1)

## 属性赋值

### 1. 原Bean的XML配置方式

首先，定义一个Person类

```java
public class Person{
    String name;
    int age;
    ……
    /**
    * 再加各种bean组件的setter、getter方法
    */
}
```

其次，在spring的bean.xml文件中定义

```xml
<bean id="person" class="com.wangshuai.bean.Person" scope="prototype"> 
    <property name="age" value="24"></property>
    <property name="name" value="zhangsan"></property>
</bean>
```

- id是bean的标识，一般与类同名
- class=“全限定类名”，需要从后往前读取：“文件名（com.wangshuai.bean）+类名（Person）”

### 2. 现在使用@Value注解

#### 2.1 用法

> 在**bean类**(Person)——**属性上**(age)——添加**@Value注解**

#### 2.2 详解

1. 基本数值：字符串，boolean等等

2. 可以写SpEL表达式（Spring Expression Language）：#{}

   `@value(#{20-2})`

3. 可以取出配置文件的值(也就是运行时环境变量的值)：${}     ——**@PropertySource**

   - 在xml中`<bean>`标签上面添加`<context:property-placeholder location="classpath:person.properties">`
   - 在配置类上方法添加@PropertySource("classpath:/person.properties")注解：相当于读取外部配置文件中的K/V保存到运行时环境变量中
   - 创建或打开”Person.properties属性文件“，添加属性`person.nikename=xiaozhang`
   - 使用`@value{${person.nikename}}`

## 自动装配

### 1.定义@Autowire

> 自动装配（自动注入）：Spring利用依赖注入（DI），完成对IOC容器中各个组件的依赖关系赋值

### 2.理解

1. @Autowire是将容器已有的组件（对象）整体赋值
2. 赋值后的对象与容器中的对象是同一个对象（组件）

### 3.使用规则

1. 默认按照类型去容器中查找并装配对应组件，相当于`applicationContext.getBean(BoolDao.class);`
2. 同一类型存在多个组件，则会再将需要装配的属性名称与容器中组件的id进行匹配，相当于`applicationContext.getBean(bookDao);`
3. 如果一定要自定义指定，使用@Qualifier("指定的组件ID")**（优先级最高）**
4. 非必须装配(容器中存在则装配，不存在则不会报错)的方法：`@Autowired(required=false)`
5. 注解首选装配的组件：@Primary标注在bean上**（优先级第二）**

### 4.标注位置

1. 属性上：自动装配依赖组件
2. 方法上：调用此方法，并且方法的参数是从容器中获取
3. 构造器上：容器启动时，从容器中自动装配该对象
4. 参数位置：只有一个参数时，@Autowired可以省略
5. @Bean方法参数将从容器中获取；默认不屑@Autowired