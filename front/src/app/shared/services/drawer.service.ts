import { Injectable } from '@angular/core';
import {map, Observable, Subject} from "rxjs";

export interface DrawerServiceInterface {
  setDrawer(value: boolean): void,
  getDrawer(): Observable<boolean>,
}

export abstract class DrawerServiceBase {
  protected drawer$ = new Subject<boolean>();

  public abstract setDrawer(value: boolean): void;
  public abstract getDrawer(): Observable<boolean>;
}


@Injectable({
  providedIn: 'root'
})
export class DrawerService extends DrawerServiceBase {
  constructor() {
    super()
  }

  public setDrawer(drawer: boolean) {
    this.drawer$.next(drawer)
  }

  public getDrawer() {
    return this.drawer$.pipe(map((value) => !value));
  }
}

@Injectable({
  providedIn: 'root'
})
export class DrawerService1 extends DrawerServiceBase {
  constructor() {
    super();
  }

  public setDrawer(drawer: boolean) {
    this.drawer$.next(drawer)
  }

  public getDrawer() {
    return this.drawer$
  }
}


interface Store {
  persons: any[],
  loading: boolean,
  company: string
}

const InitStore: Store = {
  persons: [],
  loading: false,
  company: 'Exadel'
}

let STORE: Store;

interface DispatchInterface {
  name: string,
  payload?: Partial<Store>,
}



abstract class Dispatch implements DispatchInterface {
  public name = '';
  public payload?: Partial<Store>
  abstract check(dispatch: DispatchInterface, store: Store): Store
  protected constructor(init: DispatchInterface) {
    Object.assign(this, init);
  }
}
function dispatchEmit(dispatch: Dispatch) {
  STORE = reducer(dispatch, STORE || InitStore);
  console.log('STORE ---', STORE);
}

function reducer(dispatch: Dispatch, initState: Store): Store {
    return dispatch.check(dispatch, initState);
}



// class PersonChange  = new Dispatch({ name: 'changePersons', payload: { persons: ['Nik', 'Andrey'] }});
class PersonChange extends Dispatch {
  constructor() {
    super({ name: 'changePersons', payload: { persons: ['Nik', 'Andrey'] } });
  }

  check(dispatch: DispatchInterface, store: Store): Store {
    if (dispatch.name !== this.name) {
      return store;
    }
    return {...store, ...{persons: dispatch?.payload?.persons || []}};
  }
}

class LoadingChangeTrue extends Dispatch {
  constructor() {
    super({ name: 'loading', payload: {loading: true} });
  }

  check(dispatch: DispatchInterface, store: Store): Store {
    if (dispatch.name !== this.name) {
      return store;
    }
    return {...store, ...{persons: dispatch?.payload?.persons || []}};
  }
}

class CompanyChange extends Dispatch {
  constructor() {
    super({ name: 'changeCompany', payload: {company: 'Google'} });
  }

  check( dispatch: DispatchInterface, store: Store): Store {
    if (dispatch.name !== this.name) {
      return store;
    }
    return {...store, ...{company: dispatch?.payload?.company || store.company}};
  }
}

class CompanyChangeNext extends Dispatch {
  constructor() {
    super({ name: 'changeCompanyNext', payload: {company: 'YouTube'} });
  }

  check( dispatch: DispatchInterface, store: Store): Store {
    if (dispatch.name !== this.name) {
      return store;
    }
    return {...store, ...{company: dispatch?.payload?.company || store.company}};
  }
}


dispatchEmit(new PersonChange());
dispatchEmit(new CompanyChangeNext());




