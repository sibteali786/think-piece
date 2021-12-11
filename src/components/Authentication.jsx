import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

const Authentication = ({ User, loading }) => {
  if (loading) return null;
  console.log(User);
  return <div>{User ? <CurrentUser {...User} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
  