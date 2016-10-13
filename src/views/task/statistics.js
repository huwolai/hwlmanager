 import React, { PropTypes } from 'react'
import { Table,Card, Icon,Input,Select,Button } from 'antd';
 import { connect } from 'react-redux'
  import {  Link } from 'react-router';
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

class statistics extends React.Component {
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
      type: 'task/statistics/search',
      payload:{pageIndex:1,pageSize:pagination.pageSize,keywords:''}
    });
  }

 handleTableChange(pager, filters, sorter) {
  const {keywords,pagination,field} = this.props
    this.props.dispatch({
      type: 'task/statistics/search',
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

  componentWillReceiveProps(nextProps) {

  const {keywords,pagination,field} = nextProps

    if (this.props.field != field|| keywords!== this.props.keywords) {
      this.props.dispatch({
          type: 'task/statistics/search',
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
    },{
        title: '任务名称',
        dataIndex: 'taskname',
        key: 'taskname'
    },{
        title: '任务时间',
        key: 'tasktime',
        render: (txt,record) => {
          let starttimeStr = record.starttime.substr(2,14).replace(/-/g, "/")
           let endtimeStr = record.endtime.substr(2,14).replace(/-/g, "/")
          return `${starttimeStr} ~ ${endtimeStr}`
        }
    },{
        title: '已承接人数',
        dataIndex: 'undertakenum',
        key: 'undertakenum'
    },{
        title: '已完成人数',
        dataIndex: 'completenum',
        key: 'completenum'
    },{
        title: '已发放金额',
        dataIndex: 'settledAmount',
        key: 'settledAmount',
    },{
        title: '账单详情',
        dataIndex: 'operate1',
        key: 'operate1',
        render: (txt,record) => <Link to={{pathname:'orderdetail',query:{taskid:record.taskid}}}>详情</Link>
    },{
        title: '商户名称',
        dataIndex: 'nickname',
        key: 'nickname'
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

statistics.contextTypes = contextTypes;
statistics.propTypes = propTypes;
function mapStateToProps(state) {
  const {statistics} = state;

  return {items: statistics.items,pagination: statistics.pagination,loading:statistics.loading,keywords:statistics.keywords,field:statistics.field};

}

export default connect(mapStateToProps)(statistics)
