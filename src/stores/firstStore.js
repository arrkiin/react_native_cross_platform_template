import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export default class FirstStore {
  @persist
  @observable
  data = '';

  get data() {
    return this.data;
  }

  set data(data) {
    this.data = data;
  }
}
