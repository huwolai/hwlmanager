import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import cookie from 'js-cookie';

const SubMenu = Menu.SubMenu

import './index.less'

const defaultProps = {
  items: [],
  currentKey: ''
}

const propTypes = {
  items: PropTypes.array,
  currentKey: PropTypes.string
}

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.menuClickHandle = this.menuClickHandle.bind(this);
  }

  menuClickHandle (item) {
    this.props.dispatch({
      type: 'menus/update',
      payload: {data:item.keyPath,key:item.key} 
    });
    
  }

  componentDidMount () {

    const user = JSON.parse(cookie.get('user'))
    this.props.dispatch({
      type: 'menus/all',
      payload: user
    });
  }

  getMenus(menus) {
    let childs =  menus.child
    let mpayload = {}

      if (menus.payload&&menus.payload!=="") {
         mpayload = JSON.parse(menus.payload)
      }else{
        mpayload = {}
      }

      if (!mpayload.path) {
         mpayload.path="/"
      }
     
    if (childs&&childs.length>0) {

      if (!mpayload.icon||mpayload.icon=='') {
        return (
        <SubMenu
          key={'sub'+menus.id}
          title={<span>{menus.name}</span>}>
           {
            childs.map((node) => {
               return this.getMenus(node)
            })
           }
            
         </SubMenu> 
        )
      }else{
        return (
        <SubMenu
          key={'sub'+menus.id}
          title={<span><Icon type={mpayload.icon} />{menus.name}</span>}>
           {
            childs.map((node) => {
               return this.getMenus(node)
            })
           }
            
         </SubMenu> 
        )
      }
      
       
    }else{

      return (
          <Menu.Item key={'menu'+menus.id}>
              <Link to={mpayload.path}>{menus.name}</Link>
          </Menu.Item>
        )
    }
  }

  render () {
    const { items,currentKey } = this.props
    let menu =""
    if (items.length>0) {
       menu =  items.map((item =>{

          return this.getMenus(item)
        }))
       
    }
    let openKey = ['sub1']
    
    // const menu = items.map((item) => {
    //   return (
    //     <SubMenu
    //       key={'sub'+item.permissionid}
    //       title={<span><Icon type={item.icon} />{item.permissionname}</span>}
    //     >
    //       {item.child.map((node) => {
    //         return (
    //           <Menu.Item key={'menu'+node.permissionid}>
    //               <Link to={node.path}>{node.permissionname}</Link>
    //           </Menu.Item>
    //         )
    //       })}
    //     </SubMenu>
    //   )
    // });
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">
          <img src='logo.png'></img>
        </div>
        <Menu
          mode="inline" theme="dark"
          onClick={this.menuClickHandle}
          defaultOpenKeys={openKey}
          selectedKeys={[currentKey]}
        >
          {menu}
        </Menu>
      </aside>
    )
  }
}

Sidebar.contextTypes = contextTypes;
Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {

  const {menus} = state;

  return {
    items: menus.items,
    currentKey: menus.currentKey
  }
}

export default connect(mapStateToProps)(Sidebar)
