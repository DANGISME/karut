import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';


class ProductDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {  
      product: null,
      txtQuantity: 1
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="align-center rounded-lg">
          <h2 className="text-center font-bold text-4xl mt-3">PRODUCT DETAILS</h2>
          <figure className="caption-right ">
            <img className='py-1 px-4 border-2 border-solid border-gray-300 rounded-md p-4 shadow-md mr-16 mt-8' src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            <figcaption>
              <form>
                <table >
                  <tbody className='font-bold bg-orange-100 '>
                    <tr>
                      <td className='py-1 px-4 w-full'  align="right">ID :</td>
                      <td className='py-1 px-4   w-full'>{prod._id}</td>
                    </tr>
                    <tr>
                      <td className='py-1 px-4 w-full' align="right">Name :</td>
                      <td className='py-1 px-4 w-full'>{prod.name}</td>
                    </tr>
                    <tr>
                      <td className='py-1 px-4 w-full' align="right">Price :</td>
                      <td className='py-1 px-4 w-full'>{prod.price}</td>
                    </tr>
                    <tr>
                      <td className='py-1 px-4 w-full' align="right">Category:</td>
                      <td className='py-1 px-4 w-full'>{prod.category.name}</td>
                    </tr>
                    <tr>
                    <td className='py-1 px-4   w-full' align="right">Quantity:</td>
                      <td className='py-1 px-4   '><input className='py-1 px-4  rounded-lg ' type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className='py-1 px-4'><input className='rounded-lg bg-blue-500 text-white py-2 px-4 border-solid border-2' type="submit" value="ADD TO CART" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  }
}
export default withRouter(ProductDetail);