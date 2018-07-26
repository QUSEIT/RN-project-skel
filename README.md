# 项目背景
为减少项目开发前期的项目架构搭建和部署，让开发人员能更专注于业务，故提取封装基于RN开发的项目模板。

# 项目简介
该项目模板提供了状态管理方案（采用dva）、路由和基础的工具模块，基于此模板进行开发主要针对三个层面进行，model，controller和view，主要的业务逻辑会放在controller中，view只作为ui展示，model提供数据，这就是基本MVC模型（其实在RN中controller和view都是component只是分为了业务组件和ui组件）。

# 如何使用
### 项目搭建
- 基于模板进行开发
1. 下载该项目模板到本地`git clone git@github.com:QUSEIT/RN-project-skel.git <your project name>`
2. 进入项目目录下`cd <your project name>`
3. 安装相关依赖`npm install`
4. 运行项目`react-native run-android`

- 新建项目
1. 新建一个RN项目`react-native init <your project name>`
2. 拷贝模板项目的app目录和package.json到新建的项目下
3. 安装相关依赖`npm install`
4. 运行项目`react-native run-android`

### 项目开发
#### 目录和代码结构
RN的代码放在app目录下，原生的代码放在android和ios目录下，这里我们主要关注app目录下的代码。app目录下分了几个大的模块，router，model，controller，view和common，以及一个App.js，下面对这几个进行详细说明和解释。

- App.js
该文件是项目最重要的基础，里面配置并创建了一个dva app，将我们创建的model和router注册到app中，也是App的入口。

- router
router作为app的路由，管理着所有的页面导航，需要导航的页面都必须在router中进行注册，对应的注册文件为StackRouteConfigs.js。

- model
model其实是dva中管理页面状态的容器，但这里的状态往往与数据相关，数据的改变可能会也可能不会导致页面的状态改变，所以这里的model我会分为两类，一类是只针对某个页面的状态，另一类是针对多个页面共享的状态，model我将其定义为提供数据的容器不会涉及太多的逻辑。

- controller
controller是业务组件管理model的数据和view的ui，处理的是该页面的业务逻辑，简单理解就是拿到model的数据如何将其展示在view上，如何处理用户发出的事件。

- view
view是controller直接渲染的内部组件，其作为页面的ui部分处理的是数据展示，向外层controller提供接口由controller控制。

- common
common模块提供了基础的工具，如网络请求，本地存储，文本判断等，改模块并不完善需要在开发中进行积累。

- service
service主要放的是restful api，为业务提供服务。

#### 开发流程
以开发一个登录页面来简单介绍
1. 先在view目录下创建一个LoginView（这里我们会继承自BaseView，BaseView提供了统一的ToolBar），LoginView包含一个账号输入框，一个密码输入框和一个登录按钮，向外层controller暴露三个方法userNameChanged(name:string),passwordChanged(password:string)和performLogin(),以及两个属性userName和password。

2. 在model目录创建一个LoginModel(这是一个非共享model),LoginModel里的state有userName，password，reducers(里面放的都是同步方法)里有一个updateState方法用于更新state，effects(里面放的都是异步方法)里有一个login方法，login方法会请求服务器进行登录，所以这里我们需要一个AuthService，AuthService里有login方法用于请求登录接口，在model调用login方法后会收到服务器返回的结果，根据结果我们会做相应的处理。最后需要将LoginModel添加到model目录下的index.js中，App.js会从model/index.js中拿到所有的model并注册到dva app中。

3. 在controller目录下创建一个LoginController(继承自BaseController，提供统一的退出方法),在LoginController定义的上方使用redux提供的connect方法将LoginModel注射到LoginController中，在render方法中放入LoginView并提供userNameChanged，passwordChanged和performLogin方法以及userName和password属性，在controller中会多写一个loginCallback用于接收登录结果，在执行performLogin时将userName，password和loginCallback作为参数传递到LoginModel的login方法，这里会涉及到dva的事件分发，model中的每一个方法对应一个action，利用提供的dispatch方法向dva发送action，dva会找到对应的model并执行相应的方法。最后将LoginController注册到StackRouteConfigs中，router会把StackRouteConfigs中的screen注册到导航栈里。

通过以上三步分别创建LoginView，LoginModel，LoginController即完成了基础的登录模块，这个登录案例非常简单，在实际的开发中还会涉及到很多的东西比如登录成功后保存用户信息，进入app后判断用户信息是否完备，用户登录状态是否过期等一系列与用户信息相关的判断操作，所以在将一个模块进行分层后，能让代码更加清晰，ui需要改变时不会涉及到逻辑代码的修改，逻辑代码的修改也不会影响ui的代码，降低代码耦合的同时增加了项目的稳定。



































