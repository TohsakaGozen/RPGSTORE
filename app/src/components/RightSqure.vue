<template>
  <div class="rs">
    <div class="item">
      <router-link :to="{ path: '/home' }">
        <i class="el-icon-s-home"></i>返回首页</router-link
      >
    </div>
    <div class="item">
      <a href="#"> <i class="el-icon-phone-outline"></i>联系客服</a>
    </div>
    <div class="item">
      <a href="#"> <i class="el-icon-s-help"></i>使用帮助</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightSqure",
};
</script>

<style scoped>
.rs {
  z-index: 99;
  position: fixed;
  box-shadow: 0 0 6px slategrey;
  right: 0;
  top: 40%;
  width: 94px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(255, 224, 228);
  font-size: 15px;
  font-family: YOUYUAN;
  border-radius: 5px;
}
a {
  text-decoration: none;
  color: black;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33%;
}
.item:hover {
  background-color: rgb(179, 245, 223);
  border-radius: 5px;
}
</style>