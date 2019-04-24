<template>
  <Form ref="formValidate" :model="formValidate" :label-width="80">
    <FormItem label="昵称" prop="nick_name">
      <Input v-model="formValidate.nick_name"  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="头像" prop="avatar_url">
      <image src="formValidate.avatar_url"></image>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <Input v-model="formValidate.gender"  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="手机号" prop="mobile">
      <Input v-model="formValidate.mobile"  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="国家" prop="country">
      <Input v-model="formValidate.country"  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="省份" prop="province">
      <Input v-model="formValidate.province"  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="城市" prop="city">
      <Input v-model="formValidate.city"  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="创建时间" prop="created_time">
      <Input v-model="formValidate.created_time"  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="修改时间" prop="modified_time">
      <Input v-model="formValidate.modified_time"  style="width: 250px"></Input>
    </FormItem>
  </Form>
</template>
<script>
import { userInfo } from '@/api/data'
export default {
  data () {
    return {
      formValidate: {},
    }
  },
  mounted () {
    let user_id = this.$route.query.user_id
    userInfo(user_id).then(res => {
      this.formValidate = res.data.data.info
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
