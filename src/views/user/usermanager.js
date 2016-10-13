 import React, {
   PropTypes
 } from 'react'
 import {
   Table,
   Card,
   Icon,
   Input,
   Select,
   Button
 } from 'antd';
 import {
   connect
 } from 'react-redux'
 import './usermanager.less'
 const Option = Select.Option;
 const propTypes = {
   items: PropTypes.array,
   pagination: {},
   loading: false
 };

 const contextTypes = {
   router: PropTypes.object.isRequired,
   store: PropTypes.object.isRequired
 };

 class usermanager extends React.Component {
   constructor(props) {
     super(props)
   }

   componentDidMount() {
     const {
       pagination
     } = this.props
     this.props.dispatch({
       type: 'users/search',
       payload: {
         page_index: 1,
         page_size: pagination.pageSize,
         mobile: ''
       }
     });
   }

   handleTableChange(pager, filters, sorter) {
     const {
       keywords,
       pagination,
       field
     } = this.props
     this.props.dispatch({
       type: 'users/search',
       payload: {
         page_index: pager.current,
         page_size: pager.pageSize,
         mobile: '',
       }
     });
   }

   componentWillReceiveProps(nextProps) {}

   render() {
     const {
       items,
       loading,
       pagination
     } = this.props
     let columns = [{
       title: 'ID',
       dataIndex: 'id',
       key: 'id'
     }, {
       title: '用户ID',
       dataIndex: 'open_id',
       key: 'open_id'
     }, {
       title: '手机号',
       dataIndex: 'mobile',
       key: 'mobile'
     }, {
       title: '创建时间',
       dataIndex: 'create_time',
       key: 'create_time'
     }, {
       title: '状态',
       dataIndex: 'status',
       key: 'status',
       render: (text, record) => {
         if (text == "1") {
           return <label style={{color:'#009966'}}>正常</label>
         }
         if (text == "0") {
           return <label style={{color:'#009966'}}>锁定</label>
         }
         if (text == "2") {
           return <label style={{color:'#009966'}}>支付未开通</label>
         }
       }
     }]


     return (
       <Card>
  			<div className='condition' >
  			</div>
    		<Table columns={columns} rowKey={record => record.id} 
    		dataSource={items} 
    		pagination={pagination}
    		loading={loading}
    		onChange={this.handleTableChange.bind(this)} />
    	</Card>
     );
   }
 }

 function mapStateToProps(state) {
   const {
     users
   } = state;

   return {
     items: users.items,
     pagination: users.pagination,
     loading: users.loading
   };

 }

 export default connect(mapStateToProps)(usermanager)