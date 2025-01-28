// Expo uses Metro Bundler, which needs to be aware of custom path alias (@) to correctly resolve assets
// The following ensures that Expo and Metro bundler can resolve the alias @ to the correct folder

const path = require('path');

module.exports = {
  resolver: {
    alias: {
      '@': path.resolve(__dirname), // resolves to the project root
      '@/assets': path.resolve(__dirname, 'assets'), // resolves @/assets to the assets folder
    }
  }
};
