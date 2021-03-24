import React, { PureComponent } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button } from "antd-mobile";

export default class Login extends PureComponent {
  state = {
    num: "86",
  };

  handleGetCountryData = () => {
    this.props.history.replace("/countrylist", { from: "login" });
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        num: this.props.location.state.num,
      });
    }
  }

  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册登录
        </NavBar>
        <WingBlank>
          <InputItem clear placeholder="请输入手机号">
            <div
              className="inputphone-left"
              onClick={this.handleGetCountryData}
            >
              <span>{`+${this.state.num}`}</span>
              <Icon type="down"></Icon>
            </div>
          </InputItem>
          <div className="inp-code">
            <InputItem clear placeholder="请输入手机验证码"></InputItem>
            <button>获取验证码</button>
          </div>
          <WingBlank>
            <Button type="warning" disabled className="btn-login">
              登录
            </Button>
          </WingBlank>
          <WingBlank>
            <div className="login-register">
              <a href="#">账号密码登录</a>
              <a
                href="#"
                onClick={e => {
                  this.props.history.replace("/register/registerphone", {
                    from: "/login",
                  });
                  e.preventDefault();
                }}
              >
                手机快速注册
              </a>
            </div>
          </WingBlank>
          <div className="login-mode">
            <div></div>
            <span>其它登录方式</span>
            <div></div>
          </div>
          <div className="login-icon">
            <i className="iconfont icon-github"></i>
            <i className="iconfont icon-icon"></i>
            <i className="iconfont icon-iconfonticon6"></i>
          </div>
          <WingBlank>
            <div className="login-footer">
              <p>
                未注册的手机号验证后将自动创建硅谷账号,登录即代表您已同意
                <a href="#">硅谷隐私政策</a>
              </p>
            </div>
          </WingBlank>
        </WingBlank>
      </div>
    );
  }
}
