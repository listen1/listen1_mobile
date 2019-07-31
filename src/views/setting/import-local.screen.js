import React from 'react';
import { ScrollView, Clipboard } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import StateJsonConvert from '../../modules/state-json-convert';
import { ThemeFlex, PrimaryText } from '../../components';
import { showToast } from '../../modules/toast';
import { recoverData } from '../../redux/actions';

const Preview = styled(ScrollView)`
  flex: 0 200px;
  margin-bottom: 20px;
`;

class ImportLocal extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: '恢复',
      headerTintColor: screenProps.theme.primaryColor,
      headerStyle: { backgroundColor: screenProps.theme.windowColor },
    };
  };
  props: {
    dispatch: Function,
  };
  constructor(props) {
    super(props);
    this.state = { jsonString: '', isValidJson: false };
    this.onPressPaste = this.onPressPaste.bind(this);
    this.onPressRecover = this.onPressRecover.bind(this);
  }

  onPressPaste = () => {
    Clipboard.getString().then(jsonString => {
      try {
        JSON.parse(jsonString);
      } catch {
        this.setState({ jsonString: '', isValidJson: false });

        return showToast('未在剪切板找到可用的备份文本');
      }
      this.setState({ jsonString, isValidJson: true });

      return showToast('已粘贴');
    });
  };
  onPressRecover = () => {
    const json = JSON.parse(this.state.jsonString);
    const state = StateJsonConvert.getState(json);

    this.props.dispatch(recoverData(state));
    showToast('恢复成功,请返回');
  };
  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <ThemeFlex style={{ padding: 20 }}>
        <Preview>
          <PrimaryText> {this.state.jsonString}</PrimaryText>
        </Preview>
        {!this.state.isValidJson ? (
          <Button title="从剪切板粘贴" onPress={this.onPressPaste} />
        ) : (
          <Button
            buttonStyle={{ backgroundColor: '#e1a900' }}
            title="恢复（警告：将覆盖当前数据）"
            disabled={this.state.isRecovering}
            onPress={this.onPressRecover}
          />
        )}

        <PrimaryText style={{ marginTop: 10 }}>
          恢复方法：复制之前备份的文本，点击“从剪切板粘贴”,
          再点击“恢复”就可以了。
        </PrimaryText>
        <PrimaryText style={{ marginTop: 10 }}>
          警告：恢复功能将覆盖当前所有的歌单信息，请谨慎操作。
        </PrimaryText>
      </ThemeFlex>
    );
  }
}

const mapStateToProps = ({ playerState, myPlaylistState }) => ({
  playerState,
  myPlaylistState,
});

export default connect(mapStateToProps)(withTheme(ImportLocal));
