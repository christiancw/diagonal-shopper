import React from 'react';
import { Link, Route } from 'react-router';

export default function Navbar (props) {
  const categories = props.categories;

  return (
    <div>
      <button>
        <Link to="/home">Home</Link>
      </button>
      <button>
        <Link to="/products">Products</Link>
      </button>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/signup">Sign Up</Link>
      </button>
    </div>
  )
}
