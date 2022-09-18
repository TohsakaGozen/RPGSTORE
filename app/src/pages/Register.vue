<template>
  <div class="register">
    <div class="registerTitle">
      <h3>RPGSTORE REGISTER</h3>
      <h6>
        已有账号？去
        <p @click="goLogin">登录</p>
      </h6>
    </div>
    <form class="registerForm" action="">
      <div class="formUserName">
        <label>用户名：</label>
        <input @input="check('userName')" v-model="userName" type="text" />
        <div class="warning">
          <p>{{ warning.userNameWarning }}</p>
        </div>
      </div>
      <div class="formPassword">
        <label>密码：</label>
        <input @input="check('password')" v-model="password" type="password" />
        <div class="warning">
          <p>{{ warning.passwordWarning }}</p>
        </div>
      </div>
      <div class="formPassword">
        <label>确认密码：</label>
        <input
          @input="check('repassword')"
          v-model="repassword"
          type="password"
        />
        <div class="warning">
          <p>{{ warning.repasswordWarning }}</p>
        </div>
      </div>
      <div class="formEmail">
        <label>邮箱：</label>
        <input @input="check('userEmail')" v-model="userEmail" type="text" />
        <div class="warning">
          <p>{{ warning.emailWarning }}</p>
        </div>
      </div>
      <div class="formPhone">
        <label>手机：</label>
        <input @input="check('phone')" v-model="phone" type="text" />
        <button @click="getTemporaryCode">获取验证码</button>
        <div class="warning">
          <p>{{ warning.phoneWarning }}</p>
        </div>
      </div>
      <div class="formCode">
        <label>验证码：</label>
        <input @input="check('code')" v-model="code" type="text" />
        <div class="warning">
          <p>{{ warning.codeWarning }}</p>
        </div>
      </div>
      <p class="agreement">
        <input type="checkbox" /> 同意同意协议并注册《RPG用户协议》
      </p>
      <div class="formSubmit">
        <label></label>
        <input @click="register" type="submit" value="立即注册" />
      </div>
    </form>
    <section class="registerBg"></section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      warning: {
        userNameWarning: "",
        passwordWarning: "",
        repasswordWarning: "",
        emailWarning: "",
        phoneWarning: "",
        codeWarning: "",
      },
      phone: "",
      code: "",
      userName: "",
      password: "",
      repassword: "",
      userEmail: "",
      agree: true,
    };
  },
  methods: {
    check(type) {
      if (type == "userName") {
        if (this.userName.length <= 1) {
          this.warning.userNameWarning = "请至少输入两位字符作为你的用户名";
        } else {
          this.warning.userNameWarning = "";
        }
      } else if (type == "password") {
        if (this.password.length <= 5) {
          this.warning.passwordWarning = "请设置至少六位数字的密码";
        } else {
          this.warning.passwordWarning = "";
        }
      } else if (type == "repassword") {
        if (this.repassword != this.password) {
          this.warning.repasswordWarning = "与设置的密码不一致";
        } else {
          this.warning.repasswordWarning = "";
        }
      } else if (type == "userEmail") {
        if (
          this.userEmail.indexOf("@") == -1 &&
          this.userEmail.indexOf("@").length != 1
        ) {
          this.warning.emailWarning = "请输入正确格式的邮箱地址";
        } else {
          this.warning.emailWarning = "";
        }
      } else if (type == "phone") {
        if (this.phone.length != 11) {
          this.warning.phoneWarning = "请输入正确的手机号码";
        } else {
          this.warning.phoneWarning = "";
        }
      } else if (type == "code") {
        if (this.phone == "") {
          this.warning.phoneWarning = "请输入手机号码";
          this.warning.codeWarning = "";
          return 0;
        } else {
          this.check("phone");
          this.warning.codeWarning = "";
          return 1;
        }
      }
    },
    getTemporaryCode() {
      let result = this.check("code");
      if (result == 0) {
        return 0;
      }
      this.$store.dispatch("user/getCode", this.phone);
      this.code = this.$store.state.user.temCode;
      console.log(this.$store.state.user.temCode);
    },
    async register() {
      try {
        const userData = {
          phone: this.phone,
          code: this.code,
          password: this.password,
        };
        for (let w of Object.values(this.warning)) {
          if (
            w != "" ||
            userData.phone == "" ||
            userData.code == "" ||
            userData.password == ""
          ) {
            this.warning.userNameWarning = "请输入用户名";
            this.warning.passwordWarning = "请输入密码";
            this.warning.repasswordWarning = "请确认密码";
            this.warning.emailWarning = "请输入邮箱";
            this.warning.phoneWarning = "请输入手机号码";
            this.warning.codeWarning = "请输入验证码";
            this.$message({
              showClose: true,
              message: "请正确填写信息",
              type: "warning",
            });
            return 0;
          }
        }
        await this.$store.dispatch("user/userRegister", userData);
        this.$message({
          showClose: true,
          message: `注册成功,3s后自动进入登录页面`,
          type: "success",
        });
        setTimeout(() => {
          this.goLogin();
        }, 3000);
      } catch (error) {
        this.$message({
          showClose: true,
          message: error,
          type: "warning",
        });
      }
    },
    goLogin() {
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style scoped>
.agreement input {
  width: 15px;
  height: 15px;
  margin-top: 2px;
  cursor: pointer;
}
.agreement {
  padding-left: 72px;
  height: 10px;
  display: flex;
  align-items: center;
  font-size: 13px;
}
.registerForm div input {
  width: 350px;
  height: 35px;
  outline: medium;
  padding-left: 5px;
  border-radius: 5px;
  border: 0;
}
.registerForm .formPhone input {
  width: 280px;
  border: 0;
  border-radius: 5px 0 0 5px;
}
.registerForm .formPhone button {
  font-family: YOUYUAN;
  border-radius: 0 5px 5px 0;
  height: 35px;
  width: 70px;
  font-size: 13px;
  background-color: white;
  border: 0;
  cursor: pointer;
}
.registerForm div label {
  min-width: 80px;
  height: 30px;
  display: flex;
  justify-content: right;
  font-weight: 100;
  align-items: center;
}
.registerForm div {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
}
.registerForm .warning {
  margin-top: 0px;
  position: relative;
  width: 80%;
  font-size: 13px;
  height: 20px;
  color: orangered;
  padding-left: 400px;
  display: flex;
  justify-content: left;
}
.registerForm .formSubmit {
  width: 100%;
  padding-left: 70px;
}
.registerForm .formSubmit label {
  position: absolute;
  left: 25%;
  font-size: 10px;
}
.registerForm .formSubmit input {
  font-family: YOUYUAN;
  width: 250px;
  height: 39px;
  padding: 5px;
  font-size: 20px;
  cursor: pointer;
  background-color: rgb(255, 207, 215);
  transition: all 0.5s;
}
.registerForm .formSubmit input:hover {
  transform: scale(1.1);
}

.registerForm {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 650px;
  border-top: 1px solid silver;
}
.registerTitle {
  position: relative;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  font-family: YOUYUAN;
  background-color: rgb(255, 255, 255, 0.1);
}
.registerTitle h6 {
  font-size: 16px;
  font-weight: 100;
  position: absolute;
  display: flex;
  right: 20px;
}
.registerTitle h6 p {
  cursor: pointer;
  color: rgb(255, 83, 112);
}
.register {
  width: 100%;
  height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 207, 215, 0.1);
}
</style>