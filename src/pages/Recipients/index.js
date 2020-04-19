// Imports
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// App Imports
import Wrapper from '~/components/Wrapper';
import RecipientsOverview from '~/pages/Recipients/Overview';
import RecipientDetails from '~/pages/Recipients/Details';

// Component
export default function Recipients({ match }) {
  const { url } = match;
  return (
    <Wrapper>
      <Switch>
        <Route path={`${url}`} exact component={RecipientsOverview} />
        <Route
          path={`${url}/update/:recipient_id`}
          component={RecipientDetails}
        />
        <Route path={`${url}/create`} component={RecipientDetails} />
      </Switch>
    </Wrapper>
  );
}
