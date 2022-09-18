<template>
  <div class="dir" :style="Osize">
    <h3>精品推荐</h3>
    <el-carousel :interval="4000" :height="Isize">
      <el-carousel-item v-for="(item, index) in urls" :key="index">
        <img v-bind:src="item.url" style="width: 100%; height: 100%" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "MIniDirection",
  data() {
    return {
      urls: [
        { url: "https://api.ixiaowai.cn/api/api.php" },
        { url: "http://www.dmoe.cc/random.php" },
        { url: "https://api.yimian.xyz/img" },
        { url: "http://imgapi.xl0408.top/index.php" },
        { url: "https://api.ghser.com/random/api.php" },
      ],
    };
  },
  props: ["Osize", "Isize"],
};
</script>

<style scoped>
.dir {
  box-shadow: 0 0 5px rgb(126, 126, 126);
  margin-bottom: 30px;
}
.dir h3 {
  position: absolute;
  z-index: 6;
  font-family: YOUYUAN;
  font-style: oblique;
  font-size: 15px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item img {
  cursor: pointer;
  transition: all 0.5s;
}
.el-carousel__item img:hover {
  transform: scale(1.05);
  opacity: 0.8;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>