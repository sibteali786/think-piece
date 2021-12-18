import React from 'react';

import moment from 'moment';
import { signOut } from '../firebase';
import { Link} from "react-router-dom";
const CurrentUser = ({ user, children }) => {
  console.log(user);
  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {user.photoURL && <img src={user.photoURL} alt={user.displayName} />}
        <div className="CurrentUser--information">
          <Link to="profile">
          
          <h2>{user.displayName}</h2>
          </Link>
          <p className="email">{user.email}</p>
          <p className="created-at">{moment(user.createdAt).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
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