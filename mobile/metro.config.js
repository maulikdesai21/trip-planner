const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Block nativewind's bundled react-native so Metro uses the project-level one
config.resolver.blockList = [
  new RegExp(`${require('path').resolve(__dirname, 'node_modules/nativewind/node_modules/react-native')}/.*`),
];

module.exports = withNativeWind(config, { input: './global.css' });
