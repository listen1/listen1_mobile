import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { withTheme } from 'styled-components';

import { colors } from '../../config/colors';

const ControlButton = styled.TouchableOpacity`
  width: 60;
  height: 60;
  flex: 0 60px;
  align-items: center;
  justify-content: center;
`;

const ModalSongInfo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Side = styled.View`
  flex: 0 60px;
`;
const Main = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ModalSongTitle = styled.Text`
  font-size: 20;
  margin-bottom: 20px;
  color: ${props => props.theme.primaryColor};
`;
const ModalSongArtist = styled.Text`
  font-size: 18;
  color: ${props => props.theme.secondaryColor};
`;

class PlayerInfo extends React.PureComponent {
  props: {
    nowplayingTrack: Object,
    isFav: Boolean,
    onFav: Function,
    theme: Object,
  };

  render() {
    const { nowplayingTrack, isFav } = this.props;
    const noTrack = nowplayingTrack === null;

    // console.log(`render ${this.constructor.name}`);

    return (
      <ModalSongInfo>
        <Side>
          <ControlButton onPress={this.props.onFav}>
            <Icon
              name={isFav ? 'favorite' : 'favorite-border'}
              size={30}
              color={isFav ? colors.heartRed : this.props.theme.secondaryColor}
            />
          </ControlButton>
        </Side>
        <Main>
          <ModalSongTitle>
            {noTrack ? 'Listen1' : nowplayingTrack.title}
          </ModalSongTitle>
          <ModalSongArtist>
            {noTrack ? 'Artist' : nowplayingTrack.artist}
          </ModalSongArtist>
        </Main>
        <Side />
      </ModalSongInfo>
    );
  }
}

export default withTheme(PlayerInfo);
