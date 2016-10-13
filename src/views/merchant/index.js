 import React, { PropTypes } from 'react'
import { Table,Card, Icon,Input,Select,Button,Popconfirm } from 'antd';
 import { connect } from 'react-redux'
 import {  Link } from 'react-router';
 const Option = Select.Option;
const propTypes = {
  items: PropTypes.array,
  pagination: {},
  refreshTable: false,
  columns: [],
  loading: false,
  keywords: PropTypes.string,
  field: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class merchant extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const {pagination,field} = this.props
    this.props.dispatch({
      type: 'merchant/search',
      payload:{pageIndex:1,pageSize:pagination.pageSize,keywords:'',field:field}
    });
  }


//详情点击
 handleDetailClick(merchantId){
    this.context.router.push('merchantdetail?merchant_id='+merchantId);
 }

 //审核
 handleAudilClick(merchantId){
    this.props.dispatch({
      type: 'merchantaudit/post',
      payload:{merchant_id:merchantId}
    });
 }
  componentWillReceiveProps(nextProps) {

	   const {keywords,pagination,refreshTable} = nextProps
     if (refreshTable) {
       this.props.dispatch({
          type: 'merchant/search',
          payload:{pageIndex:pagination.current,pageSize:pagination.pageSize}
        });
     }

  }

  render() {
  	const { items,loading,pagination } = this.props
    let columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id'
    },{
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },{
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile'
    },{
        title: '服务地址',
        dataIndex: 'address',
        key: 'address'
    },{
        title: '服务范围',
        dataIndex: 'cover_distance',
        key: 'cover_distance',
        render: (text,record) => {
          
          return text + "米"
        }
    },{
        title: '权重',
        dataIndex: 'weight',
        key: 'weight'
    },{
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => {
          if (text==1) {
            return "已通过"
          }else{
            return "未审核"
          }

        }
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text,record) => {
          let btbTpl;
          if (record.status==0) {
              btbTpl =<Popconfirm title="确定通过？" onConfirm={()=>this.handleAudilClick(record.id)}>
                    <Button >审核</Button>
                  </Popconfirm>
          } 
           
           return <div><Button onClick={()=>this.handleDetailClick(record.id)}>详情</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                      {btbTpl}
                    </div>
        }
    }]
	return (
  		<Card>
  			<div className='condition' >
  				
  			</div>
    		<Table columns={columns} rowKey={record => record.id} 
    		dataSource={items} 
    		pagination={pagination}
    		loading={loading}/>
    	</Card>
  	);
  }
}

merchant.contextTypes = contextTypes;

function mapStateToProps(state) {
  const {merchant} = state;

  return {items: merchant.items,refreshTable: merchant.refreshTable,pagination: merchant.pagination,columns:merchant.columns,loading:merchant.loading,keywords:merchant.keywords,field:merchant.field};

}

export default connect(mapStateToProps)(merchant)
