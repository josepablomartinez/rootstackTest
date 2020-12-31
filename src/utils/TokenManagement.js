const TokenManagement = () => {
  let _token = null;
  let _userName = null;
  ///returns the token
  //TODO: dont use localStorage
  const get = () =>
    _token == null ? localStorage.getItem("innocentData") : _token;
  //stores the token on memory and in the localStorage
  //TODO: please remove the localStorage feature
  const set = (token) => {
    _token = token;
    localStorage.setItem("innocentData", _token);
  };
  //return the userName
  const getUserName = () =>
    _userName == null ? localStorage.getItem("userName") : _userName;
  //stores the usernane on memory and in the localStorage
  const setUserName = (uN) => {
    _userName = uN;
    localStorage.setItem("userName", _userName);
  };

  return {
    get,
    set,
    getUserName,
    setUserName,
  };
};

export default TokenManagement();
