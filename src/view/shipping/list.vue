<template>
  <div class="user">
    <Button type="primary" @click="goAdd">添加配送方式</Button>
    <tables :columns="columns7"  v-model="tablesData" @on-delete="typeDelete"></tables>
    <div class="paging">
      <Page  :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total  />
    </div>
  </div>

</template>
<script>
import Tables from '_c/tables'
import { getShippingList, deleteShipping } from '@/api/data'
export default {
  components: {
    Tables
  },
  data () {
    return {
      columns7: [
        {
          title: '配送ID',
          key: 'shipping_id'
        },
        {
          title: '配送名称',
          key: 'shipping_name'
        },
        {
          title: '配送类型',
          key: 'shipping_type'
        },
        {
          title: '配送价格',
          key: 'shipping_price'
        },
        {
          title: '支付类型',
          key: 'type'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '包含费用',
          key: 'include_fees'
        },
        {
          title: '排序号',
          key: 'order_sort'
        },
        {
          title: '操作',
          key: 'handle',
          width: 200,
          align: 'center',
          options: ['delete'],
          button: [
            (h, params) => {
              return h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.goEdit(params.row.shipping_id)
                  }
                }
              }, '编辑')
            }
          ]
        }
      ],
      tablesData: [],
      ajaxHistoryData:[],
      //总条数
      dataCount:0,
      //当前页码
      page:1,
      //每页显示10条数据
      pageSize:10
    }
  },
  mounted () {
    this.getShippingList(this.page)
  },
  methods: {
    getShippingList(page){
      getShippingList(page).then(res => {
        this.dataCount = res.data.data.count;
        this.tablesData = res.data.data.list
        this.ajaxHistoryData = res.data.data.list
        if(res.data.data.count < this.pageSize){
          this.tablesData = this.ajaxHistoryData;
        }else{
          this.tablesData = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changepage(index){
      // console.log("第几页",index)
      this.page = index;
      this.getUserList(this.page)
      let _start = ( index - 1 ) * this.pageSize;
      let _end = index * this.pageSize;
      this.tablesData = this.ajaxHistoryData.slice(_start,_end);
    },
    typeDelete (params) {
      let shipping_id = params.row.shipping_id
      deleteShipping(shipping_id).then(res => {
        console.log('删除成功')
      }).catch(err => {
        console.log(err)
      })
    },
    goEdit (shipping_id) {
      this.$router.push({ path: '/shipping_edit', query: { shipping_id: shipping_id } })
    },
    goAdd () {
      this.$router.push('/shipping_add')
    }
  }
}
</script>

<style scoped>
  .paging{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .order-content tables{
    margin: 10px 0;
  }
</style>
