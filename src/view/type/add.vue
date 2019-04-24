<template>
  <div class="content">
    <h3>添加家具类型</h3>
    <Form class="" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="家具类型名称" prop="type_name">
        <Input v-model="formValidate.type_name"></Input>
      </FormItem>
      <FormItem label="排序号" prop="order_sort">
        <Input v-model="formValidate.order_sort"></Input>
      </FormItem>
      <FormItem style="position: absolute; right: 50%">
        <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { addFurnitureType } from '@/api/data'
export default {
  data () {
    return {
      formValidate: {
      },
      ruleValidate: {
        type_name: [
          { required: true, message: '类型名不能为空', trigger: 'blur' }
        ],
        order_sort: [
          { required: true, message: '排序号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      addFurnitureType(this.formValidate).then(res => {
       // console.log('添加成功')
        this.$router.push('type/type_list')
      }).catch(err => {
        console.log(err)
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
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
