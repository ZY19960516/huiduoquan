'use strict';
// 后台获取openid
const utils = require('./utils')
const axios = require("axios");
async function getOpenId(jsCode){
	let params = {
		appid:utils.APPID,
		secret:utils.SECREAT,
		js_code:jsCode,
		grant_type:'authorization_code'
	}
    let result = await axios.get("https://api.weixin.qq.com/sns/jscode2session", {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
	return result.data.openid;
};
module.exports = getOpenId;