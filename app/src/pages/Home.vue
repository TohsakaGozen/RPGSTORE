<template>
  <div class="box">
    <Nav />
    <Today />
    <h1>
      -------------------------------------------------------------------------------------
    </h1>
    <Hot />
    <Like />
    <MIniDirection :Osize="Osize" :Isize="Isize" />
  </div>
</template>

<script>
import Today from "../components/Today.vue";
import Hot from "../components/Hot.vue";
import live2d from "../components/live2d.vue";
import Like from "../components/Like.vue";
import MIniDirection from "../components/MiniDirection";
export default {
  name: "Home",
  components: {
    Today,
    Hot,
    Like,
    live2d,
    MIniDirection,
  },
  data() {
    return {
      Osize: "width: 1000px; height: 400px; margin-top: 30px",
      Isize: "400px",
    };
    a;
  },
};
</script>

<style scoped>
.el-backtop {
  margin-right: 33px;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
h1 {
  width: 1200px;

  height: 0;
}
</style>