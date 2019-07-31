const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

if (process.env.ENV === 'prod') {
  plugins.push('transform-remove-console');
}

module.exports = { presets, plugins };
