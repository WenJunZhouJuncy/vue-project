<template>
  <div class="messageClassify">
    <msgDialog ref="dialog" @addendClassify="addendClassify"></msgDialog>
    <div class="addend_classify_box mgb30 pdb30">
      <el-button type="danger" @click="$refs.dialog.dialogShow()">添加分类</el-button>
    </div>
    <el-collapse>
      <template  v-for="(item,index) in list">
        <div :key="item.id" class="collapse_box">
          <div class="obtn_box" @mouseenter="enter(index)" :class="{btn_show:index === idx}">
            <el-button type="success" round @click="addendClassify">添加子级</el-button>
            <el-button type="primary" round @click="addendClassify">编辑</el-button>
            <el-button type="danger" round @click="fDelete">删除</el-button>
          </div>
          <el-collapse-item class="card">
            <template slot="title">
              <div class="collapse_title_box" @mouseenter="enter(index)" @mouseleave="leave">
                {{item.category_name}}
              </div>
            </template>
            <ul v-if="item.children">
              <li class="pdl30" v-for="i in item.children" :key="i.id">
                {{i.category_name}}
                <div class="tbtn_box">
                  <el-button type="primary" round>编辑</el-button>
                  <el-button type="danger" round>删除</el-button>
                </div>
              </li>
            </ul>
            <p class="pd30" v-else>暂无数据</p>
          </el-collapse-item>
        </div>
      </template>
    </el-collapse>
  </div>
</template>

<script>
import msgDialog from '../components/msgClassifyDialog'
import { addFirstCategory } from '@/api/messageManage/messageClassify.js'
export default {
  name: "messageClassify",
  components:{
    msgDialog
  },
  data() {
    return {
      idx:-1,
      list:[
        {
          id: "1",
          category_name: "国际信息",
          children: [
            {id: "2",category_name: "111",}
          ]
        },
        {
          id: "3",
          category_name: "国内信息",
          children: [
            {id: "4",category_name: "222"},
            {id: "5",category_name: "222"},
            {id: "6",category_name: "222"}
          ]
        },
        {
          id: "7",
          category_name: "国内信息",
          children: [
            {id: "8",category_name: "222"},
            {id: "9",category_name: "222"}
          ]
        }
      ]
    }
  },
  methods: {
    // 鼠标进入显示按钮
    enter(idx){
      this.idx = idx;
    },
    // 鼠标离开隐藏按钮
    leave(){
      this.idx = -1;
    },
    //添加分类
    addendClassify(prams){
      addFirstCategory({categoryName:prams}).then(res =>{
        if (res.resCode === 0) {
          this.list.push({
            id: 121,
            category_name:prams,
          })
          this.$message({
            type:'success',
            message:res.message
          })
        }
      }).catch(err =>{
        this.$message({
          type:'error',
          message:err.message
        })
      })
    },
    // 删除分类
    fDelete(){
      this.confirmMsg('删除后分类和子级将无法恢复，是否继续？',this.deleteItem)
    },
    deleteItem(){
      console.log("删除成功");
    }
  }
}
</script>

<style lang="scss">
.messageClassify{
  .addend_classify_box{
    text-align: center;
    border-bottom: 1px #ddd solid;
  }
  .el-collapse{
    border: none;
    padding: 0 270px;
    .collapse_box{
      position: relative;
      .obtn_box,.tbtn_box{
        position: absolute;
        top: 16px;
        right: 50px;
        display: none;
        button{
          padding: 4px 12px;
        }
      }
      .btn_show{
        display: block;
      }
      .el-collapse-item{
        .collapse_title_box{
          width: 100%;
          padding-left: 20px;
        }
        .el-collapse-item__header{
          background: #f3f3f3;
          height: 56px;
          line-height: 56px;
          font-size: 18px;
          font-weight: 700;
          border: 1px #bbb solid
        }
        .el-collapse-item__content{
          padding-bottom: 0;
        }
        ul{
          li{
            position: relative;
            cursor: pointer;
            font-size: 16px;
            color: #666;
            line-height: 54px;
            .tbtn_box{
              top: 0px
            }
          }
          li:hover{
            background: #E4E7ED;
            .tbtn_box{
              display: block;
            }
          }
        }
        p{
          line-height: 36px;
          font-size: 18px;
          color: #666;
        }
      }
    }
  }
}
</style>