import axios from "axios";


//验证验证码是否正确
function axiosVerifyCode(phone, code) {
  return axios({
    url: "/regist/verify_code",
    method: "post",
    data: {
      phone,
      code
    },
  });
}


//将手机号发送给后台,后台通过手机号去发送验证码
function axiosSendCode(phone) {
  return axios({
    url: "/login/digits",
    method: "post",
    data: {
      phone,
    },
  });
}

export { axiosVerifyCode, axiosSendCode };
