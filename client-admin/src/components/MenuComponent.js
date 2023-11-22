import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import {HomeOutlined, UserOutlined, PlusCircleOutlined, ShoppingCartOutlined, SkinOutlined } from '@ant-design/icons';
import { Menu as Nav } from 'antd';
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const items = [
      {
        label: <Link to='/admin/home'>Home</Link>,
        key: 'home',
        icon: < HomeOutlined/>,
      },
      {
        label: <Link to='/admin/category'>Category</Link>,
        key: 'category',
        icon: <PlusCircleOutlined />,
        
      },
      {
        label: <Link to='/admin/product'>Product</Link>,
        key: 'product',
        icon: <SkinOutlined />,
      },
      {
        label: <Link to='/admin/order'>Order</Link>,
        key: 'order',
        icon: <ShoppingCartOutlined />,
        
      },
      {
        label: <Link to='/admin/customer'>Customer</Link>,
        key: 'customer',
        icon: <UserOutlined />,
        
      },
    ];
    return (
      <div className="flex justify-between items-center py-2 font-bold ">
        <div className="w-[700px]">
          {/* <ul className="menu">
          <li className="menu"><Link to='/admin/home'>Home</Link></li>
          <li className="menu"><Link to='/admin/category'>Category</Link></li>
          <li className="menu"><Link to='/admin/product'>Product</Link></li>
          <li className="menu"><Link to=''>Order</Link></li>
          <li className="menu"><Link to=''>Customer</Link></li>
            
          </ul> */}
          <Nav className='' mode="horizontal" items={items} />
        </div>
        <div className="flex items-center gap-4">
           <b className='font-[400]'> Hello <span className='font-bold'>{this.context.username}</span></b> 
          <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}><button className='bg-red-500 py-2 px-4 rounded-lg'>
          Logout
            </button></Link>
        </div>
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;