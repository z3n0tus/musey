import moment from 'moment';

export const checkShouldStartReminding = (reminder) => {
  let startReminding = false;
  let immediacy = 'ages';
  const daysRemaining = moment(reminder.dueBy, 'DDMMYYYY').diff(moment(), 'days');
  const formattedDate = moment(reminder.dueBy, 'DDMMYYYY').format('LL');

  if (daysRemaining <= reminder.startRemindingDays) {
    startReminding = true;
  }

  if (daysRemaining <= 3) {
    immediacy = 'while';
  }

  if (daysRemaining <= 1) {
    immediacy = 'imminent';
  }

  return {
    ...reminder,
    startReminding,
    daysRemaining,
    formattedDate,
    immediacy,
  }
}