<template>
  <div>
    <Button type="primary" @click="goAdd">添加家具类型</Button>
    <!-- editable searchable search-place="top"-->
    <tables :columns="columns7" v-model="listData"  @on-delete="typeDelete"></tables>
    <div class="paging">
      <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total />
    </div>
  </div>
</template>

<script>
import { getTypeList, deleteFurnitureDelete } from '@/api/data'
import Tables from '_c/tables'
export default {
  components: {
    Tables
  },
  data () {
    return {
      columns7: [
        {
          title: '类型ID',
          key: 'type_id'
        },
        {
          title: '类型名',
          key: 'type_name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.type_name)
            ])
          }
        },
        {
          title: '排序ID',
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
                    this.goEdit(params.row.type_id)
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
    this.getTypeList(this.page)
  },
  methods: {
    getTypeList(page){
      getTypeList(page).then(res => {
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
      // console.log("第几页",index)
      this.page = index;
      this.getUserList(this.page)
      let _start = ( index - 1 ) * this.pageSize;
      let _end = index * this.pageSize;
      this.listData = this.ajaxHistoryData.slice(_start,_end);
    },
    goAdd () {
      this.$router.push('/type_add')
    },
    typeDelete (params) {
      let type_id = params.row.type_id
      deleteFurnitureDelete(type_id).then(res => {
        console.log('删除成功')
      }).catch(err => {
        console.log(err)
      })
    },
    goEdit (type_id) {
      this.$router.push({ path: '/type_edit', query: { type_id: type_id } })
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
