
<template>
  <div>
    <mt-header fixed title="Delicious cake">
  <router-link to="/" slot="left">
    <mt-button icon="back"></mt-button>  
  </router-link>
  <router-link to="" slot="left">
    <mt-button>
      <mt-badge size="small" color="#E4004F"> 
        <img src="../assets/map.png">
      北京
      </mt-badge>
    </mt-button>  
  </router-link>
  <mt-button icon="more" slot="right"></mt-button>
</mt-header>

<mt-tab-container v-model="active" class="uname">
  <mt-tab-container-item id="home">
     <Product_s></Product_s>
  </mt-tab-container-item>
  <mt-tab-container-item id="dictionary">
   <Dictionary></Dictionary>
  </mt-tab-container-item>
  <mt-tab-container-item id="car">
   
  </mt-tab-container-item>
    <mt-tab-container-item id="me">
      <Login_s></Login_s>
  </mt-tab-container-item>
</mt-tab-container>



    <mt-tabbar v-model="active" fixed>
  <mt-tab-item id="home" >  
    <img slot="icon" src="../assets/start2.png">
     首页   
  </mt-tab-item>
  <mt-tab-item id="dictionary">
    <img slot="icon" src="../assets/norml2.png">
     分类
  </mt-tab-item>  
  <mt-tab-item id="car">
   <img slot="icon" src="../assets/shop2.png">
     购物车
  </mt-tab-item>
  <mt-tab-item id="me">
     <img slot="icon" src="../assets/me2.png">
     我的
  </mt-tab-item> 
 </mt-tabbar>     
  </div>
</template>



<script>
import Product_s from "./sqw/Product_s"
import Login_s from './sqw/Login_s'
import Dictionary from './sqw/Dictionary'
  export default {
    name: 'uname',
    data () {
      return { 
       
        active:"home"
      }
    },
    methods: {
     
    },
    watch: {
      selected: function (val, oldVal) {
        console.log(val)
        // click后打印出当前mt-tab-item的id
       
      }
    },
    components:{
      "Product_s":Product_s,
      "Login_s":Login_s,
      "Dictionary":Dictionary,
    }
  }
</script>

<style scoped>
 .mint-header{
   background:#E4004F;
  height:60px;
 }

</style>