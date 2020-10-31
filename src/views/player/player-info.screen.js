import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { withTheme } from 'styled-components';
import TextTicker from 'react-native-text-ticker';
import { colors } from '../../config/colors';
import { MarqueeHorizontal } from 'react-native-marquee-ab';

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
const ModalSongTitle = styled.View`
  font-size: 18;
  margin-top: 10px;
  margin-bottom: 0px;
  color: ${(props) => props.theme.primaryColor};
  flex: 1;
  justify-content: center;
  align-items: center;
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
            <TextTicker
              style={{ fontSize: 18, color: this.props.theme.primaryColor }}
              loop
              repeatSpacer={0}
              marqueeDelay={1000}
            >
              {noTrack ? 'Listen1' : nowplayingTrack.title}
            </TextTicker>
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
