import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the MemoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemoProvider {
  constructor(public api: Api) {
    console.log("Hello MemoProvider Provider");
  }

  _put(body: INLParam, reqOpts?: any): any {
    return this.api.put("putMemo", body, reqOpts);
  }

  _get() {
    return this.api.get("memo");
  }

  _post(params?: any) {
    return this.api.post("memo", params);
  }
}

export interface INLParam {
  memo_id: number;
  public_id_change: string;
}
