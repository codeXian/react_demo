import { Form, Icon, Input, Button } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import loginActions from '@/redux/actions/login';

const {
  reducers: { loginRequested, loginOut },
} = loginActions;

class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginRequested(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
          <Button
            type="danger"
            htmlType="button"
            block
            onClick={this.props.loginOut}
          >
            Log out
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  loginRequested,
  loginOut,
};

export default connect(
  null,
  mapDispatchToProps,
)(Form.create()(Login));
