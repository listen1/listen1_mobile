import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { withTheme } from 'styled-components';
import TextTicker from 'react-native-text-ticker';
import { colors } from '../../config/colors';

const ControlButton = styled.TouchableOpacity`
  width: 40;
  height: 40;
  flex: 0 40px;
  align-items: center;
  justify-content: center;
`;

const ModalSongInfo = styled.View`
  margin-top: 20;
  flex: 1;
  flex-direction: row;
  margin-left: 30;
  margin-right: 30;
`;
const Side = styled.View`
  flex: 0 40px;
`;
const Main = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ModalSongTitle = styled.View`
  margin-top: 0;
  margin-bottom: 0;
  color: ${(props) => props.theme.primaryColor};
  flex: 0 40px;
`;
const ModalSongArtist = styled.Text`
  font-size: 16;
  color: ${(props) => props.theme.secondaryColor};
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
        <Main>
          <ModalSongTitle>
            <TextTicker
              style={{ fontSize: 24, color: this.props.theme.primaryColor }}
              repeatSpacer={100}
              marqueeDelay={1000}
            >
              {noTrack ? 'Listen1' : nowplayingTrack.title}
            </TextTicker>
          </ModalSongTitle>
          <ModalSongArtist>
            {noTrack ? 'Artist' : nowplayingTrack.artist}
          </ModalSongArtist>
        </Main>
        <Side>
          <ControlButton onPress={this.props.onFav}>
            <Icon
              name={isFav ? 'favorite' : 'favorite-border'}
              size={30}
              color={isFav ? colors.heartRed : this.props.theme.secondaryColor}
            />
          </ControlButton>
        </Side>
      </ModalSongInfo>
    );
  }
}

export default withTheme(PlayerInfo);
