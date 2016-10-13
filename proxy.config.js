// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  '/api/todos': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [
          {
            id: 1,
            text: 'Learn antd',
            isComplete: true,
          },
          {
            id: 2,
            text: 'Learn ant-tool',
          },
          {
            id: 3,
            text: 'Learn dora',
          },
        ],
      });
    }, 500);
  },
  '/api/login': function(req, res) {
    res.json({
      success: true,
      data: {id:1,loggingIn:true}
    })
  },
  '/api/taskDetail': function(req,res) {
    res.json({
    "status": 0,
    "msg": "成功!",
    "data": {
       "total": "1",
        "data": [{
          'taskid':'1',
          'taskname':'任务名称',
          'taskNum':20,
          'nickname': '淘宝'
        }]
      }
    })
  },
  '/api/searchUsers': function(req,res) {
    res.json({
    "status": 0,
    "msg": "成功!",
    "data": {
        "total": "10111",
        "data": [
            {
                "custid": "21087",
                "mobile": "13496312345",
                "custtype": "1",
                "nickname": "134*****345",
                "realname": "js",
                "age": "0",
                "sdtno": "",
                "sex": "1",
                "university": "",
                "school": "选择您所就读的学校和院系",
                "majorclass": "选择您的专业和班级"
            },
            {
                "custid": "21086",
                "mobile": "12363255874",
                "custtype": "1",
                "nickname": "123*****874",
                "realname": "",
                "age": "0",
                "sdtno": "",
                "sex": "1",
                "university": "",
                "school": "",
                "majorclass": ""
            },
            {
                "custid": "21085",
                "mobile": "13614236791",
                "custtype": "1",
                "nickname": "136*****791",
                "realname": "",
                "age": "0",
                "sdtno": "",
                "sex": "1",
                "university": "",
                "school": "",
                "majorclass": ""
            }
        ],
        "pages": 3371
      }
    });
  },
  '/api/menus': function(req, res) {
    res.json({
      status: 0,
      data: [
      {
        key: 1,
        name: 'Dashboard',
        icon: 'user',
        child: [
          {
            name: '用户管理',
            key: 101,
            path: '/usermanager'
          },
          {
            name: '商户管理',
            key: 102,
            path: '/merchant'
          },
          {
            name: '任务管理',
            key: 103
          },
          {
            name: '任务审核',
            key: 104
          },
          {
            name: '任务统计',
            key: 105
          },
          {
            name: '财务管理',
            key: 106
          },
          {
            name: '系统管理员',
            key: 107
          }
        ]
      },{
        key: 2,
        name: '我的账户',
        icon: 'user',
        child: [{
            name: '个人资料',
            key: 201
          },{
            name: '充值',
            key: 202
          }]
      }


    ]
    })
  }
};
