import { format, isToday, differenceInDays } from 'date-fns';

function passedTime(val) {
  const date = new Date(val);
  const today = new Date();

  const isTodayDay = isToday(date);
  const diff = differenceInDays(today, date);

  let res = '';

  if (isTodayDay) {
    res = `Today ${format(date, 'HH:mm')}`;
  } else {
    res = `${diff} days ago`;
  }

  return res;
}

export default passedTime;
