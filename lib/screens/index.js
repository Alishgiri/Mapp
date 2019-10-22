import {Navigation} from 'react-native-navigation';

import Explore from './Explore';
import Messenger from './Messenger';
import Initialization from '../initialization';
import * as screens from '../utilities/constants/screen-constants';

export function registerScreens() {
  Navigation.registerComponent(
    screens.INITIALIZATION_SCREEN,
    () => Initialization,
  );
  Navigation.registerComponent(screens.EXPLORE_SCREEN, () => Explore);
  Navigation.registerComponent(screens.MESSENGER_SCREEN, () => Messenger);
}
