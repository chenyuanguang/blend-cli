<template>
  <div id="login">
    <!-- <div id="particles-js"></div> -->
    <vue-particles
        color="#ffffff"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#ededed"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
    <el-form :model="userInfo" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="age">
        <el-input type="text" auto-complete="off" v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" auto-complete="off" v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="subUserInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import data from "../../static/data/particles.json";
import { Login } from "../api/Login.js";
export default {
  components: {},
  name: "Login",
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    subUserInfo() {
      let _this = this;
      var params = new URLSearchParams();
      params.append("username", _this.userInfo.username);
      params.append("password", _this.userInfo.password);
      _this.$reqs
        .post("http://localhost:3000/api/login", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          if (res.data.code) {
            this.$router.push({ path: "/" });
          }
        });
      // Login("http://localhost:3000/api/checkUser", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   body: `username=${this.userInfo.username}&password=${
      //     this.userInfo.password
      //   }`
      // }).then(json => {
      //   if (json.code) {
      //     localStorage.setItem("token", json.token);
      //     this.$router.push("/home/welcome");
      //   }
      // });
    }
  },
  mounted() {
    // particlesJS("particles-js", data);
  }
};
</script>
<style>
#login {
  background: url("../assets/bg2.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: relative;
}
.demo-ruleForm {
  background: rgba(0, 0, 0, 0.3);
  padding: 80px 30px 50px 30px;
  width: 450px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateY(-30%);
  transform: translateX(-50%);
}
.demo-ruleForm label {
  color: #fff;
}
#particles-js {
  width: 100%;
  height: 100%;
}
</style>
