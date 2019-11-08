import {Navigation} from 'react-native-navigation';

import {
  JOIN_US_SCREEN,
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

export function setRootToJoinUs() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: JOIN_US_SCREEN,
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
