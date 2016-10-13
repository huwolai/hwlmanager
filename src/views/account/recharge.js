 import React, {
   PropTypes
 } from 'react'
 import {
   Modal,
   Message,
   Table,
   Card,
   Icon,
   Input,
   Select,
   Button,
   Form,
   InputNumber,
   DatePicker,
   Spin
 } from 'antd';
 import {
   connect
 } from 'react-redux'
 const FormItem = Form.Item
 const Option = Select.Option;

 const propTypes = {
   merchants: PropTypes.array,
   mvalue: PropTypes.string,
   success: PropTypes.bool
 };

 const contextTypes = {
   router: PropTypes.object.isRequired,
   store: PropTypes.object.isRequired
 };

 class recharge extends React.Component {
   constructor(props) {
     super(props)
   }

   handleSubmit() {
     console.log('handleSubmit')
     const {
       form,
       mvalue,
       dispatch
     } = this.props
     var amount = form.getFieldValue('amount')

     if (!mvalue || mvalue == '') {
       Message.error('请选择商户')
       return
     }

     if (!amount || amount == '' || amount == 0) {
       Message.error('请输入充值金额')
       return
     }

     dispatch({
       type: 'recharge/merchant',
       payload: {
         amount: amount,
         custid: mvalue
       }
     })


   }
   handleMerchantSearchChange(value) {
     console.log('value==' + value)
     this.props.dispatch({
       type: 'comm_merchant/mlabel',
       payload: value
     })

     this.props.dispatch({
       type: 'comm_merchant/search',
       payload: {
         pageIndex: 1,
         pageSize: 10,
         keywords: value,
         field: 'nickname'
       }
     })
   }

   handleMerchantSelect(value, option) {
     this.props.dispatch({
       type: 'comm_merchant/mvalue',
       payload: value
     })
   }

   handleMerchantFocusBlur(e) {
     var focus = false;
     if (e) {
       focus = (e.target === document.activeElement)
     }
     this.props.dispatch({
       type: 'comm_merchant/focus',
       payload: {
         merchantFocus: focus
       }
     })
   }

   componentWillReceiveProps(nextProps) {
     const {
       success,
       dispatch
     } = nextProps
     if (success) {
       Modal.success({
         title: '充值成功！'
       });
       dispatch({
         type: 'recharge/merchant/init'
       })
     }
   }

   componentWillUnmount() {
     this.props.dispatch({
       type: 'comm_merchant/mvalue',
       payload: null
     })
   }
   render() {
     const {
       form,
       merchants
     } = this.props;
     const {
       getFieldProps
     } = form;
     const formItemLayout = {
       labelCol: {
         span: 7
       },
       wrapperCol: {
         span: 10
       },
     };
     const merchantsOptions = merchants.map(d => <Option key={d.custid}>{d.nickname}</Option>);


     return (
       <Card>
          <Form horizontal form = {this.props.form}>
            <FormItem {...formItemLayout}  label="商户">
                <Select
                    combobox
                    optionLabelProp='children'
                    placeholder='输入搜索'
                    notFoundContent=""
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={this.handleMerchantSearchChange.bind(this)}
                    onFocus={this.handleMerchantFocusBlur.bind(this)}
                    onBlur={this.handleMerchantFocusBlur.bind(this)}
                    onSelect= {this.handleMerchantSelect.bind(this)}>
                    {merchantsOptions}
                </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="充值金额">
                <InputNumber  {...getFieldProps('amount',{initialValue:100})} min={1}  step={10} placeholder="请输入金额（单位:元）" />
              </FormItem>
               <FormItem
               wrapperCol={{ span: 12, offset: 7 }}>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>充值</Button>
              </FormItem>
            </Form>
        </Card>
     );
   }
 };

 recharge.contextTypes = contextTypes;
 recharge.propTypes = propTypes;

 recharge = Form.create()(recharge);

 function mapStateToProps(state) {
   const {
     recharge,
     comm_merchant
   } = state;
   return {
     success: recharge.success,
     mvalue: comm_merchant.mvalue,
     merchants: comm_merchant.merchants
   };
 }
 export default connect(mapStateToProps)(recharge)