# meetingRoom-system-frontend
> 校园校园会议室管理系统——前端，同时存在移动端和PC端，寻找移动PC同时存在的适配方法。
采用Vue.js框架，引入Element.ui和Vant.ui两大组件库。

- build            项目打包文件夹
- mock             前端模拟数据
- node_modules     项目依赖包（不上传到GitHub）
- public           公共文件
     * favicon.ico 项目ico图标
     * index.html  项目打包时会以该文件为母板
- src             资料文件夹
     * api        后端接口api文件
     * assets     资源文件夹，存放静态图片资源的目录
     * components 组件文件夹
     * icons      图标
     * layout     页面框架（网页端）
     * mobileLayout 页面框架（移动端）
     * router.js  路由入口文件，决定了页面的跳转规则
     * store.js   项目全局变量文件
     * styles     项目全局样式
     * utils      公共函数文件夹
     * views      页面文件夹
     * App.vue    应用主组件（组件入口）
     * filters.js 公共过滤器
     * main.js    webpack入口文件
     * permission.js 权限校验、路由拦截
     * setting.js  项目配置
- .env.development  项目后端IP地址和端口号（ip:port）
- .eslintrc.js      自定义elint代码检查
- .gitignore        git创建仓库忽略的文件
- package.json      项目描述文件
- README.md         文字介绍项目详情
- vue.config.js     项目配置文件


### 移动端页面
- 登录、注册
- 首页（各功能入口）
- 预订
- 查看我的预订记录

### PC端页面
- 登录、注册
- 预订
- 查看我的预订记录        

（下方功能仅管理员可用）
- 会议室管理与配置
- 会议室预订申请的审批
- 会议室使用统计分析
- 预订列表
- 用户列表