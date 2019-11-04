import {Navigation} from 'react-native-navigation';

import JoinUs from './JoinUs';
import Profile from './Profile';
import Explore from './Explore';
import Messenger from './Messenger';
import EventDetails from './EventDetails';
import CountryCodes from './CountryCodes';
import Initialization from '../initialization';
import * as screens from '../utilities/constants/screen-constants';

export function registerScreens() {
  Navigation.registerComponent(
    screens.INITIALIZATION_SCREEN,
    () => Initialization,
  );
  Navigation.registerComponent(screens.JOIN_US_SCREEN, () => JoinUs);
  Navigation.registerComponent(screens.PROFILE_SCREEN, () => Profile);
  Navigation.registerComponent(screens.EXPLORE_SCREEN, () => Explore);
  Navigation.registerComponent(screens.MESSENGER_SCREEN, () => Messenger);
  Navigation.registerComponent(
    screens.COUNTRY_CODES_SCREEN,
    () => CountryCodes,
  );
  Navigation.registerComponent(
    screens.EVENT_DETAILS_SCREEN,
    () => EventDetails,
  );
}
