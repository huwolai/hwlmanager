 import React, { PropTypes } from 'react'
import { Table,Card, Icon,Input,Select,Button } from 'antd';
 import { connect } from 'react-redux'
 const Option = Select.Option;
const propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  keywords: PropTypes.string,
  field: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class orderDetail extends React.Component {
  constructor (props) {
    super(props)
	  this.props.dispatch({
      type: 'task/orderdetail/columns'
    });

  }

  componentDidMount () {
    console.log('componentDidMount')
    const {pagination,field} = this.props
    var taskid =  this.props.location.query.taskid
    var pageIndex = pagination.current;
   
    let  totalPage = 0;
    if ( pagination.total%pagination.pageSize===0) {
      totalPage = pagination.pageSize/pagination.total
    }else{
      totalPage = parseInt(pagination.total/pagination.pageSize)+1
    }
    if (pageIndex>totalPage) {
       pageIndex = totalPage
    }

    pageIndex=1
    this.props.dispatch({
      type: 'task/orderdetail/id',
      payload:{taskid:taskid,pageIndex:pageIndex,pageSize:pagination.pageSize,keywords:''}
    });

  }

 handleTableChange(pager, filters, sorter) {
  const {keywords,pagination,field,location:{ query:{taskid}}} = this.props
    this.props.dispatch({
      type: 'task/orderdetail/id',
      payload:{taskid:taskid,pageIndex:pager.current,pageSize:pager.pageSize,keywords:keywords,field:field}
    });
 }

  handleInputChange(e) {
  	console.log('e===' + e.target.value)
  	this.props.dispatch({
      type: 'task/orderdetail/condition/keywords',
      payload:{keywords:e.target.value}
    });
  }

  handleSelectChange(value) {
  	console.log(`selected ${value}`);
  	this.props.dispatch({
      type: 'task/orderdetail/condition/field',
      payload:{field:value}
    });
  }

  handlePublishClick() {
    this.context.router.push('/taskpublish')
  }

  componentWillReceiveProps(nextProps) {

    console.log('componentWillReceiveProps')

	const {keywords,pagination,field,location:{ query:{taskid}}} = nextProps

  	if (this.props.field != field|| keywords!== this.props.keywords) {
  		this.props.dispatch({
      		type: 'task/orderdetail/id',
      		payload:{taskid:taskid,pageIndex:pagination.current,pageSize:pagination.pageSize,keywords:keywords,field:field}
    	});
  	}
  }

  render() {
  	const { items,loading,pagination } = this.props

    let columns = [{
        title: 'ID',
        dataIndex: 'orderid',
        key: 'orderid'
    },{
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
    },{
        title: '学校',
        dataIndex: 'university',
        key: 'university'
    },{
        title: '承接时间',
        dataIndex: 'undertaketime',
        key: 'undertaketime'
    },{
        title: '完成时间',
        dataIndex: 'completetime',
        key: 'completetime'
    }, {
        title: '审核时间',
        dataIndex: 'auditingtime',
        key: 'auditingtime',
    }, {
        title: '执行费',
        dataIndex: 'amount',
        key: 'amount',
    }];
	return (
  		<Card>
  			<div className='condition' >
  				<div className='item'>
  					<Input placeholder="输入关键字搜索"  size="large" onChange={this.handleInputChange.bind(this)}/>
  				</div>
  				<div className='item'>
  					<Select defaultValue="nickname" size="large" style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
      					<Option value="nickname">昵称</Option>
      					<Option value="auditingcust">审核人</Option>
    				</Select>
  				</div> 			
  			</div>
    		<Table columns={columns} rowKey={record => record.orderid} 
    		dataSource={items} 
    		pagination={pagination}
    		loading={loading}
    		onChange={this.handleTableChange.bind(this)} />
    	</Card>
  	);
  }
}

orderDetail.contextTypes = contextTypes;
orderDetail.propTypes = propTypes;
function mapStateToProps(state) {
  const {orderdetail} = state;
  console.log(orderdetail)

  return {items: orderdetail.items,pagination: orderdetail.pagination,loading:orderdetail.loading,keywords:orderdetail.keywords,field:orderdetail.field};

}

export default connect(mapStateToProps)(orderDetail)
