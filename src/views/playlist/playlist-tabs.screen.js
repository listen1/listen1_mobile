import React, { PureComponent } from 'react';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import { connect } from 'react-redux';

import { withTheme } from 'styled-components';
import PlaylistGrid from './playlist-grid.screen';
import NavHeader from './nav-header.screen';
import Search from './search.screen';
import { search } from '../../redux/actions';
import Client from '../../api/client';
import { ThemeFlex } from '../../components';
import MyPlaylistList from '../myplaylist/myplaylist-list.screen';

class PlaylistTabs extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <NavHeader theme={screenProps.theme} navigation={navigation} />
    ),
    headerStyle: { backgroundColor: screenProps.theme.windowColor },
  });
  props: {
    navigation: Object,
    searchState: Object,
    dispatch: Function,
    theme: Object,
  };
  state = {
    currentTab: 0,
  };
  constructor(props) {
    super(props);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

  getIndex() {
    return this.state.currentTab;
  }
  handleChangeTab({ i }) {
    this.setState({ currentTab: i });
    this.props.dispatch(search(this.props.searchState.text));
  }
  renderTabBar = props => (
    <DefaultTabBar {...props} style={{ borderBottomWidth: 0 }} />
  );
  render() {
    const { text } = this.props.searchState;

    // console.log(`render ${this.constructor.name}`);

    return (
      <ThemeFlex>
        <ScrollableTabView
          initialPage={1}
          tabBarBackgroundColor={this.props.theme.windowColor}
          tabBarActiveTextColor={this.props.theme.primaryColor}
          tabBarInactiveTextColor={this.props.theme.inactiveColor}
          style={text !== '' ? { display: 'none' } : {}}
          renderTabBar={this.renderTabBar}
          tabBarUnderlineStyle={{
            backgroundColor: this.props.theme.primaryColor,
          }}
        >
          <MyPlaylistList
            tabLabel="我的"
            key="my"
            platformId="my"
            navigation={this.props.navigation}
          />
          {Client.getPlatformArray().map(i => {
            return (
              <PlaylistGrid
                tabLabel={i.name}
                key={i.platformId}
                platformId={i.platformId}
                navigation={this.props.navigation}
              />
            );
          })}
        </ScrollableTabView>

        <ScrollableTabView
          tabBarBackgroundColor={this.props.theme.windowColor}
          tabBarActiveTextColor={this.props.theme.primaryColor}
          tabBarInactiveTextColor={this.props.theme.inactiveColor}
          style={text === '' ? { display: 'none' } : {}}
          onChangeTab={this.handleChangeTab}
          renderTabBar={this.renderTabBar}
          tabBarUnderlineStyle={{
            backgroundColor: this.props.theme.primaryColor,
          }}
        >
          {Client.getPlatformArray().map((i, index) => {
            return (
              <Search
                tabLabel={i.name}
                key={i.platformId}
                tabIndex={index}
                platformId={i.platformId}
                navigation={this.props.navigation}
                getIndex={this.getIndex}
              />
            );
          })}
        </ScrollableTabView>
      </ThemeFlex>
    );
  }
}
const mapStateToProps = ({ searchState }) => ({
  searchState,
});

export default connect(mapStateToProps)(withTheme(PlaylistTabs));
