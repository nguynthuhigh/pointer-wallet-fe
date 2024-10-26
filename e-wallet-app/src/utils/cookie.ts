import Cookie from "universal-cookie";
const cookie = new Cookie();
export const setCookie = (name: string, value: string, path = "/") => {
  cookie.set(name, value, {
    maxAge: 1000 * 60 * 15,
    path,
  });
};
export const getCookie = (name: string): Promise<string> => {
  return cookie.get(name);
};
