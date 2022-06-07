import { ParsedUrlQuery } from 'querystring';

const BASE_URL = '/api';

const pageParams = {
  games: {
    index: {
      categorySlug: 'c',
    },
  },
};

export const getGamesPageParams = (
  query: ParsedUrlQuery,
): Record<keyof typeof pageParams['games']['index'], string | undefined> => {
  const slug = query[pageParams.games.index.categorySlug];
  return {
    categorySlug: typeof slug === 'string' ? slug : undefined,
  };
};

const ROUTES = {
  api: {
    player: {
      fetchPlayer: () => `${BASE_URL}/player`,
      getPlayerPaymentCards: () => `${BASE_URL}/player/payment-cards`,
      changePlayerConsents: () => `${BASE_URL}/player/change-consents`,
      changePlayerInformation: () => `${BASE_URL}/player/change-personal-information`,
      submitKycApplications: () => `${BASE_URL}/player/submit-kyc-applications`,
      mobileRequestPin: () => `${BASE_URL}/player/mobile/request-pin`,
      mobileVerifyPin: () => `${BASE_URL}/player/mobile/verify-pin`,
      activeBonuses: () => `${BASE_URL}/player/activeBonuses`,
      eligibleBonuses: () => `${BASE_URL}/player/eligibleBonuses`,
      recentlyPlayedGames: (playerId: number) => {
        const queryParamsString = new URLSearchParams({ playerId: String(playerId) }).toString();
        return `${BASE_URL}/player/recentlyPlayedGames?${queryParamsString}`;
      },
    },
    getPlayerPaymentCards: () => `${BASE_URL}/player/payment-cards`,
    deposit: {
      getPaymentiqConfig: () => `${BASE_URL}/deposit/paymentiqConfig`,
      getPaymentIQDeposit: () => `${BASE_URL}/deposit/request`,
      getPaymentiqDepositAuthorized: () => `${BASE_URL}/deposit/request-authorized`,
      getValidateVoucher: () => `${BASE_URL}/deposit/voucher-validate`,
    },
    getPlayerTransactions: () => `${BASE_URL}/player/transactions`,
    withdrawal: () => `${BASE_URL}/payment/withdrawal`,
    contactUs: () => `${BASE_URL}/contact-us`,
  },
  getHomePagePath: () => '/',
  getTournamentsPath: () => '/tournaments',
  getLoyaltyPath: () => '/loyalty',
  getRecentPlayedPath: () => '/games?c=recently.played',
  getCategoryLink(categorySlug?: string) {
    const params = new URLSearchParams();
    categorySlug && params.append(pageParams.games.index.categorySlug, categorySlug);
    const queryString = params.toString();
    return `${this.getGamesPagePath()}${queryString ? '?' + queryString : ''}`;
  },
  getGamesPagePath: () => '/games',
  getResetPasswordPagePath: () => '/reset-password',
  getCheckEmailResetPassPagePath: () => '/check-email-reset-password',
  getSignInPagePath: () => '/signin',
  getSignUpPagePath: () => '/signup',
  account: {
    getSettingsPagePath: () => '/account/settings',
    getEditProfilePagePath: () => '/account/edit-profile',
    getCashierPagePath: () => '/account/cashier',
    getCommunicationPagePath: () => '/account/communication',
    getBonusesPagePath: () => '/account/bonuses',
  },
  getTCPagePath: () => '/terms-and-conditions',
  getAboutUsPagePath: () => '/about-us',
  getPrivacyPolicyPagePath: () => '/privacy-policy',
  getFaqPagePath: () => '/faq',
  getGamePagePathTemplate: () => '/games/[provider]/[id]/[externalId]',
  getGamePagePath: (provider: string, id: number, externalGameId: string) =>
    `/games/${provider}/${id}/${externalGameId}`,
  getPaymentMethodsPagePath: () => '/payment-methods',
  getJackpotsPath: () => '/jackpots',
  getRecentlyPlayedPath: () => '/recent',
  getPromotionsPath: () => '/promotions',
  getNotificationsPath: () => '/notifications',
  getSportPath: () => '/sport',
  getBonusTCPath: () => '/bonus-terms-and-conditions',
  getImagePath: (image: string) => `/images/${image}`,
  getSvgImagePath(image: string) {
    return this.getImagePath(`${image}.svg`);
  },
  getPromotionDetailsPagePath: (promotionPageSlug: string) => `/promotions/${promotionPageSlug}`,
};

/**
 * Done it with hook just in case we will extend and
 * need access to other hook (eg `useRouter` from next/router)
 */
export const useRouteService = () => ROUTES;

/**
 * For usage Router Service out of React
 */
export const routeService = () => ROUTES;
