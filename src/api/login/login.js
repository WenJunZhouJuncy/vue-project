import api from "@/assets/js/request.js";

export function getSms(data){
    return api.request({
        method: 'get',
        url: '/getSms/',
        data
    })
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
}
