var config = {
	//通用用户系统信息
	commuser: {
		url: 'http://commuser.huwolai.com/v1',
  	    appid:'shopapi',
  	    appkey: '123456'
	},
	//配置中心基本信息
	configcenter: {
		url: 'http://config.huwolai.com',
  	    appid:'shopapi',
  	    appkey: '123456',
  	    env: 'prod'
	},
	//电商基本信息
	shopapi: {
		url: 'http://api.huwolai.com/v1',
		appid: 'shopapi',
		appkey: '123456'
	},
	//图片基地址
	imageurl: 'http://images.huwolai.com',
	//图片上传URL
	imageuploadurl: 'http://api.huwolai.com/v1/comm/images/upload'
}

export default  config

