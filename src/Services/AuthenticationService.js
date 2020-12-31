import TokenManagement from "../utils/TokenManagement";

let _loginUser = "";
let loginURL = "https://coding-test.rootstack.net/api/auth/login";

//Call the external authentication service to retrieve a security token
const logIn = (username, password) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ email: username, password: password }),
    crossDomain: true,
    Accept: "*/*",
    mimeType: "multipart/json",
    data: "form",
    headers: {
      "content-type": "multipart/json",
    },
  };

  return fetch(loginURL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data !== undefined && data.error === undefined)
        TokenManagement.set(data.access_token);
      else return false;
      return true;
    })
    .catch((error) => {
      return false;
    });
};

//Deletes the login information
const logOut = () => {};

const UserInfo = () => {
  let securityToken = TokenManagement.get();
  const userInfoURL = "https://coding-test.rootstack.net/api/auth/me";

  const requestOptions = {
    method: "GET",
    crossDomain: true,
    Accept: "*/*",
    mimeType: "multipart/json",
    headers: { Authorization: `bearer ${securityToken}` },
  };

  return fetch(userInfoURL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data.name;
    });
};

export const authenticationService = {
  logIn,
  logOut,
  UserInfo,
  loginUser: _loginUser,
};
