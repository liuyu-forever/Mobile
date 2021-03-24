import axios from "axios";

//请求注册
function axiosRegister(phone, password) {
  return axios({
    url: "/regist/user",
    method: "post",
    data: {
      phone,
      password,
    },
  });
}

export { axiosRegister };
