import * as t from 'io-ts';

export const applyBonusRequest = t.strict({
  code: t.string,
});
export type ApplyBonusRequest = t.TypeOf<typeof applyBonusRequest>;

export type ApplyBonusResponse =
  | { isCodeValid: false }
  | {
      isCodeValid: true;
      bonusId: number;
    };

export type AvailableBonus = {
  id: number;
  icon: string;
  name: string;
};
