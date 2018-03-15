import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

export default create({
  storage: AsyncStorage,
  jsonify: true,
});
