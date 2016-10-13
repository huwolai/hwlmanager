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

class merchant extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      pagination
    } = this.props
    this.props.dispatch({
      type: 'distrib/search',
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
      type: 'distrib/search',
      payload: {
        page_index: pager.current,
        page_size: pagination.pageSize,
      }
    });
  }


  handleEditClick(option) {
    console.log(option)
    if (option) {
      this.context.router.push(`/distribedit?prod_id=${option.prod_id}&distribution_id=${option.distribution_id}`)
    } else {
      this.context.router.push("/distribedit")
    }

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
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '商品ID',
      dataIndex: 'prod_id',
      key: 'prod_id'
    }, {
      title: '商品标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '商品价格',
      dataIndex: 'dis_price',
      key: 'dis_price'
    }, {
      title: '佣金比例',
      dataIndex: 'csn_rate',
      key: 'csn_rate'
    }, {
      title: '佣金',
      dataIndex: 'csn_money',
      key: 'csn_money',
      render: (text, record) => {

        return (record.dis_price * record.csn_rate).toFixed(2)
      }
    }, {
      title: '操作',
      dataIndex: 'opt',
      key: 'opt',
      render: (text, record) => {

        return <div>
          <Button onClick={() => this.handleEditClick({prod_id:record.prod_id,distribution_id:record.id})}>修改</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm title="确定删除吗" onConfirm={()=>this.handleDeleteClick({id:record.id})}>
                    <Button >删除</Button>
                  </Popconfirm>
        </div>
      }
    }]
    return (
      <Card>
  			<div className='condition' >
          <div className='itemRight'>
            <Button onClick={() => this.handleEditClick()}>添加分销</Button>
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
    distrib,
    merchant,
    flags
  } = state;
  console.log(distrib.items)
  return {
    items: distrib.items,
    refreshTable: distrib.refreshTable,
    pagination: distrib.pagination,
    loading: distrib.loading
  };

}

export default connect(mapStateToProps)(merchant)