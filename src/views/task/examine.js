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

class examine extends React.Component {
  constructor (props) {
    super(props)
  }

  examineTask(taskid) {
  	console.log(taskid)
  	this.context.router.push('/examinedetail?taskid=' +taskid)
  }

  componentDidMount () {
    const {pagination} = this.props
    this.props.dispatch({
      type: 'task/examine/search',
      payload:{pageIndex:1,pageSize:pagination.pageSize,keywords:''}
    });
  }

 handleTableChange(pager, filters, sorter) {
  const {keywords,pagination,field} = this.props
    this.props.dispatch({
      type: 'task/examine/search',
      payload:{pageIndex:pager.current,pageSize:pager.pageSize,keywords:keywords,field:field}
    });
 }

  handleInputChange(e) {
  	console.log('e===' + e.target.value)
  	this.props.dispatch({
      type: 'task/examine/condition/keywords',
      payload:{keywords:e.target.value}
    });
  }

  handleSelectChange(value) {
  	console.log(`selected ${value}`);
  	this.props.dispatch({
      type: 'task/examine/condition/field',
      payload:{field:value}
    });
  }

  handlePublishClick() {
    this.context.router.push('/taskpublish')
  }

  componentWillReceiveProps(nextProps) {

	const {keywords,pagination,field} = nextProps

  	if (this.props.field != field|| keywords!== this.props.keywords) {
  		this.props.dispatch({
      		type: 'task/examine/search',
      		payload:{pageIndex:1,pageSize:pagination.pageSize,keywords:keywords,field:field}
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
    },{
        title: '待审核单数',
        dataIndex: 'unaudnum',
        key: 'unaudnum'
    },{
        title: '商户名称',
        dataIndex: 'nickname',
        key: 'nickname',
    },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (txt,record) => <Button onClick={()=>this.examineTask(record.taskid)}>审核</Button>
    }]

	return (
  		<Card>
  			<div className='condition' >
  				
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

examine.contextTypes = contextTypes;
examine.propTypes = propTypes;
function mapStateToProps(state) {
  const {examine} = state;

  return {items: examine.items,pagination: examine.pagination,loading:examine.loading,keywords:examine.keywords,field:examine.field};

}

export default connect(mapStateToProps)(examine)
