import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
      <button style={{ margin: '0 10px' }}>Login</button>
      <button>Sign Up</button>
    </nav>
  );
};

export default Navbar;
