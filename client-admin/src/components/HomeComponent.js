import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="http://cliparting.com/wp-content/uploads/2018/03/animated-emoticons-2018-13.gif"
          width="700px"
          height="800px"
          alt=""
          className="mr-4"
        />
        <div>
          <h2 className="font-bold text-8xl">Account Admin</h2>
        </div>
      </div>
    );
  }
}
export default Home;
