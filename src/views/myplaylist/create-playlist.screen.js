import React from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMyPlaylist } from '../../redux/actions';
import { ThemeFlex, PrimaryText, SecondaryText, Flex } from '../../components';

class CreatePlaylist extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const {
      params = {
        onFinish: () => {},
      },
    } = navigation.state;

    return {
      title: '新建歌单',
      headerTintColor: screenProps.theme.primaryColor,
      headerStyle: { backgroundColor: screenProps.theme.windowColor },
      headerRight: (
        <TouchableOpacity
          onPress={() => params.onFinish()}
          style={{ padding: 10 }}
        >
          <PrimaryText style={{ fontSize: 18 }}>完成</PrimaryText>
        </TouchableOpacity>
      ),
    };
  };
  props: {
    dispatch: Function,
    navigation: Object,
    theme: Object,
  };

  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onPress = this.onPress.bind(this);
    this.state = { text: '新建歌单' };
  }
  componentDidMount() {
    this.props.navigation.setParams({ onFinish: this.onFinish });
  }
  onFinish() {
    const playlist = {
      tracks: [],
      info: {
        title: this.state.text,
        id: '',
        cover_img_url: './assets/images/logo.png',
      },
    };

    this.props.dispatch(createMyPlaylist(playlist));
    this.props.navigation.goBack();
  }

  onPress() {
    this.props.navigation.replace('ImportPlaylist');
  }
  render() {
    return (
      <ThemeFlex>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            color: this.props.theme.primaryColor,
          }}
          selectTextOnFocus
          autoFocus
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Flex style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={this.onPress}
            style={{
              padding: 10,
              width: 150,
              marginTop: 50,
              alignItems: 'center',
            }}
          >
            <SecondaryText>导入外部歌单 &gt;</SecondaryText>
          </TouchableOpacity>
        </Flex>
      </ThemeFlex>
    );
  }
}
const mapStateToProps = ({ myPlaylistState }) => ({
  myPlaylistState,
});

export default connect(mapStateToProps)(withTheme(CreatePlaylist));
