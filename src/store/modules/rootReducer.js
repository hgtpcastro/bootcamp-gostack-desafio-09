import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import overlay from './overlay/reducer';
import delivery from './delivery/reducer';
import deliveryman from './deliveryman/reducer';
import recipient from './recipient/reducer';
import occurrence from './occurrence/reducer';

export default combineReducers({
  auth,
  user,
  overlay,
  delivery,
  deliveryman,
  recipient,
  occurrence,
});
