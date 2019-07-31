import React from 'react';
import { View, FlatList } from 'react-native';
import { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import { PlaylistRow, CloseTouchable, PrimaryText } from '../../components';

class AddToPlaylistPopup extends React.Component {
  props: {
    myPlaylistState: Object,
    onClose: Function,
    onPress: Function,
    item: Object,
  };

  constructor(props) {
    super(props);
    this.onPressItem = this.onPressItem.bind(this);
  }

  onPressItem = item => {
    this.props.onPress({
      track: this.props.item,
      playlist: item,
    });
  };

  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={item => item.id}
          data={this.props.myPlaylistState.playlists}
          renderItem={({ item }) => (
            <PlaylistRow onPress={this.onPressItem} item={item} />
          )}
        />
        <CloseTouchable onPress={this.props.onClose}>
          <PrimaryText>关闭</PrimaryText>
        </CloseTouchable>
      </View>
    );
  }
}
const mapStateToProps = ({ myPlaylistState }) => ({
  myPlaylistState,
});

export default connect(mapStateToProps)(withTheme(AddToPlaylistPopup));
