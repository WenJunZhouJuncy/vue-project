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
export function getTime(){
  let year = new Date().toLocaleDateString().substring(0, 4);
  let month = new Date().toLocaleDateString().substring(5, 6);
  let day = new Date().toLocaleDateString().substring(7, 9);
  month = month < 10? '0' + month : month;
  day = day < 10? '0' + day : day;
  return year+"-"+month+"-"+day;
}
// 时间戳
export function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
  var h = (date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s;
}