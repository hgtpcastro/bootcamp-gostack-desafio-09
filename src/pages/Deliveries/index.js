// Imports
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// UI Imports
import Wrapper from '~/components/Wrapper';

// App Imports
import Overview from '~/pages/Deliveries/Overview';
import Details from '~/pages/Deliveries/Details';

// Component
export default function Deliveries({ match }) {
  const { url } = match;
  return (
    <Wrapper>
      <Switch>
        <Route path={`${url}`} exact component={Overview} />
        <Route path={`${url}/update/:delivery_id`} component={Details} />
        <Route path={`${url}/create`} component={Details} />
      </Switch>
    </Wrapper>
  );
}
