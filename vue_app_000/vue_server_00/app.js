//vue_server_00/app.js node程序
//1.加载第三方模块
    //web服务器模块
const express=require("express");
    //mysql驱动模块
const mysql=require("mysql");
    //跨域配置
const cors=require("cors");
    //session模块
const session=require("express-session");
//2.配置数据库连接池
var pool=mysql.createPool({ 
    host:"127.0.0.1",  //数据库的地址
    user:"root",    //数据库的用户名
    password:"",    //数据库密码
    post:3306,        //数据库端口
    database:"xz",     //数据库名称
    connectionLimit:15    //连接数量
});
//3.配置跨域模块
var server =express();
server.use(cors({
    //允许跨域访问程序的地址列表
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true
}));
//4.配置session模块
 server.use(session({
    secret:"128位字符串",//安全字符串
    resave:true,            //请求时要更新数据
    saveUninitialized:true,
 }));
 //4.1配置项目的静态目录
 server.use(express.static("public"));
 //http://127.0.0.1:3000/01.jpg //测试图片有没有写进数据库
//5.启动监听
server.listen(3000);



//功能1：完成用户的登录操作
server.get("/login",(req,res)=>{
    //.1获取网页传递的两个数据 uname upwd
    //参数方式一：?uname=tom&upwd="123"查询字符串
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    //2.sql:查询sq语句
    //数据库：库名  表名 列名  都是小写
    var sql="SELECT id FROM xz_login WHERE uname=? AND upwd=md5(?)";
    //3.json:{code:1,msg:"登陆成功"}
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err
        if(result.length==0){
            res.send({code:-1,msg:"用户名或密码有误"})
            //登陆成功
        }else{
            //1.将登陆成功的姘居保存到session
            //result=[{id:1}] result是一个数组 找id的就是找result的下标为0的id
            req.session.uid=result[0].id; 
            //console.log(req.session);//测试
            //2.将成功数据发送脚手架
            res.send({code:1,msg:"登录成功"})
        }
    })
});

//功能二 查询商品的列表
//1.接受请求的方式 get 请求的的地址 producat
server.get("/product",(req,res)=>{
    //2.接受客户端的参数 pono（页码） pageSize（页大小）
    var p=req.query.pno; //页码
    var ps=req.query.pageSize;//页大小
//3.设置参数的默认值 pno:1 pageSize:4
if(!p){p=1}
if(!ps){ps=4}
//4.创建变量offset 计算数据库偏移量
var offset=(p-1)*ps;
//5.对pageSize转换成整型
ps=parseInt(ps);
//6.创建一个sql语句
var sql="SELECT lid,price,lname,img_url FROM xz_laptop LIMIT ?,?";
//7.通过连接池发送sql语句
pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    //8.获取数据库返回的查询结果 数组[]
//9.将查询结果发送给客户端
    res.send({code:1,msg:"查询成功",data:result})
});
})
//http://127.0.0.1:3000/product?pno=2

//添加购物车
//http://127.0.0.1:3000/addcart?lid=1&price=49&lname=phone
//登录成功
//http://127.0.0.1:3000/Login?uname=tom&upwd=123


//#功能三：制定指定商品加入购车
//#1：GET /addcart
server.get("/addcart",(req,res)=>{
//#2:参数
//获取当前用户登录的id值
var uid=req.session.uid;
//判断
if(!uid){//如果没有登录就重新登录
    res.send({code:-1,msg:"请登录"})
    return;
}
//获取商品的编号
var lid=req.query.lid;
//获得商品的价格
var price=req.query.price;
//获取商品的名称
var lname=req.query.lname;
//#3：查询指定用户是否购买过此商品
var sql1="SELECT id FROM xz_cart WHERE uid=? AND lid=?";
pool.query(sql1,[uid,lid],(err,result)=>{
    if(err)throw err;
//#4：没有购买过此商品就添加
    var sql="";
   if(result.length==0){
       //添加
       sql=`INSERT INTO xz_cart VALUES(null,${lid},${uid},1,'${lname}',${price},'01.jpg')`;
   }else{
        //更新
        sql=`UPDATE xz_cart SET count=count+1 WHERE uid=${uid} AND lid=${lid}`;
   }

    //#5:购买过更新
    pool.query(sql,(err,result)=>{
        if(err)throw err;
       // console.log(result)
        res.send({code:1,msg:"添加成功"})
    })
})

});

//http://127.0.0.1:3000/cart
//登录成功
//http://127.0.0.1:3000/Login?uname=tom&upwd=123


//功能四：查询当前用户的购物车信息
//此功能线性条件先登录
//1.请求方式GET 请求地址 、cart
server.get("/cart",(req,res)=>{
//2.获取uid 并且判断如果没有请求登录
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
//3.创建sql查询用户购物车内容
var sql="SELECT id,lid,lname,price,count,img_url FROM xz_cart WHERE uid=?";
//4.获取并返回结果并且发送客户端
pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result});
})
});
//功能五：删除
server.get("/delete",(req,res)=>{
    //获取参数 id
    var id=req.query.id;
    var sql="DELETE FROM xz_cart WHERE id=?";
    pool.query(sql,[id],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"})
        }else{
            res.send({code:-1,msg:"删除失败"})
        }
    })
});

//查询 http://127.0.0.1:3000/del
//功能六： 删除购物车中的多个商品
server.get("/del",(req,res)=>{
    var ids=req.query.ids;
    // sql 删除购物车中的多个id
    var sql=`DELETE FROM xz_cart WHERE id IN(${ids})`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        //如果影响的行数大于0，表示执行成功否则失败
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"})
        }else{
            res.send({code:-1,msg:"删除失败"})
        }
    })
})