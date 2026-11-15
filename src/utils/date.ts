// planted comment
import { format } from 'date-fns';

export const commonDateFormatter = (date: string) => {
  return format(new Date(date), 'MMMM dd, yyyy');
};
