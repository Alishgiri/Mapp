import {Navigation} from 'react-native-navigation';

import {
  JOIN_US_SCREEN,
  INITIALIZATION_SCREEN,
  EXPLORE_SCREEN,
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

export function setRootToJoinUs() {
  Navigation.setRoot({
    root: {
      component: {
        name: JOIN_US_SCREEN,
      },
    },
  });
}

export function setRootToLandingPage() {
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
