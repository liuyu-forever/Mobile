import React, { Component } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Modal,
} from "antd-mobile";
import { createForm } from "rc-form";

import { axiosRegister } from "./../../../api/axios/registerPwd";

import "./index.css";
import msg from "./msg.png";

class RegisterPassword extends Component {
  state = {
    isShow: true,
    isDisabled: true,
  };

  //查看密码
  handleSelectPwd = () => {
    const flag = this.state.isShow;
    this.setState({
      isShow: !flag,
    });
  };

  validator = (rule, value, cb) => {
    if (/^[a-zA-Z]\w{8,20}$/.test(value)) {
      // 如果密码符合要求
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleRegister = async () => {
    const { getFieldValue } = this.props.form;
    const pwd = getFieldValue("pwd");
    const phone = localStorage.getItem("phone");
    
    const result = await axiosRegister(phone, pwd);
    if (result.data.success) {
      this.props.history.replace("/Home")
    }
  };

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div className="wrap">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => console.log(111)}
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
            <div className="tip">请设置登录密码</div>
          </WingBlank>
          <WhiteSpace size="lg"></WhiteSpace>

          <div className="code">
            <InputItem
              {...getFieldProps("pwd", {
                //rules表示当前表单的校验规则
                rules: [
                  {
                    // validator表示使用自定义校验规则
                    validator: this.validator,
                  },
                ],
              })}
              className="psw"
              type={this.state.isShow ? "password" : "text"}
              clear
              placeholder="请设置8~20位登录密码"
              extra={
                <span
                  className={
                    this.state.isShow
                      ? "iconfont icon-close-eye selectpwd"
                      : "iconfont icon-icon-eye-open selectpwd"
                  }
                  onClick={this.handleSelectPwd}
                ></span>
              }
            ></InputItem>
          </div>
          <WingBlank size="lg">
            <div>
              密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
            </div>
          </WingBlank>
          <WingBlank size="lg">
            <Button
              className="code-next"
              type="warning"
              disabled={this.state.isDisabled}
              onClick={this.handleRegister}
            >
              完成
            </Button>
          </WingBlank>
          <WingBlank size="lg">
            遇到问题了?
            <a href="#">请联系客服</a>
          </WingBlank>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(RegisterPassword);
