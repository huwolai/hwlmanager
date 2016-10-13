 import React, { PropTypes } from 'react'
import { Message,Form,Table,Card, Icon,Input,Select,Button,Popconfirm,Modal } from 'antd';
 import { connect } from 'react-redux'
 import {  Link } from 'react-router';
 const FormItem = Form.Item
 const Option = Select.Option;
const propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  keywords: PropTypes.string,
  field: PropTypes.string,
  auditingSuccess: PropTypes.bool,
  //显示拒绝原因填写modal
  showRefuseResonModal:PropTypes.bool,
  //审核的信息
  audParamObj: PropTypes.object
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class examineDetail extends React.Component {
  constructor (props) {
    console.log('constructor')
    super(props)


  }

  getCurrPage() {
    // const {pagination} = this.props
    
    // var pageIndex = pagination.current;
   
    // let  totalPage = 0;
    // if ( pagination.total%pagination.pageSize===0) {
    //   totalPage = pagination.pageSize/pagination.total
    // }else{
    //   totalPage = parseInt(pagination.total/pagination.pageSize)+1
    // }
    // if (pageIndex>totalPage) {
    //    pageIndex = totalPage
    // }
    return 1
  }

  componentDidMount () {
    console.log('componentDidMount')
    const {pagination,field} = this.props
    var taskid =  this.props.location.query.taskid

    let pageIndex = this.getCurrPage()

    this.props.dispatch({
      type: 'task/detail/id',
      payload:{taskid:taskid,pageIndex:pageIndex,pageSize:pagination.pageSize,keywords:'',auditingstatus:0,field:field}
    });

  }

 handleTableChange(pager, filters, sorter) {
  const {keywords,pagination,field,location:{ query:{taskid}}} = this.props
    this.props.dispatch({
      type: 'task/detail/id',
      payload:{taskid:taskid,pageIndex:pager.current,pageSize:pagination.pageSize,keywords:keywords,auditingstatus:0,field:field}
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

  audConfirm(pass,orderid) {
    var taskid =  this.props.location.query.taskid
    this.props.dispatch({
      type: 'task/aud/status',
      payload: {auditingstatus:pass,orderid:orderid,taskid:taskid}
    })
  }

   handleModalShow(orderid) {
    var taskid =  this.props.location.query.taskid
    this.props.dispatch({
      type: 'task/aud/refuse/show',
      payload: {orderid:orderid,taskid:taskid}
     })
   }

   handleModalCancel(){
     this.props.dispatch({
      type: 'task/aud/refuse/hidden',
      payload: {}
     })
   }

   handleModalSubmit() {
    const {audParamObj,form} = this.props
    var refuseReson =form.getFieldValue('refuseReson')
    if (!refuseReson){
      Message.error('拒绝原因不能为空！');
      return
    }
    this.props.dispatch({
      type: 'task/aud/status',
      payload: {memo:refuseReson,auditingstatus:2,orderid:audParamObj.orderid,taskid:audParamObj.taskid}
    })

    this.handleModalCancel()
   }

  componentWillReceiveProps(nextProps) {

    console.log('componentWillReceiveProps')

	const {auditingSuccess,keywords,pagination,field,location:{ query:{taskid}}} = nextProps

  	if (this.props.field != field|| keywords!== this.props.keywords||auditingSuccess) {
  		this.props.dispatch({
      		type: 'task/detail/id',
      		payload:{taskid:taskid,pageIndex:pagination.pageIndex,pageSize:pagination.pageSize,keywords:keywords,auditingstatus:0,field:field}
    	});
  	}
  }

  render() {
  	const { items,loading,pagination,showRefuseResonModal } = this.props
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
    },{
        title: '凭证详情',
        dataIndex: 'operate',
        key: 'operate',
        render: (text,record) => <Link to={{pathname:'voucher',query:{orderid:record.orderid,taskid:record.taskid}}}>详情</Link>
    }, {
        title: '审核操作',
        key: 'operate2',
        render: (text,record) => {
 
            return (
              <div>
              <Popconfirm title="确定要通过这个任务吗？"  onConfirm={()=>this.audConfirm(1,record.orderid)}>
                <Button >通过</Button>
               </Popconfirm>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={()=>this.handleModalShow(record.orderid)}>拒绝</Button>
              </div>
           
            ) 
        }
    }]
  const { getFieldProps } = this.props.form;
  const refuseResonProps = getFieldProps('refuseReson', {
    rules: [
      { required: true,message: '拒绝原因不能为空！'},
    ]
  });
	return (
  		<Card>
  			<div className='condition' >
  				<div className='item'>
  					<Input placeholder="输入关键字搜索"  size="large" onChange={this.handleInputChange.bind(this)}/>
  				</div>
  			</div>
    		<Table columns={columns} rowKey={record => record.orderid} 
    		dataSource={items} 
    		pagination={pagination}
    		loading={loading}
    		onChange={this.handleTableChange.bind(this)} />
        <Modal title="拒绝原因" 
        visible={showRefuseResonModal}
        onOk={this.handleModalSubmit.bind(this)} 
        onCancel={this.handleModalCancel.bind(this)}
        >
        <Form horizontal form={this.props.form}>
          <FormItem>
            <Input type="textarea" {...refuseResonProps} />
          </FormItem>
        </Form>
        </Modal>
    	</Card>
  	);
  }
}

examineDetail.contextTypes = contextTypes;
examineDetail.propTypes = propTypes;

examineDetail = Form.create()(examineDetail);

function mapStateToProps(state) {
  const {taskdetail} = state;
  console.log(taskdetail)

  return {items: taskdetail.items,pagination: taskdetail.pagination,loading:taskdetail.loading,keywords:taskdetail.keywords,field:taskdetail.field,auditingSuccess:taskdetail.auditingSuccess,showRefuseResonModal:taskdetail.showRefuseResonModal,audParamObj:taskdetail.audParamObj};

}

export default connect(mapStateToProps)(examineDetail)
