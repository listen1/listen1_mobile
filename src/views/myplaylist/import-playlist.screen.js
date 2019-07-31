import React from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeFlex, PrimaryText } from '../../components';
import Client from '../../api/client';

class ImportPlaylist extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const {
      params = {
        onFinish: () => {},
      },
    } = navigation.state;

    return {
      title: '导入歌单',
      headerTintColor: screenProps.theme.primaryColor,
      headerStyle: { backgroundColor: screenProps.theme.windowColor },
      headerRight: (
        <TouchableOpacity
          onPress={() => params.onFinish()}
          style={{ padding: 10 }}
        >
          <PrimaryText style={{ fontSize: 18 }}>打开</PrimaryText>
        </TouchableOpacity>
      ),
    };
  };
  props: {
    navigation: Object,
    theme: Object,
  };

  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.state = { text: '', notice: '' };
  }
  componentDidMount() {
    this.props.navigation.setParams({ onFinish: this.onFinish });
  }
  onFinish() {
    this.setState({ notice: '' });
    // get playlistid from client and push to playlist detail
    const result = Client.parseUrl(this.state.text);

    if (result === null) {
      this.setState({ notice: '无法解析信息' });

      return;
    }
    this.props.navigation.replace('Details', {
      item: { info: { id: result.id } },
    });
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
          placeholder="请粘贴歌单分享中复制链接的内容"
          selectTextOnFocus
          autoFocus
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <PrimaryText>{this.state.notice}</PrimaryText>
      </ThemeFlex>
    );
  }
}
const mapStateToProps = ({ myPlaylistState }) => ({
  myPlaylistState,
});

export default connect(mapStateToProps)(withTheme(ImportPlaylist));
