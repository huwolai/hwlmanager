import React, { PropTypes } from 'react'
import { Table,Card, Icon,Input,Select,Button,Form,Tooltip } from 'antd';
import Gallery from 'react-photo-gallery';
import { connect } from 'react-redux'
import  './voucher.less'
const FormItem = Form.Item
const propTypes = {
  items: PropTypes.array
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class voucher extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
  	var taskid =  this.props.location.query.taskid
    var orderid =  this.props.location.query.orderid
    this.props.dispatch({
    	type: 'task/voucher/get',
    	payload: {taskid:taskid,orderid:orderid}
    })
  }

  

  render() {

  	
  	const {items} = this.props;
  	 const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 10 },
    };
  	const itemsEls = items.map((item) => {
  		var voucherrequire = item.voucherrequire
  		var voucherrequireEls = voucherrequire.map((vitem) => {
  			var elm;
  			if (vitem.type==='text') {
  				elm = (
  					<div>
  						<label>{vitem.title}</label>
         				<Input readOnly placeholder={vitem.title} value={vitem.value}></Input>
         			</div>
  				)
  			} else if (vitem.type === 'file') {
  				if (!vitem.value||vitem.value=='') {
  					return;
  				}

  				var imgurl = 'http://api.qiyunxin.com/Communal/Communal/getFile'
  				var file =  JSON.parse(vitem.value)
  				var fitems = []
  				if (file instanceof Array){
  					fitems = file;
  				}else{
  					fitems.push(file)
  				}

  				elm = fitems.map((fileItem) => {
  					var photo = [{
    					src: `${imgurl}?fileid=${fileItem.fileid}&filehash=${fileItem.filehash}&h=320`,
    					width: 681,
    					height: 1024,
    					aspectRatio: 1.5,
    					lightboxImage:{
							src: `${imgurl}?fileid=${fileItem.fileid}&filehash=${fileItem.filehash}`,
						}
  					}]
  					return (
  						<div style={{width:'180px'}} key = {fileItem.fileid} >
  							<Gallery  photos={photo}></Gallery>
  						</div>
  						)
  				})

  				
  			}
  			return (
  					<FormItem  {...formItemLayout} key={vitem.field}>
         				 {elm}
        			</FormItem>
  				)
  		});

    	return (
          <Card className='item' title={item.templatename} key={item.templateid}>
           <label className='desc'>{item.description}</label>
           <br/><br/>
      			<div className="custom-card">
      			<Form horizontal>
  					{voucherrequireEls}
  				</Form>
    			</div>
      	   </Card>
      	    
      )
    });
  	return (
    	<div className='voucher'>
    		{itemsEls}

    		
    	</div>
  	);
  }
  
};

voucher.contextTypes = contextTypes;
voucher.propTypes = propTypes;
function mapStateToProps(state) {
  const {voucher} = state;

  return {items: voucher.items};

}

export default connect(mapStateToProps)(voucher)
