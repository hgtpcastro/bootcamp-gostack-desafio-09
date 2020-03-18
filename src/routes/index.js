import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Deliveries from '../pages/Deliveries';
import Deliverymen from '../pages/Deliverymen';
import Problems from '../pages/Problems';
import Recipients from '../pages/Recipients';
import SignIn from '../pages/SignIn';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
    </Switch>
  );
}
