<!-- Product.vue组件商品列表-->
   <!--1. 创建一个空组件 --> 
<template>
    <div class="product-app">
        <!-- 2.指定访问路径在router.js中 -->
        <!-- 一个商品 循环出所有的 -->
        <div class="goods-item" v-for="(item,i) of list" :key="i">
            <img :src="'http://127.0.0.1:3000/'+item.img_url"/>
            <h4>{{item.lname}}</h4>
            <div class="info">
                ￥{{item.price.toFixed(2)}}
            </div>
            <mt-button type="danger" @click="addCart" 
                :data-lid="item.lid"
                :data-price="item.price"
                :data-lname="item.lname"
            >加入购物车</mt-button>
        </div>
        <!-- 加载更多按钮 -->
        <mt-button type="primary" size="large" @click="loadMore">加载更多</mt-button>
         <a style="position:fixed;bottom:0;color:red;" href="javascript:document.documentElement.scrollTop=0;"><img style="width:20px;height:20px;" src="../../../src/img/top.png" alt=""></a>
        <a style="position:fixed;right:0; bottom:0;color:red;" @click="jumpCart" type="danger"><img src="../../../src/img/shop_car.png" alt=""></a>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[],//商品的列表数组
            pno:0,  //页码（第几页）配合btn-button的点击事件
        }
    },
    methods:{
        jumpCart(){
            this.$router.push("/Cart");
        },
        loadMore(){//功能：获取商品分页的数据
           //1.发送请求  
           
           //  发送请求的路径↓
           var url="product";//因为在app.js中是小写所以是product
            //当前的页码加1
           this.pno++;
           //创建参数对象
           var obj={pno:this.pno};
           ////发送请求 ajax请求当前页面
           this.axios.get(url,{params:obj}).then(res=>{ 
               //console.log(res)//测试请求发送成功没能不能收到消息F12看一下
            //2.获取服务器返回的结果
            // console.log(res.data.data);
            //3.将返回的结果保存？？↑
            //数组方法concat
           // this.list=res.data.data; //将从服务器获取的结果赋值到商品列表list中
            //拼接多个页
            var rows=this.list.concat(res.data.data)
            //将拼接的多个页赋值给商品列表list
            this.list=rows;
           });
        },
        addCart(e){
            var lid=e.target.dataset.lid;
            var price=e.target.dataset.price;
            var lname=e.target.dataset.lname;
            this.axios.get("addCart",{params:{lid,price,lname}}).then(res=>{
                console.log(res); //params保存参数对象 .then异步结束后
                if(res.data.code==-1){
                    this.$toast("请登录")
                    /*vue中从一个组件跳转到另一个组件*/
                    this.$router.push("/Login");
                }
            });
        }
    },
    created(){
        this.loadMore();
//console.log("1:created组件创建成功")//测试组件是否创建成功
    },
}
</script>

<!-- 5.设计标签添加样式 -->
<style scoped>
    /*1.最外层的样式*/
    .product-app{
        display:flex;
        flex-wrap:wrap;/*指定子元素换行*/
        justify-content: space-between;/*子元素两端对齐*/
        padding:4px;
    }
    /*2.商品的样式*/
    .goods-item{
        width:49%;
        border:1px solid #ccc;
        border-radius: 5px;
        margin:2px 0;
        padding:2px;
        box-sizing: border-box;/*重新计算宽度*/
        display:flex;
        flex-direction: column;/*子元素的排列方式*/
        min-height:247px;
    }
    /*3.修饰商品中图片的样式*/
    .goods-item img{
        width:100%;
    }
 
</style>


