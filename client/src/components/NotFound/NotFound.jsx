import React from 'react';
import "../NotFound/NotFound.scss";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='ntfoundcontainer'>
        <section class="notFound">
        <div class="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
        </div>
        <div class="textnf">
        <h1>404</h1>
        <h2 className='h2nf'>PAGE NOT FOUND</h2>
        <h3><Link to="/" id='nflink'>BACK TO HOME</Link></h3>
        </div>
    </section>
    </div>
  );
};

export default NotFound;
