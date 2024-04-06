
import { calcTimeToInvest } from './AnalyzeService';
import { DateTime } from "luxon";

describe('calcTimeToInvest', () => {
  test('calculates time to invest correctly', () => {
    const orderDate = DateTime.now().minus({ days: 1 });
    const amountInvest = 1000;
    const currentAmount = 2000;
    const goal = 3000;

    const expected = {
      reviewGoal: -1000,
      profitOfDay: 2000,
      dayToGoal: 0.5,
      exitInZeroDays: 0,
      comment: 'Вы получили 1000 прибыли за 1 день, ваша цель инвестиции 3000. ' +
        'Текущая ситуация по инструменту - прибыль (1000). Через 0.5 дней вы достигнете своей цели',
    };

    expect(calcTimeToInvest(orderDate, amountInvest, currentAmount, goal)).toEqual(expected);
  });

  test('calculates time to invest currentAmount < amountInvest', () => {
    const orderDate = DateTime.now().minus({ days: 1 });
    const amountInvest = 1000;
    const currentAmount = 900;
    const goal = 3000;

    const expected = {
      reviewGoal: -2100,
      profitOfDay: 900,
      dayToGoal: 2.3,
      exitInZeroDays: 0.1,
      comment: 'Вы получили -100 прибыли за 1 день, ваша цель инвестиции 3000. ' +
        'Текущая ситуация по инструменту - потери (-100). Через 2.3 дней вы достигнете своей цели',
    };

    expect(calcTimeToInvest(orderDate, amountInvest, currentAmount, goal)).toEqual(expected);
  });

  it('handles negative currentAmount correctly', () => {
    const orderDate = DateTime.now().minus({ days: 1 });
    const amountInvest = 1000;
    const currentAmount = -500;
    const goal = 3000;

    const expected = {
      reviewGoal: -3500,
      profitOfDay: -500,
      dayToGoal: 0,
      exitInZeroDays: 0,
      comment: 'Вы получили -500 прибыли за 1 день, ваша цель инвестиции 3000. ' +
        'Текущая ситуация по инструменту - потери (-500). Через 0 дней вы достигнете своей цели',
    };

    expect(calcTimeToInvest(orderDate, amountInvest, currentAmount, goal)).toEqual(expected);
  });

  it('currentAmount > goal', () => {
    const orderDate = DateTime.now().minus({ days: 1 });
    const amountInvest = 1000;
    const currentAmount = 4500;
    const goal = 3000;

    const expected = {
      reviewGoal: 1500,
      profitOfDay: 3500,
      dayToGoal: 0.4,
      exitInZeroDays: 0,
      comment: 'Вы получили 3500 прибыли за 1 день, ваша цель инвестиции 3000. ' +
        'Текущая ситуация по инструменту - прибыль (3500). Через 0.4 дней вы достигнете своей цели',
    };

    expect(calcTimeToInvest(orderDate, amountInvest, currentAmount, goal)).toEqual(expected);
  });
});