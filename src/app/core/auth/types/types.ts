import { Observable } from 'rxjs';

import { AuthRequests } from '../interfaces';

export type RequestMethod = {
  [K in keyof AuthRequests]: AuthRequests[K] extends (p: any) => Observable<any>
    ? K
    : never;
}[keyof AuthRequests];

export type PayloadOf<K extends RequestMethod> = AuthRequests[K] extends (
  p: infer P
) => Observable<unknown>
  ? P
  : never;

export type ResponseOf<K extends RequestMethod> = AuthRequests[K] extends (
  p: unknown
) => Observable<infer R>
  ? R
  : never;
