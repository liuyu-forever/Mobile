import React, { PureComponent } from "react";
import {
  NavBar,
  Icon,
  WingBlank,
  InputItem,
  Button,
  Modal,
  Toast,
} from "antd-mobile";
import { createForm } from "rc-form";
import { axiosVerifyPhone } from "./../../../api/axios/registerPhone";

class RegisterPhone extends PureComponent {
  state = {
    disabled: true,
    num: "86",
  };

  componentDidMount() {
    if (this.props.location.state.num) {
      this.setState({
        num: this.props.location.state.num,
      });
    }
    if (this.props.location.state.from) {
      Modal.alert(
        "注册协议及隐私政策",
        "在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：",
        [
          {
            text: "不同意",
            onPress: () => {
              this.props.history.replace(this.props.location.state.from);
            },
          },
          {
            text: "同意",
            style: { backgroundColor: "red", color: "#fff" },
          },
        ]
      );
    }
  }

  validator = (rule, value, cb) => {
    if (/^1[3456789]\d{9}$/.test(value)) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  handlePhoneNum = async () => {
    const { getFieldValue } = this.props.form;
    const phone = getFieldValue("phone");
    const result = await axiosVerifyPhone(phone);

    if (result.data.success) {
      Modal.alert("", "我们将发送短信/语音验证码至:" + phone, [
        {
          text: "取消",
        },
        {
          text: "确认",
          onPress: () => {
            //将手机号存储到本地缓存中
            localStorage.setItem("phone", phone);
            this.props.history.replace("/register/registercode");
          },
          style: { backgroundColor: "red", color: "#fff" },
        },
      ]);
    } else {
      Toast.info(result.data.message, 1);
      setTimeout(() => {
        this.props.history.replace("/login");
      }, 2000);
    }
  };

  handleGetCountryData = () => {
    this.props.history.replace("/countrylist", { from: "phone" });
  };

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <InputItem
            {...getFieldProps("phone", {
              //rules表示当前表单的校验规则
              rules: [
                {
                  // validator表示使用自定义校验规则
                  validator: this.validator,
                },
              ],
            })}
            clear
            placeholder="请输入手机号"
          >
            <div
              className="inputphone-left"
              onClick={this.handleGetCountryData}
            >
              <span>{`+${this.state.num}`}</span>
              <Icon type="down"></Icon>
            </div>
          </InputItem>

          <WingBlank>
            <Button
              type="warning"
              disabled={this.state.disabled}
              className="btn-login"
              onClick={this.handlePhoneNum}
            >
              下一步
            </Button>
          </WingBlank>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(RegisterPhone);
