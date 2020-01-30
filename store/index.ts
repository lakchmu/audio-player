import { action, observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

import { SerializedUserType as UserType } from '../models/user';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

interface StateInterface {
  currentUser: UserType;
}

export interface StoreInterface {
  state: StateInterface;
  setCurrentUser: Function;
  (): void;
}

const Store = function () {
  this.state = observable({ currentUser: {} });
  this.setCurrentUser = action((currentUser: UserType) => { this.state.currentUser = currentUser; });
} as StoreInterface;

export default Store;
