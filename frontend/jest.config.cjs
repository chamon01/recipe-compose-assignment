// frontend/jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    // Mock styles and assets so Jest doesn't try to parse them
    '\\.(css|scss|sass|less)$': '<rootDir>/src/test/fileMock.js',
    '\\.(gif|png|jpe?g|webp|svg|ttf|eot|woff2?)$': '<rootDir>/src/test/fileMock.js',
  },
};
