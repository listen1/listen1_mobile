import React from 'react';
import { Modal } from 'react-native';
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
        visible={this.props.modalState.isOpen}
        onRequestClose={() => {
          this.props.dispatch(toggleModal());
        }}
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
