import React, { PropTypes } from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import './index.less'
import { Link } from 'react-router'
import cookie from 'js-cookie';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Header extends React.Component {
  constructor () {
    super()
  }

  handleClick (item, key, keyPath) {
    if (item.key==='setting:3') {
      cookie.remove('username');
      cookie.remove('user');
      this.context.router.replace('/login')
    }
    
  }

  render () {
    let user = cookie.get('user')
    var nickname =''
    if (user) {
      user =  JSON.parse(user) 
      nickname = user.nickname
    }
    return (
      <div className="ant-layout-header">
        <Menu className="header-menu" onClick={this.handleClick.bind(this)}
        mode="horizontal">
          <SubMenu title={<span><Icon type="user" />{nickname}</span>}>
            <Menu.Divider />
            <Menu.Item key="setting:3">注销</Menu.Item>
          </SubMenu>
          <Menu.Item key="mail">
            <Icon type="question" />帮助
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

Header.contextTypes = contextTypes;

export default Header
