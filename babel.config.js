// // module.exports = {
// //   presets: ['module:@react-native/babel-preset'],
// // };

// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     [
//       require.resolve('babel-plugin-module-resolver'),
//       {
//         root: ['./src'],
//         alias: {
//           '~': './src',
//         },
//       },
//     ],
//     require.resolve('react-native-reanimated/plugin'),
//   ],
// };
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};