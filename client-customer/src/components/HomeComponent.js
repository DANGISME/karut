import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      const style = {
        marginRight: '25px', // Khoảng cách giữa các sản phẩm
        marginBottom: '15px' // Độ cao giữa các sản phẩm
      };
      return (
        <div key={item._id} className="inline" style={style}>
          <figure className='text-center py-1 px-4 border-2 border-solid border-gray-300 rounded-md p-4 shadow-md mt-8'>
          <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center font-bold">{item.name}<br />Price: {item.price}</figcaption>
            <input className='rounded-lg   py-2 px-4 border-solid border-2 border-indigo-400  mt-3' 
            type="submit" 
            value="View Product" 
            ></input>
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      const style = {
        marginRight: '25px', // Khoảng cách giữa các sản phẩm
        marginBottom: '15px' // Độ cao giữa các sản phẩm
      };
      return (
        <div key={item._id} className="inline" style={style}>
          <figure className='text-center py-1 px-4 border-2 border-solid border-gray-300 rounded-md p-4 shadow-md mt-8'>
          <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center font-bold mb-2">{item.name}<br />Price: {item.price}</figcaption>
            <input className='rounded-lg   py-2 px-4 border-solid border-2 border-indigo-400 mt-3' 
            type="submit" 
            value="View Product" 
            ></input>
          </figure>
        </div>
      );
    });
    return (
      <div>
        <div className="align-center">
          <h2 className="text-center font-bold text-4xl mt-3">NEW PRODUCTS</h2>
          {newprods}
        </div >
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 className="text-center font-bold text-4xl mt-3">HOT PRODUCTS</h2>
            {hotprods}
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

}

export default Home;