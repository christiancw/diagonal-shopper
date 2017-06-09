import React from 'react';
import { Link, Route } from 'react-router';

export default function Navbar (props) {
  const loggedIn = null;
console.log("RENDER THE NAVBAR", props)
  return (
    <div>
    { loggedIn ?
      <div>
        <button>
        <Link to="/home">Home</Link>
        </button>
      </div> :
      <div>
        <button>
        <Link to="/products">All Products</Link>
        </button>
        <button>
        <Link to="/cart">Cart</Link>
        </button>
        <button>
        <Link to="/login">Login</Link>
        </button>
        <button>
        <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    }
    </div>
  );
}
