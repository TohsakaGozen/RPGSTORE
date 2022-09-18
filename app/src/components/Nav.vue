<template>
  <div class="navAllBox">
    <div class="navBox">
      <div class="type">
        <a href="#" ref="type1" @click.prevent="Show(1)" :class="active[0]"
          ><h3>漫画</h3></a
        >
        <a href="#" ref="type2" @click.prevent="Show(2)" :class="active[1]"
          ><h3>服装</h3></a
        >
        <a href="#" ref="type3" @click.prevent="Show(3)" :class="active[2]"
          ><h3>周边</h3></a
        >
        <a href="#" ref="type4" @click.prevent="Show(4)" :class="active[3]"
          ><h3>展览</h3></a
        >
        <a href="#" ref="type5" @click.prevent="Show(5)" :class="active[4]"
          ><h3>卡带</h3></a
        >
      </div>
      <hr />
      <div class="list" @click.prevent="goSearch" v-show="isShow == 1">
        <table>
          <tr>
            <th>地区</th>
            <div class="item">
              <td v-for="(a, index) in list1.area" :key="index">
                <a href="#" :data-listData="a" :data-listId="isShow">{{ a }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>分类</th>
            <div class="item">
              <td v-for="(c, index) in list1.content" :key="index">
                <a href="#" :data-listData="c" :data-listId="isShow">{{ c }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>年份</th>
            <div class="item">
              <td v-for="(y, index) in list1.year" :key="index">
                <a href="#" :data-listData="y" :data-listId="isShow">{{ y }}</a>
              </td>
            </div>
          </tr>
        </table>
      </div>
      <div class="list" @click.prevent="goSearch" v-show="isShow == 2">
        <table>
          <tr>
            <th>剧情</th>
            <div class="item">
              <td v-for="(c, index) in list2.content" :key="index">
                <a href="" :data-listData="c" :data-listId="isShow">{{ c }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>店铺</th>
            <div class="item">
              <td v-for="(p, index) in list2.shop" :key="index">
                <a href="" :data-listData="p" :data-listId="isShow">{{ p }}</a>
              </td>
            </div>
          </tr>
        </table>
      </div>
      <div class="list" @click.prevent="goSearch" v-show="isShow == 3">
        <table>
          <tr>
            <th>地区</th>
            <div class="item">
              <td v-for="(a, index) in list3.area" :key="index">
                <a href="" :data-listData="a" :data-listId="isShow">{{ a }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>分类</th>
            <div class="item">
              <td v-for="(c, index) in list3.content" :key="index">
                <a href="" :data-listData="c" :data-listId="isShow">{{ c }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>年份</th>
            <div class="item">
              <td v-for="(y, index) in list3.year" :key="index">
                <a href="" :data-listData="y" :data-listId="isShow">{{ y }}</a>
              </td>
            </div>
          </tr>
        </table>
      </div>
      <div class="list" @click.prevent="goSearch" v-show="isShow == 4">
        <table>
          <tr>
            <th>地区</th>
            <div class="item">
              <td v-for="(a, index) in list4.area" :key="index">
                <a href="" :data-listData="a" :data-listId="isShow">{{ a }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>分类</th>
            <div class="item">
              <td v-for="(c, index) in list4.content" :key="index">
                <a href="" :data-listData="c" :data-listId="isShow">{{ c }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>年份</th>
            <div class="item">
              <td v-for="(m, index) in list4.month" :key="index">
                <a href="" :data-listData="m" :data-listId="isShow">{{ m }}</a>
              </td>
            </div>
          </tr>
        </table>
      </div>
      <div class="list" @click.prevent="goSearch" v-show="isShow == 5">
        <table>
          <tr>
            <th>地区</th>
            <div class="item">
              <td v-for="(a, index) in list5.area" :key="index">
                <a href="" :data-listData="a" :data-listId="isShow">{{ a }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>分类</th>
            <div class="item">
              <td v-for="(c, index) in list5.content" :key="index">
                <a href="" :data-listData="c" :data-listId="isShow">{{ c }}</a>
              </td>
            </div>
          </tr>
          <tr>
            <th>年份</th>
            <div class="item">
              <td v-for="(y, index) in list5.year" :key="index">
                <a href="" :data-listData="y" :data-listId="isShow">{{ y }}</a>
              </td>
            </div>
          </tr>
        </table>
      </div>
    </div>
    <MIniDirection :Osize="Osize" :Isize="Isize" />
    <div class="userBox">
      <div class="userImage">
        <img src="../../public/images/today03.jpg" alt="" />
        <h4>{{ userInfo.name }}</h4>
      </div>
      <button v-if="!userInfo.name" @click="goLogin">点击登录</button>
      <button v-if="!userInfo.name" @click="goRegister">快速注册</button>
      <button v-if="userInfo.name">个人详情</button>
      <button v-if="userInfo.name" @click="goShopCar">我的购物车</button>
      <button v-if="userInfo.name" @click="goOrderCenter">我的订单</button>
      <button v-if="userInfo.name" @click="goStar">我的收藏</button>
      <button v-if="userInfo.name" @click="exitLogin">退出登录</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MIniDirection from "./MiniDirection.vue";
export default {
  name: "Nav",
  data() {
    return {
      isShow: 1,
      active: ["active", "", "", "", ""],
      Osize: "width: 680px; height: 380px; margin-top: 50px",
      Isize: "380px",
    };
  },
  computed: {
    ...mapState("home", ["list1", "list2", "list3", "list4", "list5"]),
    ...mapState("user", ["token", "userInfo"]),
  },
  components: {
    MIniDirection,
  },

  methods: {
    goOrderCenter() {
      this.$router.push({
        name: "orderCenter",
      });
    },
    goLogin() {
      this.$router.push({
        name: "login",
      });
    },
    exitLogin() {
      this.$store.dispatch("user/exitLogin");
      this.$router.push({
        name: "home",
      });
    },
    goRegister() {
      this.$router.push({
        name: "register",
      });
    },
    goShopCar() {
      this.$router.push({
        name: "shopCar",
      });
    },
    Show(i) {
      this.isShow = i;
      if (i == 1) {
        for (let j = 0; j < 5; j++) {
          this.active[j] = "";
        }
        this.active[0] = "active";
      } else if (i == 2) {
        for (let j = 0; j < 5; j++) {
          this.active[j] = "";
        }
        this.active[1] = "active";
      } else if (i == 3) {
        for (let j = 0; j < 5; j++) {
          this.active[j] = "";
        }
        this.active[2] = "active";
      } else if (i == 4) {
        for (let j = 0; j < 5; j++) {
          this.active[j] = "";
        }
        this.active[3] = "active";
      } else if (i == 5) {
        for (let j = 0; j < 5; j++) {
          this.active[j] = "";
        }
        this.active[4] = "active";
      }
    },
    goSearch(event) {
      let node = event.target;
      let { listdata, listid } = node.dataset;
      let paramss = this.$route.params;
      if (listdata) {
        if (this.$route.params) {
          this.$router.push({
            name: "search",
            params: paramss,
            query: { data: listdata, id: listid },
          });
        }
      }
    },
    goStar() {
      this.$router.push({
        name: "star",
        query: this.$route.query,
        params: this.$route.params,
      });
    },
  },
};
</script>


<style scoped>
.navAllBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: -15px;
  margin-bottom: 10px;
}
.userBox {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  width: 200px;
  margin-top: 30px;
  height: 400px;
  box-shadow: 0 0 5px rgb(143, 141, 141);
  border-radius: 10px;
}
.userImage {
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userImage img {
  border-radius: 100%;
  width: 100%;
  height: 100%;
}
.userBox button {
  width: 150px;
  height: 35px;
  display: flex;
  border: 0;
  box-shadow: 0 0 5px rgb(116, 85, 90);
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
  font-family: YOUYUAN;
  font-size: 15px;
  border-radius: 5px;
  background-color: rgb(255, 243, 245);
  transition: all 0.3s;
  cursor: pointer;
}
.userBox button:hover {
  background-color: rgb(179, 245, 223);
  width: 105%;
}
.active {
  background-color: rgba(247, 216, 222, 0.5);
}
.navBox {
  margin-top: 30px;
  width: 320px;
  height: 400px;
  box-shadow: 0 0 5px rgb(143, 141, 141);
  border-radius: 10px;
  background-color: rgba(253, 253, 253, 0.2);
}
.type {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.type a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 80%;
  border-radius: 5px;
  box-shadow: 0 0 5px silver;
  color: black;
  font-size: 12px;
  font-family: YOUYUAN;
}
.list {
  width: 100%;
  min-height: 90%;
  font-size: 15px;
  padding: 5px;
  font-family: YOUYUAN;
  font-weight: 1000;
  display: block;
}
.item {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

table {
  width: 100%;
  min-height: 100%;
  flex-direction: column;
}
tr {
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  align-items: flex-start;
}
th {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  min-height: 36px;
}
td {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 65px;
  height: 100%;
  margin-left: 8px;
  box-shadow: 0 0 2px rgb(143, 141, 141);
  border-radius: 6px;
  padding: 3px 3px 3px 3px;
  margin-bottom: 5px;
  cursor: pointer;
}
td:hover {
  background-color: rgba(247, 216, 222, 0.5);
}
a:hover {
  background-color: rgba(247, 216, 222, 0.5);
}
a {
  text-decoration: none;
  color: black;
}
</style>