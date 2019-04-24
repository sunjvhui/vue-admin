<template>
  <div class="content">
    <h3>订单编辑</h3>
    <Form class="" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="运单号" prop="invoice_no">
        <Input v-model="formValidate.invoice_no" disabled ></Input>
      </FormItem>
      <FormItem label="用户名" prop="nick_name"  >
        <Input v-model="formValidate.nick_name"></Input>
      </FormItem>
      <FormItem label="手机号" prop="mobile" required>
        <Input v-model="formValidate.mobile"></Input>
      </FormItem>
      <FormItem label="家具类型名称" prop="furniture_type_name">
        <Input v-model="formValidate.furniture_type_name"></Input>
      </FormItem>
      <FormItem label="家具大小" prop="furniture_size">
        <Input v-model="formValidate.furniture_size"></Input>
      </FormItem>
      <FormItem label="家具重量" prop="furniture_weight">
        <Input v-model="formValidate.furniture_weight"></Input>
      </FormItem>
      <FormItem label="家具体积" prop="furniture_volume">
        <Input v-model="formValidate.furniture_volume"></Input>
      </FormItem>
      <FormItem label="家具数量" prop="furniture_count">
        <Input v-model="formValidate.furniture_count"></Input>
      </FormItem>
      <FormItem label="家具图片" prop="furniture_images">
        <image src="formValidate.furniture_images"></image>
      </FormItem>
      <FormItem label="发货人" prop="sender_name">
        <Input v-model="formValidate.sender_name"></Input>
      </FormItem>
      <FormItem label="发货人手机号" prop="sender_mobile">
        <Input v-model="formValidate.sender_mobile"></Input>
      </FormItem>
      <FormItem label="发货省市区" prop="sender_site">
        <template>
          <Cascader :data="site" v-model="formValidate.sender_site" trigger="hover"></Cascader>
        </template>
      </FormItem>
      <FormItem label="发货地址详细" prop="sender_address">
        <Input v-model="formValidate.sender_address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细地址"></Input>
      </FormItem>
      <FormItem label="发货时间" prop="send_time">
        <Input v-model="formValidate.send_time" ></Input>
      </FormItem>
      <FormItem label="收货人" prop="receiver_name">
        <Input v-model="formValidate.receiver_name"></Input>
      </FormItem>
      <FormItem label="收货人手机号" prop="receiver_mobile">
        <Input v-model="formValidate.receiver_mobile"></Input>
      </FormItem>
      <FormItem label="收货省市区" prop="site">
        <template>
          <Cascader :data="site" v-model="formValidate.receiver_site" trigger="hover"></Cascader>
        </template>
      </FormItem>
      <FormItem label="收获详细地址" prop="receiver_address">
        <Input v-model="formValidate.receiver_address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细地址"></Input>
      </FormItem>
      <FormItem label="收货时间" prop="receive_time" required>
        <Input v-model="formValidate.receive_time"></Input>
      </FormItem>
      <FormItem label="木架保护类型" prop="wooden_protect_type" required>
        <RadioGroup v-model="formValidate.wooden_protect_type">
          <Radio label="none"></Radio>
          <Radio label="crib"></Radio>
          <Radio label="plank"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="木架保护费用" prop="wooden_protect_price">
        <Input v-model="formValidate.wooden_protect_price"></Input>
      </FormItem>
      <FormItem label="玻璃保护类型" prop="glass_protect_type">
        <RadioGroup v-model="formValidate.glass_protect_type">
          <Radio label="none"></Radio>
          <Radio label="glass"></Radio>
          <Radio label="marble"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="玻璃保护大小" prop="glass_protect_size">
        <Input v-model="formValidate.glass_protect_size"></Input>
      </FormItem>
      <FormItem label="玻璃保护费用" prop="glass_protect_price">
        <Input v-model="formValidate.glass_protect_price"></Input>
      </FormItem>
      <FormItem label="保护价格" prop="protect_price">
        <Input v-model="formValidate.protect_price"></Input>
      </FormItem>
      <FormItem label="配送方式" prop="shipping_type" required>
      <Input v-model="formValidate.shipping_type"></Input>
    </FormItem>
      <FormItem label="配送价格" prop="shipping_price" required>
        <Input v-model="formValidate.shipping_price"></Input>
      </FormItem>
      <FormItem label="干线物流费用" prop="trunk_logistics_price">
        <Input v-model="formValidate.trunk_logistics_price"></Input>
      </FormItem>
     <!-- <FormItem label="取消订单原因" prop="cancel_reason" required>
        <Input v-model="formValidate.cancel_reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入取消订单原因"></Input>
      </FormItem>-->
      <FormItem label="总费用" prop="total_price" required>
        <Input v-model="formValidate.total_price"></Input>
      </FormItem>
      <FormItem label="支付方式" prop="pay_type" >
        <Input v-model="formValidate.pay_type" disabled ></Input>
      </FormItem>
      <FormItem label="支付时间" prop="pay_type" required>
        <Input v-model="formValidate.pay_time"></Input>
      </FormItem>
      <FormItem label="订单状态" prop="status" required>
        <RadioGroup v-model="formValidate.status">
          <Radio label="WAIT_BUYER_PAY">已下单等待付款</Radio>
          <Radio label="WAIT_SELLER_SEND_GOODS">已付款等待发货</Radio>
          <Radio label="WAIT_BUYER_CONFIRM_GOODS">已发货等待确认发货</Radio>
          <Radio label="TRADE_FINISHED">已完成</Radio>
          <Radio label="TRADE_CLOSED">退款成功已关闭</Radio>
          <Radio label="TRADE_CLOSED_BY_SYSTEM">已关闭</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { site } from '@/mock/data/site'
