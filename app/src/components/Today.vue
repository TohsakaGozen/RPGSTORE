<template>
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="../../public/images/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li v-for="(image, index) in todayList" :key="index" class="banner">
          <img :src="image.path" @click="goDetails(image)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Today",
  methods: {
    goDetails(goodDetail) {
      this.$router.push({
        name: "details",
        query: goodDetail,
        params: goodDetail.moreImage,
      });
    },
  },
  computed: {
    ...mapState("home", ["todayList"]),
  },
  mounted() {
    this.$store.dispatch("home/getTodayList");
  },
};
</script>

<style scoped>
.today-recommend .py-container {
  width: 1220px;
}
.today-recommend .py-container .recommend {
  height: 165px;
  background-color: #eaeaea;
  margin: 10px 0;
  display: flex;
}
.today-recommend .py-container .recommend .clock {
  width: 16.67%;
  background-color: #5c5251;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.today-recommend .py-container .recommend .clock .time {
  padding: 30px 0;
}
.today-recommend .py-container .recommend .clock h3 {
  margin: 9px 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 30.06px;
  color: rgb(255, 226, 171);
}
.today-recommend .py-container .recommend .banner {
  list-style: none;
  width: 20.83%;
}
.today-recommend .py-container .recommend .banner img {
  width: 99%;
  height: 100%;
  transition: all 400ms;
  cursor: pointer;
}
.today-recommend .py-container .recommend .banner img:hover {
  opacity: 0.8;
  transform: scale(1.01);
}
</style>