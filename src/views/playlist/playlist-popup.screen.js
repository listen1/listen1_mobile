import React from 'react';
import { View, FlatList } from 'react-native';
import { TrackRow, CloseTouchable, PrimaryText } from '../../components';

export default class PlaylistPopup extends React.PureComponent {
  props: {
    tracks: Object,
    onPressItem: Function,
    onClose: Function,
    onPressRemoveItem: Function,
    nowPlayingTrackId: String,
  };
  getItemLayout = (data, index) => ({ length: 50, offset: 50 * index, index });
  scrollToCurrent = () => {
    if (this.props.nowPlayingTrackId === '') {
      return;
    }
    const index = this.props.tracks.findIndex(
      item => item.id === this.props.nowPlayingTrackId
    );

    if (index > -1) {
      const marginTopIndex = 4;
      let offsetIndex = index - marginTopIndex;

      if (offsetIndex < 0) {
        offsetIndex = 0;
      }
      this.flatListRef.scrollToIndex({ animated: false, index: offsetIndex });
    }
  };

  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.tracks}
          ref={ref => {
            this.flatListRef = ref;
          }}
          renderItem={({ item }) => {
            return (
              <TrackRow
                onPress={this.props.onPressItem}
                item={item}
                iconType="close"
                onPressIcon={this.props.onPressRemoveItem}
                isPlaying={item.id === this.props.nowPlayingTrackId}
              />
            );
          }}
          keyExtractor={item => item.id}
          extraData={this.props.nowPlayingTrackId}
          onOpen={this.onOpen}
          getItemLayout={this.getItemLayout}
        />

        <CloseTouchable onPress={this.props.onClose}>
          <PrimaryText>关闭</PrimaryText>
        </CloseTouchable>
      </View>
    );
  }
}
