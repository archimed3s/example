import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useScrollRestoringOnRouteChange = (scrollableAreaId: string) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      document.getElementById(scrollableAreaId)?.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, scrollableAreaId]);
};
