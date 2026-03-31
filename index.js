import { AppRegistry, Platform } from 'react-native';
import App from './App';

// 1. Zaregistrujeme hlavní součástku pod jménem, které server očekává
AppRegistry.registerComponent('main', () => App);

// 2. Nastartujeme motor napřímo (pouze pro web)
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('main', { rootTag });
}
