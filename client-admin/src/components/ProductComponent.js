import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  increasePage = () => {
    const nextPage = this.state.curPage + 1;
    if (nextPage <= this.state.noPages) {
      this.apiGetProducts(nextPage);
    }
  };
  decreasePage = () => {
    const prevPage = this.state.curPage - 1;
    if (prevPage > 0) {
      this.apiGetProducts(prevPage);
    }
  };
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      
      <div>
        <div className="w-[90%] mx-auto mt-10">
         <div className='flex justify-between gap-10'>
         <div className="w-[50%]">
          <h2 className="text-center text-2xl font-bold text-red">PRODUCT LIST</h2>
          <table className="datatable mt-3" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
              {prods}
              <tr>
              <td className={`py-1 px-2 font-bold border-gray-600 ${pagination.length > 1 ? 'pagination-container' : ''}`} colSpan="6">
                      <span className="pagination-arrow font-bold text-3xl " onClick={this.decreasePage}>&lt;</span>
                      {pagination.map((page, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <span className="pagination-separator "></span>}
                          <span
                            className={`pagination-number ${this.state.curPage === index + 1 ? 'active' : ''}`}
                            onClick={() => this.lnkPageClick(index + 1)}
                          >
                            {page}
                          </span>
                        </React.Fragment>
                      ))}
                      <span className="pagination-arrow font-bold text-3xl" onClick={this.increasePage}>&gt;</span>
                    </td>
              </tr>
            </tbody>
          </table>
          </div>
          <ProductDetail className='w-[50%]' item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        </div >
        </div>
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }




  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}

export default Product;