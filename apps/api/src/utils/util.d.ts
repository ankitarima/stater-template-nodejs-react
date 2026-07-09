/**
 * Type declaration for session and tenant
 */
declare namespace Express {
  export interface Request {
    tenant?: any;
    session?: any;
  }
}
