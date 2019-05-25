import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(public api: Api) {  }

  _postImage(image) {
    const headers = new Headers({ 
      'Content-Type' : 'multipart/form-data',
      'Accept': 'application/json'
    });

    const bodyFormat = new FormData();

    bodyFormat.append('file', image)

    const options = new RequestOptions({ headers: headers });
    return this.api.post("photoapp", bodyFormat, options)
  }


}
