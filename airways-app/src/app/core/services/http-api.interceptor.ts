import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../../shared/env.constants';
import FormatService from './format.service';

@Injectable()
export default class HttpApiInterceptor implements HttpInterceptor {
  // TODO need implement AuthService that operate with bearer token
  constructor(private auth: FormatService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloned = request.clone({
      url: URL_API + request.url,
      setHeaders: {
        Authorization: `Bearer ${this.auth}`,
      },
    });
    return next.handle(cloned);
  }
}
