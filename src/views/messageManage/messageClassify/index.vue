<template>
  <div class="messageClassify">
    <msgDialog ref="dialog" :dialogObj="dialogObj" @addFirstClass="addFirstClass" @alterFirstClass="alterFirstClass" @addSecondClass="addSecondClass"></msgDialog>
    <div class="addend_classify_box mgb30 pdb30">
      <el-button type="danger" @click="dialogShow('添加分类')">添加分类</el-button>
    </div>
    <el-collapse>
      <template  v-for="(item,index) in list">
        <div :key="item.id" class="collapse_box">
          <div class="obtn_box" @mouseenter="idx = index" :class="{btn_show:index === idx}">
            <el-button type="primary" round @click="dialogShow('编辑分类', item, index)">编辑</el-button>
            <el-button type="danger" round @click="DeleteFirstClass(item.id)">删除</el-button>
          </div>
          <el-collapse-item class="card">
            <template slot="title">
              <div class="collapse_title_box" @mouseenter="idx = index" @mouseleave="idx = -1">
                {{item.category_name}}
              </div>
            </template>
            <ul v-if="item.children">
              <li class="pdl30" v-for="i in item.children" :key="i.id">
                {{i.category_name}}
                <div class="tbtn_box">
                  <el-button type="primary" round>编辑</el-button>
                  <el-button type="danger" round @click="DeleteFirstClass(i.id)">删除</el-button>
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
import {apiAddFirstCategory, apiEditCategory, apiDeleteCategory, apiAddChildrenCategory} from '@/api/messageClassify'
import {commonGetCategory} from '@/api/common'
export default {
  name: "messageClassify",
  components:{
    msgDialog
  },
  data() {
    return {
      dialogObj: {
        idx: '', //序号
        id: '',
        dialogType:'',//弹窗类型
        dialogCategoryName:'' //分类名称
      },
      idx: -1,  //鼠标进入离开状态
      list: []
    }
  },
  created () {
    this.getClassify();
  },
  methods: {
    //一级分类弹窗
    dialogShow(dialogType, obj, index) {
      this.dialogObj.dialogType = dialogType;
      if (obj) {
        this.dialogObj.id = obj.id;
        this.dialogObj.dialogCategoryName = obj.category_name;
      } else {
        this.dialogObj.id = '';
        this.dialogObj.dialogCategoryName = '';
      };
      index > -1 ? this.dialogObj.idx = index : this.dialogObj.idx = -1;
      this.$refs.dialog.dialogShow();
      //表单自动聚焦
      this.$nextTick(() => {
        this.$refs.dialog.$refs.autofocus.focus();
      })
    },
    // 获取分类
    getClassify() {
      commonGetCategory()
        .then(res => {
          this.list = res.data.data
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
    },
    //添加一级分类
    addFirstClass(name) {
      apiAddFirstCategory({categoryName:name})
        .then(res => {
          if (res.resCode === 0) {
            this.list.push({
              category_name:name,
            });
            this.$message({
              type:'success',
              message:res.message
            });
            this.getClassify()
          }
        })
        .catch(err =>{
          this.$message({
            type:'error',
            message:err.message
          });
        });
    },
    // 修改一级分类
    alterFirstClass(name) {
      let parmas = {
        id: this.dialogObj.id,
        categoryName: name
      };
      apiEditCategory(parmas)
        .then(res => {
          this.list[this.dialogObj.idx].category_name = name;
          this.$message({
            type: 'success',
            message: res.message
          });
        })
        .catch(err =>{
          this.$message({
            type:'error',
            message:err.message
          });
        });
    },
    // 删除分类
    DeleteFirstClass(id){
      console.log(id);
      this.confirmMsg('删除后分类和子级将无法恢复，是否继续？')
        .then(() => {
          apiDeleteCategory({categoryId:id})
            .then(res =>{
              this.getClassify();
              this.$message({
                type: 'success',
                message: res.message
              });
            })
            .catch(err =>{
              this.$message({
                type:'error',
                message: err.message
              });
            })
        })
        .catch( ()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          });
        });
    },
    // 添加二级分类
    addSecondClass(name){
      let parmas = {
        categoryName: name,
        parentId: this.dialogObj.id
      }
      console.log(this.dialogObj.id)
      apiAddChildrenCategory(parmas)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.message
          });
          this.getClassify()
        })
        .catch(err =>{
          this.$message({
            type: 'error',
            message: err.message
          })
        })
    }
  }
};
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