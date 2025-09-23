import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { SKIP_AUTH } from '@core/http';

import { AuthStore } from '@core/auth/services';

/**
 * Get current authentication headers.
 * @param token - The authentication token.
 * @returns Current authentication headers.
 */
function getHeaders(token: string) {
  return { setHeaders: { Authorization: `Token ${token}` } };
}

/**
 * HttpInterceptorFn representing an authentication interceptor.
 *
 * Set authentication headers, if a token is provided.
 *
 * Request methods which use the optional parameter { SKIP_AUTH: true }
 * passes the authentication.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStore);

  if (req.context.get(SKIP_AUTH)) return next(req);
  const token = auth.getToken();
  return token ? next(req.clone(getHeaders(token))) : next(req);
};
