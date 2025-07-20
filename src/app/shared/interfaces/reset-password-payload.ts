/**
 * Interface representing a reset-password payload.
 */
export interface ResetPasswordPayload {
  token: string;
  password: string;
  repeated_password: string;
}
