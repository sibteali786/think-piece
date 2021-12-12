import React from 'react';

import moment from 'moment';
import { signOut } from '../firebase';

const CurrentUser = ({ multiFactor }) => {
  const user = multiFactor.user;
  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {user.photoURL && <img src={user.photoURL} alt={user.displayName} />}
        <div className="CurrentUser--information">
          <h2>{user.displayName}</h2>
          <p className="email">{user.email}</p>
          <p className="created-at">{moment(user.createdAt).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{user.children}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: 'Bill Murray',
  email: 'billmurray@mailinator.com',
  photoURL: 'https://www.fillmurray.com/300/300',
  createdAt: new Date(),
};

export default CurrentUser;