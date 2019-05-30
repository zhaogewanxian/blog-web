/**
 * Created by luweiying on 2018/5/29 0029.
 */
$(function () {
    initVideoList();
    $("#footer").load("/web/footer"); //底部页面
});

//获取存档列表
function initVideoList() {
    $.ajax({
        url: '/recordVideo/getVideoList',
        type: 'POST',                           //请求方式
        async: true,
        contentType: "application/json; charset=utf-8",//数据为json
        data: "",  //传输的数据
        dataType: 'json',                   //数据类型
        success: function (data) {//成功执行200
            if (data.respCode == 200) {
                //doT.js模版引擎渲染
                var listData = doT.template($("#videoListTemplate").html());
                $('#videoListData').html(listData(data.data));
            } else {
                alert(data.message);
            }
        },
        error: function (d) {
            $('#http-err-modal').modal('open');
        }
    });
}