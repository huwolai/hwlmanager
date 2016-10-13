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
  flags: PropTypes.array,
  keyword: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class merchant extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      pagination,
      flag,
      keyword
    } = this.props
    this.props.dispatch({
      type: 'prod/search',
      payload: {
        page_index: 1,
        page_size: pagination.page_size,
        merchant_id: "",
        flags: flag,
        keyword: keyword
      }
    });
    this.props.dispatch({
      type: 'merchant/search',
      payload: {}
    })
    this.props.dispatch({
      type: 'flags/search',
      payload: {
        types: "PRODUCT",
        status: "1"
      }
    })
  }

  handleTableChange(pager, filters, sorter) {
    const {
      pagination,
      merchantId,
      flag,
      keyword
    } = this.props
    this.props.dispatch({
      type: 'prod/search',
      payload: {
        page_index: pager.current,
        page_size: pagination.page_size,
        merchant_id: merchantId,
        flags: flag,
        keyword: keyword
      }
    });
  }

  handleSelectChange(value) {
    const {
      keywords,
      pagination,
      flag,
      keyword
    } = this.props
    if (!value) {
      value = ""
    }
    this.props.dispatch({
      type: 'prod/search',
      payload: {
        page_index: 1,
        page_size: pagination.page_size,
        merchant_id: value,
        flags: flag,
        keyword: keyword
      }
    });
  }
  handleFlagSelectChange(value) {
    const {
      keywords,
      pagination,
      merchantId,
      keyword
    } = this.props
    if (!value) {
      value = ""
    }
    this.props.dispatch({
      type: 'prod/search',
      payload: {
        page_index: 1,
        page_size: pagination.page_size,
        merchant_id: merchantId,
        flags: value,
        keyword: keyword
      }
    });
  }

  handleEditClick() {
      this.context.router.push("/prodedit")
    }
    //改变商品状态
  changeStatusConfirm(status, prodId) {
    this.props.dispatch({
      type: 'prodstatus/change',
      payload: {
        status: status,
        prodId: prodId
      }
    });
  }

  handleProdRecomClick(isRecom, prodId) {
    this.props.dispatch({
      type: 'prodrecom/put',
      payload: {
        is_recom: isRecom,
        prod_id: prodId
      }
    });
  }
  handleToDetailClick(prodId) {
    this.context.router.push("/prodedit?prod_id=" + prodId)
  }

  componentWillReceiveProps(nextProps) {

    const {
      pagination,
      refreshTable,
      merchantId,
      flag,
      keyword
    } = nextProps
    if (refreshTable) {
      this.props.dispatch({
        type: 'prod/search',
        payload: {
          page_index: pagination.page_index,
          page_size: pagination.page_size,
          merchant_id: merchantId,
          flag: flag,
          keyword: keyword
        }
      });
    }
  }

  render() {
    const {
      items,
      loading,
      pagination,
      merchants,
      flags
    } = this.props
    const merchantsOptions = merchants.map(d => <Option key={d.id} value={d.id}>{d.name}({d.mobile})</Option>);
    const flagsOptions = flags.map(d => <Option key={d.id} value={d.flag}>{d.name}</Option>);
    let columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '图片',
      dataIndex: 'prod_imgs',
      key: 'prod_imgs',
      render: (text, record) => {
        console.log(record.prod_imgs)
        if (record.prod_imgs) {
          let imgUrl = imageWithSmall(record.prod_imgs[0].url)
          console.log(imgUrl)
          return <Image  src={imgUrl} style={{ width: 60, height: 60 }} ></Image>
        }
        return text

      }
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '分类',
      dataIndex: 'category_name',
      key: 'category_name'
    }, {
      title: '价格',
      dataIndex: 'dis_price',
      key: 'dis_price',
      render: (text, record) => {

        return <label style={{color: 'red'}}>{text}</label>
      }
    }, {
      title: '标记',
      dataIndex: 'flag',
      key: 'flag',
      render: (text, record) => {
        if (text == "merchant_default") {
          return "厨师服务"
        }
      }
    }, {
      title: '商户名称',
      dataIndex: 'merchant_name',
      key: 'merchant_name',
      render: (text, record) => {

        return text
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (text == "1") {
          return "上架"
        }
        return <label style={{color: '#dc5249'}}>下架</label>
      }
    }, {
      title: '是否推荐',
      dataIndex: 'is_recom',
      key: 'is_recom',
      render: (text, record) => {
        if (record.flag == "merchant_default") {
          return ""
        }
        if (text == 1) {
          return <Button onClick={()=>this.handleProdRecomClick(0,record.id)}>取消</Button>
        } else {
          return <Button onClick={()=>this.handleProdRecomClick(1,record.id)}>推荐</Button>
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        let confirmTpl;
        if (record.status == 1) {
          confirmTpl =
            <Popconfirm title="确定下架吗？" onConfirm={()=>this.changeStatusConfirm(0,record.id)}>
                    <Button >下架</Button>
                  </Popconfirm>

        } else {
          confirmTpl = (
            <Popconfirm title="确定上架吗" onConfirm={()=>this.changeStatusConfirm(1,record.id)}>
                    <Button >上架</Button>
                  </Popconfirm>
          )
        }


        return (
          <div>
                {confirmTpl}
                &nbsp;&nbsp;
                <Button onClick={()=>this.handleToDetailClick(record.id)}>详情</Button>
              </div>

        )

      }
    }]
    return (
      <Card>
  			<div className='condition' >
          <div className='item'>
              <Select
              style={{ width: 180 }}
              placeholder='商户名称'
              allowClear={true}
              showArrow={true}
              onChange={this.handleSelectChange.bind(this)}>
            {merchantsOptions}
          </Select>
          </div>
          <div className='item'>
              <Select
              style={{ width: 180 }}
              placeholder='商品类型'
              allowClear={true}
              showArrow={true}
              onChange={this.handleFlagSelectChange.bind(this)}>
                {flagsOptions}
              </Select>
          </div>
          <div className='itemRight'>
            <Button onClick={this.handleEditClick.bind(this)}>添加商品</Button>
          </div>				
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

merchant.contextTypes = contextTypes;

function mapStateToProps(state) {
  const {
    prod,
    merchant,
    flags
  } = state;
  console.log(prod.items)
  return {
    merchantId: prod.merchantId,
    flag: prod.flag,
    flags: flags.items,
    keyword: prod.keyword,
    merchants: merchant.items,
    items: prod.items,
    refreshTable: prod.refreshTable,
    pagination: prod.pagination,
    loading: prod.loading
  };

}

export default connect(mapStateToProps)(merchant)