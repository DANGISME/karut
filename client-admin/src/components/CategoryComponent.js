import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import '../css/CategoryComponent.css'

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
    return (
      <div className='w-[90%] mx-auto mt-10'>
        <div className='flex justify-between gap-10'>
        <div className="w-[50%]">
          <h2 className="text-center text-2xl font-bold text-red">CATEGORY LIST</h2>
          <table className="datatable mt-3" border="1">
            <tbody>
              <tr className="datatable ">
                <th className='text-black-500 '>ID</th>
                <th>Name</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>
        <CategoryDetail className='w-[50%]' item={this.state.itemSelected} updateCategories={this.updateCategories} />
      </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;