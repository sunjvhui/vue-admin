<template>
    <div class="content">
      <h3>地址编辑</h3>
      <Form class="" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="用户名" prop="user_name">
          <Input v-model="formValidate.username"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="formValidate.mobile"></Input>
        </FormItem>
        <FormItem label="省市区" prop="phone">
          <template>
            <Cascader :data="site"  v-model="formValidate.address_site" trigger="hover"></Cascader>
          </template>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formValidate.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细地址"></Input>
        </FormItem>
        <FormItem label="是否为默认地址" prop="is_default">
          <RadioGroup v-model="formValidate.is_default">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem style="position: absolute; right: 30%">
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
import { site } from '@/mock/data/site'
import { editAddress,addressInfo } from '@/api/data'
export default {
  data () {
    return {
      site: [],
      formValidate: {},
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        address_site: [
          { required: true, message: '请选择正确的省市区', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
          { type: 'string', min: 10, message: '少于10个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSubmit () {
      this.formValidate.province = this.formValidate.address_site[0]
      this.formValidate.city = this.formValidate.address_site[1]
      this.formValidate.district = this.formValidate.address_site[2]
      editAddress(this.formValidate).then(res => {
        //console.log("编辑时地址参数",this.formValidate)
        this.$router.push('address/address_list')
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
    let address_id = this.$route.query.address_id
    //console.log("地址ID",address_id)
    let address_site = [];
    addressInfo(address_id).then(res => {
      //console.log("地址详情",res.data.data)
      res.data.data.is_default = res.data.data.is_default.toString();
      let province = res.data.data.province
      let city = res.data.data.city
      let district = res.data.data.district
      address_site.push(province,city,district);
      res.data.data.address_site = address_site,
      this.formValidate = res.data.data
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
