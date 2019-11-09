import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import {Label, RoundedTextField} from './ui';
import {animateRedraw} from '../utilities/ui-manages-animation';
import ActivityIndicatorWrapper from './ActivityIndicatorWrapper';
import {SHADOW_EFFECT, PURPLE} from '../utilities/constants/style-constants';

class AutoCompleteTextField extends React.Component {
  state = {
    keyword: '',
    suggestions: [],
    isVisible: false,
  };

  componentDidUpdate(_, prevState) {
    const {keyword} = this.state;
    if (keyword !== prevState.keyword && keyword.trim() === '') {
      this.props.selected(null);
    }
  }

  onFilter = keyword => {
    const {data, compareKey} = this.props;
    this.setState({keyword});
    const suggestions = [
      ...data.filter(d => {
        if (d[compareKey].toLowerCase().includes(keyword.toLowerCase()))
          return d;
      }),
    ];
    if (Boolean(suggestions.length)) {
      animateRedraw();
      this.setState({
        suggestions,
        isVisible: true,
      });
    }
  };

  onSelectionMade = item => {
    animateRedraw();
    this.setState({
      suggestions: [],
      isVisible: false,
      keyword: item[this.props.compareKey],
    });
    this.props.selected(item);
  };

  keyPressAction = () => {
    const {isVisible, keyword} = this.state;
    if (isVisible && keyword === '') {
      animateRedraw();
      this.setState({isVisible: false, suggestions: []});
    }
  };

  render() {
    const {isVisible, suggestions, keyword} = this.state;
    const {data, align, style, invalid, compareKey, ...rest} = this.props;
    return (
      <ActivityIndicatorWrapper check={!Boolean(data)}>
        <View style={[styles.container, style]}>
          <RoundedTextField
            {...rest}
            value={keyword}
            invalid={invalid}
            onChangeText={this.onFilter}
            clearButtonMode="while-editing"
            onKeyPress={this.keyPressAction}
            style={styles.text_field(align, Boolean(suggestions.length))}
          />
          {isVisible && (
            <View style={styles.popup_view}>
              <FlatList
                data={suggestions}
                keyExtractor={s => `${s.id}`}
                keyboardShouldPersistTaps="handled"
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    key={item.id}
                    onPress={() => this.onSelectionMade(item)}>
                    <View style={styles.list_item}>
                      <Label title={item.name} style={styles.label} />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
          )}
        </View>
      </ActivityIndicatorWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  text_field: function(align = 'center', alteration) {
    return {
      width: '100%',
      textAlign: align,
      ...(alteration
        ? {
            ...SHADOW_EFFECT,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }
        : {}),
    };
  },
  popup_view: {
    padding: 10,
    width: '100%',
    maxHeight: 120,
    ...SHADOW_EFFECT,
    shadowColor: PURPLE,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  list_item: {
    padding: 10,
  },
  label: {
    paddingVertical: 5,
  },
});

export default AutoCompleteTextField;
