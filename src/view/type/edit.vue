<template>
  <div class="content">
    <h3>家具类型编辑</h3>
    <Form class="" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="家具类型名称" prop="type_name">
        <Input v-model="formValidate.type_name"></Input>
      </FormItem>
      <FormItem label="排序号" prop="order_sort">
        <Input v-model="formValidate.order_sort"></Input>
      </FormItem>
      <FormItem style="position: absolute; right: 50%">
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { furnitureTypeInfo,editFurnitureType } from '@/api/data'
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
  mounted () {
    let type_id = this.$route.query.type_id
    furnitureTypeInfo(type_id).then(res => {
      // console.log("家具详情",res.data.data.row)
      this.formValidate = res.data.data.row
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handleSubmit () {
      editFurnitureType(this.formValidate).then(res => {
        // console.log('编辑成功')
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
