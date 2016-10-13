import React, { PropTypes } from 'react'
import { Table,Card, Icon,Input,Select,Button,Form } from 'antd';
import { connect } from 'react-redux'
import {  Link } from 'react-router';
const FormItem = Form.Item

const propTypes = {
	saveSuccess:PropTypes.bool
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class merchantadd extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSubmit(e) {
  	e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!' + errors);
        return;
      }

      this.props.dispatch({
      	type:'merchant_add/add',
      	payload:values
      })
  	});
      
  }

  componentWillReceiveProps(nextProps) {
  	const {saveSuccess} = nextProps
  	if (saveSuccess) {
  		this.props.dispatch({
  			type:'merchant_add/forward'
  		})
  		this.context.router.push('/merchant')
  	}
  }

  render() {
  	const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 10 },
    };
    const { form } = this.props;
  	const { getFieldProps } =form;

  	const nicknameProps = getFieldProps('nickname', {
      rules: [
        { required: true,message:'请输入商户名称！' },
      ]
    });
    const addressProps = getFieldProps('address', {
      rules: [
        { required: true,message:'请输入地址！' },
      ]
    });
    const emailProps = getFieldProps('email', {
      rules: [
        { required: true,message:'请输入email！' },
      ]
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true,message:'请输入密码！' },
      ]
    });
    const contactProps = getFieldProps('contact', {
      rules: [
        { required: true,message:'请输入联系人！' },
      ]
    });
    const contactmobileProps = getFieldProps('contactmobile', {
      rules: [
        { required: true,message:'联系电话！' },
      ]
    });


  	return (
		<Card>
    		<Form horizontal  form={this.props.form}>
    			<FormItem
          		{...formItemLayout}
          		label="商户名称">
          			<Input {...nicknameProps}  placeholder="商户名称"/>
        		</FormItem>
        		<FormItem
          		{...formItemLayout}
          		label="商户地址">
          			<Input {...addressProps}  placeholder="商户地址"/>
        		</FormItem>
        		<FormItem
          		{...formItemLayout}
          		label="登录邮箱">
          			<Input {...emailProps} type='email'  placeholder="登录邮箱"/>
        		</FormItem>
        		<FormItem
          		{...formItemLayout}
          		label="登录密码">
          			<Input {...passwordProps} type='password'  placeholder="登录密码"/>
        		</FormItem>
        		<FormItem
          		{...formItemLayout}
          		label="联系人">
          			<Input  {...contactProps} placeholder="联系人"/>
        		</FormItem>
        		<FormItem
          		{...formItemLayout}
          		label="联系人电话">
          			<Input {...contactmobileProps}  placeholder="联系人电话"/>
        		</FormItem>
        		<FormItem
          		wrapperCol={{ span: 12, offset: 7 }}>
         			 <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
        		</FormItem>
    		</Form>
    	</Card>	
  	);
  }
  
};

merchantadd.contextTypes = contextTypes;
merchantadd.propTypes = propTypes;

merchantadd = Form.create()(merchantadd);

function mapStateToProps(state) {
  const {merchant_add} = state;

  return {saveSuccess:merchant_add.saveSuccess};

}

export default connect(mapStateToProps)(merchantadd)

