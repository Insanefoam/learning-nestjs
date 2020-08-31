import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const date = Date.now();
    console.log("Interceptor before...");
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Interceptor after ${Date.now() - date} ms...`)),
      );
  }
}
