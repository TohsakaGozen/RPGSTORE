<template>
  <div class="rank">
    <div class="tab">
      <div class="tab-tit clearfix">
        <a href="javascript:;" class="on">
          <p class="img">
            <i></i>
          </p>
          <p class="text">热卖上市</p>
        </a>
        <a href="javascript:;">
          <p class="img">
            <i></i>
          </p>
          <p class="text">特价上市</p>
        </a>
        <a href="javascript:;">
          <p class="img">
            <i></i>
          </p>
          <p class="text">新品上市</p>
        </a>
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="img-item" v-for="(hot, index1) in hotList" :key="index1">
            <p class="tab-pic">
              <a @click="goDetails(hot)">
                <img :src="hot.path" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a @click="goDetails(hot)">{{ hot.produce }}</a>
              </div>
              <p class="info-price">定金:{{ hot.price }}￥</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Hot",
  computed: {
    ...mapState("home", ["hotList"]),
  },
  methods: {
    goDetails(goodDetail) {
      this.$router.push({
        name: "details",
        query: goodDetail,
        params: goodDetail.moreImage,
      });
    },
  },
  mounted() {
    this.$store.dispatch("home/getHotList");
  },
};
</script>

<style scoped>
.rank {
  min-height: 400px;
  width: 1250px;
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
.rank .content ul li .img-item:hover {
  opacity: 0.8;
  transform: scale(1.01);
  box-shadow: 0 0 5px pink;
}
.rank .content ul li .img-item {
  transition: all 400ms;
  width: 277px;
  float: left;
  overflow: hidden;
  margin: 10px 15px;
  background: #fff;
  box-shadow: 0px 0 10px rgb(133, 140, 147, 0.6);
  border-radius: 10px;
}
.rank .content ul li .img-item .tab-pic {
  width: 230px;
  height: 210px;
  overflow: hidden;
  text-align: center;
  margin: 5px auto 18px;
}
.rank .content ul li .img-item .tab-pic a img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;
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
  cursor: pointer;
}
.rank .content ul li .img-item .tab-info .info-title a {
  color: #333;
  text-decoration: none;
}
.rank .content ul li .img-item .tab-info .info-price {
  font-size: 20px;
  color: rgb(250, 104, 25);
  height: 35px;
  padding-left: 10px;
  display: block;
  line-height: 24px;
  margin: 10px auto 0;
}
</style>