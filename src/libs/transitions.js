import { transit } from 'react-css-transition';

export const fadeInOut = {
  defaultStyle: {
    opacity: 0,
  },
  enterStyle: {
    opacity: transit(1.0, 250, 'ease-in-out', 250),
  },
  leaveStyle: {
    opacity: transit(0, 250, 'ease-in-out', 0),
  },
  activeStyle: {
    opacity: 1,
  },
};
