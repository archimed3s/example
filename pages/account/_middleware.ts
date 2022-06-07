import { NextRequest, NextResponse } from 'next/server';

import { routeService } from '@common/services/RouteService';
import { AUTH_COOKIE_NAME } from '@sharedTypes/Player';

export const middleware = (req: NextRequest) => {
  const routes = routeService();
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(routes.getSignInPagePath());
};
