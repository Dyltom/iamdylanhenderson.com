import { format } from 'date-fns';

import { useEffect } from 'react';
export const plantedEffect = () => useEffect(() => {}, []);
export const commonDateFormatter = (date: string) => {
  return format(new Date(date), 'MMMM dd, yyyy');
};
