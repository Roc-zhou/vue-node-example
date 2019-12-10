<template>
  <div class="login container justify-center">
    <div class="card">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">phone</label>
          <input type="input" class="form-control" v-model="phone" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" style="margin-right:10px;">登录</button>
          <button type="button" class="btn btn-secondary">返回</button>
        </div>
        <div class="form-group">
          <small style="color:red" class="cursor-pointer">没有账号？</small>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    return next(vm => {});
  },
  name: "login",
  data() {
    return {
      phone: "",
      password: ""
    };
  }
};
</script>
<style scoped>
.login {
  padding: 100px 0 0 0;
}
.login > div {
  width: 500px;
}
form {
  padding: 50px;
}
</style>