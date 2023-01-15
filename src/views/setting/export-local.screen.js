import React from 'react';
import { ScrollView, Clipboard, View, Platform, NativeModules} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import StateJsonConvert from '../../modules/state-json-convert';
import { ThemeFlex, PrimaryText } from '../../components';
import { showToast } from '../../modules/toast';

const Preview = styled(ScrollView)`
  flex: 0 200px;
  margin-bottom: 20px;
`;

class ExportLocal extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: '备份',
      headerTintColor: screenProps.theme.primaryColor,
      headerStyle: { backgroundColor: screenProps.theme.windowColor },
    };
  };
  props: {
    playerState: Object,
    myPlaylistState: Object,
  };
  constructor(props) {
    super(props);
    this.state = { jsonString: '' , deviceOS: Platform.OS};
    this.onPressCopy = this.onPressCopy.bind(this);
    this.onExportConfigToFile = this.onExportConfigToFile.bind(this);
  }
  componentDidMount() {
    // generate backup json
    const jsonObj = StateJsonConvert.getJson({
      playerState: this.props.playerState,
      myPlaylistState: this.props.myPlaylistState,
    });

    this.setState({ jsonString: JSON.stringify(jsonObj) });
  }
  onPressCopy = () => {
    Clipboard.setString(this.state.jsonString);
    console.log(`render ${this.state.jsonString}`);
    showToast('已复制到剪切板');
  };
  onExportConfigToFile=()=>{
    NativeModules.FileImportConfig.writeFile(this.state.jsonString,(writeState)=>{
      if (writeState) {
        showToast('备份成功: /storage/emulated/0/Download/listen1_backup.json');
      }else{
        showToast('备份失败');
      }
    })
  };
  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <ThemeFlex style={{ padding: 20 }}>
        <Preview>
          <PrimaryText> {this.state.jsonString}</PrimaryText>
        </Preview>
        <Button title="一键复制" onPress={this.onPressCopy} />

        {(this.state.deviceOS == 'android')?(
        <View style={{ marginTop: 10 }}><Button title="备份到文件" onPress={this.onExportConfigToFile} /></View>
        ):null}
        
        <PrimaryText style={{ marginTop: 10 }}>
          备份方法：点击一键复制后，将内容粘贴到文本文件或笔记中，恢复时在恢复窗口粘贴回来就可以了。
        </PrimaryText>
      </ThemeFlex>
    );
  }
}

const mapStateToProps = ({ playerState, myPlaylistState }) => ({
  playerState,
  myPlaylistState,
});

export default connect(mapStateToProps)(withTheme(ExportLocal));
