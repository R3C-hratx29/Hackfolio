export const login = (userdata) => {
  console.log('login', userdata);
  // do stuff
  return {
    type: 'SET_CURRENT_USER',
    userdata
  };
};

export const signup = (userdata) => {
  console.log('signup', userdata);
  // do stuff
  return {
    type: 'SET_CURRENT_USER',
    userdata
  };
};
