import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Axios from 'axios';

import {
  generateIonicon,
  generateMCommunityIcon,
  generateFontAwesomeIcon,
} from '../utilities/icon-generator';
import {
  ORANGE,
  FONT_XS,
  SHADOW_EFFECT,
  getDimentions,
  LIGHTER_PURPLE,
} from '../utilities/constants/style-constants';
import {SafeArea, Label, RoundedTextField, AppButton} from '../components/ui';
import Fab from '../components/Fab';

const W = getDimentions().width;

class CountryCodes extends React.Component {
  state = {
    keyword: '',
    suggestion: null,
    suggestions: null,
    selectedCode: null,
    listOfCountries: null,
  };

  componentDidMount() {
    Axios.get(
      'https://www.dropbox.com/s/raw/33tmsr0h3eggjke/countries-image.json',
    )
      .then(res => {
        const listOfCountries = Object.values(res.data);
        this.setState({listOfCountries});
      })
      .catch(error => {
        console.log(error);
      });
  }

  _onChangeText = keyword => {
    const getSuggestion = this.state.listOfCountries.filter(c =>
      c.name.common.toLowerCase().includes(keyword.toLowerCase()),
    );
    console.log(getSuggestion);
    this.setState({keyword, suggestions: getSuggestion});
  };

  onSelection = callingCode => () => this.setState({selectedCode: callingCode});

  onConfirmSelection = code => () => this.props.onSelection(code);

  _renderItem = ({item}) => {
    const {
      callingCode,
      name: {common},
    } = item;
    if (callingCode.length > 0) {
      const code = `+${callingCode[0]}`;
      return (
        <TouchableOpacity
          onPress={this.onSelection(code)}
          style={styles.list_item_container}>
          <View style={styles.country_code}>
            <Label title={code} size={FONT_XS} />
          </View>
          <Label title={common} style={styles.country_name} />
          {this.state.selectedCode === code && (
            <View style={styles.check_view}>
              {generateMCommunityIcon('check', 20, 'black')}
            </View>
          )}
        </TouchableOpacity>
      );
    }
  };

  render() {
    const {suggestions, listOfCountries, selectedCode} = this.state;

    return (
      <>
        <View style={styles.app_bar}>
          <AppButton
            onPress={this.props.onDismiss}
            title={generateIonicon('ios-arrow-back', 30)}
          />
          <RoundedTextField
            placeholder="Search…"
            style={styles.text_field}
            onChangeText={this._onChangeText}
            leftIcon={generateFontAwesomeIcon('search', 15)}
          />
        </View>
        <SafeArea style={styles.container}>
          {listOfCountries ? (
            <FlatList
              style={styles.flat_list}
              renderItem={this._renderItem}
              data={suggestions || listOfCountries}
              keyExtractor={(item, index) => `${index}`}
              contentContainerStyle={styles.content_style}
            />
          ) : (
            <ActivityIndicator />
          )}
        </SafeArea>
        {selectedCode && (
          <Fab
            title="OK"
            style={styles.ok_button}
            titleStyle={styles.ok_title}
            onPress={this.onConfirmSelection(selectedCode)}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  app_bar: {
    padding: 20,
    color: 'white',
    ...SHADOW_EFFECT,
    elevation: 40,
    flexDirection: 'row',
  },
  text_field: {
    height: 40,
    width: '90%',
    marginLeft: 20,
    backgroundColor: '#eee',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat_list: {
    width: W / 1.2,
  },
  content_style: {
    alignItems: 'center',
  },
  list_item_container: {
    padding: 20,
    width: W / 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: LIGHTER_PURPLE,
  },
  country_code: {
    marginLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: LIGHTER_PURPLE,
  },
  country_name: {
    width: '70%',
    marginLeft: 10,
  },
  check_view: {
    right: 5,
    width: 30,
    height: 30,
    ...SHADOW_EFFECT,
    borderRadius: 15,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default CountryCodes;
