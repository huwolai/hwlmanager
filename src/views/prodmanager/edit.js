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
   Upload
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
   items: PropTypes.array,
   categories: PropTypes.array,
   merchants: PropTypes.array,
   pagination: PropTypes.object,
   prodDetail: PropTypes.object,
   prodAdded: false,
   loading: false,
   flags: PropTypes.array,
   prodImgs: PropTypes.array
 };

 const contextTypes = {
   router: PropTypes.object.isRequired,
   store: PropTypes.object.isRequired
 };

 class prodEdit extends React.Component {
   constructor(props) {
     super(props)
   }



   componentDidMount() {
     const {
       pagination,
       field
     } = this.props
     let prodId = this.props.location.query.prod_id
     console.log("prod_id=" + prodId)

     if (prodId) {
       this.props.dispatch({
         type: 'proddetail/get',
         payload: {
           prodId: prodId
         }
       })
       this.props.dispatch({
         type: 'prod/images/get',
         payload: {
           prod_id: prodId
         }
       })

     }
     this.props.dispatch({
       type: 'categories/search'
     })
     this.props.dispatch({
       type: 'merchant/search',
       payload: {
         page_size: 9999,
         page_index: 1
       }
     })
     this.props.dispatch({
       type: 'flags/search',
       payload: {
         types: "PRODUCT",
         status: "1"
       }
     })
   }

   componentWillUnmount() {
     console.log('componentwillunmount')
     this.props.dispatch({
       type: 'proddetail/get/clear'
     })
   }

   handleTableChange(pager, filters, sorter) {
     const {
       keywords,
       pagination
     } = this.props
     this.props.dispatch({
       type: 'prod/search',
       payload: {
         pageIndex: pager.current,
         pageSize: pager.pageSize,
         keywords: keywords,
         field: field
       }
     });
   }

   handleToAddMerchant() {
     this.context.router.push('merchantadd')
   }

   handleSubmit(e) {
     e.preventDefault();
     const {
       prodDetail
     } = this.props
     this.props.form.validateFields((errors, values) => {
       if (!!errors) {
         console.log('Errors in form!!!');
         return;
       }
       if (values.flag != 'merchant_default') {
         values.imgs = this.imgs
         if (!values.imgs || values.imgs.length <= 0) {
           window.alert('图片不能为空！');
           return
         }
       } else {
         values.category = 1
       }

       prodDetail.title = values.prod_title;
       prodDetail.sub_title = values.sub_title
       prodDetail.merchant_id = values.merchant_id;
       prodDetail.description = values.description;
       prodDetail.category_id = values.category;
       prodDetail.price = parseFloat(values.price);
       prodDetail.dis_price = parseFloat(values.dis_price);
       prodDetail.imgs = values.imgs;
       prodDetail.flag = values.flag;

       this.props.dispatch({
         type: 'prod/add',
         payload: prodDetail
       });
     });
   }
   imgs = []

   componentWillReceiveProps(nextProps) {

     const {
       loading,
       pagination,
       prodDetail,
       prodAdded
     } = nextProps
     let prodId = this.props.location.query.prod_id
     if (prodAdded) {
       this.props.dispatch({
         type: 'prodsku/add',
         payload: {
           prod_id: prodDetail.id,
           price: prodDetail.price,
           dis_price: prodDetail.dis_price,
           attr_symbol_path: prodDetail.attr_symbol_path,
           stock: 999999
         }
       });
       this.context.router.replace('/prodmanager');
     }


   }

   render() {
     const {
       items,
       prodImgs,
       prodDetail,
       categories,
       merchants,
       loading,
       pagination,
       flags
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

     const categoriesTpl = categories.map((item) => {
       return (
         <Radio key={item.id} value={item.id}>{item.title}</Radio>
       )
     });
     const merchantsOptions = merchants.map(d => <Option key={d.id} value={d.id}>{d.name}({d.mobile})</Option>);
     const flagsOptions = flags.map(d => <Option key={d.id} value={d.flag}>{d.name}</Option>);


     let openId = cookie.get('open_id')
     let prodId = this.props.location.query.prod_id
     let prodCategoryTpl = ""
     let imageUploadTpl = ""
     let flag = this.props.form.getFieldValue('flag')
     let pImgs = []
     const uploadProps = {
       action: config.imageuploadurl + '?open_id=' + openId,
       listType: 'picture-card',
       defaultFileList: prodImgs,
       onChange: (info) => {
         let fileList = info.fileList;

         let fileData = fileList.map((file) => {
           if (file.response) {
             return {
               url: file.response.path
             };
           }
         });
         this.imgs = fileData
       },
       onPreview: (file) => {},
     };
     if (prodImgs && prodImgs.length > 0) {
       imageUploadTpl = <FormItem
               {...formItemLayout}
                label="商品图片"
                help="第一张图默认为封面图"
             >
            <Upload {...uploadProps}>
              <Icon type="plus" />
              <div className="ant-upload-text">上传照片</div>
            </Upload>
         </FormItem>
     } else {
       if (!prodId) {
         imageUploadTpl = <FormItem
               {...formItemLayout}
                label="商品图片"
                help="第一张图默认为封面图"
             >
            <Upload {...uploadProps}>
              <Icon type="plus" />
              <div className="ant-upload-text">上传照片</div>
            </Upload>
         </FormItem>
       }
     }


     if (flag != "merchant_default") {
       prodCategoryTpl = <FormItem
                                {...formItemLayout}
                                label="商品分类"
                              >
                              <RadioGroup {...getFieldProps('category',{ rules: [{ required: true,type:'number' }],initialValue: prodDetail.category_id })}>
                                {categoriesTpl}
                              </RadioGroup>
                            </FormItem>
     }

     let bottomBtn;
     if (!prodId) {
       bottomBtn = <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
        </FormItem>
     }
     return (
       <Form horizontal form={this.props.form} >
            <Spin tip="正在读取数据..." spinning={this.props.loading==true}>
              <FormItem 
              {...formItemLayout6}
              label="类型">
                <Select
                  placeholder='类型'
                  allowClear={true}
                  showArrow={true}
                  {...getFieldProps('flag',{ initialValue: prodDetail.flag })} 
                  >
                    {flagsOptions}
                  </Select>
             </FormItem>
             <FormItem
               {...formItemLayout}
                label="标题"
             >
              <Input type="text" {...getFieldProps('prod_title', { rules: [{ required: true }],initialValue: prodDetail.title } ) } placeholder="商品标题" />
            </FormItem>
             <FormItem
               {...formItemLayout}
                label="子标题"
             >
              <Input type="textarea" {...getFieldProps('sub_title',{ rules: [{ required: true }], initialValue: prodDetail.sub_title })} placeholder="子标题" />
            </FormItem>
            {prodCategoryTpl}
          <FormItem
               {...formItemLayout6}
                label="价格"
             >
              <Input type="number" {...getFieldProps('price',{ rules: [{ required: true }], initialValue: prodDetail.price +"" })} placeholder="价格" />
          </FormItem>
          <FormItem
               {...formItemLayout6}
                label="折扣价"
             >
              <Input type="number" {...getFieldProps('dis_price',{ rules: [{ required: true }], initialValue: prodDetail.dis_price +"" })} placeholder="折扣价" />
          </FormItem>
            {imageUploadTpl}
           <FormItem 
        {...formItemLayout6}
        label="商户">
          <Select
            optionLabelProp='children'
            placeholder='输入搜索'
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={false}
            {...getFieldProps('merchant_id',{ rules: [{ required: true,type:'number' }],initialValue: prodDetail.merchant_id })} 
          >
            {merchantsOptions}
          </Select>
        </FormItem>
        <FormItem
               {...formItemLayout}
                label="商品描述"
             >
              <Input type="textarea" {...getFieldProps('description',{initialValue:prodDetail.description})} placeholder="商品描述" />
        </FormItem>
        {bottomBtn}
        </Spin>

        </Form>
     );
   }
 }

 prodEdit.contextTypes = contextTypes;
 prodEdit = Form.create()(prodEdit);

 function mapStateToProps(state) {
   const {
     prod,
     categories,
     merchant,
     flags
   } = state;
   return {
     prodImgs: prod.prodImgs,
     categories: categories.items,
     flags: flags.items,
     prodAdded: prod.prodAdded,
     prodDetail: prod.prodDetail,
     merchants: merchant.items,
     items: prod.items,
     pagination: prod.pagination,
     loading: prod.loading
   };

 }

 export default connect(mapStateToProps)(prodEdit)