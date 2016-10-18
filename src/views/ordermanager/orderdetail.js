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
  Form,
  Row,
  Col
} from 'antd';
const FormItem = Form.Item;
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
  model: PropTypes.object,
  refreshTable: PropTypes.bool,
  loading: PropTypes.bool
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
    let orderNo = this.props.location.query.order_no
    this.props.dispatch({
      type: 'orderdetail/get',
      payload: {
        order_no: orderNo,
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

  handleProdDetailClick(prod_id) {
    this.context.router.push("/prodedit?prod_id=" + prod_id)
  }
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
      model,
      loading,
      pagination
    } = this.props

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    let columns = [{
      title: '图片',
      dataIndex: 'img',
      key: 'img',
      render: (text, record) => {

        return <div>
          <Image src = {
            record.prod_coverimg + "?width=64&height=64"
          } ></Image>
        </div>
      }
    }, {
      title: '标题',
      dataIndex: 'prod_title',
      key: 'prod_title'
    }, {
      title: '数量',
      dataIndex: 'num',
      key: 'num'
    }, {
      title: '价格',
      dataIndex: 'buy_total_price',
      key: 'buy_total_price'
    }, {
      title: '详情',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return <Button onClick={() => this.handleProdDetailClick(record.prod_id)}>详情</Button>
      }
    }]

    let orderStatusTpl;
    if (model.order_status === 0 && model.pay_status === 1) {
      orderStatusTpl = <label style={{fontSize:18}}>等待确认</label>
    } else if (model.order_status === 1 && model.pay_status === 1) {
      orderStatusTpl = <label style={{color:'#009966',fontSize:18}}>交易完成</label>
    } else if (model.order_status === 2 && model.pay_status === 1) {
      orderStatusTpl = <label style={{fontSize:18}}>交易已取消</label>
    } else if (model.order_status === 5 && model.pay_status === 1) {
      orderStatusTpl = <label style={{fontSize:18}}>交易取消等待商家确认</label>
    } else if (model.order_status === 6 && model.pay_status === 1) {
      orderStatusTpl = <label style={{fontSize:18}}>商户拒绝取消</label>
    } else if (model.pay_status === 0 || model.pay_status === 2) {
      orderStatusTpl = <label style={{fontSize:18}}>等待付款</label>
    } else {
      orderStatusTpl = <label style={{fontSize:18}}>未知状态</label>
    }
    return (
      <div>
  			<Form horizontal>
          <legend>用户信息</legend>
          <Row gutter={16}>
            <Col sm={8}>
              <FormItem
              label="用户ID">
                <p className="ant-form-text">{model.open_id}</p>
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem
              label="收货人">
                <p className="ant-form-text">{model.name}</p>
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem
              label="收货地址">
                <p className="ant-form-text">{model.address}</p>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
           <Col sm={8}>
              <FormItem
              label="联系">
                <p className="ant-form-text">{model.mobile}</p>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Form horizontal>
          <legend>订单信息</legend>
          <Row gutter={16}>
            <Col sm={8}>
                <FormItem
                label="订单编号">
                    <label className="ant-form-text" >{model.no}</label>
                </FormItem>
            </Col>
            <Col sm={8}>
                <FormItem
                  label="创建时间">
                    <p className="ant-form-text" >{model.create_time}</p>
                </FormItem>
            </Col>
            <Col sm={8}>
                <FormItem
                label="订单状态">
                    <label className="ant-form-text" >{orderStatusTpl}</label>
                </FormItem>
            </Col>
          </Row>
           <Table columns={columns} 
                        rowKey={record => record.no} 
                        dataSource={model.items} 
                        pagination={false}
                        loading={loading}/>
          <div style={{float:'right'}}>
             总价格:&nbsp;&nbsp;&nbsp;&nbsp;<label style={{color:'red',fontSize:20}}>{model.real_price}</label>
             &nbsp;&nbsp;&nbsp;&nbsp;
             实付款:&nbsp;&nbsp;&nbsp;&nbsp;<label style={{color:'red',fontSize:20}}>{model.pay_price}</label>
          </div>
        </Form>
        <Form horizontal>
          <legend>其他信息</legend>
           <Row gutter={16}>
            <Col sm={8}>
                <FormItem
                label="取消原因">
                    <label className="ant-form-text" >{model.cancel_reason}</label>
                </FormItem>
            </Col>
            <Col sm={8}>
                <FormItem
                label="拒绝取消原因">
                    <label className="ant-form-text" >{model.reject_cancel_reason}</label>
                </FormItem>
            </Col>
           </Row>
        </Form>
      </div>
    );
  }
}

ordermanager.contextTypes = contextTypes;

function mapStateToProps(state) {
  const {
    orderdetail,
    flags
  } = state;
  return {
    model: orderdetail.model,
    refreshTable: orderdetail.refreshTable,
    pagination: orderdetail.pagination,
    loading: orderdetail.loading
  };

}

export default connect(mapStateToProps)(ordermanager)