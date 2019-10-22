import {Navigation} from 'react-native-navigation';

import {
  EXPLORE_SCREEN,
  INITIALIZATION_SCREEN,
} from './utilities/constants/screen-constants';

export function setRootToInitialization() {
  Navigation.setRoot({
    root: {
      component: {
        name: INITIALIZATION_SCREEN,
      },
    },
  });
}

export function setRootToMainPage() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: EXPLORE_SCREEN,
            },
          },
        ],
        options: {
          topBar: {visible: false},
        },
      },
    },
  });
}
