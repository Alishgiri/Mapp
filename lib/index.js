import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';
import {setRootToMainPage} from './navigation';

function launchApp() {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(() => {
    setRootToMainPage();
  });
}

launchApp();
