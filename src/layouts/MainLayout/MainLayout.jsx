import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import  './MainLayout.less';
import NavPath from '../NavPath'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'

const MainLayout = ({ children }) => {
  return (
      <div className="ant-layout-aside">
        <Sidebar />
        <div className="ant-layout-main">
          <Header user='ttt' />
          <NavPath />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
