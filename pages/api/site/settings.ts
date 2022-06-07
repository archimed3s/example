/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next';

import { apiRouteHandler } from '@api/middleware';
import { PaymentLimitType } from '@sharedTypes/Payment';
import { ServerError } from '@sharedTypes/ServerError';
import { PaymentMethodLimit, SitePaymentCategory, SiteSettings } from '@sharedTypes/api/siteSettings';
import { getSiteId } from '@utils/api-utils';

type site_payment_limit = any;
type site_payment_provider_category = any;

const getPaymentLimits = (
  item: site_payment_limit,
  limits: PaymentMethodLimit[],
  limitTypes: Map<number, string | null>,
  paymentLimitType: PaymentLimitType,
): PaymentMethodLimit[] => {
  return Number(item.limit_type_id) === paymentLimitType
    ? [
        ...limits,
        {
          paymentProviderId: item.payment_provider_id,
          limitTypeDisplayName: limitTypes.get(Number(item.limit_type_id)) ?? undefined,
          currency: item.currency_id,
          minAmount: Number(item.min_amount),
          maxAmount: Number(item.max_amount),
        },
      ]
    : limits;
};

const getPaymentCategory = (
  item: site_payment_provider_category,
  category: SitePaymentCategory,
  paymentCategories: Map<number, string | null>,
): SitePaymentCategory => {
  const paymentCategory = paymentCategories.get(Number(item.category_id));
  if (!paymentCategory) {
    return category;
  }

  if (!category[paymentCategory]) {
    category[paymentCategory] = [];
  }

  category[paymentCategory].push(item.payment_provider_id);
  return category;
};

/**
 * @swagger
 * /api/site/settings:
 *   get:
 *     tags: ["Site"]
 *     description: Get site settings
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: SiteSettingsResponse
 *               properties:
 *                 id:
 *                  title: Id
 *                  type: string
 *                 defaultLanguage:
 *                  title: Default site language
 *                  type: string
 *                 isPhoneVerificationRequired:
 *                  title: Is phone verification required
 *                  type: string
 *                 signupFlowId:
 *                  title: Signup flow type - checkin or classic
 *                  type: string
 *                 kycProviders:
 *                  title: KYC providers
 *                  type: array
 *                  items:
 *                    type: number
 *                 paymentProvidersForDeposits:
 *                  title: Payment providers for deposits
 *                  type: array
 *                  items:
 *                    type: string
 *                 paymentProvidersForWithdrawals:
 *                  title: Payment providers for withdrawals
 *                  type: array
 *                  items:
 *                    type: string
 *                 paymentProviderCategory:
 *                  title: Payment providers category
 *                  type: object
 *                 languages:
 *                  title: Site supported languages
 *                  type: array
 *                  items:
 *                    type: string
 *                 countries:
 *                  title: Site supported countries
 *                  type: array
 *                  items:
 *                    type: string
 *                 currencies:
 *                  title: Site supported currencies
 *                  type: array
 *                  items:
 *                    type: string
 */
export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<SiteSettings | ServerError>) => {
    const siteSettingsResponse: any = {
      where: { id: getSiteId() },
    };

    if (!siteSettingsResponse) {
      return res.status(404).json({
        code: 'SiteSettingsNotFound',
        message: 'Site settings not found',
      });
    }

    const limitTypesResponse: any = 'test';
    const limitTypes: any = new Map(
      limitTypesResponse.map((limitType: any) => [Number(limitType.id), limitType.display_name]),
    );
    const paymentCategoriesResponse: any = 'test';
    const paymentCategories: any = new Map(
      paymentCategoriesResponse.map((paymentCategory: any) => [Number(paymentCategory.id), paymentCategory.name]),
    );

    const providerIds = Array.from(
      new Set([
        ...siteSettingsResponse.payment_providers_for_deposits,
        ...siteSettingsResponse.payment_providers_for_withdrawal,
      ]),
    );

    const sitePaymentLimitsResponse: any = {
      where: {
        AND: [{ site_id: getSiteId() }, { payment_provider_id: { in: Array.from(new Set(providerIds ?? [])) } }],
      },
    };

    const sitePaymentProviderCategoriesResponse: any = {
      where: { site_id: getSiteId() },
    };

    return res.status(200).json({
      id: siteSettingsResponse.id,
      defaultLanguage: siteSettingsResponse.default_language,
      languages: siteSettingsResponse.languages,
      currencies: siteSettingsResponse.currencies,
      countries: siteSettingsResponse.countries,
      kycProviders: siteSettingsResponse.kyc_providers,
      paymentProvidersForDeposits: siteSettingsResponse.payment_providers_for_deposits,
      paymentProvidersForWithdrawals: siteSettingsResponse.payment_providers_for_withdrawal,
      isPhoneVerificationRequired: siteSettingsResponse.is_phone_verification_required,
      signupFlowId: siteSettingsResponse.signup_flow_id,
      paymentDepositLimits: sitePaymentLimitsResponse.reduce((limits: PaymentMethodLimit[], sitePaymentLimit: any) => {
        return getPaymentLimits(sitePaymentLimit, limits, limitTypes, PaymentLimitType.DepositLimit);
      }, []),
      paymentWithdrawalLimits: sitePaymentLimitsResponse.reduce(
        (limits: PaymentMethodLimit[], sitePaymentLimit: any) => {
          return getPaymentLimits(sitePaymentLimit, limits, limitTypes, PaymentLimitType.WithdrawLimit);
        },
        [],
      ),
      paymentProviderCategory: sitePaymentProviderCategoriesResponse.reduce(
        (sitePaymentCategory: SitePaymentCategory, sitePaymentProviderCategory: any) => {
          return getPaymentCategory(sitePaymentProviderCategory, sitePaymentCategory, paymentCategories);
        },
        {},
      ),
    });
  },
});
