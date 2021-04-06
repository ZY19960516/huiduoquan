'use strict';

const cloud = require('wx-server-sdk');
// 初始化 cloud
cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    // env: cloud.DYNAMIC_CURRENT_ENV
    env: 'tengxunyun-6gfsiiipf3b35832'
  })
const db = cloud.database();

function getFormatDate(ms) {
    var date = new Date();
	date.setTime(date.getTime() + ms);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    var currentdate = year + '-' + month + '-' + strDate;
    return currentdate;
}

exports.main = async (event, context, callback) => {
    // console.log(event,'------------------');
    try{
        const {OPENID} = cloud.getWXContext();
        const result = await db.collection('messages').add({
            data:{
                touser:OPENID,
                page:'pages/wmindex/index',
                templateId:event.templateId,
                done:false,
                subscribeDate: getFormatDate(24*60*60*1000), // 创建时间
                sendDate: '', //发送时间
                send: false
            },
        });
        return result;
    } catch (err){
        console.log(err);
        return err;
    }
    if (event.queryStringParameters) {
        try {
            const result = await db.collection('messages').add({
                touser: event.queryStringParameters.openid, // 订阅者的openid
                page: 'pages/index/index', // 订阅消息卡片点击后会打开小程序的哪个页面
                data: event.queryStringParameters.data, // 订阅消息的数据
                templateId: event.queryStringParameters.templateId, // 订阅消息模板ID
                subscribeDate: getFormatDate(24*60*60*1000), // 创建时间
                sendDate: '', //发送时间
                send: false
              });
              return result;
        } catch (err) {
              console.log(err);
              return response.error('订阅失败！');
        }
    
    }else{
        return response.error('未入传参数！');
    }
};
