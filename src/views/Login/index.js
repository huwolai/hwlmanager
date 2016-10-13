 import React, { PropTypes } from 'react'
 import { Form, Input, Button, Row, Col, notification } from 'antd'
// import { bindActionCreators } from 'redux'
 import { connect } from 'react-redux'
// import { login } from '../../actions/user'
import cookie from 'js-cookie';
import  './index.less'
const FormItem = Form.Item

const propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSubmit (e) {
    e.preventDefault()
    const {username,password} = this.props.form.getFieldsValue()
    if (!username||username.length<=0) {
      notification.error({
          message: '登录失败',
          description: "用户名不能为空！"
      });
      return
    }

    if (!password||password.length<=0) {
      notification.error({
          message: '登录失败',
          description: "密码不能为空！"
      });
      return
    }
    cookie.set('username',username)
    this.props.dispatch({
      type: 'users/login',
      payload: {username:username,password:password}
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
     const error = nextProps.loginErrors;
     const loggedIn = nextProps.loggedIn;
     const user = nextProps.user
      if (error != this.props.loginErrors && error) {
          notification.error({
              message: '登录失败',
              description: error
          });
      }

      if (loggedIn && !error && user)  {
          notification.success({
              message: '登录成功',
              description: '欢迎 '
          });

          console.log('login---')
          console.log(this.context)
          cookie.set('user',user)
          cookie.set('open_id',user.open_id)
          this.context.router.replace('/home');

          this.props.dispatch({
            type: 'users/login/forward'
          })
      }


  }
  render() {
    const { getFieldProps } = this.props.form
    return (
      <Row className="loginRow" type="flex" justify="space-around" align="middle">
      <Col span="8">
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}  className="loginForm">
            <FormItem
              label='用户名：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder='请输入用户名' {...getFieldProps('username')}  />
            </FormItem>

            <FormItem
              label='密码：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input type='password' placeholder='请输入密码' {...getFieldProps('password')}/>
            </FormItem>
            <Row>
              <Col span='16' offset='6'>
                <Button type='primary' htmlType='submit'>确定</Button>
              </Col>
            </Row>
          </Form>
      </Col>
    </Row>
    )
  }
};

Login.contextTypes = contextTypes;
Login.propTypes = propTypes;
Login = Form.create()(Login);

function mapStateToProps(state) {
  const {login} = state;
  if (login.user) {
      return {user: login.user, loggedIn: login.loggedIn, loginErrors: ''};
  }

  return {user: null, loggedIn: login.loggedIn, loginErrors: login.loginErrors};

}

export default connect(mapStateToProps)(Login)
// const FormItem = Form.Item

// import './index.less'

// const propTypes = {
//   user: PropTypes.string,
//   loggingIn: PropTypes.bool,
//   loginErrors: PropTypes.string
// };

// const contextTypes = {
//   router: PropTypes.object.isRequired,
//   store: PropTypes.object.isRequired
// };

// class Login extends React.Component {

//   constructor (props) {
//     super(props)
//   }

//   componentWillReceiveProps(nextProps) {
//       const error = nextProps.loginErrors;
//       const isLoggingIn = nextProps.loggingIn;
//       const user = nextProps.user

//       if (error != this.props.loginErrors && error) {
//           notification.error({
//               message: 'Login Fail',
//               description: error
//           });
//       }

//       if (!isLoggingIn && !error && user)  {
//           notification.success({
//               message: 'Login Success',
//               description: 'Welcome ' + user
//           });
//       }

//       if (user) {
//           this.context.router.replace('/home');
//       }
//   }

//   handleSubmit (e) {
//     e.preventDefault()
//     const data = this.props.form.getFieldsValue()
//     this.props.login(data.user, data.password)
//   }

//   render () {
//     const { getFieldProps } = this.props.form
//     return (
//       <Row className="login-row" type="flex" justify="space-around" align="middle">
//         <Col span="8">
//           <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">
//             <FormItem
//               label='用户名：'
//               labelCol={{ span: 6 }}
//               wrapperCol={{ span: 14 }}
//             >
//               <Input placeholder='admin' {...getFieldProps('user')} />
//             </FormItem>
//             <FormItem
//               label='密码：'
//               labelCol={{ span: 6 }}
//               wrapperCol={{ span: 14 }}
//             >
//               <Input type='password' placeholder='123456' {...getFieldProps('password')} />
//             </FormItem>
//             <Row>
//               <Col span='16' offset='6'>
//                 <Button type='primary' htmlType='submit'>确定</Button>
//               </Col>
//             </Row>
//           </Form>
//         </Col>
//       </Row>

//     )
//   }
// }

// Login.contextTypes = contextTypes;

// Login.propTypes = propTypes;

// Login = Form.create()(Login);

// function mapStateToProps(state) {
//   const {user} = state;
//   if (user.user) {
//       return {user: user.user, loggingIn: user.loggingIn, loginErrors: ''};
//   }

//   return {user: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors};
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     login: bindActionCreators(login, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
