<template>
  <div class="like">
    <div class="py-container">
      <div class="title">
        <h3 class="fl">DO YOU LIKE</h3>
        <a href="javascript:;" class="fr tip changeBnt" @click.prevent="setNew"
          >换一换</a
        >
      </div>
      <div class="bd">
        <ul v-for="(like, index) in likeList" :key="index" class="favourate">
          <li v-for="(item, index) in like" :key="index">
            <img @click="goDetails(item)" :src="item.path" alt="" />
            <div @click="goDetails(item)" class="like-text">
              <p>{{ item.produce }}</p>
              <h3>{{ item.price }}￥</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Like",
  computed: {
    ...mapState("home", ["likeList"]),
  },
  methods: {
    goDetails(goodDetail) {
      this.$router.push({
        name: "details",
        query: goodDetail,
        params: goodDetail.moreImage,
      });
    },
    setNew() {
      this.$store.dispatch("home/getNewLikeList");
    },
  },
  mounted() {
    this.$store.dispatch("home/getLikeList");
  },
};
</script>

<style scoped>
.like {
  margin-top: 15px;
  font-family: YOUYUAN;
  box-shadow: 0 0 5px slategrey;
}
.like .py-container {
  width: 1200px;
  min-height: 850px;
  margin: 0 auto;
}
.like .py-container .title {
  overflow: hidden;
}
.like .py-container .title .fl {
  float: left;
  font-size: 20px;
  line-height: 30px;
  margin-left: 25px;
}
.like .py-container .title .fr {
  float: right;
  width: 66px;
  height: 25px;
  background-position: 182px -104px;
  line-height: 30px;
  font-size: 12px;
  font-weight: 400;
  color: #666;
  text-decoration: none;
}
.like .py-container .bd .favourate {
  border: 1px solid #e4e4e4;
  overflow: hidden;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
}
.like .py-container .bd .favourate li {
  height: 250px;
  margin: 0 -1px;
  overflow: hidden;
  background: #fff;
  position: relative;
  width: 16.667%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  box-shadow: 0 0 5px silver;
  margin: 10px;
  transition: all 400ms;
  border-radius: 10px;
}
.like .py-container .bd .favourate li img {
  width: 160px;
  height: 142px;
  transition: all 400ms;
  border-radius: 5px;
  box-shadow: 0 0 5px silver;
}
.like .py-container .bd .favourate li:hover {
  opacity: 0.8;
  transform: scale(1.1);
}
.like .py-container .bd .favourate li .like-text {
  padding: 0 5px 0 5px;
  width: 160px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
  overflow: hidden;
}
.like .py-container .bd .favourate li .like-text p {
  overflow: hidden;
  font-size: 15px;
}
.like .py-container .bd .favourate li .like-text h3 {
  color: rgb(250, 104, 25);
  position: relative;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  font-family: YOUYUAN;
}
</style>