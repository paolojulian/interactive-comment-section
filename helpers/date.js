import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatUTCToLocalTime = (utcDate) => {
  return dayjs(utcDate).fromNow()
}