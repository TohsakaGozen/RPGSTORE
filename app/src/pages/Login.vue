<template>
  <div class="login">
    <div class="loginLeft">
      <img ref="image" src="../../public/images/like21.jpg" alt="" />
    </div>
    <div class="loginRight">
      <div class="loginTitle">
        <h4>登录</h4>
      </div>
      <div class="loginInput">
        <div class="user">
          <label for="">用户名:</label>
          <input @focus="changImage()" v-model="phone" type="text" />
        </div>
        <div class="password">
          <label for="">密码:</label>
          <input @focus="changImage()" v-model="password" type="password" />
        </div>
      </div>
      <div class="loginButton">
        <p @click="userLogin">立即登录</p>
      </div>
      <div class="loginOther">
        <p>忘记密码</p>
        <p @click="goRegister">免费注册</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    changImage() {
      console.log(this.$refs.image.style.width);
      this.$refs.image.style.width = "130%";
    },
    async userLogin() {
      try {
        const userData = { phone: this.phone, password: this.password };
        if (userData.phone != "" && userData.password != "") {
          await this.$store.dispatch("user/userLogin", userData);
          this.$router.push({
            name: "home",
          });
        } else {
          this.$message({
            showClose: true,
            message: "请填写账号密码",
            type: "warning",
          });
        }
      } catch (error) {
        this.$message({
          showClose: true,
          message: error,
          type: "warning",
        });
      }
    },
    goRegister() {
      this.$router.push({
        name: "register",
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 1180px;
  height: 630px;
  display: flex;
  box-shadow: 0 0 15px silver;
  background-color: rgba(255, 231, 235, 0.2);
}
.loginLeft {
  width: 450px;
  padding: 1px;
}
.loginLeft img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  transition: all 0.8s;
}

.loginRight {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.loginTitle {
  display: flex;
  justify-content: center;
  font-size: 45px;
  margin-left: 50px;
  color: rgb(255, 150, 169);
  font-family: YOUYUAN;
}
.loginInput {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
}
.loginInput div {
  display: flex;
  justify-content: center;
}
.loginInput div label {
  width: 70px;
  text-align: right;
  padding: 5px;
}
.loginInput div input {
  border-radius: 5px;
  padding-left: 10px;
  border: 0;
  width: 320px;
}
.loginButton {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  margin-left: 58px;
  cursor: pointer;
  transition: all 0.5s;
}
.loginButton:hover {
  transform: scale(1.1);
}
.loginButton p {
  font-family: YOUYUAN;
  font-size: 26px;
  height: 50px;
  width: 170px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 197, 207);
  border-radius: 5px;
}
.loginOther {
  margin-left: 65px;
  display: flex;
  justify-content: space-around;
  font-family: YOUYUAN;
  cursor: pointer;
}
.loginOther p {
  padding: 5px;
  border-radius: 5px;
}
.loginOther p:hover {
  background-color: rgb(255, 238, 241);
}
</style>