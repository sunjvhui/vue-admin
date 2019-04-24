<template>
  <Form ref="formValidate" :model="formValidate" :label-width="80">
    <FormItem label="运单号" prop="order_id">
      <Input v-model="formValidate.invoice_no"  disabled style="width: 250px"></Input>
    </FormItem>
    <FormItem label="用户名" prop="name">
      <Input v-model="formValidate.nick_name"  clearable  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="支付金额" prop="money">
      <Input v-model="formValidate.money" prefix="logo-yen" style="width: 250px"></Input>
    </FormItem>
    <FormItem label="支付方式" prop="type">
      <Input v-model="formValidate.type" style="width: 250px"></Input>
    </FormItem>

    <FormItem label="支付状态" prop="status">
      <Input v-model="formValidate.status" style="width: 250px"></Input>
    </FormItem>
    <FormItem label="支付时间">
      <Input v-model="formValidate.pay_time" style="width: 250px"></Input>
    </FormItem>
    <FormItem label="修改时间">
      <Input v-model="formValidate.modified_time" style="width: 250px"></Input>
    </FormItem>
  </Form>
</template>
<script>
import { getPayInfo } from '@/api/data'
import { editFurnitureType } from '@/api/data'
export default {
  data () {
    return {
      formValidate: {},
    }
  },
  mounted () {
    let pay_id = this.$route.query.pay_id
    //console.log("111111111",pay_id)
    getPayInfo(pay_id).then(res => {
       console.log("支付详情",res.data.data.info)
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
