import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {
  constructor(private tokenSevice: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenSevice.possuiToken()) {
      const token = this.tokenSevice.retornaToken();
      const headers = new HttpHeaders().append('x-access-token', token);
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
