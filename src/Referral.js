import React, { Component } from 'react';

class Referral extends Component {
  render() {
    return (
      <form action="/submitRef/" method="POST" onSubmit={this.onSubmit}>
          <input type="text" placeHolder="Referral Name" name="refName"/>
          <input type="text" placeHolder="First Name" name="firstName"/>
          <input type="text" placeHolder="Last Name" name="lastName"/>
          <input type="text" placeHolder="Email" name="email"/>
          <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default Referral;
