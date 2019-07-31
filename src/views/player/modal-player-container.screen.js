import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import { Dimensions } from 'react-native';

import { toggleModal } from '../../redux/actions';

import ModalPlayer from './modal-player.screen';

class ModalPlayerContainer extends React.Component {
  props: {
    modalState: Object,
    dispatch: Function,
  };
  render() {
    // device size should pass to modal component
    // to avoid white border in Modal
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    return (
      <Modal
        isVisible={this.props.modalState.isOpen}
        onSwipeComplete={() => this.props.dispatch(toggleModal())}
        swipeDirection="down"
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        style={{ margin: 0 }}
        propagateSwipe // allow pass swipe event to its children
        onBackButtonPress={() => this.props.dispatch(toggleModal())}
      >
        <ModalPlayer />
      </Modal>
    );
  }
}
const mapStateToProps = ({ modalState }) => ({
  modalState,
});

export default connect(mapStateToProps)(ModalPlayerContainer);
