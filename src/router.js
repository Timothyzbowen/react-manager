import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./app.js";
import Admin from "./admin";
import Home from "./pages/Home";
import City from "./pages/City";
import Order from "./pages/Order";
import OrderDetail from "./pages/Order/detail";
import Common from "./common";
import User from "./pages/User";
import BikeMap from "./pages/Map";
import Bar from "./pages/echarts/Bar";
import Pie from "./pages/echarts/Pie";
import Line from "./pages/echarts/Line";
import PermissionUser from "./pages/Permission";
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <App>
          <Switch>
            <Route
              path="/common"
              render={() => (
                <Common>
                  <Route
                    path="/common/order/detail/:orderId"
                    component={OrderDetail}
                  />
                </Common>
              )}
            />
            <Route
              path="/"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/city" component={City} />
                    <Route path="/order" component={Order} />
                    <Route path="/user" component={User} />
                    <Route path="/bikeMap" component={BikeMap} />
                    <Route path="/charts/bar" component={Bar} />
                    <Route path="/charts/pie" component={Pie} />
                    <Route path="/charts/line" component={Line} />
                    <Route path="/permission" component={PermissionUser} />
                    <Redirect to="/home" />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </BrowserRouter>
    </div>
  );
};

export default Router;
