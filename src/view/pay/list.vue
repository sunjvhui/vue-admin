<template>
  <div class="user">
    <!--editable searchable search-place="top"-->
    <tables  :columns="columns7" searchable search-place="top" v-model="tablesData" @on-delete="remove"></tables>
    <div class="paging">
      <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total />
    </div>
  </div>

</template>
<script>
import { getPayList } from '@/api/data'
import { deletePay } from '@/api/data'
import Tables from '_c/tables'
export default {
  components: {
    Tables
  },
  data () {
    return {
      columns7: [
        {
          title: '订单编号',
          key: 'pay_id'
        },
        {
          title: '运单号',
          key: 'invoice_no'
        },
        {
          title: '支付用户名',
          key: 'nick_name'
        },
        {
          title: '手机号',
          key: 'mobile'
        },

        {
          title: '支付金额',
          key: 'money'
        },
        {
          title: '支付方式',
          key: 'type'
        },
        {
          title: '支付状态',
          key: 'status'
        },
        {
          title: '支付时间',
          key: 'pay_time'
        },
        {
          title: '修改时间',
          key: 'modified_time'
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
                    console.log("444444444",params.row.pay_id)
                    this.goEdit(params.row.pay_id)
                  }
                }
              }, '查看支付信息')
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
    this.getPayList(this.page)
  },
  methods: {
    getPayList(page){
      getPayList(page).then(res => {
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

    goEdit (pay_id) {
      this.$router.push({ path: '/pay_edit', query: { pay_id: pay_id } })
    },
    remove (params) {
      let pay_id = params.row.pay_id
      deletePay(pay_id).then(res => {
        console.log('删除成功')
      }).catch(err => {
        console.log(err)
      })
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
