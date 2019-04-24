<template>
  <div class="user">
    <tables editable searchable search-place="top" :columns="columns7"  v-model="tablesData"></tables>
    <div class="paging">
      <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total />
    </div>
  </div>
</template>
<script>
  import { getUserList } from '@/api/data'
  import Tables from '_c/tables'
  export default {
    components: {
      Tables
    },
    data () {
      return {
        columns7: [
          {
            title: '用户ID',
            key: 'user_id'
          },
          {
            title: '用户名',
            key: 'nick_name'
          },
          {
            title: '头像',
            key: 'avatar',
          },
          {
            title: '联系方式',
            key: 'mobile'
          },
          {
            title: '创建时间',
            key: 'created_time'
          },

          {
            title: '操作',
            key: 'handle',
            width: 200,
            align: 'center',
            button: [
              (h, params) => {
                return h('Button', {
                  on: {
                    click: () => {
                      this.goEdit(params.row.user_id)
                    }
                  }
                }, '查看用户信息')
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
      this.getUserList(this.page)
    },
    methods: {
      getUserList(page){
        getUserList(page).then(res => {
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
      /*pagesize(index){
        console.log('每页条数改变了')
        let _start = ( this.page - 1 ) * index;
        let _end = this.page * index;
        this.tablesData = this.ajaxHistoryData.slice(_start,_end);
        // 当前展示条数
        this.pageSize = index;
      },*/
      goEdit (user_id) {
        this.$router.push({ path: '/user_edit', query: { user_id: user_id } })
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
