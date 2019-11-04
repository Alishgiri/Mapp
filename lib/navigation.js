import {Navigation} from 'react-native-navigation';

import {
  EXPLORE_SCREEN,
  COUNTRY_CODES_SCREEN,
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
              name: COUNTRY_CODES_SCREEN,
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
