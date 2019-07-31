import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { search } from '../../redux/actions';

const ModalBackButton = styled.TouchableOpacity`
  width: 40;
  height: 40;
  flex: 0 40px;
  align-items: center;
  justify-content: center;
`;
const SettingButton = styled.TouchableOpacity`
  width: 40;
  height: 40;
  flex: 0 40px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

class NavHeader extends Component {
  props: {
    dispatch: Function,
    navigation: Object,
    theme: Object,
  };
  state = {
    searchText: '',
    isFocus: false,
  };

  onFocus = () => {
    this.setState({ isFocus: true });
  };
  onSubmit = event => {
    this.props.dispatch(search(event.nativeEvent.text));
  };
  onBack = () => {
    this.setState({ searchText: '', isFocus: false });
    this.props.dispatch(search(''));
    this.input.blur();
  };
  onSetting = () => {
    this.props.navigation.navigate('Setting');
  };
  updateSearch = searchText => {
    this.setState({ searchText });
  };
  render() {
    const { searchText, isFocus } = this.state;

    // console.log(`render ${this.constructor.name}`);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isFocus ? (
          <Text
            style={{
              flex: 0,
              flexBasis: 100,
              fontSize: 24,
              textAlign: 'center',
              color: this.props.theme.primaryColor,
              paddingLeft: 10,
            }}
          >
            Listen1
          </Text>
        ) : (
          <ModalBackButton onPress={this.onBack}>
            <Icon
              name="arrow-back"
              size={25}
              color={this.props.theme.primaryColor}
            />
          </ModalBackButton>
        )}

        <View style={{ flex: 1 }}>
          <SearchBar
            lightTheme
            platform={Platform.OS === 'ios' ? 'ios' : 'default'}
            containerStyle={
              Platform.OS === 'ios'
                ? {
                    backgroundColor: this.props.theme.windowColor,
                    height: 26,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  }
                : {
                    backgroundColor: this.props.theme.windowColor,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  }
            }
            value={searchText}
            inputStyle={{ fontSize: 14 }}
            onChangeText={this.updateSearch}
            returnKeyType="search"
            onSubmitEditing={this.onSubmit}
            onFocus={this.onFocus}
            ref={ref => {
              this.input = ref;
            }}
            clearIcon={searchText !== '' ? { name: 'cancel' } : false}
            placeholder="输入歌曲名，歌手或专辑"
          />
        </View>
        {!isFocus ? (
          <SettingButton onPress={this.onSetting}>
            <Icon
              name="menu"
              size={30}
              color={this.props.theme.secondaryColor}
            />
          </SettingButton>
        ) : null}
      </View>
    );
  }
}

export default connect()(NavHeader);
