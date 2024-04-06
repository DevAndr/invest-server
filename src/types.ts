import { DateTime } from './graphql/graphql';
import { CryptoInvestment } from '@prisma/client';

export interface GqlContext {
  req: Request;
  res: Response;
  headers: Headers;
  extra: any;
}


export type AnalyzeInvest = {
  reviewGoal: number;
  exitInZeroDays: number
  dayToGoal: number
  profitOfDay: number
  timeToInvest: string
  comment: string;
}

export type AnalyzeResultInvest = {
  investment: CryptoInvestment
  reviewGoal: number;
  exitInZeroDays: number
  dayToGoal: number
  profitOfDay: number
  timeToInvest: string
  comment: string;
  percentProfit: number
  forecastToGoal: String
}
