import { makeAutoObservable } from 'mobx';
import { UserStore } from './UserStore';
import { PostStore } from './PostStore';

class RootStore {
  userStore;
  postStore;

  constructor() {
    this.userStore = new UserStore(this)
    this.postStore = new PostStore(this);

    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();
