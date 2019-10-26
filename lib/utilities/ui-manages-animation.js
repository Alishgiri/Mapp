import {UIManager, LayoutAnimation} from 'react-native';

export function animateRedraw() {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}
