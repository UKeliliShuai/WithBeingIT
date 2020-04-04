# WithBeingIT
> Java、Notes
>
> 用过纸质笔记本，用过本地文件，用过oneNote，用过有道云笔记。除了有道云笔记，均因维护不善而不了了之
>
> 后知后觉：目前认为，最适合做体系笔记的是Github
>
> - 云端
> - 活跃的生态圈与模板
> - 永久性：适合长期体系作战
> - 因为它是Github！

[TOC]

toBeGod目录：[分布式+JVM+多线程+spring+微服务+Netty](https://mp.weixin.qq.com/s/3Ntfv89kLqy1M2PNiCN6bQ)

看视频：[二进制、八进制、十进制、十六进制数相互转换](https://jingyan.baidu.com/article/47a29f24292608c0142399cb.html)

## 1.Java

- [JAVAschool最全的JAVA技术教程](http://www.51gjie.com/)——笔者可以参考的开源目录结构

- [HOW2J.CN](https://how2j.cn/)——涵盖Java低中高、前后端、数据库、中间件、分布式等知识

- [【干货】你必须掌握的 21 个 Java 核心技术！](https://mp.weixin.qq.com/s/U85Ip73WF1uGEEggRp0deg)

- [大学四年因为知道了这32个网站，我成了别人眼中的大神](https://blog.csdn.net/sinat_33921105/article/details/103899234)

- [关于高效学习编程，我又有了最新的几点思考！](https://www.bilibili.com/read/cv5198726?column_from=5&from=upFeed&native.theme=0&night=0)

- [GitHub中文排行榜，帮助你发现高分优秀中文项目，GitHub-Chinese-Top-Charts](https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts)

  ![GitHub中文排行榜](https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts/raw/master/banner.png)

### 基础知识

- [Java实参和形参与传值和传引用](https://blog.csdn.net/wanliguodu/article/details/55653876)

  > **1）形参为基本类型时，对形参的处理不会影响实参。**
>
  > **2）形参为引用类型时，对形参的处理会影响实参。**
>
  > **3）String,Integer,Double等immutable类型的特殊处理，可以理解为值传递，形参操作不会影响实参对象。**

- this关键字加与不加到底有什么区别？[Java中this关键字使用小结](https://www.cnblogs.com/zheting/p/7751752.html)

  - 虽然this调用方法可以省略this关键字，但是JAVA编译器会自己添加上

    - 简言之，原来学习C++时不加this（实例对象）就使用方法的习惯不好

    - 正确的方法调用语法是：对象.方法名（）----->this.方法名

  - 内部类/匿名类调用外部类的this：类名.this.调用对象

- [高级](https://github.com/UKeliliShuai/WithBeingIT/blob/master/ElementaryKnowledge/%E9%AB%98%E7%BA%A7.md)

- 反射与注解：[理解 Android 中的注解与反射](https://juejin.im/entry/57c9f5890e3dd90063e83461)、[理解 Android 中的注解与反射](https://juejin.im/entry/57c9f5890e3dd90063e83461)、[深入理解Java注解类型(@Annotation)](https://blog.csdn.net/javazejian/article/details/71860633)

  - 解析注解的类如何定义?
  - 定义在何处？何时运行？——[注解处理器](https://juejin.im/post/5a809a445188257a836c2e9c#heading-6)
  - [Spring@Autowired注解与自动装配](https://blog.csdn.net/HEYUTAO007/article/details/5981555)

- 动态代理：[Java动态代理](https://juejin.im/post/5ad3e6b36fb9a028ba1fee6a)

- [深入理解Java类型信息(Class对象)与反射机制](https://blog.csdn.net/javazejian/article/details/71860633)

  深入理解Java枚举类型(enum)

  深入理解Java注解类型(@Annotation)

  深入理解Java并发之synchronized实现原理

  深入理解Java内存模型(JMM)及volatile关键字

  [深入理解Java类加载器(ClassLoader)](https://blog.csdn.net/javazejian/article/details/73413292)、[通俗易懂 启动类加载器、扩展类加载器、应用类加载器](https://zhuanlan.zhihu.com/p/73359363)、[好怕怕的类加载器](https://zhuanlan.zhihu.com/p/54693308)

### 多线程

##### 基本概念

- [10分钟读懂进程线程、同步异步、阻塞非阻塞、并发并行](https://mp.weixin.qq.com/s/c3YuR8pWKn4RpseGIWNxvw)

- 线程安全定义：[java 线程安全和不安全](https://blog.csdn.net/mccand1234/article/details/52013168)

- 死锁（银行家算法）：[漫话：如何给女朋友介绍什么是死锁](https://mp.weixin.qq.com/s/SsU8Ro-Uf2WDSjkPv4lptQ)

- [当初我要是这么学习「进程和线程」就好了（附带思维导图）](https://mp.weixin.qq.com/s/zVi45pZka_kPpKIoNXNVBA)

  - 进程是一个过程，一个进程就是一个正在执行的程序的实例，进程也包括程序计数器、寄存器和变量的当前值

  - 线程的程序计数器、堆栈指针、寄存器和状态

    > 线程会有程序计数器，用来记录接着要执行哪一条指令；线程还拥有寄存器，用来保存线程当前正在使用的变量；线程还会有堆栈，用来记录程序的执行路径。


  - 墨菲法则(Murphy)、竞态条件、互斥(mutual exclusion) 条件
  - Java 中的 native 关键字底层也是 C 或 C++ 编写的源码。

##### 知识点：

- 数据共享：[JAVA多线程提高四：多个线程之间共享数据的方式](https://www.cnblogs.com/pony1223/p/9256224.html)

### JVM

- [JVM 史上最最最完整深入解析](https://mp.weixin.qq.com/s/EydeGMpxd_zYv11noPAABA)

### 新特性

- [java8新特性--接口中default方法详细解读](https://blog.csdn.net/weixin_43434729/article/details/103248464)

## 2.数据库

### SQL语言

- [后端程序员必备：书写高质量SQL的30条建议](https://www.cnblogs.com/jay-huaxiao/p/12546973.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
- 汇总:[SQL语句大全，所有的SQL都在这里](https://mp.weixin.qq.com/s/zI9vaf4zP_qLbCWYIz9yUg)

## 3.操作系统

- [[当初我要是这么学习：操作系统的极简教程](https://mp.weixin.qq.com/s/p7AUCjig126UFOCruyD15A)
- Github/me115/[Linux工具快速教程](https://linuxtools-rst.readthedocs.io/zh_CN/latest/)
- [windows——CMD常用命令](https://blog.csdn.net/LJFPHP/article/details/78818696)

## 4.Design

### 如何阅读源码

- [看完这篇，别人的开源项目结构应该能看懂了](https://www.bilibili.com/read/cv5236887?share_medium=android&share_source=qq&bbid=XYDF6EFDC05FD153DFAD6209F0A69D4059A66&ts=1584942634271)

### 设计模式

- [设计模式](https://github.com/UKeliliShuai/WithBeingIT/blob/master/Design/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.md)

### 框架

- [Nginx 介绍](https://www.cnblogs.com/wushuaishuai/p/9366402.html#_label0)、[8分钟带你深入浅出搞懂Nginx](https://zhuanlan.zhihu.com/p/34943332)

- [Spring框架概述](https://github.com/UKeliliShuai/WithBeingIT/blob/master/Framework/Framework.md)
- [SpringBoot学习](https://github.com/UKeliliShuai/WithBeingIT/blob/master/Framework/SpringBoot学习.md)
- [SpringBoot尚硅谷-笔记](https://github.com/UKeliliShuai/WithBeingIT/blob/master/Framework/SpringBoot笔记_尚硅谷.md)

## 5.工具

### IDEA

#### 插件安装：

[Java程序员必备的Intellij插件（长期更新，截止到2018-05-03)](https://juejin.im/entry/5aea80346fb9a07ab9794f06)

1 Background Image Plus（未安装）
2 CodeGlance: vscod右侧代码地图
3 Translation
4 Rainbow Brackets: 彩虹色括号
5 Grep Console: 日志着色控制台显示
6 Statistic: 代码统计
7 Markdown Navigator
8 RestfulToolkit: 快速定位controller层接口、接口测试
9 GsonFormat: Json转Java类
10 Mybatis Log Plugin: 快速打印SQL语句
11 Free Mybatis Plugin: mybatis xml id与接口间跳转
网友推荐其他好用的插件：
1 [Material Theme UI](https://blog.csdn.net/w605283073/article/details/86227134): 美化
2 [Lombok](https://juejin.im/post/5a6eceb8f265da3e467555fe): 省掉手动set/get方法
3 [Alibaba Java Coding Guidelines](https://www.cnblogs.com/mafly/p/aliPlugin.html): 阿里巴巴开发规范
4 [Easy Code](https://www.oschina.net/news/99813/easycode-1-2-0-released): 数据库表生成JavaBean
5 JRebel for IntelliJ:（未安装） JavaWeb项目热部署
6 Key Promoter X: 快捷键提示
7 [.ignore](https://blog.csdn.net/qq_34590097/article/details/56284935): 生成git ignore文件

#### 使用技巧/快捷键

- [使用IntelliJ IDEA查看类的继承关系图形](https://www.cnblogs.com/deng-cc/p/6927447.html)
- Ctrl+h查看继承树
- 按下alt+enter：自动introduce local variable(引入局部变量)
- Ctrl+n查找所有类

### UML

- [UML类图、UML时序图](https://github.com/UKeliliShuai/WithBeingIT/blob/master/Tools/UML.md)
- UML：[什么是统一建模语言（UML）](https://www.visual-paradigm.com/cn/guide/uml-unified-modeling-language/what-is-uml/)

### Git

- [全面理解Git](https://juejin.im/post/582bd0b4da2f600063d4f89e)
- [🛠Git 常用操作总结](https://juejin.im/post/5a2cdfe26fb9a0452936b07f)
- [Git的使用以及GitHub的配置](https://www.jianshu.com/p/6ae3697a7c93)
- [在 IntelliJ IDEA 中这样使用 Git，贼方便了！](https://mp.weixin.qq.com/s/3ll40XqNLwasJR1LYABvgw)
- [GitHub 漫游指南](https://github.com/phodal/github)
- 防坑血泪史：[GIT 查看/修改用户名和邮箱地址](https://blog.csdn.net/autoliuweijie/article/details/52230165)、[Changing author info](https://help.github.com/en/github/using-git/changing-author-info)
- [github 项目搜索技巧-让你更高效精准地搜索项目](https://www.cnblogs.com/suwanbin/p/12113751.html#github-%E6%90%9C%E7%B4%A2%E6%8A%80%E5%B7%A7)

### Excel

- [你加班2小时做的Excel表格，我只需1分钟！(建议收藏)](https://zhuanlan.zhihu.com/p/74011507)

- [7 分钟入门 Excel VBA，从此打开新世界的大门](https://www.jianshu.com/p/1a529d5f824a)

- Excel转大写函数：

  ```vb
  Option Explicit
  
  Function 大写(cell As String) As String    '声明函数名，有一个参数
      Dim RMBS As String
      If cell = "" Or Not IsNumeric(cell) Then 大写 = "": Exit Function    '如果参数为空或者非数值则返回空白
      If cell = 0 Then 大写 = "零元整": Exit Function    '如果参数为0则返回"零元整"]
      '将数值转换成中文大写,并将点替换成"元",将"-"替换成"负"
      RMBS = Replace(Replace(Application.Text(Round(cell, 2), "[DBnum2]"), ".", "元"), "-", "负")
      '加入角与分,同时将最后的"零"替换成"元整"
      RMBS = IIf(Left(Right(RMBS, 3), 1) = "元", Left(RMBS, Len(RMBS) - 1) & "角" & Right(RMBS, 1) & "分", IIf(Left(Right(RMBS, 2), 1) = "元", RMBS & "角", IIf(RMBS = "零", "", RMBS & "元整")))
      '将"零元"和"零角"替换成空
      RMBS = Replace(Replace(RMBS, "零元", ""), "零角", "")
      RMBS = IIf(Right(RMBS, 3) = "元" & Left(Right(RMBS, 2), 1) & "分", Left(RMBS, Len(RMBS) - 2) & "零" & Right(RMBS, 2), RMBS)
      大写 = RMBS    '将变量的值赋予函数
      'isNumeric用于判断参数是否是数字,非数字是无法转换成人民币大写的
      'replace是用于替换的函数,但它和工作表函数replace有极大的不同,与substitute函数极其相近
  End Function
  ```

  

## 6.Python

### 整理

- [从Zero到Hero，一文掌握Python关键代码](https://mp.weixin.qq.com/s/zWeg700fJU3Isiv3sGEDhw)

## 7.面试

[最全干货：从写简历，到面试、谈薪酬的那些技巧和防坑指南](https://mp.weixin.qq.com/s/6pgIo1rrqH6WQOZLv_yhIw)

[一份来自亚马逊工程师的Google面试指南](http://www.cocoachina.com/articles/897134?filter=rec)、[[译] Coding Interview University 一套完整的学习手册帮助自己准备 Google 的面试](https://github.com/jwasham/coding-interview-university/blob/master/translations/README-cn.md)

## 8.Android

- [Handler都没搞懂，拿什么去跳槽啊？](https://juejin.im/post/5c74b64a6fb9a049be5e22fc#heading-0)

## 9.Node.js

[七天学会NodeJS](https://nqdeng.github.io/7-days-nodejs/)

[Node.js是用来做什么的？](https://www.zhihu.com/question/33578075)

## 10.MATLAB

[File Exchange](https://www.mathworks.com/matlabcentral/fileexchange/)

## 11.HTML

[HTML rel属性值释义大全](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/)

[Form表单、四种常见的POST请求提交数据方式](https://blog.csdn.net/bigtree_3721/article/details/82809459)

[EL表达式 （详解）](https://blog.csdn.net/qwerasdf123/article/details/4189889)

## 12.English

### Grammar

[及物动词 与 不及物动词](https://zhuanlan.zhihu.com/p/44253765)

动词的分类：[英语语法第5期——动词的分类](https://zhuanlan.zhihu.com/p/38070458)

- 用来表示动作或状态的词汇就是动词