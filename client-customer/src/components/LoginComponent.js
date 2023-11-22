import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';

const Login = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { username, password } = values;
    const account = { username, password };

    apiLogin(account);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const apiLogin = (account) => {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        context.setToken(result.token);
        context.setCustomer(result.customer);
        props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  };

  const context = React.useContext(MyContext);

  return (
    <div className="w-[50%] mx-auto mt-10">
      <h2 className="text-center text-red font-bold font-lato text-4xl">CUSTOMER LOGIN</h2>
      <Form
        form={form}
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
        className='py-1 px-4 py-2 px-4 border-solid border-2 border-indigo-300 rounded-md w-full'
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        className='py-1 px-4 py-2 px-4 border-solid border-2 border-indigo-300 rounded-md w-full'
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="text-center font-bold bg-blue-300" type="primary" htmlType="submit"style={{ width: '50%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Login);
