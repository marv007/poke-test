import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      console.error('Error:', error);

      toastr.error(
        `[Server] Ha ocurrido un error en el servidor ${error.message}`
      );

      return throwError(() => error);
    })
  );
};
