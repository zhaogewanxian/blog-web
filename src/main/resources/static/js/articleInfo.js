/**
 * Created by luweiying on 2018/3/29 0029.
 */
$(function () {
    $("#sideDiv").load("/web/side"); //侧边页面
    $("#footer").load("/web/footer"); //底部页面
});

var id;

/**
 * 文章详情页数据
 * */
function initArticleInfo(articleId) {
    id = articleId;
    var param = {id: articleId};
    $.ajax({
        url: '/web/getArticleInfo',
        type: 'POST',//请求方式
        async: true,
        contentType: "application/json; charset=utf-8",//数据为json
        data: JSON.stringify(param),  //传输的数据
        dataType: 'json',                   //数据类型
        success: function (data) {//成功执行200
            if (data.respCode == 200) {
                //doT.js模版引擎渲染
                var infoData = doT.template($("#articleInfoTemplate").html());
                $('#articleInfoData').html(infoData(data.data));
            } else {
                alert(data.message);
            }
        },
        error: function (d) {
            $('#http-err-modal').modal('open');
        }
    });


}

function saveComment() {
    var reg = /(1[3-9]\d{9}$)/;
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var phone = $('#phone').val().trim();
    var content = $('#content').val().trim();
    if (!name) {
        alert("请填写姓名");
        return false;
    } else if (!email) {
        alert("请填写邮箱");
        return false;
    } else if (!phone) {
        alert("请填写手机号码");
        return false;
    } else if (!reg.test(phone)) {
        alert("请输入正确格式的手机号码");
        return false;
    } else if (!content) {
        alert("请填写内容");
        return false;
    }

    var params = {name: name, email: email, phone: phone, content: content, articleId: id};
    $.ajax({
        url: '/comment/saveComment',
        type: 'POST',                           //请求方式
        async: true,
        contentType: "application/json; charset=utf-8",//数据为json
        data: JSON.stringify(params),  //传输的数据
        dataType: 'json',                   //数据类型
        success: function (data) {//成功执行200
            if (data.respCode == 200) {
                alert("保存成功");
                $('#name').val("");
                $('#email').val("");
                $('#phone').val("");
                $('#content').val("");
            } else {
                alert(data.message);
            }
        },
        error: function (d) {
            $('#http-err-modal').modal('open');
        }
    });
}
