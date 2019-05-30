/**
 * create by luweiying on 2018/04/03
 * 侧边页面js脚本
 */
$(function () {
    initTagList();
    initUserInfo();
});

/**
 * 获取标签列表
 */
function initTagList() {
    $.ajax({
        url: '/web/getTagList',
        type: 'POST',                           //请求方式
        async: true,
        contentType: "application/json; charset=utf-8",//数据为json
        data: "",  //传输的数据
        dataType: 'json',                   //数据类型
        success: function (data) {//成功执行200
            if (data.respCode == 200) {
                // way.set("tag.list", data.data); //way.js用法
                //doT.js模版引擎渲染
                var listData = doT.template($("#tagTemplate").html());
                $('#tagListData').html(listData(data.data));
            } else {
                alert(data.message);
            }
        },
        error: function (d) {
            $('#http-err-modal').modal('open');
        }
    });
}

/**
 * 获取个人信息
 */
function initUserInfo() {
    $.ajax({
        url: '/web/getUserInfo',
        type: 'POST',                           //请求方式
        async: true,
        contentType: "application/json; charset=utf-8",//数据为json
        data: "",  //传输的数据
        dataType: 'json',                   //数据类型
        success: function (data) {//成功执行200
            if (data.respCode == 200) {
                // way.set("meInfo", data.data); //way.js用法
                //doT.js模版引擎渲染
                var infoData = doT.template($("#mineInfoTemplate").html());
                $('#mineInfoData').html(infoData(data.data));
            } else {
                alert(data.message);
            }
        },
        error: function (d) {
            $('#http-err-modal').modal('open');
        }
    });
}
