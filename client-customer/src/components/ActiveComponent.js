import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="align-center font-bold ">
        <h2 className="text-center text- font-bold font-lato text-4xl">ACTIVE ACCOUNT</h2>
        <form>
          <table className="flex items-center gap-4 mt-1 ">
            <tbody>
              <tr>
                <td>ID</td>
                <td><input className='py-1 px-4 py-2 px-4 border-solid border-2 border-indigo-400 rounded-md w-full' type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Token</td>
                <td><input className='py-1 px-4 py-2 px-4 border-solid border-2 border-indigo-400 rounded-md w-full' type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='py-1 px-4 py-2 px-2 border-solid border-2 bg-green-300 rounded-md w-full' type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Active;