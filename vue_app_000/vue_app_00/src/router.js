                                  //壹
//这页整体是路由器
import Vue from 'vue'
import Router from 'vue-router'


//以下是淑棋屋登录引入
import Login_s from "./components/sqw/Login_s.vue"
import Reg_s from "./components/sqw/Reg_s.vue"
import Product_s from "./components/sqw/Product_s.vue"
import Dictionary from "./components/sqw/Dictionary.vue"
import Files from "./components/sqw/Files.vue"
import Carous from "./components/sqw/Carous.vue"
import Chocolate from "./components/sqw/Chocolate.vue"
import Cheese from "./components/sqw/Cheese.vue"
import Mousse from "./components/sqw/Mousse.vue"
import Bigcake from "./components/sqw/Bigcake.vue"
import French from "./components/sqw/French.vue"
import Bar from "./components/Bar.vue"





 //2.为组件指定访问路径/Exam01
Vue.use(Router)
export default new Router({
  //以下是路由字典
  // ↓
  routes: [
    //以下是淑棋屋的登录列表访问路径
    {path:'/Login_s',component:Login_s},
    {path:'/Reg_s',component:Reg_s},
    {path:'/Product_s',component:Product_s},
    {path:'/Dictionary',component:Dictionary},
    {path:'/Files',component:Files},
    {path:'/Carous',component:Carous},
    {path:'/Chocolate',component:Chocolate},
    {path:'/Cheese',component:Cheese},
    {path:'/Mousse',component:Mousse},
    {path:'/Bigcake',component:Bigcake},
    {path:'/Bigcake',component:Bigcake},
    {path:'/French',component:French},
    {path:'/Bar',component:Bar},


  ]
})
