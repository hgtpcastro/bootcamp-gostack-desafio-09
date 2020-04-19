// Imports
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// UI Imports
import Wrapper from '~/components/Wrapper';

// App Imports
import DeliverymenOverview from '~/pages/Deliverymen/Overview';
import DeliverymanDetails from '~/pages/Deliverymen/Details';

// Component
export default function Deliverymen({ match }) {
  const { url } = match;
  return (
    <Wrapper>
      <Switch>
        <Route path={`${url}`} exact component={DeliverymenOverview} />
        <Route
          path={`${url}/update/:deliveryman_id`}
          component={DeliverymanDetails}
        />
        <Route path={`${url}/create`} component={DeliverymanDetails} />
      </Switch>
    </Wrapper>
  );
}
