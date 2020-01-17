import { action, observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const Store = observable({
  currentUser: {},
});

export default Object.assign(
  Store,
  {
    setCurrentUser: action((currentUser) => { Store.currentUser = currentUser; }),
  },
);
