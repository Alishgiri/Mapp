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
  FONT_XS,
  SHADOW_EFFECT,
  LIGHTER_PURPLE,
} from '../utilities/constants/style-constants';
import {SafeArea, Label, RoundedTextField} from '../components/ui';
import {generateFontAwesomeIcon} from '../utilities/icon-generator';

class CountryCodes extends React.Component {
  state = {
    keyword: '',
    suggestion: null,
    suggestions: null,
    listOfCountries: null,
  };

  componentDidMount() {
    Axios.get(
      'https://www.dropbox.com/s/raw/33tmsr0h3eggjke/countries-image.json',
    )
      .then(res => {
        const listOfCountries = Object.values(res.data);
        console.log(listOfCountries);
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

  onSelection = callingCode => () => this.props.onSelection(callingCode);

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
        </TouchableOpacity>
      );
    }
  };

  render() {
    const {suggestions, listOfCountries} = this.state;

    return (
      <SafeArea style={styles.container}>
        {listOfCountries ? (
          <>
            <RoundedTextField
              placeholder="Search…"
              onChangeText={this._onChangeText}
              leftIcon={generateFontAwesomeIcon('search', 15)}
            />
            <FlatList
              style={styles.flat_list}
              renderItem={this._renderItem}
              data={suggestions || listOfCountries}
              keyExtractor={(item, index) => `${index}`}
              contentContainerStyle={styles.content_style}
            />
          </>
        ) : (
          <ActivityIndicator />
        )}
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  flat_list: {
    width: '100%',
  },
  content_style: {
    alignItems: 'center',
  },
  list_item_container: {
    margin: 20,
    padding: 20,
    width: '80%',
    maxWidth: '80%',
    minHeight: 60,
    ...SHADOW_EFFECT,
    elevation: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
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
});

export default CountryCodes;
