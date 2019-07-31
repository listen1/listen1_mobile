import { View, Animated, TouchableOpacity, Platform } from 'react-native';
import React from 'react';

export class ModalLite extends React.PureComponent {
  props: {
    modalHeight: Number,
    duration: Number,
    backgroundColor: String,
    children: Object,
    isVisible: Boolean,
    onOpened: Function,
    onClose: Function,
  };
  state = {
    bounceValue: new Animated.Value(this.props.modalHeight),
    fadeAnim: new Animated.Value(0),
    isHidden: true,
  };
  constructor(props) {
    super(props);
    if (this.props.isVisible) {
      this.state = {
        ...this.state,
        isHidden: false,
      };
    }
  }

  componentDidMount() {
    if (!this.state.isHidden) {
      this.open();
    }
  }
  componentDidUpdate(prevProps) {
    // On modal open request, we slide the view up and fade in the backdrop
    if (this.props.isVisible && !prevProps.isVisible) {
      this.open();
    } else if (!this.props.isVisible && prevProps.isVisible) {
      // On modal close request, we slide the view down and fade out the backdrop
      this.close();
    }
  }

  open() {
    let toPositionY = this.props.modalHeight;
    let toOpacity = 0;

    toPositionY = 0;
    toOpacity = 0.6;

    Animated.parallel([
      Animated.timing(this.state.bounceValue, {
        toValue: toPositionY,
        duration: this.props.duration,
        // velocity: 3,
        // tension: 2,
        // friction: 8,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: toOpacity,
        duration: this.props.duration,
      }),
    ]).start(() => {
      // trigger opened when open animation finished
      this.props.onOpened();
    });
    this.setState({ isHidden: false });
  }

  close() {
    const toPositionY = this.props.modalHeight;
    const toOpacity = 0;

    Animated.parallel([
      Animated.timing(this.state.bounceValue, {
        toValue: toPositionY,
        duration: this.props.duration,
        // velocity: 3,
        // tension: 2,
        // friction: 8,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: toOpacity,
        duration: this.props.duration,
      }),
    ]).start();
    this.setState({ isHidden: true });
  }
  render() {
    return (
      <View
        pointerEvents={this.state.isHidden ? 'none' : 'box-none'}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          elevation: Platform.OS === 'android' ? 30 : 0,
        }}
      >
        <Animated.View
          pointerEvents={this.state.isHidden ? 'none' : 'auto'}
          // onPress={() => this.close()}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000',
            opacity: this.state.fadeAnim,
            elevation: Platform.OS === 'android' ? 50 : 0,
          }}
        >
          {this.state.isHidden ? null : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.props.onClose();
              }}
              style={{ flex: 1 }}
            />
          )}
        </Animated.View>

        <Animated.View
          pointerEvents={this.state.isHidden ? 'none' : 'auto'}
          style={[
            {
              position: 'absolute',
              height: this.props.modalHeight,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: this.props.backgroundColor,
              elevation: Platform.OS === 'android' ? 80 : 0,
            },
            { transform: [{ translateY: this.state.bounceValue }] },
          ]}
        >
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}
