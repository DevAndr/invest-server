import { DateTime } from '../graphql/graphql';
import { DateTime as DT } from 'luxon';
import { AnalyzeInvest } from '../types';

export const calcTimeToInvest = (orderDate: DateTime, amountInvest: number, currentAmount: number, goal: number): AnalyzeInvest => {
  const diffDate = Math.trunc(DT.now().diff(orderDate, 'days').toObject().days);
  // console.log('diffDate: ', diffDate);
  const diffProfitToGoal = currentAmount - goal;
  const diffProfit = currentAmount >= 0 ? currentAmount - amountInvest : currentAmount;
  // console.log('diffProfit: ', diffProfit);
  const profitOfDay = diffDate ? currentAmount / diffDate : 0;
  const profitOfGoal = diffDate ? diffProfitToGoal / diffDate : 0;
  // console.log('profitOfDay: ', profitOfDay);
  let dayToGoal = profitOfDay ? currentAmount > 0 ? (Math.abs(diffProfitToGoal) / profitOfDay) : 0 : 0;
  dayToGoal = dayToGoal > 0 ? parseFloat(dayToGoal.toFixed(1)) : dayToGoal;
  // console.log('dayToGoal: ', dayToGoal);

  let exitInZeroDays = 0;

  if (profitOfDay > 0 && currentAmount > 0 && currentAmount < amountInvest)
    exitInZeroDays = Math.abs(diffProfit) / currentAmount;
  exitInZeroDays = exitInZeroDays > 0 ? parseFloat(exitInZeroDays.toFixed(1)) : 0;

  const timeToInvest = orderDate ? DT.fromISO(orderDate).toRelative() : ''

  // console.log('exitInZeroDays: ', exitInZeroDays);
  return {
    reviewGoal: diffProfitToGoal,
    profitOfDay: profitOfDay,
    dayToGoal,
    exitInZeroDays,
    timeToInvest,
    comment: `Вы получили ${diffProfit} прибыли за ${diffDate} день, ваша цель инвестиции ${goal}. ` +
      `Текущая ситуация по инструменту - ${diffProfit > 0 ? 'прибыль' : 'потери'} (${diffProfit}). ` +
      `Через ${dayToGoal} дней вы достигнете своей цели`,
  };
};