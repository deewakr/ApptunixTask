import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpEvent
} from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { HelperService } from '../services/helper-service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    public totalRequests = 0;

    constructor(
        private helperService: HelperService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler):
        import("rxjs").Observable<HttpEvent<any>> {
        this.totalRequests++;
        if (this.totalRequests === 1) {
            this.helperService.isLoading = true;
        }
        return <any>next.handle(req).pipe(
            catchError((err) => {
                throw err;
            }),
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests === 0) {
                    this.helperService.isLoading = false;
                }
            })
        )
    }


}