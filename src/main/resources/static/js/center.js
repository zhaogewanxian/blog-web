/**
 * Created by luweiying on 2018/6/4 0004.
 */
$(function () {
    $("#sideDiv").load("/web/side"); //侧边页面
    $("#footer").load("/web/footer"); //底部页面
    initBlogList();
});

//获取首页文章列表
function initBlogList() {
    $.ajax({
        url: '/web/getBlogList',
        type: 'POST',                           //请求方式
        async: true,
        contentType: "application/json; charset=utf-8",//数据为json
        data: "",  //传输的数据
        dataType: 'json',                   //数据类型
        success: function (data) {//成功执行200
            if (data.respCode == 200) {
                // way.set("blog.list", data.data); //way.js用法
                //doT.js模版引擎渲染
                var listData = doT.template($("#articleListTemplate").html());
                $('#articleListData').html(listData(data.data));
            } else {
                alert(data.message);
            }
        },
        error: function (d) {
            $('#http-err-modal').modal('open');
        }
    });
}