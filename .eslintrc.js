/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  extends: [
    'universe/native',
    'universe/web',
    'universe/node',
    // '@react-native',
  ],
  rules: {
    'no-unused-vars': 'off', //FIXME: 'no-unused-vars': 'off',
    // "prettier/prettier": ["error", { "endOfLine": "auto" }], //FIXME: fix LF/CRLF VS Code
  },
 
};
