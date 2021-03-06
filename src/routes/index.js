import React, {
  PropTypes
} from 'react';
import {
  Router,
  Route,
  IndexRoute,
  Link,
  IndexRedirect
} from 'react-router';
import App from '../components/App';
import NotFound from '../components/NotFound';
import login from '../views/Login';
import usermanager from '../views/user/usermanager';
import Test from '../components/Test';
import Test1 from '../components/Test1';
import cookie from 'js-cookie';
import merchant from '../views/merchant';
import merchantdetail from '../views/merchant/detail';
import merchantadd from '../views/merchant/add';
import recharge from '../views/account/recharge';
import ProdManager from '../views/prodmanager/index.js';
import ProdEdit from '../views/prodmanager/edit.js';
import DistribManager from '../views/distribmanager/index.js';
import DistribEdit from '../views/distribmanager/edit.js';
import OrderManager from '../views/ordermanager/index.js'
import OrderDetail from '../views/ordermanager/orderdetail.js'


const validate = function(next, replace, callback) {
  const isLoggedIn = !!cookie.get('user')
  console.log('isLoggedIn==' + isLoggedIn)
  if (!isLoggedIn && next.location.pathname != '/login') {
    console.log('login==')
    replace('/login')
  }
  callback()
}

const Routes = ({
    history
  }) =>
  <Router history={history}>
    <Route path="/" onEnter={validate}>
        <IndexRedirect to="home" />
        <Route component={App}>
          <Route path="ordermanager" component={OrderManager} />
          <Route path="orderdetail" component={OrderDetail} />
          <Route path="prodedit" component={ProdEdit} />
          <Route path="prodmanager" component={ProdManager} />
          <Route path="home" component={ProdManager}/>
          <Route path="usermanager" component={usermanager}/>
          <Route path="merchantmanager" component={merchant}/>
          <Route path="merchantdetail" component={merchantdetail} />
          <Route path='merchantadd' component={merchantadd} />
          <Route path="distribmanager" component={DistribManager} />
          <Route path="distribedit" component={DistribEdit} />

          
        </Route>
       <Route path="login" component={login}/>
    </Route>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;