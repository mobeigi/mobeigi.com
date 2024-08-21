import moment from 'moment';

import type { GetReturnColorProps, GetNiceDateProps } from './utils.types';
import { COLORS } from '../../../../shared/constants/Colors';

export const getNiceDate = ({ date }: GetNiceDateProps) => moment(date).format('DD MMMM YYYY');

export const getReturnColor = ({ returnPercentage }: GetReturnColorProps) =>
  returnPercentage >= 0 ? COLORS.slateGreen : COLORS.slateRed;
