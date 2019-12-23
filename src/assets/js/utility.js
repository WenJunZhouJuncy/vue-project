import { MessageBox, Message} from 'element-ui';
// import Vue from 'vue'
// export function messageBox(info, fn) {
//   MessageBox.confirm( info, '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//     center: true
//   }).then(() => {
//     fn()
//     Message({
//       type: 'success',
//       message: '删除成功!'
//     });
//   }).catch(() => {
//     Message({
//       type: 'info',
//       message: '已取消删除'
//     });
//   });
// }

export default {
  install(Vue){
   Vue.prototype.confirmMsg = (info,fn) => {
      MessageBox.confirm( info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        fn()
        Message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}