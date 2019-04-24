<template>
  <div>
    <tables editable  :columns="columns7" v-model="listData"  @on-delete="handleDelete"></tables>
    <div class="paging">
      <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total />
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/data'
import { deleteAddress } from '@/api/data'
import Tables from '_c/tables'
export default {
  components: {
    Tables
  },
  data () {
    return {
      columns7: [
        {
          title: '地址ID',
          key: 'address_id'
        },
        {
          title: '用户名',
          key: 'username',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.username)
            ])
          }
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '省份',
          key: 'province'
        },
        {
          title: '城市',
          key: 'city'
        },
        {
          title: '区域',
          key: 'district'
        },
        {
          title: '详细地址',
          key: 'address'
        },
        {
          title: '是否是默认地址',
          key: 'is_default'
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
                    this.goEdit(params.row.address_id)
                  }
                }
              }, '编辑')
            }
          ]
        }
      ],
      listData: [],
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
    this.getAddressList(this.page)
  },
  methods: {
    getAddressList(page){
      getAddressList(page).then(res => {
        this.dataCount = res.data.data.count;
        this.listData = res.data.data.list
        this.ajaxHistoryData = res.data.data.list
        if(res.data.data.count < this.pageSize){
          this.listData = this.ajaxHistoryData;
        }else{
          this.listData = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changepage(index){
      //console.log("第几页",index)
      this.page = index;
      this.getUserList(this.page)
      let _start = ( index - 1 ) * this.pageSize;
      let _end = index * this.pageSize;
      this.listData = this.ajaxHistoryData.slice(_start,_end);
    },
    handleDelete (params) {
      let address_id = params.row.address_id
      deleteAddress(address_id).then(res => {
        console.log("删除成功")
      }).catch(err => {
        console.log(err)
      })
    },
    goEdit (address_id) {
      this.$router.push({ path: '/address_edit', query: { address_id: address_id } })
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
