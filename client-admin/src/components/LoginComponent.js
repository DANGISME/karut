import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className="align-valign-center rounded-lg bg-blue-200 py-1 px-4 border-indigo-400 font-bold   ">
          <h2 className="text-center font-bold text-3xl col-12 mt-6">ADMIN LOGIN</h2>
          <form className=''>
            <table className="align-center ">
              <tbody>
                <tr>
                  <td className='text-2xl'>Username</td>
                  <td><input className='rounded-lg mt-6 px-3 py-3 border-solid border-2 border-indigo-400' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td className='text-2xl'>Password</td>
                  <td><input className='rounded-lg mt-3 px-3 py-3 border-solid border-2 border-indigo-400' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td></td>
                  <td><input className='rounded-lg py-1 px-2 bg-green-300 font-bold text-white w-full mt-3' type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account)
    .then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    })
    
  }
}
export default Login;