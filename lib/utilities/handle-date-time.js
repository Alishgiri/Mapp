import moment from 'moment';

export function splitDateTime(date) {
  if (!date) {
    return {
      time: null,
      date: null,
      shortDate: null,
    };
  }
  const convertedDate = new Date(date).toISOString();
  const momentDate = moment(convertedDate, 'YYYY-MM-DDTHH:mm:ssZ');
  return {
    time: momentDate.format('LT'),
    date: momentDate.format('MMM Do YY'),
    shortDate: momentDate.format('DD MMM'),
  };
}
