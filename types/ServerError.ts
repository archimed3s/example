export type ServerError = {
  code:
    | 'PlayerEmailIsAlreadyTaken'
    | 'PlayerLoginAttemptsLimitReached'
    | 'PlayerNotFound'
    | 'NotAuthenticated'
    | 'AuthSessionHackAttempt'
    | 'WrongParameters'
    | string;
  message: string;
};

export const isServerError = (e: unknown): e is ServerError =>
  !!e && typeof e === 'object' && 'code' in e && 'message' in e;
