import * as moment from 'moment';
import * as business from 'moment-business';

describe('NodeJS Library: moment', () => {
  it('#1 Basic date creation', () => {
    const now = moment([2019, 2, 1]);
    const date = now.toDate();
    expect(date.getDate()).toEqual(1);
    expect(date.getMonth()).toEqual(2);
    expect(date.getFullYear()).toEqual(2019);
  });

  describe('#2 Comparison', () => {
    it('#2.1 Compare two dates', () => {
      const past = moment('2019-06-20'); // Thursday
      const present = moment('2019-06-21'); // Friday
      const future = moment('2019-06-22'); // Saturday

      expect(present.diff(future, 'days')).toEqual(-1);
      expect(future.diff(present, 'days')).toEqual(1);
      expect(present.diff(present, 'days')).toEqual(0);

      expect(present.isAfter(past)).toEqual(true); // present is going AFTER past
      expect(present.isBefore(future)).toEqual(true); // present is going BEFORE future
      expect(present.isBetween(past, future)).toEqual(true); // present is between past and future
    });

    it('#2.2 Check diff between dates', () => {
      const past = moment('2019-05-20');
      const present = moment('2019-05-21');
      const present2 = moment('2019-05-21');
      const future = moment('2019-05-22');
      const future2 = moment('2019-05-22');

      expect(past.diff(present, 'd')).toEqual(-1); //   past     ahead of present    by -1 day
      expect(present.diff(past, 'd')).toEqual(1); //    present  ahead of past       by 1 day

      expect(present.diff(future, 'd')).toEqual(-1); // present  ahead of future     by -1 day
      expect(future.diff(present, 'd')).toEqual(1); //  future   ahead of present    by 1 day
      expect(future.diff(present, 'h')).toEqual(24); // future   ahead of present    by 24 hour

      expect(past.diff(future, 'd')).toEqual(-2); //    past     ahead of future     by -2 days
      expect(future.diff(past, 'd')).toEqual(2); //     future   ahead of past       by 2 days

      // Same dates compared
      expect(future.diff(future2, 'd')).toEqual(0);
      expect(future.isSame(future2, 'd')).toEqual(true);

      expect(past.isSameOrBefore(present, 'd')).toEqual(true);
      expect(present2.isSameOrBefore(present, 'd')).toEqual(true);
      expect(present2.isSameOrAfter(present, 'd')).toEqual(true);
      expect(future.isSameOrAfter(present, 'd')).toEqual(true);
    });

    it('#2.3.1 Working dates math #1', () => {
      const initialDate = moment('2019-06-21'); // Friday

      const nextDate = moment('2019-06-21'); // Friday + 1 business day = Monday 2019-06-24
      business.addWeekDays(nextDate, 1);

      expect(nextDate.format('YYYY-MM-DD')).toEqual('2019-06-24');
      expect(business.weekDays(initialDate, nextDate)).toEqual(1);
    });

    it('#2.3.2 Working dates math #2', () => {
      const dateString = '2019-07-01';

      const mondayDate = new Date(dateString); // Monday
      const monday = moment(mondayDate);

      const nextDayDate = new Date(dateString);
      nextDayDate.setDate(nextDayDate.getDate() + 4); // Friday
      const thursday = moment(nextDayDate);

      expect(business.weekDays(monday, thursday)).toEqual(4);
    });
  });

  describe('#3 Business', () => {
    it('#3.1 Increased date', () => {
      const initialDate = moment('2019-07-01'); // Monday
      expect(business.isWeekDay(initialDate)).toEqual(true); // Monday must be business day

      business.addWeekDays(initialDate, 4); // It will modify 'initialDate' object
      expect(initialDate.format('YYYY-MM-DD')).toEqual('2019-07-05'); // 1+4 must be 5
      expect(business.isWeekDay(initialDate)).toEqual(true); // Friday is weekday

      business.addWeekDays(initialDate, 1); // It will modify 'initialDate' object again
      expect(business.isWeekDay(initialDate)).toEqual(true); // Monday is weekday
      expect(initialDate.format('YYYY-MM-DD')).toEqual('2019-07-08'); // 1+5 => 1 again
    });

    it('#3.2 Decreased date', () => {
      const initialDate = moment('2019-07-01'); // Monday
      expect(business.isWeekDay(initialDate)).toEqual(true); // Monday must be business day

      business.subtractWeekDays(initialDate, 1); // It will modify 'initialDate' object
      expect(business.isWeekDay(initialDate)).toEqual(true); // Friday is weekday
      expect(initialDate.format('YYYY-MM-DD')).toEqual('2019-06-28'); // Last working day before friday is monday

      business.subtractWeekDays(initialDate, 5); // It will modify 'initialDate' object again
      expect(business.isWeekDay(initialDate)).toEqual(true); // Monday is weekday
      expect(initialDate.format('YYYY-MM-DD')).toEqual('2019-06-21'); // Friday (week before)
    });
  });
});