import { getOrderInfo,editOrder } from '@/api/data'
export default {
  data () {
    return {
      site: [],
      formValidate: {},
      ruleValidate: {
      },
      params:{}
    }
  },
  methods: {
    handleSubmit () {
      this.formValidate.receiver_province = this.formValidate.receiver_site[0]
      this.formValidate.receiver_city = this.formValidate.receiver_site[1]
      this.formValidate.receiver_district = this.formValidate.receiver_site[2]
      this.formValidate.sender_province = this.formValidate.sender_site[0]
      this.formValidate.sender_city = this.formValidate.sender_site[1]
      this.formValidate.sender_district = this.formValidate.sender_site[2]
      editOrder(this.formValidate).then(res => {
        this.$router.push('order/order_list')
      }).catch(err => {
        console.log(err)
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    this.site = site
    let order_id = this.$route.query.order_id
    getOrderInfo(order_id).then(res => {
      let sender_site = [];
      let receiver_site = [];
      let receiver_province = res.data.data.row.receiver_province
      let receiver_city = res.data.data.row.receiver_city
      let receiver_district = res.data.data.row.receiver_district
      let sender_province = res.data.data.row.sender_province
      let sender_city = res.data.data.row.sender_city
      let sender_district = res.data.data.row.sender_district

      sender_site.push(sender_province,sender_city,sender_district);
      receiver_site.push(receiver_province,receiver_city,receiver_district)
      res.data.data.row.sender_site = sender_site,
      res.data.data.row.receiver_site = receiver_site

      let status = res.data.data.row.status
      if( status =='已完成'){
        res.data.data.row.status = "TRADE_FINISHED"
      }
      if( status == '已下单等待付款'){
        res.data.data.row.status = "WAIT_BUYER_PAY"
      }
      if( status == '已付款等待发货'){
        res.data.data.row.status = "WAIT_SELLER_SEND_GOODS"
      }
      if( status == '已发货等待确认收货'){
        res.data.data.row.status = "WAIT_BUYER_CONFIRM_GOODS"
      }
      if( status == "退款成功已关闭"){ //退款关闭订单
        res.data.data.row.status = "TRADE_CLOSED"
      }
      if ( status == "已关闭"){
        res.data.data.row.status = "TRADE_CLOSED_BY_SYSTEM"
      }
      this.formValidate = res.data.data.row
      //console.log("订单详情",this.formValidate)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .content h3{
    margin: 20px 0;
  }
  .content Form {
    width: 70%;
  }
</style>
