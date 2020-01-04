import { MessageBox} from 'element-ui';
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

//删除提示
export default {
  install(Vue){
    Vue.prototype.confirmMsg = msg => {
      return new Promise((resolve,reject) =>{
        MessageBox.confirm( msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    };
  }
};

// 时间
export function getTime(data){
  var date = '';
  data ? date = new Date(data) : date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month < 10 ? month = '0'+ month : month;
  day < 10? day = '0'+ day : day;
  let time = year + '-' + month + '-' + day;
  return time;
}