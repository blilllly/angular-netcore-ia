import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = resolveMessage(error);
      notifications.show(message, 'error');
      return throwError(() => error);
    }),
  );
};

function resolveMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'No se pudo conectar con el servidor. Verifica tu conexión.';
  }
  if (error.status === 400) {
    return error.error?.error ?? 'Solicitud inválida.';
  }
  if (error.status === 500) {
    return error.error?.error ?? 'Error interno del servidor.';
  }
  return `Error inesperado (${error.status}). Intenta de nuevo.`;
}
