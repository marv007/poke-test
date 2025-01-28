import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  private router = inject(Router);
  private zone = inject(NgZone);

  handleError(error: Error): void {
    console.error('Error:', error);

    this.zone.run(() => {
      this.router.navigate(['/error']);
    });
  }
}
