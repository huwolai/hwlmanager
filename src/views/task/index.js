 import React, { PropTypes } from 'react'
import { Table,Card, Icon,Input,Select,Button } from 'antd';
 import { connect } from 'react-redux'
  import {  Link } from 'react-router';
 const Option = Select.Option;
const propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  keywords: PropTypes.string,
  field: PropTypes.string,
  switchSuccess: PropTypes.bool
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class task extends React.Component {
  constructor (props) {
    super(props)
	this.props.dispatch({
      type: 'task/search/columns'
    });

   const {keywords,pagination,field} = this.props
   this.props.dispatch({
          type: 'task/search',
          payload:{pageIndex:pagination.pageIndex,pageSize:pagination.pageSize,keywords:keywords,field:field}
    });

  }

  componentDidMount () {
    const {pagination} = this.props
  }

 handleTableChange(pager, filters, sorter) {
  const {keywords,pagination,field} = this.props
    this.props.dispatch({
      type: 'task/search',
      payload:{pageIndex:pager.current,pageSize:pager.pageSize,keywords:keywords,field:field}
    });
 }

  handleInputChange(e) {
  	console.log('e===' + e.target.value)
  	this.props.dispatch({
      type: 'task/search/condition/keywords',
      payload:{keywords:e.target.value}
    });
  }

  handleSelectChange(value) {
  	console.log(`selected ${value}`);
  	this.props.dispatch({
      type: 'task/search/condition/field',
      payload:{field:value}
    });
  }

  handlePublishClick() {
    this.context.router.push('/taskpublish')
  }

  handleOperateClick(isOpen,taskid,ccustid){
    this.props.dispatch({
      type: 'task/switch',
      payload:{taskid:taskid,ccustid:ccustid,isclose:!isOpen}
    });
  }

  componentWillReceiveProps(nextProps) {

    console.log('componentWillReceiveProps')
	 const {keywords,pagination,field,switchSuccess} = nextProps

  	if (this.props.field != field|| keywords!= this.props.keywords||(switchSuccess&&switchSuccess!=this.props.switchSuccess)) {
  		this.props.dispatch({
      		type: 'task/search',
      		payload:{pageIndex:pagination.pageIndex,pageSize:pagination.pageSize,keywords:keywords,field:field}
    	});
  	}
  }

  render() {
  	const { items,loading,pagination } = this.props
    let columns = [{
        title: 'ID',
        dataIndex: 'taskid',
        key: 'taskid'
    }
    , {
        title: '任务名称',
        dataIndex: 'taskname',
        key: 'taskname'
    }
    , {
        title: '任务种类',
        dataIndex: 'type',
        key: 'type',
        render: (text) => {
            if (text=='1') {
                return '软件（含游戏）'
            }
            if (text=='2') {
                return '线下推广'
            }
            if (text=='3') {
                return '线上推广'
            }
        }
    }
    , {
        title: '任务要求',
        dataIndex: 'taskrequire',
        key: 'taskrequire',
    }, {
        title: '执行费',
        dataIndex: 'amount',
        key: 'amount',
    }, {
        title: '承接要求',
        dataIndex: 'settlementrule',
        key: 'settlementrule',
    }, 
    // {
    //     title: '凭证要求',
    //     dataIndex: 'voucherrequire',
    //     key: 'voucherrequire',
    // },
     {
        title: '任务状态',
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => {

            if (record.isclosed=='1') {

                return '关闭'
            }else{
                if (text === '0') {
                return '关闭'
            }
            if (text === '1') {
                return '新任务'
            }
            if (text === '2') {
                return '执行中'
            }
            if (text === '3') {
                return '已完成'
            }
            }
            
            return ''
        }
    }, {
        title: '操作',
        dataIndex: 'opt',
        key: 'opt',
        render: (text,record) =>{
            if (record.isclosed=='1') {

              return <Button onClick={()=>this.handleOperateClick(true,record.taskid,record.ccustid)}>打开</Button>
            }else{
              return <Button onClick={()=>this.handleOperateClick(false,record.taskid,record.ccustid)}>关闭</Button>
            }
        }
    },{
        title: '商户名称',
        dataIndex: 'nickname',
        key: 'nickname',
    }, {
        title: '任务详情',
        key: 'taskDetail',
        render: (text,record) => <Link to={{pathname:'taskdetail',query:{taskid:record.taskid}}}>详情</Link>,
    }]
	return (
  		<Card>
  			<div className='condition' >
  				<div className='item'>
  					<Input placeholder="输入关键字搜索"  size="large" onChange={this.handleInputChange.bind(this)}/>
  				</div>
  				<div className='item'>
  					<Select defaultValue="taskname" size="large" style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
      					<Option value="taskname">任务名称</Option>
    				</Select>
  				</div> 
          <div className='itemRight'>
            <Button onClick={this.handlePublishClick.bind(this)} size="large">发布任务</Button>
          </div> 				
  			</div>
    		<Table columns={columns} rowKey={record => record.taskid} 
    		dataSource={items} 
    		pagination={pagination}
    		loading={loading}
    		onChange={this.handleTableChange.bind(this)} />
    	</Card>
  	);
  }
}

task.contextTypes = contextTypes;
task.propTypes = propTypes;
function mapStateToProps(state) {
  const {task} = state;

  return {items: task.items,pagination: task.pagination,columns:task.columns,loading:task.loading,keywords:task.keywords,field:task.field,switchSuccess:task.switchSuccess};

}

export default connect(mapStateToProps)(task)
