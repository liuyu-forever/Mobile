import { lazy } from "react";

//由于使用import方法导入,第一次会将所有导入的组件全部渲染,内存占用较大,所以使用react中的lazy方法实现懒加载
const Home = lazy(() => import("./../components/Home/Home"));
const Login = lazy(() => import("./../components/Login/Login"));
const RegisterPhone = lazy(() =>
  import("./../components/Register/RegisterPhone/RegisterPhone")
);
const RegisterCode = lazy(() =>
  import("../components/Register/RegisterCode/RegisterCode")
);

const RegisterPassword = lazy(() =>
  import("../components/Register/RegisterPassword/RegisterPassword.jsx")
);
const CountryList = lazy(() => import("../components/CountryList/CountryList"));

//定义路由数组(也称路由表),配置相关路由参数,此数组由App组件动态渲染
const routerArr = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register/registerphone",
    component: RegisterPhone,
  },
  {
    path: "/register/registercode",
    component: RegisterCode,
  },
  {
    path: "/register/registerpassword",
    component: RegisterPassword,
  },
  {
    path: "/countrylist",
    component: CountryList,
  },
];

export default routerArr;
