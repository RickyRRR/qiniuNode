var qiniu = require('qiniu');
var accessKey = 'jCpHwbIzGtlvhPepmo4wVwGtH3u9WopK4baqt5Pf';
var secretKey = 'yF2RbXmikL9SPyQfOEWsW518p1sYh6dMCai8Kh1u';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
    scope: 'peapocket',
    expires: 7200
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

var localFile = "./uploadimg/upload_200291af053b3fd57d08953f0584dbdb.jpg";
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key='test.mp4';
// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                                                                     respBody, respInfo) {
    if (respErr) {
        throw respErr;
    }
    if (respInfo.statusCode == 200) {
        console.log(respBody);
    } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
    }
});