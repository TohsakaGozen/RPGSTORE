<template>
  <div class="rank">
    <div v-if="starList != ''" class="content">
      <div class="tab"><h1>MYSTAR</h1></div>
      <ul>
        <li>
          <div class="img-item" v-for="(star, index) in starList" :key="index">
            <p class="tab-pic">
              <a @click.prevent="goDetails(star)" href="#">
                <img :src="star.path" />
              </a>
            </p>
            <p class="info-price">定金:{{ star.price }}￥</p>
            <div class="tab-info">
              <div class="info-title">
                <a @click.prevent="goDetails(star)" href="#">{{
                  star.produce
                }}</a>
              </div>
              <div class="react">
                <a @click="Destar(star)" v-if="star.isStar"
                  ><button>
                    <img src="../assets/star (1).png" alt="" :data-like="0" />
                    消除
                  </button></a
                >
                <a
                  ><button id="shopCar" @click="addShopCar(star)">
                    加入购物车
                  </button></a
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="starList == ''" class="tab"><h1>MYSTAR</h1></div>
    <div v-if="starList == ''" class="blank">
      <img src="../assets/blank.png" alt="" />
      <h2>你没有收藏任何项捏</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Star",
  data() {
    return {};
  },
  computed: {
    ...mapState("search", ["starList"]),
  },
  methods: {
    goDetails(item) {
      this.$router.push({
        name: "details",
        query: item,
        params: item.moreImage,
      });
    },
    addSuccess() {
      console.log(222);
      this.$message({
        showClose: true,
        message: "成功添加到购物车",
        type: "success",
      });
    },
    addFailue() {
      this.$message({
        showClose: true,
        message: "已经在购物车中了哦",
        type: "warning",
      });
    },
    async addShopCar(star) {
      try {
        await this.$store.dispatch("shopCar/addShopCar", {
          goodDetail: star,
          buyNumber: this.buyNumber || 1,
          moreImage: star.moreImage,
        });
        this.addSuccess();
      } catch (error) {
        this.addFailue();
      }
    },
    Destar(show) {
      // let node = event.target;
      // let { like } = node.dataset;
      this.$store.commit("search/SETISSTAR", show);
      // this.$store.dispatch("search/ShowList", [
      //   this.searchData,
      //   JSON.parse(sessionStorage.getItem("showList")),
      // ]);
      this.$store.dispatch("search/getStarList", show);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.blank {
  height: 516px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.blank img {
  width: 250px;
  height: 250px;
}
.tab {
  box-shadow: 0 0 5px pink;
  background-color: pink;
  width: 1330px;
  margin-left: -10px;
  height: 35px;
  margin-top: -10px;
}
.tab h1 {
  font-family: YOUYUAN;
  text-align: center;
}
.el-pagination {
  text-align: center;
}
.rank {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  min-height: 516px;
  width: 1300px;
  margin: 0 auto;
  font-family: YOUYUAN;
}
.rank .tab .tab-tit {
  text-align: center;
}
.rank .tab .tab-tit a {
  display: block;
  padding: 0 18px;
  float: left;
  text-decoration: none;
  font-size: 16px;
  color: rgb(239, 179, 67);
}
.rank .tab .tab-tit a p {
  margin: 5px 0;
}
.rank .tab .tab-tit a .img i {
  width: 35px;
  height: 35px;
  display: block;
  margin-left: 10px;
}
.rank .tab .tab-tit a .text {
  line-height: 28px;
}
.rank .tab .tab-tit .on {
  color: #e60012;
}
.rank .tab .tab-tit .on .img i {
  background-position: -35px 0;
}
.rank .content {
  overflow: hidden;
  padding: 10px;
}
.rank .content ul li {
  list-style: none;
  line-height: 18px;
}
.rank .content ul li .img-item {
  transition: all 400ms;
  width: 281px;
  float: left;
  overflow: hidden;
  margin: 10px 17px;
  background: #fff;
  box-shadow: 0px 0 5px rgb(133, 140, 147, 0.6);
  border-radius: 10px;
}
.rank .content ul li .img-item:hover {
  opacity: 0.8;
  transform: scale(1);
}
.rank .content ul li .img-item .tab-pic {
  width: 200px;
  height: 200px;
  overflow: hidden;
  text-align: center;
  margin: 5px auto 18px;
}
.rank .content ul li .img-item .tab-pic a img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.rank .content ul li .img-item .tab-info {
  background: #fafafa;
}
.rank .content ul li .img-item .tab-info .info-title {
  height: 50px;
  line-height: 28px;
  overflow: hidden;
  margin: 0 auto;
  padding-left: 10px;
}
.rank .content ul li .img-item .tab-info .info-title a {
  color: #333;
  text-decoration: none;
}
.info-price {
  font-size: 20px;
  color: rgb(250, 104, 25);
  display: block;
  margin-left: 26px;
}
.react {
  width: 100%;
  text-align: right;
  margin: 8px;
  display: flex;
  justify-content: space-around;
}
.react button:hover {
  background-color: rgb(192, 238, 223);
}
button img {
  width: 30%;
  height: 80%;
  margin-left: 10px;
  margin-right: 6px;
}
.react {
  display: flex;
  flex-direction: row;
  justify-content: right;
}
.react a {
  text-decoration: none;
}
.react button {
  margin-right: 20px;
  border: 0;
  box-shadow: 0 0 5px rgb(149, 146, 147);
  min-width: 80px;
  height: 30px;
  background-color: rgb(250, 204, 211);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 45px;
}
#shopCar {
  display: flex;
  justify-content: center;
}
</style>