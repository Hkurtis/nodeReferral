import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import Referral from './Referral';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    // React.createElement(Counter),
    // document.getElementById('mount'),
    React.createElement(Referral),
    document.getElementById('mount')
  );

});
