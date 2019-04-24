<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { login } from '@/api/user'
export default {
  components: {
    LoginForm
  },
  data(){
    return{
      data: {}
    }
  },
  methods: {
    handleSubmit ({userName, password}) {
      this.data.login_name = userName
      this.data.password = password
      console.log("this.data",this.data)
      login(this.data).then(res => {
        if (res.data.err_msg == '登录成功') {
          this.$router.push({
            name: this.$config.homeName
          })
        }else{
         alert(res.data.err_msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
