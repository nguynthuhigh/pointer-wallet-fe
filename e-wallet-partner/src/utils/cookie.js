import Cookies from "universal-cookie";
const cookie = new Cookies();
export const setToken = (token) => {
  cookie.set("access_token", token, {
    maxAge: 1000 * 60 * 15,
  });
};

export const removeToken = (token) => {
  cookie.remove("access_token", token);
};

export const getToken = () => {
  cookie.get("access_token");
};
