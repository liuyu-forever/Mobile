import React, { PureComponent } from "react";
import { NavBar, Icon, List } from "antd-mobile";
import { axiosGetCountryData } from "./../../api/axios/countryData";

import "./countryList.css";

const Item = List.Item;

export default class CountryList extends PureComponent {
  state = {
    country: {},
  };

  async componentDidMount() {
    try {
      const result = await axiosGetCountryData();
      this.setState({
        country: result.data.data,
      });
    } catch (error) {
      throw new Error("error");
    }
  }

  handleAreaNumber = value => {
    return () => {
      if (this.props.location.state.from === "login") {
        this.props.history.replace("/login", { num: value });
        return;
      }
      this.props.history.replace("/register/registerphone", { num: value });
    };
  };

  render() {
    const arr = Object.keys(this.state.country);
    return (
      <div>
        <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log("onLeftClick")}
          >
            硅谷注册登录
          </NavBar>
        </div>
        <div className="container">
          {arr.map(value => {
            const countryArr = this.state.country[value];
            return (
              <List key={value} renderHeader={() => value} className="my-list">
                {countryArr.map(value => {
                  const countryName = Object.keys(value);
                  return (
                    <Item
                      key={countryName[0]}
                      extra={value[countryName[0]]}
                      onClick={this.handleAreaNumber(value[countryName[0]])}
                    >
                      {countryName[0]}
                    </Item>
                  );
                })}
              </List>
            );
          })}
        </div>
      </div>
    );
  }
}
