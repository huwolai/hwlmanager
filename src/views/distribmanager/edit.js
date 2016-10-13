 import React, {
   PropTypes
 } from 'react'
 import {
   Table,
   Form,
   Radio,
   Card,
   Icon,
   Input,
   Select,
   Button,
   Spin,
   InputNumber
 } from 'antd';
 import config from '../../services/config';
 import cookie from 'js-cookie';
 const RadioGroup = Radio.Group;
 const FormItem = Form.Item;
 import {
   connect
 } from 'react-redux'
 const Option = Select.Option;
 const propTypes = {
   model: PropTypes.object,
   prodDetail: PropTypes.object,
   prodList: PropTypes.array,
   pagination: {},
   completion: PropTypes.bool,
   loading: false
 };

 const contextTypes = {
   router: PropTypes.object.isRequired,
   store: PropTypes.object.isRequired
 };

 class distribEdit extends React.Component {
   constructor(props) {
     super(props)
   }


   //组件加载
   componentDidMount() {
     const {
       pagination
     } = this.props
     let distributionId = this.props.location.query.distribution_id
     let prodId = this.props.location.query.prod_id

     if (prodId) {
       this.props.dispatch({
         type: 'proddetail/get',
         payload: {
           prodId: prodId
         }
       })
     }

     this.props.dispatch({
       type: 'prod/search',
       payload: {
         page_index: 1,
         page_size: 20,
         "merchant_id": "",
         flags: "",
         keyword: ""
       }
     });

     if (distributionId) {
       //查询分销详情
       this.props.dispatch({
         type: 'distrib/detail/get',
         payload: {
           distribution_id: distributionId
         }
       })

     }
   };
   //组件卸载
   componentWillUnmount() {
     //清空商品数据
     this.props.dispatch({
       type: 'proddetail/get/clear'
     });
     //清空分销数据
     this.props.dispatch({
       type: 'distrib/clear'
     });
   }

   handleProdSearch(value) {
     console.log(`handleProdChange ${value}`);
     const {
       pagination
     } = this.props
     this.props.dispatch({
       type: 'prod/search',
       payload: {
         page_index: 1,
         page_size: 20,
         "merchant_id": "",
         flags: "",
         keyword: value
       }
     });


   };

   handleProdSelect(value) {
     console.log(`handleProdSelect ${value}`);
     this.props.dispatch({
       type: 'proddetail/get',
       payload: {
         prodId: value
       }
     })
   };

   //佣金编号
   handleCsnChange(v) {
     console.log(v)
     this.props.dispatch({
       type: 'distrib/model/change',
       payload: {
         csn_rate: v
       }
     });
   };

   handleSubmit(e) {
     e.preventDefault();
     const {
       model,
       prodDetail
     } = this.props
     this.props.form.validateFields((errors, values) => {
       if (!!errors) {
         console.log('Errors in form!!!');
         return;
       }
       console.log("handleSubmit")
       let distributionId = this.props.location.query.distribution_id
       if (distributionId) {
         model.id = parseInt(distributionId)
       }
       model.prod_id = prodDetail.id
       this.props.dispatch({
         type: 'distrib/addOrUpdate',
         payload: model
       });
     });
   };

   componentWillReceiveProps(nextProps) {

     const {
       completion
     } = nextProps;
     console.log(completion)
     if (completion) {
       //清空分销数据
       this.props.dispatch({
         type: 'distrib/clear'
       });
       this.context.router.push("/distribmanager")
     }


   };

   render() {
     const {
       model,
       prodDetail,
       prodList
     } = this.props
     const {
       getFieldProps
     } = this.props.form;

     const prodListOptions = prodList.map(d => <Option key={d.id} value={d.id}>({d.id}) {d.title}</Option>);

     const formItemLayout = {
       labelCol: {
         span: 6
       },
       wrapperCol: {
         span: 14
       },
     };
     const formItemLayout6 = {
       labelCol: {
         span: 6
       },
       wrapperCol: {
         span: 6
       },
     };

     let openId = cookie.get('open_id')
     let prodId = this.props.location.query.prod_id


     return (
       <Form horizontal form={this.props.form} >
          <Spin tip="正在读取数据..." spinning={this.props.loading==true}>
          <FormItem
               {...formItemLayout6}
                label="商品价格"
             >
              <Input type="number" readOnly {...getFieldProps('dis_price',{ rules: [{ required: true }], initialValue: prodDetail.dis_price +"" })} placeholder="折扣价" />
          </FormItem>
           <FormItem
               {...formItemLayout6}
                label="佣金比例"
             >
              <InputNumber value={model.csn_rate} min={0} max={1} step={0.01}  onChange={this.handleCsnChange.bind(this)}/>
              <label style={{color:'red'}}>{(model.csn_rate*prodDetail.dis_price).toFixed(2)}</label>
          </FormItem>
           <FormItem 
        {...formItemLayout6}
        label="商品">
          <Select
            showSearch
            value={prodDetail.title }
            optionLabelProp='children'
            placeholder='输入搜索'
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={false}
            onSelect={this.handleProdSelect.bind(this)}
            onSearch={this.handleProdSearch.bind(this)}
          >
          {prodListOptions}
          </Select>
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
        </FormItem>
        </Spin>

        </Form>
     );
   }
 }

 distribEdit.contextTypes = contextTypes;
 distribEdit = Form.create()(distribEdit);

 function mapStateToProps(state) {
   const {
     distrib,
     prod
   } = state;
   return {
     model: distrib.model,
     prodList: prod.items,
     pagination: prod.pagination,
     prodDetail: prod.prodDetail,
     completion: distrib.completion,
     loading: distrib.loading
   };

 }

 export default connect(mapStateToProps)(distribEdit)