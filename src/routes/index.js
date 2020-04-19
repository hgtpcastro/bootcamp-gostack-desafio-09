// Imports
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

// App Imports
import Login from '~/pages/Login';
import Deliveries from '~/pages/Deliveries';
import Deliverymen from '~/pages/Deliverymen';
import Recipients from '~/pages/Recipients';
import Occurrences from '~/pages/Occurrences';

// Component
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/occurrences" component={Occurrences} isPrivate />
    </Switch>
  );
}
