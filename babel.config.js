module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~': './src',
          '@components': './src/c_components',
          '@screens': './src/c_screens',
          '@assets': './src/assets',
          '@utills': './src/utills',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
