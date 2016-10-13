 import React, { PropTypes } from 'react'
import { Modal,Message,Table,Card, Icon,Input,Select,Button,Form,InputNumber,DatePicker,Spin } from 'antd';
 import { connect } from 'react-redux'
const FormItem = Form.Item
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const propTypes = {
  taskTypes: PropTypes.array,
  tpls: PropTypes.array,
  saving: PropTypes.bool,
  saveSuccess: PropTypes.bool,
  merchants: PropTypes.array,
  merchantFocus: PropTypes.bool,
  mvalue: PropTypes.string,
  tplsDescObj: PropTypes.object,
  showModal: PropTypes.bool
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Publish extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
	this.props.dispatch({
    	type:'task/types/get'
    });

    this.props.dispatch({
    	type:'task/tpls/get'
    });

    this.props.dispatch({
    	type:'task/add/init'
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      const {mvalue,tplsDescObj} = this.props
      var voucherrequire = ''
      var isFirst = true;
      for (const key in tplsDescObj) {
      	if (isFirst) {
      		voucherrequire=tplsDescObj[key].name
      		isFirst = false;
      	}else{
      		voucherrequire=voucherrequire +'\\' + tplsDescObj[key].name
      	}
      }
      var tplItems = [];
    for (var key in this.props.tplsDescObj) {
    	var tpobj =  this.props.tplsDescObj[key]
    	tplItems.push({id:tpobj.id,price:tpobj.price})
    }
      values.tplItems = tplItems
      values.mvalue = mvalue
      values.voucherrequire = voucherrequire
      this.props.dispatch({
    	type:'task/add',
    	payload:values
      });
      console.log(values);
    });
  }

  handleReset(e) {
  	this.props.form.resetFields()
  }

   handleMerchantSearchChange(value) {
   	console.log('value=='+value)
   	this.props.dispatch({
   		type: 'task/merchant/mlabel',
   		payload: value
   	})

    this.props.dispatch({
    	type: 'task/merchant/search',
    	payload:{pageIndex:1,pageSize:10,keywords:value,field:'nickname'}
    })
   }



    handleMerchantSelect(value,option) {
   		this.props.dispatch({
   			type: 'task/merchant/mvalue',
   			payload: value
   		})
   	}

   handleMerchantFocusBlur(e) {
   	var focus = false;
   	if (e) {
   		focus = (e.target === document.activeElement)
   	}
   	this.props.dispatch({
    	type: 'task/merchant/focus',
    	payload:{merchantFocus:focus}
    })
   }



   showModal() {
   	this.props.dispatch({
   	 	type: 'task/add/showModal'
   	 })
   }

   handleModalCancel(){
   	 this.props.dispatch({
   	 	type: 'task/add/hiddenModal'
   	 })
   }
   handleModalSubmit() {

   	var key =this.props.form.getFieldValue('tpls')
   	if (!key){
   		Message.error('请选择模板');
   		return
   	}
   	var price = this.props.form.getFieldValue('tplsPrice')
   	if (!price){
   		Message.error('请输入价格');
   		return
   	}
   	 this.props.dispatch({
    	type: 'task/tpls/select',
    	payload:{key:key,value:this.getTplsNameById(key),price:price}
    })

   	 this.props.dispatch({
   	 	type: 'task/add/hiddenModal'
   	 })

   }

   handleTplDelete(value) {
   	console.log(value)
   	this.props.dispatch({
    	type: 'task/tpls/deselect',
    	payload:{key:value}
    })
   }
    getTplsNameById(id) {
    	const {tpls} = this.props
   		for(var i=0;i<tpls.length;i++){
   			var tp = tpls[i]

   			if (id==tp.templateid){
   				return tp.templatename;
   			}
   		}
   	return null
   }

   componentWillReceiveProps(nextProps) {
   		console.log('componentWillReceiveProps')
   		const {saveSuccess} = nextProps
   		if (saveSuccess) {
   			this.context.router.replace('/task')
   		}
   }

  render() {
  	const { taskTypes,tpls,merchants } = this.props;
  	const { getFieldProps } = this.props.form;
  	const taskNameProps = getFieldProps('taskname', {
      rules: [
        { required: true,message: '任务名称不能为空！' },
      ]
    });
     const totalnumProps = getFieldProps('totalnum', {
      rules: [
        { required: true, type:'number',message:'请输入总单数' },
      ],
      initialValue: 200
    });
    const typeProps = getFieldProps('type', {
      rules: [
        { required: true,type: 'number',message: '任务类型不能为空！'  },
      ]
    });
  
    const tplsProps = getFieldProps('tpls', {
      rules: [
        { required: true,type: 'string',message: '请选择凭证！'},
      ]
    });

    const tplsPriceProps = getFieldProps('tplsPrice', {
      rules: [
        { required: true,type: 'number', message: '价格不能为空！'},
      ]
    });

    const taskTimeProps = getFieldProps('taskTime', {
      rules: [
        { required: true,type: 'array',message: '请选择凭证！'},
      ]
    });

    const undertakerequireProps = getFieldProps('undertakerequire', {
      rules: [
        { required: true,message: '承接资格不能为空！'},
      ]
    });

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 10 },
    };

    const typesTpl = taskTypes.map((item) => {
    	return (
        <Option value={item.id} key={item.id}>{item.name}</Option>
      )
    });
    const TplsChilds = tpls.map((item) => {
    	return (
        <Option  key={item.templateid}>{item.templatename}</Option>
      )
    });

    const merchantsOptions = merchants.map(d => <Option key={d.custid}>{d.nickname}</Option>);

    var tplItems = [];
    for (var key in this.props.tplsDescObj) {
    	tplItems.push(this.props.tplsDescObj[key])
    }
  	return (
  		<Card>
    	<Form horizontal  form={this.props.form}>
    	 <Spin tip="正在读取数据..." spinning={this.props.saving==false}>
    	<FormItem
          {...formItemLayout}
          label="任务名称">
          <Input {...taskNameProps} placeholder="任务名称"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="总单数">
          <InputNumber {...totalnumProps} min={1}  step={1} />
        </FormItem>
        <FormItem 
        {...formItemLayout}
        label="商户">
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
            onSelect= {this.handleMerchantSelect.bind(this)}
          >
            {merchantsOptions}
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务种类">
          <Select {...typeProps}  placeholder="请选择种类" style={{ width: '100%' }}>
            {typesTpl}
          </Select>
        </FormItem>
      
        <FormItem 
        {...formItemLayout}
        label="任务起止时间">
        	<RangePicker showTime format="yyyy/MM/dd HH:mm"  {...taskTimeProps} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="承接资格">
          <Select {...undertakerequireProps}  
           placeholder="请选择" >
    			<Option  key='0'>无限制</Option>
    			<Option  key='1'>校园大使/合伙人</Option>
    			<Option  key='2'>原子会员</Option>
  			</Select>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="凭证要求">
          <Button  icon="plus" onClick={this.showModal.bind(this)}/>
          
  			<Table bordered size="small" columns={[{ title: '凭证名称',key: 'name',dataIndex: 'name'}, 
  			{title: '价格',key: 'price', dataIndex: 'price'},
  			{ title: '操作', dataIndex: '', key: 'x', render: (txt,record) => <Button onClick={()=>this.handleTplDelete(record.id)}>删除</Button> }]}  dataSource={tplItems}  pagination={false}  rowKey={record => record.id} />

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务要求">
           <Input {...getFieldProps('taskDesc')}  type="textarea" placeholder="请填写"  />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="承接要求">
          <Input {...getFieldProps('undertakeDesc')}  type="textarea" placeholder="请填写"  />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="结算规则">
          <Input {...getFieldProps('settlementrule')}  type="textarea" placeholder="请填写"  />
        </FormItem>

        </Spin>
        
        <FormItem
          wrapperCol={{ span: 12, offset: 7 }}
        >
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
        </FormItem>
    	</Form>
    	<Modal title="选择模板" 
    	  visible = {this.props.showModal}
          onOk={this.handleModalSubmit.bind(this)} 
          onCancel={this.handleModalCancel.bind(this)}
        >
        <Form horizontal  form={this.props.form}>
        	 <FormItem 
        	 {...formItemLayout}
          	  label="模板">
          		<Select {...tplsProps} style = {{width:'100%'}} size='large'  
           		placeholder="请选择" >
    			{TplsChilds}
  				</Select>
  			 </FormItem>
  			 <FormItem 
  			 {...formItemLayout}
          	 label="价格">
          	 	<InputNumber {...tplsPriceProps} min={1}  step={0.01} />
  			 </FormItem>
  		</Form>	
        </Modal>
    </Card>
  	);
  }

}

Publish.contextTypes = contextTypes;
Publish.propTypes = propTypes;

Publish = Form.create()(Publish);

function mapStateToProps(state) {
  const {task} = state;

  return {taskTypes:task.taskTypes,tpls: task.tpls,taskObj: task.taskObj,merchants:task.merchants,merchantFocus:task.merchantFocus,mvalue:task.mvalue,tplsDescObj:task.tplsDescObj,saveSuccess:task.saveSuccess,showModal:task.showModal};

}

export default connect(mapStateToProps)(Publish)