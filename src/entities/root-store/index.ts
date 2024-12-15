import { TypeUser } from "@/db/schema";

import { action, makeObservable, observable } from "mobx";

class RootStore {
  @observable user: TypeUser | null = null;
  @observable isAuth: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setUser(newUser: TypeUser | null) {
    this.user = newUser;
  }

  get getUser() {
    return this.user;
  }
}

const rootStore = new RootStore();

export default rootStore;
