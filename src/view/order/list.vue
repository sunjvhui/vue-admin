<template>
  <div class="order-content">
    <tables ref="tables" editable searchable search-place="top" @on-delete="handleDelete" :columns="columns7" v-model="tablesData"/>
    <div class="paging">
      <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total/>
    </div>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getOrderList,deleteOrder} from '@/api/data'
export default {
  components: {
    Tables
  },
  data () {
    return {
      columns7: [
        {
          title: '订单ID',
          key: 'order_id'
        },
        {
          title: '订单编号',
          key: 'invoice_no'
        },
        {
          title: '用户名',
          key: 'nick_name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.nick_name)
            ])
          }
        },
        {
          title: '收货人',
          key: 'receiver_name'
        },
        {
          title: '家具类型',
          key: 'furniture_type_name'
        },
        {
          title: '支付方式',
          key: 'pay_type'
        },
        {
          title: '支付时间',
          key: 'pay_time'
        },
        {
          title: '接收时间',
          key: 'receive_time'
        },
        {
          title: '发货时间',
          key: 'send_time'
        },
        {
          title: '配送方式',
          key: 'shipping_type'
        },
        {
          title: '配送价格',
          key: 'shipping_price'
        },
        {
          title: '订单状态',
          key: 'status'
        },
        {
          title: '总合计费用',
          key: 'total_price'
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
                    this.goEdit(params.row.order_id)
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
    this.getOrderList(this.page)
  },
  methods: {
    getOrderList(page){
      getOrderList(page).then(res => {
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
    handleDelete (params) {
      let order_id = params.row.order_id
      deleteOrder(order_id).then(res => {
        console.log('删除成功')
      }).catch(err => {
        console.log(err)
      })
    },
    goEdit (order_id) {
      this.$router.push({ path: '/order_edit', query: { order_id: order_id } })
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
