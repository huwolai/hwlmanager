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
   Upload,
   Modal
 } from 'antd';
 const RadioGroup = Radio.Group;
 import {
   Image
 } from '../../components/images'
 const FormItem = Form.Item;
 import {
   connect
 } from 'react-redux'
 const Option = Select.Option;
 const propTypes = {
   detail: PropTypes.object,
   imgs: PropTypes.array,
   loading: false,
   previewVisible: PropTypes.bool,
   previewImage: PropTypes.string
 };

 const contextTypes = {
   router: PropTypes.object.isRequired,
   store: PropTypes.object.isRequired
 };

 class merchantDetail extends React.Component {
   constructor(props) {
     super(props)
   }



   componentDidMount() {
     const {
       pagination,
       field
     } = this.props

     let merchantId = this.props.location.query.merchant_id

     this.props.dispatch({
       type: 'merchantdetail/get',
       payload: {
         merchant_id: merchantId
       }
     })

     this.props.dispatch({
       type: 'merchantimgs/get',
       payload: {
         merchant_id: merchantId
       }
     })
   }

   handlePreClick(show, imgurl) {
     this.props.dispatch({
       type: 'pre/image/toggle',
       payload: {
         previewVisible: show,
         previewImage: imgurl
       }
     });
   }

   componentWillReceiveProps(nextProps) {


   }

   render() {
     const {
       loading,
       detail,
       imgs,
       previewVisible,
       previewImage
     } = this.props

     const {
       getFieldProps
     } = this.props.form;
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
     let objJson = {}
     if (detail.json && detail.json != "") {
       objJson = JSON.parse(detail.json)
     }
     const merchantImgsElems = imgs.map(d => {
       let name = d.flag
       if (d.flag == "cradId") {
         name = "身份证"
       }
       if (d.flag == "chefId") {
         name = "厨师证"
       }
       if (d.flag == "healthId") {
         name = "健康证"
       }
       return (
         <FormItem
                label={name}
                {...formItemLayout} key={d.id}>
              <Card style={{ width: 200 }} bodyStyle={{ padding: 0 }}>
                <div className="custom-image" onClick={()=>this.handlePreClick(true,d.url)}>
                  <Image alt="example" style={{width:200}} width="100%" src={d.url}></Image>
                </div>
              </Card>
            </FormItem>
       )
     })



     return (
       <Form horizontal form={this.props.form} >
            <Spin tip="正在读取数据..." spinning={this.props.loading==true}>
             <FormItem
               {...formItemLayout}
                label="名称"
             >
              <Input type="text"  value={detail.name} />
            </FormItem>
            <FormItem
               {...formItemLayout}
                label="手机号"
             >
              <Input type="text"  value={detail.mobile} />
            </FormItem>
            <FormItem
               {...formItemLayout}
                label="服务范围"
                help="单位（米）"
             >
              <Input type="text"  value={detail.cover_distance} />
            </FormItem>
            <FormItem
               {...formItemLayout}
                label="经纬度"
             >
              <Input type="text"  value={detail.longitude} />
              <Input type="text"  value={detail.latitude} />
            </FormItem>
            <FormItem
               {...formItemLayout}
                label="地址"
             >
              <Input type="text"  value={detail.address} />
            </FormItem>
             <FormItem
               {...formItemLayout}
                label="权重"
             >
              <Input type="text"  value={detail.weight} />
            </FormItem>
             <FormItem
               {...formItemLayout}
                label="擅长"
             >
              <Input type="text"  value={objJson.goodCooks} />
            </FormItem>
            {merchantImgsElems}
        </Spin>
        <Modal visible={previewVisible} footer={null} onCancel={()=>this.handlePreClick(false,previewImage)}>
          <Image alt="example" style={{width:'100%'}} src={previewImage} />
        </Modal>

        </Form>
     );
   }
 }

 merchantDetail.contextTypes = contextTypes;
 merchantDetail = Form.create()(merchantDetail);

 function mapStateToProps(state) {
   const {
     merchant,
     pre
   } = state;
   return {
     detail: merchant.detail,
     imgs: merchant.imgs,
     loading: merchant.loading,
     previewVisible: pre.previewVisible,
     previewImage: pre.previewImage
   };

 }

 export default connect(mapStateToProps)(merchantDetail)