import React from 'react';

function Dashboard({ user, onLogout }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      {/* Add your dashboard content here */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
