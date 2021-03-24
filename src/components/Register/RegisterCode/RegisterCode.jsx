import React, { Component } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Modal,
  Toast,
} from "antd-mobile";
import { createForm } from "rc-form";

import {
  axiosSendCode,
  axiosVerifyCode,
} from "./../../../api/axios/registerCode";
import "./index.css";
import msg from "./msg.png";

class RegisterCode extends Component {
  state = {
    downcount: 5,
    isDisabled: true,
  };

  async componentDidMount() {
    this.sendCodeFn();
  }

  //封装发送验证码的函数
  sendCodeFn = async () => {
    const phone = localStorage.getItem("phone");
    const result = await axiosSendCode(phone);
    if (result.data.success) {
      Toast.success("验证码发送成功", 1);
      //倒计时
      this.timerid = setInterval(() => {
        if (this.state.downcount === 0) {
          clearInterval(this.timerid);
          return;
        }
        this.setState({
          downcount: this.state.downcount - 1,
        });
      }, 1000);
    }
  };

  //点击获取验证码事件函数
  handleGetCode = () => {
    clearInterval(this.timerid);
    this.setState({
      downcount: 5,
    });
    this.sendCodeFn();
  };

  //点击下一步发送验证码到后台
  handleSendCode = async () => {
    const { getFieldValue } = this.props.form;
    const phone = localStorage.getItem("phone");
    const code = getFieldValue("code");
    const result = await axiosVerifyCode(phone, code);
    if (result.data.success) {
      this.props.history.replace("/register/registerpassword");
    }
  };
  validator = (rule, value, cb) => {
    if (/^\d{6}$/.test(value)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="wrap">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => {}}
        >
          硅谷注册
        </NavBar>
        <WhiteSpace size="lg"></WhiteSpace>

        <WingBlank size="lg">
          <div className="img">
            <img src={msg} alt="" />
          </div>
          <WhiteSpace size="lg"></WhiteSpace>
          <WingBlank size="lg">
            <div>
              我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
            </div>
          </WingBlank>
          <WhiteSpace size="lg"></WhiteSpace>

          <div className="code">
            <InputItem
              {...getFieldProps("code", {
                //rules表示当前表单的校验规则
                rules: [
                  {
                    // validator表示使用自定义校验规则
                    validator: this.validator,
                  },
                ],
              })}
              clear
              placeholder="请输入手机验证码"
            ></InputItem>
            <button
              className={
                this.state.downcount === 0 ? `code-btn active` : `code-btn`
              }
              onClick={this.handleGetCode}
            >
              {this.state.downcount === 0
                ? `获取验证码`
                : `重新发送(${this.state.downcount}s)`}
            </button>
          </div>
          <WingBlank size="lg">
            <Button
              className="code-next"
              type="warning"
              disabled={this.state.isDisabled}
              onClick={this.handleSendCode}
            >
              下一步
            </Button>
          </WingBlank>
          <WingBlank size="lg">
            遇到问题了?
            <a href="">请联系客服</a>
          </WingBlank>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(RegisterCode);
