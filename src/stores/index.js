import { create } from 'mobx-persist';
import FirstStore from './firstStore';
import hydrate from './hydrate';

const firstStore = new FirstStore();
hydrate('first', firstStore);

export default {
  firstStore: firstStore,
};
