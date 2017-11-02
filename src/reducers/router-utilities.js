import { uniqueId } from 'lodash';

export function getUniqueId(baseKey) {
  return uniqueId(`${baseKey}-`);
}

export function getPrevViewIndex(numberOfViews, currentIndex) {
  const newValue = currentIndex - 1;
  const isWithinLowerBounds = newValue > -1;

  if (isWithinLowerBounds) return newValue;
  return numberOfViews - 1;
}

export function getNextViewIndex(numberOfViews, currentIndex) {
  const newValue = currentIndex + 1;
  const isWithinUpperBounds = newValue < numberOfViews;

  if (isWithinUpperBounds) return newValue;
  return 0;
}

export function getNewActiveViews(viewName, activeViews) {
  const uniqueKey = getUniqueId(viewName);
  return activeViews.concat(uniqueKey);
}

export function removeView(views, keyToRemove) {
  return views.filter(key => key !== keyToRemove);
}
