import { Injectable } from '@angular/core';
import { IHttpInterceptor } from '@covalent/http';
import { RequestOptionsArgs } from '@angular/http';

@Injectable()
export class SendRequestInterceptor implements IHttpInterceptor {

  onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    // ... // do something to requestOptions before a request
    // ... // if something is wrong, throw an error to execute
    // ... // onRequestError (if there is an onRequestError hook)
    // if (/*somethingWrong*/) {
    //   throw new Error('error message for subscription error callback');
    // }
    return requestOptions;
  }

  /*onRequestError(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    // ... // do something to try and recover from an error thrown `onRequest`
    // ... // and return the requestOptions needed for the request
    // ... // else return 'undefined' or throw an error to execute the
    // ... // error callback of the subscription
    // if (cantRecover) {
    //   throw new Error('error message for subscription error callback'); // or return undefined;
    // }
    return requestOptions;
  }

  onResponse(response: Response): Response {
    // ... // check response status and do something
    return response;
  }

  onResponseError(error: Response): Response {
    // ... // check error status and do something
    return error;
  }*/
}