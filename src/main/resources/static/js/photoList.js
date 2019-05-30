/**
 * Created by luweiying on 2018/3/29 0029.
 */
$(function () {
    getPhotoList();
});
var photoList;

/**
 * 获取图片列表
 */
function getPhotoList() {
    $.ajax({
        url: '/web/getPhotoList',
        type: 'POST',                           //请求方式
        contentType: "application/json; charset=utf-8",//数据为json
        data: "",  //传输的数据
        dataType: 'json',                   //数据类型
        success: function (data) {//成功执行200
            console.log(data);
            if (data.respCode == 200) {
                photoList = data.data;
                init();
            } else {
                alert(data.message);
            }
            $('#container').pinto();
        },
        error: function (d) {
            $('#http-err-modal').modal('open');
        }
    });
}

function init() {
    //doT.js模版引擎渲染
    var photoListData = doT.template($("#photoListTemplate").html());
    $('#container').append(photoListData(photoList));
}


