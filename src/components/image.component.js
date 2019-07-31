import React from 'react';
import { Image } from 'react-native';

function parseImageUrl(url) {
  if (url.startsWith('http')) {
    return { uri: url };
  }
  const d = {
    './assets/images/logo.png': require('../assets/images/logo.png'),
  };

  return d[url];
}
export class AImage extends React.PureComponent {
  props: {
    source: String,
  };
  render() {
    const { source, ...props } = this.props;

    return <Image source={parseImageUrl(source)} {...props} />;
  }
}
