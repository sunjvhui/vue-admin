<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
    <FormItem label="配送名称：" prop="shipping_name">
      <Input v-model="formValidate.shipping_name" clearable  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="配送类型" prop="shipping_type" required>
      <RadioGroup v-model="formValidate.shipping_type">
        <Radio label="downstairs">送货到楼下</Radio>
        <Radio label="install">入户安装</Radio>
        <Radio label="take_self">站点自取</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="配送价格：" prop="shipping_price">
      <Input v-model="formValidate.shipping_price" prefix="logo-yen" style="width: 250px"></Input>
    </FormItem>
    <FormItem label="支付类型：" prop="type">
      <Input v-model="formValidate.type"  clearable  style="width: 250px"></Input>
    </FormItem>
    <FormItem label="描述：" prop="description">
      <Input v-model="formValidate.description" type="textarea"  :autosize="{minRows: 3,maxRows: 5}" style="width: 250px"></Input>
    </FormItem>
    <FormItem label="包含费用：" prop="include_fees">
      <Input v-model="formValidate.include_fees" type="textarea"  :autosize="{minRows: 2,maxRows: 5}" style="width: 250px"></Input>
    </FormItem>
    <FormItem label="排序号：" prop="order_sort">
      <Input v-model="formValidate.order_sort"  clearable  style="width: 250px"></Input>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import { addShipping } from '@/api/data'
export default {
  data () {
    return {
      formValidate: {
      },
      ruleValidate: {
        shipping_name: [
          { required: true, message: '请输入配送名称', trigger: 'blur' }
        ],
        shipping_price: [
          { required: true, message: '请输入配送价格', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入支付类型', trigger: 'blur' }
        ],
        include_fees: [
          { required: true, message: '请输入包含费用', trigger: 'blur' }
        ],
        order_sort: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          addShipping(this.formValidate).then(res => {
            this.$Message.success('添加成功!')
            this.$router.push('shipping/shipping_list')
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$Message.error('添加失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
