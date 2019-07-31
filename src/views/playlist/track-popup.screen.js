import React from 'react';
import { View, FlatList } from 'react-native';
import { withTheme } from 'styled-components';
import { CloseTouchable, PrimaryText, OptionRow } from '../../components';

class TrackPopupClass extends React.PureComponent {
  props: {
    onClose: Function,
    item: Object,
    onPress: Function,
  };
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress = option => {
    this.props.onPress(option);
  };
  controlArray = [
    { key: 'next_to_play', title: '下一首播放', icon: 'play-circle-outline' },
    { key: 'add_to_playlist', title: '收藏到歌单', icon: 'add-box' },
    { key: 'nav_artist', title: '歌手', icon: 'person' },
    { key: 'nav_album', title: '专辑', icon: 'album' },
    { key: 'nav_source', title: '来源', icon: 'insert-link' },
  ];

  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.controlArray}
          ListHeaderComponent={() => (
            <View style={{ padding: 15 }}>
              <PrimaryText>{this.props.item.title}</PrimaryText>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <OptionRow
                onPress={this.onPress}
                option={item}
                item={this.props.item}
              />
            );
          }}
        />
        <CloseTouchable onPress={this.props.onClose}>
          <PrimaryText>关闭</PrimaryText>
        </CloseTouchable>
      </View>
    );
  }
}
export default withTheme(TrackPopupClass);
