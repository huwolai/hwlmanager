 import React, { PropTypes } from 'react'
import { Table,Card, Icon,Input,Select,Button } from 'antd';
 import { connect } from 'react-redux'
 const Option = Select.Option;
const propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  keywords: PropTypes.string,
  field: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class taskDetail extends React.Component {
  constructor (props) {
    console.log('constructor')
    super(props)
	  this.props.dispatch({
      type: 'task/detail/columns'
    });

    var taskid =  this.props.location.query.taskid
    console.log('taskid=' + taskid)

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
      type: 'task/detail/id',
      payload:{taskid:taskid,pageIndex:pageIndex,pageSize:pagination.pageSize,keywords:''}
    });

  }

 handleTableChange(pager, filters, sorter) {
  const {keywords,pagination,field,location:{ query:{taskid}}} = this.props
    this.props.dispatch({
      type: 'task/detail/id',
      payload:{taskid:taskid,pageIndex:pager.current,pageSize:pager.pageSize,keywords:keywords,field:field}
    });
 }

  handleInputChange(e) {
  	console.log('e===' + e.target.value)
  	this.props.dispatch({
      type: 'task/detail/condition/keywords',
      payload:{keywords:e.target.value}
    });
  }

  handleSelectChange(value) {
  	console.log(`selected ${value}`);
  	this.props.dispatch({
      type: 'task/detail/condition/field',
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
      		type: 'task/detail/id',
      		payload:{taskid:taskid,pageIndex:pagination.current,pageSize:pagination.pageSize,keywords:keywords,field:field}
    	});
  	}
  }

  render() {
  	const { items,columns,loading,pagination } = this.props
	return (
  		<Card>
  			<div className='condition' >
  				<div className='item'>
  					<Input placeholder="输入关键字搜索"  size="large" onChange={this.handleInputChange.bind(this)}/>
  				</div>
  				<div className='item'>
  					<Select defaultValue="nickname" size="large" style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
      					<Option value="nickname">昵称1</Option>
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

taskDetail.contextTypes = contextTypes;
taskDetail.propTypes = propTypes;
function mapStateToProps(state) {
  const {taskdetail} = state;
  console.log(taskdetail)

  return {items: taskdetail.items,pagination: taskdetail.pagination,columns:taskdetail.columns,loading:taskdetail.loading,keywords:taskdetail.keywords,field:taskdetail.field};

}

export default connect(mapStateToProps)(taskDetail)
