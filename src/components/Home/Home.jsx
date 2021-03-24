import React, { PureComponent } from "react";

export default class Home extends PureComponent {
  render() {
    return (
      <div
        onClick={() => {
          this.props.history.replace("/register/registerphone", {
            from: "/Home",
          });
        }}
      >
        首页
      </div>
    );
  }
}
