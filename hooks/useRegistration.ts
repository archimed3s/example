import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useRouteService } from '@common/services/RouteService';
import { useCheckinOpen } from '@modules/CheckinRegistration/CheckinRegistration';

import { useSiteSettings } from './useSiteSettings';

export const useRegistration = () => {
  const openCheckin = useCheckinOpen();

  const router = useRouter();
  const routes = useRouteService();
  const siteSettings = useSiteSettings();

  const onOpen = useCallback(() => {
    if (siteSettings?.signupFlowId === 'classic') {
      router.push(routes.getSignUpPagePath());
    } else {
      openCheckin?.();
    }
  }, [openCheckin, siteSettings?.signupFlowId, router, routes]);

  return { onOpen };
};
