import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ThemeFlex, PlaylistRow, RowFlex, PrimaryText } from '../../components';

const MyPlaylistListHeader = styled(RowFlex)`
  height: 50px;
  background: ${props => props.theme.backgroundColor};
  align-items: center;
  padding: 0 10px;
`;

class MyPlaylistList extends React.Component {
  props: {
    navigation: Object,
    theme: Object,
    myPlaylistState: Object,
  };

  constructor(props) {
    super(props);
    this.onPressCreate = this.onPressCreate.bind(this);
    this.onPressReorder = this.onPressReorder.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
  }

  onPressCreate() {
    this.props.navigation.navigate('CreatePlaylist');
  }
  onPressReorder() {
    this.props.navigation.navigate('ReOrder', {
      type: 'myplaylist',
    });
  }
  onPressItem = item => {
    this.props.navigation.navigate('Details', {
      item: { info: item },
    });
  };
  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <ThemeFlex>
        <FlatList
          ListHeaderComponent={() => (
            <MyPlaylistListHeader>
              <RowFlex>
                <PrimaryText style={{ fontSize: 20 }}> 我的歌单 </PrimaryText>
              </RowFlex>

              <View style={{ flex: 0, flexBasis: 60 }}>
                <RowFlex style={{ alignItems: 'center' }}>
                  <Icon
                    onPress={this.onPressCreate}
                    style={{ marginRight: 10 }}
                    name="add"
                    size={25}
                    color={this.props.theme.primaryColor}
                  />
                  <Icon
                    name="reorder"
                    size={25}
                    color={this.props.theme.primaryColor}
                    onPress={this.onPressReorder}
                  />
                </RowFlex>
              </View>
            </MyPlaylistListHeader>
          )}
          ref={ref => {
            this.flatListRef = ref;
          }}
          keyExtractor={item => item.id}
          data={this.props.myPlaylistState.playlists}
          renderItem={({ item }) => (
            <PlaylistRow onPress={this.onPressItem} item={item} />
          )}
        />
      </ThemeFlex>
    );
  }
}
const mapStateToProps = ({ myPlaylistState }) => ({
  myPlaylistState,
});

export default connect(mapStateToProps)(withTheme(MyPlaylistList));
