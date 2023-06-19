const {
  addWebpackAlias,
  disableEsLint,
  override,
  useBabelRc,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra');

module.exports = {
  webpack: override(
    disableEsLint(),
    useBabelRc(),
    addWebpackAlias({
      'lodash-es': 'lodash',
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        'border-radius-base': '4px',
        'body-background': '#FBFBFD',
        'highlight-color': '#F36D36',
        'layout-body-background': '#ffffff',
        'layout-header-background': '#ffffff',
        'layout-header-height': '70px',
        'layout-header-padding': '0 30px',
        'layout-sider-background': '#373737',
        'menu-bg': '#373737',
        'menu-item-color': '#ffffff',
        'menu-item-font-size': '17px',
        'menu-icon-size': '16px',
        'menu-item-active-bg': '#257a91',
        'menu-highlight-color': '#ffffff',
        'menu-item-active-border-width': '0',
        'table-header-bg': '#ffffff',
      },
    }),
  ),

};
