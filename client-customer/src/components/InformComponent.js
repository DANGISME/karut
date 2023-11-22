import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoginVisible: true
    };
  }

  toggleLoginVisibility = () => {
    this.setState(prevState => ({
      isLoginVisible: !prevState.isLoginVisible
    }));
  };

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  render() {
    return (
      <div className="border-bottom bg-blue-50 rounded-lg">
        <div className="new-signup-class">
          {this.context.token === '' ? (
            <div className={this.state.isLoginVisible ? "new-signup-class " : "hidden"}>
              <button className ="rounded-lg py-1 px-3 border-red-400 font-bold border-solid border-2 "><Link to='/login' onClick={this.toggleLoginVisibility}>Login</Link></button>
              <button className ="rounded-lg py-1 px-3 border-red-400 font-bold ml-3 border-solid border-2"><Link to='/signup'>Sign-up</Link></button>
              <button className ="rounded-lg py-1 px-3 border-red-400 font-bold ml-3 border-solid border-2"><Link to='/active'>Active</Link></button>
            </div>
          ) : (
            <div className={this.state.isLoginVisible ? "new-signup-class" : "visible"}>
             
              <button className ="rounded-lg py-1 px-2 bg-green-300 font-bold  ml-3 border-solid border-2">
              Hello <b>{this.context.customer.name}</b>
              </button>
              <button className ="rounded-lg py-1 px-3 bg-blue-300 font-bold  ml-3 border-solid border-2">
              <Link to='/myprofile'>My profile</Link>
              </button>
              <button className ="rounded-lg py-1 px-3 bg-blue-300 font-bold  ml-3 border-solid border-2">
              <Link to='/myorders'>My orders</Link>
              </button>
              <button className ="rounded-lg py-1 px-3 bg-red-300 font-bold  ml-3 border-solid border-2">
              <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
              </button>
              
            </div>
          )}
            </div>
            <button className ="float-right rounded-lg py-1 px-7 bg-blue-300 font-bold  ml-3 border-solid border-2 text-[#2563eb]">
              <Link to='/mycart'>My cart</Link> <button className ="text-white"> have <b>{this.context.mycart.length}</b> items</button>
              </button>
            <div className="float-right">

            </div>
        <div className="float-clear" />
      </div>
    );
  }
}

export default Inform;
