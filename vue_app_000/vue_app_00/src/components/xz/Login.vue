<template>
    <div class="app-login">
            <h1 class="h">登录</h1>
        <mt-field class="input-mt" label="用户名" type="text" placeholder="请输入用户名" v-model="uname"></mt-field>
        <mt-field  class="input-mt" label="密码"  type="password" placeholder="请输入密码" v-model="upwd"></mt-field>
        <mt-button type="danger"  size="large" @click="login">登录</mt-button>
        <div class="image">
        <div style="margin-top:20px;">
                <img style="width:25px;height:25px;" src="../../../src/img/wechat.png"><span>微信登录</span>
        </div>
        <div style="margin-top:20px;">
                <img style="width:25px;height:25px;" src="../../../src/img/sinablog.png" alt=""><span>微博登录</span>
       
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            uname:"",
            upwd:""
        }
    },
    methods:{
        login(){
            //完成用户登录的操作
            //3.创建一个正则表达式验证密码
            var reg=/^[0-9A-Za-z]{3,12}$/i;
            //4.要求用户名：3-12位字母数字
            if(!reg.test(this.uname)){
                  //如果验证失败，提示短消息
                this.$messagebox("用户名格式错误")
                return;
            }
            if(!reg.test(this.upwd)){
                  //密码验证失败，提示短消息
                this.$messagebox("密码格式错误")
                return;
            }
            //5.发送ajax请求 axios？
            var url="login";   
            this.axios.get(url,{params:{uname:this.uname,upwd:this.upwd}}).then(res=>{
                console.log(res);
                 //6.获取服务器返回的结果
            if(res.data.code==-1){
                this.$messagebox("登录失败")
                    //6.1登录失败 提示
                    //6.2登陆成功 跳转商品首页
            }else{
                this.$toast("登录成功")
                this.$router.push("/Product")//将Product这个路由推入路由器，路由自动跳转
            }
            })
           
                
        }
    }
}
</script>

<style scoped>
    .h{margin-left:150px;color:red;}
    .input-mt{
        color:red;
        }
        .image{
            display:flex;
            justify-content: space-between;
            padding:10px;
        }
        
</style>

