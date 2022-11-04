module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    '@vue/app',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  sourceType: 'unambiguous',
}
