import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('ReactNativeCrossTemplate', () => App);

AppRegistry.runApplication('ReactNativeCrossTemplate', {
  initialProps: {},
  rootTag: document.body,
});
