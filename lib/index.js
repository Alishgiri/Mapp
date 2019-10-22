import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
import {setRootToInitialization} from './navigation';

function launchApp() {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(() => {
    setRootToInitialization();
  });
}

launchApp();
