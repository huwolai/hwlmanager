import React, {
  PropTypes
} from 'react'
import {
  Table,
  Card,
  Icon,
  Input,
  Select,
  Button,
  Popconfirm
} from 'antd';
import {
  connect
} from 'react-redux'
import {
  Image
} from '../../components/images'
import {
  imageWithSmall
} from '../../services/imageutils'
const Option = Select.Option;
const propTypes = {
  items: PropTypes.array,
  pagination: {},
  refreshTable: PropTypes.bool,
  merchants: PropTypes.array,
  merchantId: PropTypes.string,
  flag: PropTypes.string,
  loading: false,
  flags: PropTypes.array
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class ordermanager extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      pagination
    } = this.props
    this.props.dispatch({
      type: 'order/list',
      payload: {
        page_index: 1,
        page_size: pagination.pageSize
      }
    });
  }

  handleTableChange(pager, filters, sorter) {
    const {
      keyword,
      pagination
    } = this.props
    this.props.dispatch({
      type: 'order/list',
      payload: {
        page_index: pager.current,
        page_size: pagination.pageSize,
      }
    });
  }


  handleDetailClick() {

  }
  handleDeleteClick(option) {
    this.props.dispatch({
      type: 'distrib/delete',
      payload: {
        id: option.id
      }
    });
  };

  componentWillReceiveProps(nextProps) {

    const {
      pagination,
      refreshTable,
      merchantId,
      flag
    } = nextProps
    if (refreshTable) {
      this.props.dispatch({
        type: 'distrib/search',
        payload: {
          page_index: pagination.pageIndex,
          page_size: pagination.pageSize
        }
      });
    }
  }

  render() {
    const {
      items,
      loading,
      pagination
    } = this.props
    let columns = [{
      title: '商户',
      dataIndex: 'merchant_name',
      key: 'merchant_name'
    }, {
      title: '订单号',
      dataIndex: 'order_no',
      key: 'order_no'
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '购买金额',
      dataIndex: 'real_price',
      key: 'real_price'
    }, {
      title: '付款金额',
      dataIndex: 'pay_price',
      key: 'pay_price'
    }, {
      title: '优惠金额',
      dataIndex: 'coupon_amount',
      key: 'coupon_amount'
    }, {
      title: '付款状态',
      dataIndex: 'pay_status',
      key: 'pay_status',
      render: (text, record) => {
        if (text == "1") {
          return <label style={{color:'#009966'}}>已付款</label>
        }
        if (text == "2") {
          return <label>待付款</label>
        }
        if (text == "0") {
          return <label>未付款</label>
        }
      }
    }, {
      title: '订单状态',
      dataIndex: 'order_status',
      key: 'order_status',
      render: (text, record) => {
        if (text == "1") {
          return <label style={{color:'#009966'}}>已确认</label>
        }
        if (text == "2") {
          return <label>已取消</label>
        }
        if (text == "0") {
          return <label>未确认</label>
        }
        if (text == "5") {
          return <label>等待取消确认</label>
        }
        if (text == "6") {
          return <label>等待取消被拒绝</label>
        }
      }
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    }, {
      title: '操作',
      dataIndex: 'opt',
      key: 'opt',
      render: (text, record) => {

        return <div>
          <Button onClick={() => this.handleDetailClick()}>详情</Button>
        </div>
      }
    }]
    return (
      <Card>
  			<div className='condition' >
         				
  			</div>
    		<Table columns={columns} rowKey={record => record.order_no} 
    		dataSource={items} 
    		pagination={pagination}
    		loading={loading}
    		onChange={this.handleTableChange.bind(this)} />
    	</Card>
    );
  }
}

ordermanager.contextTypes = contextTypes;

function mapStateToProps(state) {
  const {
    order,
    flags
  } = state;
  return {
    items: order.items,
    refreshTable: order.refreshTable,
    pagination: order.pagination,
    loading: order.loading
  };

}

export default connect(mapStateToProps)(ordermanager)