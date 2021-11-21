import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { Switch } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { changeTheme, setStopTimer } from '../../redux/actions';
import {
  RowFlex,
  ThemeFlex,
  PrimaryText,
  TableCellRow,
  ModalLite,
} from '../../components';

const SettingRow = styled(RowFlex)`
  height: 60px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.borderColor};
`;

const KeyField = styled(PrimaryText)`
  text-align: left;
`;

const StopTimes = new Array(7).fill('');

class Setting extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: '更多',
      headerTintColor: screenProps.theme.primaryColor,
      headerStyle: { backgroundColor: screenProps.theme.windowColor },
    };
  };
  props: {
    settingState: Object,
    dispatch: Function,
    theme: Object,
    navigation: Object,
  };
  constructor(props) {
    super(props);
    this.onChangeTheme = this.onChangeTheme.bind(this);
    this.onPressAbout = this.onPressAbout.bind(this);
    this.onPressBackup = this.onPressBackup.bind(this);
    this.onPressRestore = this.onPressRestore.bind(this);
    this.handleStopTimeChange = this.handleStopTimeChange.bind(this);
    this.onPressTimeOut = this.onPressTimeOut.bind(this);
    this.state = {
      showStopTimePicker: false,
    };
  }
  onChangeTheme(newValue) {
    let nextTheme = 'black';

    if (newValue) {
      nextTheme = 'black';
    } else {
      nextTheme = 'white';
    }
    this.props.dispatch(changeTheme(nextTheme));
  }
  onPressAbout() {
    this.props.navigation.navigate('About');
  }
  onPressBackup() {
    this.props.navigation.navigate('ExportLocal');
  }
  onPressRestore() {
    this.props.navigation.navigate('ImportLocal');
  }
  onPressTimeOut() {
    const { settingState: { stopTime } } = this.props;
    this.setState({ showStopTimePicker: true });
  }
  get items() {
    const { settingState: { stopTime } } = this.props;

    return [
      <SettingRow>
        <KeyField>夜间模式</KeyField>

        <Switch
          value={this.props.settingState.theme === 'black'}
          onValueChange={this.onChangeTheme}
        />
      </SettingRow>,
      <SettingRow>
        <KeyField>定时关闭</KeyField>

        <KeyField onPress={this.onPressTimeOut}>{stopTime ? `${moment(stopTime).diff(moment(), 'minute')} 分钟后` : '未开启'}</KeyField>
      </SettingRow>,
      <TableCellRow onPress={this.onPressBackup} title="备份" />,
      <TableCellRow onPress={this.onPressRestore} title="恢复" />,
      <TableCellRow
        onPress={this.onPressAbout}
        title="关于 Listen 1"
      />,
    ];
  }
  handleStopTimeChange(value) {
    this.props.dispatch(setStopTimer(value === 0 ? null : moment().add(value * 30, 'minutes')));
    this.setState({ showStopTimePicker: false });
  }
  render() {
    // console.log(`render ${this.constructor.name}`);
    const { settingState: { stopTime } } = this.props;
    const { showStopTimePicker } = this.state;

    return (
      <ThemeFlex>
        <FlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          keyExtractor={item => item.index}
          data={this.items}
          renderItem={item => {
            if (item.index < this.items.length) {
              return (
                this.items[item.index]
              );
            }

            return null;
          }}
        />
        <ModalLite
          isVisible={showStopTimePicker}
          modalHeight={450}
          backgroundColor={this.props.theme.windowColor}
          onClose={() => this.setState({ showStopTimePicker: false })}
          onOpened={() => { }}
        >
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            keyExtractor={item => item.index}
            data={StopTimes}
            renderItem={item => {
              return <TableCellRow
                onPress={() => this.handleStopTimeChange(item.index)}
                title={item.index === 0 ? '不开启' : `${item.index * 30}分钟后`}
              />
            }}
          />
        </ModalLite>
      </ThemeFlex>
    );
  }
}
const mapStateToProps = ({ settingState }) => ({
  settingState,
});

export default connect(mapStateToProps)(withTheme(Setting));
