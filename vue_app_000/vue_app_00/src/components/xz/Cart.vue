<template>
    <div class="cart">
        <!-- 购物车组件 -->
        <!-- 1.顶部按钮：全选 -->
        <div class="selectAll" style="margin-bottom:10px;" >
            <label><input type="checkbox" @change="selectAll">全选</label>
        
        </div>
        <!-- 2.购物车商品信息 -->
        <div class="cart-item" v-for="(item,i) of list" :key="i">
            <!-- 左侧 -->
            <div class="leftImgText">
                <input type="checkbox" v-model="item.cb" @change="text">
                <img  :src="'http://127.0.0.1:3000/'+item.img_url"/>
                <div class="lname">{{item.lname}}</div>
                <button style="margin-left:10px;">-</button>
                <span>{{item.count}}</span>
                <button>+</button>
                <div class="price">￥{{item.price.toFixed(2)}}</div>
               
            </div>
            <!-- 右侧删除 -->
            <mt-button :data-id="item.id" @click="delItem">删除</mt-button>
        </div>
        <!-- 3.按钮 删除选中商品 -->
        <div>
            <mt-button @click="delMitem">删除选中商品</mt-button>
            小计：<span></span>
        </div>

         <a style="position:fixed;bottom:5px;right:70px;color:red;" href="javascript:document.documentElement.scrollTop=0;"><img style="width:20px;height:20px;" src="../../../src/img/top.png" alt=""></a>
        <!-- 4.合计 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[]//购物车的列表
        }
    },
    methods:{
        //全选按钮的处理函数
        selectAll(e){ //事件处理对象 当需要获取点击 但是没有绑定 v-model 需要用e
            
            //1.获取全选按钮状态
            var cb=e.target.checked;
            //console.log(cb) //测试全选按钮是选中是否为true
            //2.创建循环便利购物车数组
            for(var item of this.list){
//item.cb是商品的状态    cb是是全选按钮的状态
                item.cb=cb;
            }
            //3.将全选状态赋值购物车商品选中状态
        },

        /*删除购物车中的指定商品(单个商品)*/
        delItem(e){ //事件对象
       
         //获取购物车的指定商品
         var id=e.target.dataset.id;
         //交互提示用户是否删除指定商品
          //同意
           //发送ajxa请求服务器端程序 ？id=id
          this.$messagebox.confirm("消息","是否删除此商品").then(res=>{
                     //               用户点击确定 .then         ↓
             this.axios.get("delete",{params:{id}}).then(result=>{
                 if(result.data.code>0){            
                     this.$toast("删除成功")
                     //返回服务器返回内容
                      //重新调用loadMore()最新购物列表   
                     this.loadMore();
                 }else{
                     this.$toast("删除失败")
                 }
             })
          }).catch(err=>{//用户点击取消的是catch

          })
        },
        //删除购物车中的多个商品
        delMitem(){
            //1.创建一个变量来白村多个商品的id
            var str=""; 
            //2.创建一个循环遍历数组，获取状态为true的id值
            for(var item of this.list){
                if(item.cb){//true 当前的商品被选中
                    str+=item.id+",";   
                }
            }
            //2.1 判断用户是否选中了商品
                if(str.length==0){
                     //2.2如果没有选中商品，显示确认消息
                    this.$messagebox("请选择要输入的商品")
                    return;//停止执行
                }
           
             //console.log(str);//测试能不能找到选定的id
            //3.截取字符串中的最后一个小逗号
                     // 起始的下标  保留几个字符
                     //       ↓     ↓
            str=str.substring(0,str.length-1);
            //console.log(str)测试有没有截取成功
            //4.显示交互是的提示框，再次请用户确定操作
            this.$messagebox.confirm("是否删除商品").then(res=>{
                //用户选择确认按钮 发送完返回值
                var ids={ids:str};
                this.axios.get("del",{params:ids}).then(res=>{
                    this.loadMore();
                    this.$toast("删除成功")
                })
            }).catch(err=>{

            })
            //5.发送一个ajax请求删除多个数据
            //6.提示用户删除成功
            //7.重新加载购物车的数据
        },
        //加载购物车中的数据
         loadMore(){
            //1.发送请求 cart
            var url="cart";
             this.axios.get(url).then(res=>{
                //2.获取返回的结果
                if(res.data.code==-1){
                   this.$messagebox("消息","请登录")
                     //3.如果用户没有执行登录操作
                       //用交互提示登录 /跳转登录组件
                    this.$router.push("/Login") 
                    return;
                }else{
                //4.获取数据成功
                var list=res.data.data;
                //4.1创建循环遍历数组并且为每个元素添加cb属性表示，商品前复选框状态
                //注意先天加cb实行在赋值list 顺序
                for(var item of list){
                    item.cb=false;
                }
                //console.log(list);
                //将list赋值给data中的list
                this.list=list;
                }
             });
         }
    },
      //当组件创建成功后调用
    created() {
        this.loadMore();
    },
}
</script>

<style scoped>
    .cart-item{
        display:flex;
        align-items: center;
        justify-content: space-between;
        border-bottom:1px solid #ccc;
    }
    /*左侧的图片与文字*/
    .leftImgText{
        display:flex;
        align-items: center;
    }
    /*单独修改图片的宽度和高度*/
    .leftImgText img{
        width:40px;height:40px;
        border-radius: 10%;
    }
    .lname{
        width:50px;
        font-size:12px;
        margin-left:20px;
    }
    .price{
        font-size:12px;
        margin-left:20px;
        color:red;
    }
    /*商品的价格*/
</style>

