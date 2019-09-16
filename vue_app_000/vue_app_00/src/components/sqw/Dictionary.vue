<template>
  <div>
    <div class="lunbo_top">
      <Carous></Carous>
    </div>
    <div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">分类</mt-tab-item>
        <mt-tab-item id="2">口味</mt-tab-item>
        <mt-tab-item id="3">销量</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <router-link to="/Cheese"><p>天然奶油蛋糕</p></router-link>
          <router-link to="/Files"><p>法式蛋糕</p></router-link>
          <router-link to="/French"><p>乳酪蛋糕</p></router-link>
          <router-link to="/Mousse"><p>慕斯蛋糕</p></router-link>
          <router-link to="/Chocolate"><p>巧克力蛋糕</p></router-link>
          <router-link to="/Bigcake"><p>大型庆典蛋糕</p></router-link>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
           <router-link to="/Cheese"><p>天然奶油口味</p></router-link>
            <router-link to="/French"><p>乳酪口味</p></router-link>
             <router-link to="/Mousse"><p>水果蛋糕</p></router-link>
              <router-link to="/Chocolate"><p>巧克力风味</p></router-link>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">

        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="dictionary_parent" v-for="(item,i) of list" :key="i">
      <img :src="`http://127.0.0.1:3000/${item.pic_url}`" />
      <div class="dic">
        <div class="dictionary_title">{{item.dname}}</div>
        <span>{{item.detail}}</span>
        <div class="dictionary_price">￥{{item.price}}</div>
      </div>
    </div>
  </div>
</template>
   
<script>
 import Carous from './Carous.vue'
export default {
   components: {Carous},
  data() {
    return {
        selected:1,
      list: []
    };
  },
  methods: {
    dicti() {
      var url = "dictionary";
      // console.log(url)
      this.axios.get(url).then(res => {
        console.log(res);
        this.list = res.data;
      });
    }
  },
  created() {
    this.dicti();
  }
};
</script>

<style scoped>

.lunbo_top{
 margin-top:60px;
}

.dictionary_parent {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 2px 0;
  padding: 2px;
  box-sizing: border-box; /*重新计算宽度*/
  display: flex;
  align-items: center;
}
.dic {
  padding: 0 10px;
}
.dictionary_parent > img {
  width: 100px;
  height: 100px;
}
.dictionary_title {
  font-size: 14px;
  padding: 10px 0;
}
.dic > span {
  font-size: 12px;
  color: #6e6e6e;
}
.dictionary_price {
  font-size: 14px;
  color: #e3044e;
  margin: 10px 0;
}
</style>


