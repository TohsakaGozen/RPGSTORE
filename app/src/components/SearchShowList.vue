<template>
  <div class="rank">
    <div class="tab"></div>
    <div class="content">
      <ul>
        <li>
          <div
            class="img-item"
            v-for="(show, index) in showList.pageList"
            :key="index"
          >
            <p @click.prevent="goDetails(show)" class="tab-pic">
              <a href="#">
                <img v-lazy="show.path" />
              </a>
            </p>
            <p class="info-price">定金:{{ show.price }}￥</p>
            <div class="tab-info">
              <div @click.prevent="goDetails(show)" class="info-title">
                <a href="#">{{ show.produce }}</a>
              </div>
              <div class="react">
                <a @click="star(show)" v-if="show.isStar"
                  ><button>
                    <img src="../assets/star (1).png" alt="" :data-like="0" />
                    收藏
                  </button></a
                >
                <a @click="star(show)" v-if="!show.isStar"
                  ><button>
                    <img src="../assets/star.png" alt="" :data-like="0" />
                    收藏
                  </button></a
                >
                <a
                  ><button id="shopCar" @click="addShopCar(show)">
                    加入购物车
                  </button></a
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange($event)"
        layout="prev, pager, next"
        :total="40"
        :current-page="searchData.currentPage"
        :page-size="searchData.pageSize"
        :pager-count="searchData.pagerCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SearchShowList",
  data() {
    return {
      searchData: {},
    };
  },
  computed: {
    ...mapState("search", ["showList"]),
  },
  methods: {
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
    async addShopCar(show) {
      try {
        await this.$store.dispatch("shopCar/addShopCar", {
          goodDetail: show,
          buyNumber: this.buyNumber || 1,
          moreImage: show.moreImage,
        });
        this.addSuccess();
      } catch (error) {
        this.addFailue();
      }
    },
    goDetails(goodDetail) {
      this.$router.push({
        name: "details",
        query: goodDetail,
        params: goodDetail.moreImage,
      });
    },
    handleCurrentChange(event) {
      setTimeout(() => {
        this.$store.commit("search/SETNEW");
      }, 150);

      this.searchData.currentPage = event;
      this.$store.dispatch("search/ShowList", [
        this.searchData,
        JSON.parse(sessionStorage.getItem("showList")),
      ]);
    },
    setNew() {
      this.$store.dispatch("search/getNewShowList");
    },
    star(show) {
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
  mounted() {
    setTimeout(() => {
      this.$store.commit("search/SETNEW");
      console.log(5555);
    }, 200);

    this.$bus.$on("getPageAll", (data) => {
      console.log(data);
      this.searchData = data;
    });
  },
};
</script>

<style Scoped>
.el-pagination {
  text-align: center;
}
.rank {
  margin-top: 20px;
  min-height: 716px;
  width: 1300px;
  margin: 0 auto;
  font-family: YOUYUAN;
}
.rank .tab {
  margin: 0 auto;
  overflow: hidden;
  width: 312px;
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
  width: 282px;
  float: left;
  overflow: hidden;
  margin: 10px 19px;
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
.react a {
  text-decoration: none;
}
.react button {
  margin-right: 20px;
  border: 0;
  box-shadow: 0 0 5px rgb(149, 146, 147);
  width: 80px;
  height: 30px;
  background-color: rgb(250, 204, 211);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
#shopCar {
  display: flex;
  justify-content: center;
}
</style>