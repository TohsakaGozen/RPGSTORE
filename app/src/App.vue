<template>
  <div class="app">
    <div class="bg"></div>
    <Header v-show="!$route.meta.headerShow" />
    <RightSqure />
    <div class="allContent">
      <router-view></router-view>
    </div>
    <Footer v-show="$route.meta.FooterShow" />
    <live2d v-show="!$route.meta.live2dShow" />
    <sakana v-show="!$route.meta.live2dShow"> </sakana>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import live2d from "./components/live2d.vue";
import sakana from "./components/sakana.vue";

export default {
  name: "App",
  components: {
    Header,
    live2d,
    sakana,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.bg {
  background-image: url("../public/images/backGround.jpg");
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -999;
  opacity: 0.3;
}
body {
  width: 100%;
  min-height: 100vh;
}
.app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.allContent {
  width: 1330px;
  border-radius: 10px;
  box-shadow: 0 0 10px silver;
  background-color: rgb(251, 249, 249, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>