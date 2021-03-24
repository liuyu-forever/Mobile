import React, { PureComponent, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routerArr from "./config/routers";
import "./App.css";

export default class App extends PureComponent {
  render() {
    return (
      <Suspense fallback={<div>正在加载...</div>}>
        <Router>
          <Switch>
            {routerArr.map(value => {
              return (
                <Route
                  key={value.path}
                  path={value.path}
                  component={value.component}
                  exact={value.exact}
                ></Route>
              );
            })}
          </Switch>
        </Router>
      </Suspense>
    );
  }
}
