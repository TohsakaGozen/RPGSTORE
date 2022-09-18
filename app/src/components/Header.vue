<template>
  <div class="box">
    <div class="top">
      <div class="left">
        <router-link :to="{ path: '/home' }">首页 </router-link> |
        <div v-if="userInfo.name" class="isLogin">
          <a>欢迎光临 {{ userInfo.name }} Master!</a>
          | <a @click="exitLogin">退出登录 </a>
        </div>
        <div v-if="!userInfo.name" class="noneLogin">
          <router-link :to="{ path: '/login' }">登录 </router-link> |
          <router-link :to="{ path: '/register' }"> 注册</router-link>
        </div>
      </div>
      <div class="middle"><h3>RPGSTORE</h3></div>
      <div class="right">
        <router-link to="/orderCenter"> 订单中心</router-link>|
        <router-link to="/shopCar"> 购物车</router-link>|
        <router-link to="/star"> 我的收藏</router-link>
        | <a href=""> 联系客服 </a>|
        <a href=""> 个人详情</a>
      </div>
    </div>
    <div class="logo">
      <router-link class="ima" :to="{ path: '/home' }">
        <h1 style="font-size: 50px">RPGSTORE</h1>
      </router-link>
      <div class="input">
        <input
          @keyup.enter="goSearch"
          v-model="keyWords"
          type="text"
          placeholder="搜索喵"
        /><button @click="goSearch">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyWords: "",
    };
  },
  methods: {
    exitLogin() {
      this.$store.dispatch("user/exitLogin");
      this.$router.push({
        name: "home",
      });
    },
    goSearch() {
      let querys = this.$route.query;
      console.log(querys);
      if (this.$route.query) {
        this.$router.push(
          {
            name: "search",
            query: querys,
            params: { keyword: this.keyWords },
          },
          () => {},
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.$router.push(
          {
            name: "search",
            params: { keyword: this.keyWords },
          },
          () => {},
          (error) => {
            console.log(error);
          }
        );
      }
      this.keyWords = "";
    },
  },
  computed: {
    ...mapState("user", ["token", "userInfo"]),
  },
};
</script>

<style scoped>
.isLogin {
  display: flex;
  flex-wrap: nowrap;
}
.isLogin a:nth-child(1) {
  cursor: default;
}
.isLogin a:nth-child(2) {
  font-size: 15px;
  cursor: pointer;
}
.box {
  width: 100%;
  height: 100%;
  font-family: YouYuan;
}
.logo {
  margin-top: 10px;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.ima {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 40px;
}
img {
  width: 150px;
  height: 70%;
}
.input {
  display: flex;
  width: 40%;
  height: 35px;
  padding-top: 20px;
  border-radius: 5px;
}
input {
  width: 90%;
  height: 35px;
  border-radius: 5px;
  box-shadow: 0 0px 8px rgb(112, 97, 100);
  border: 0;
}
input:focus {
  border: 1px;
}
button {
  margin-left: 10px;
  width: 10%;
  border-radius: 5px;
  border: 0;
  height: 35px;
  font-family: STHupo;
  font-size: 19px;
  color: slategray;
  background-color: rgb(246, 225, 228);
  box-shadow: 0 5px 18px rgb(124, 122, 122, 0.6);
  transition: all 0.3s;
  cursor: pointer;
}

.top {
  width: 100%;
  height: 50px;
  background-color: rgb(255, 246, 248);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  box-shadow: 0 5px 25px rgb(124, 122, 122, 0.6);
  position: fixed;
  top: 0;
  z-index: 999;
}
.left {
  min-width: 20%;
  display: flex;
  justify-content: flex-start;
  margin-left: 35px;
}
.middle {
  font-size: 30px;
}
.right {
  width: 30%;
}
button:hover {
  background-color: rgb(205, 255, 238);
  width: 80px;
}
a {
  color: black;
  text-decoration-line: none;
}
a:hover {
  color: aquamarine;
}
</style>