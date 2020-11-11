const logosMap = {
  'angular.svg': ['angular', 'angularjs'],
  'bootstrap.svg': ['bootstrap'],
  'c-plusplus.svg': ['c++'],
  'c-sharp.svg': ['c#'],
  'c.svg': ['c'],
  'css.svg': ['css'],
  'dart.svg': ['dart'],
  'electron.svg': ['electron'],
  'express.svg': ['express', 'expressjs'],
  'f-sharp.svg': ['f#'],
  'framework7.svg': ['framework7'],
  'go.svg': ['go', 'golang'],
  'gulp.svg': ['gulp'],
  'haskell.svg': ['haskell'],
  'html.svg': ['html', 'html5'],
  'ionic.svg': ['ionic'],
  'java.svg': ['java'],
  'javascript.svg': ['javascript', 'js'],
  'jest.svg': ['jest'],
  'json.svg': ['json'],
  'jupyter.svg': ['jupyter', 'jupyter notebook'],
  'kotlin.svg': ['kotlin'],
  'less.svg': ['less', 'lessjs'],
  'markdown.svg': ['markdown', 'md'],
  'meteorjs.svg': ['meteorjs'],
  'nativescript.svg': ['nativescript'],
  'nuxtjs.svg': ['nuxtjs'],
  'perl.svg': ['perl'],
  'php.svg': ['php'],
  'python.svg': ['python'],
  'reactjs.svg': ['react', 'reactjs', 'jsx'],
  'redux.svg': ['redux'],
  'ruby.svg': ['ruby'],
  'rust.svg': ['rust'],
  'sass.svg': ['sass', 'scss'],
  'scala.svg': ['scala'],
  'svelte.svg': ['svelte'],
  'swift.svg': ['swift'],
  'typescript.svg': ['typescript'],
  'vuejs.svg': ['vue', 'vuejs', 'vuex'],
  'webpack.svg': ['webpack'],
};

export function iconImage(name) {
  const fileNames = Object.keys(logosMap);
  for (let i = 0; i < fileNames.length; i += 1) {
    const fileName = fileNames[i];
    if (logosMap[fileName].includes(name.toLowerCase())) {
      return `https://profile.codersrank.io/static/libraries/${fileName}`;
    }
  }
  return null;
}
