var express = require('express');
var fs = require('fs');
var path = require('path');
var qiniu = require('qiniu');
var qn = require('./qiniuMain')
var app = express();
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');//*表示可以跨域任何域名都行 也可以填域名表示只接受某个域名
    res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type');//可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
    res.header('Content-Type','application/json;charset=utf-8');//请求头中定义的类型
    next();
});

//结果包装函数
let result = function (obj,bool){
    if(bool){
        return {status:0,data:obj};
    }else{
        return {status:1,data:obj};
    }
}

//上传图片
app.post("/upImg",function(req,routerRes){
    try{
        qn.upImg(req,function(res){
            console.log('res',res);
            return routerRes.send(res)
            /*if(res.status == 0){
                return routerRes.json(result(res.data,true));
            }else{
                return routerRes.json(result(res.msg,false));
            }*/
        });
    }catch(err){
        if(err){
            console.log('trycatch报错====',err);
        }
    }
})
var server = app.listen(3003, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('running3003');
});


