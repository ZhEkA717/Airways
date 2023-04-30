import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../../shared/env.constants';
import AuthService from '../../auth/services/auth.service';

@Injectable()
export default class HttpApiInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloned = request.clone({
      url: URL_API + request.url,
      setHeaders: {
        Authorization: `Bearer ${this.auth.accessToken}`,
      },
    });
    return next.handle(cloned);
  }
}
