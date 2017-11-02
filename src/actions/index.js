export function setViews(views) {
  return {
    type: 'SET_VIEWS',
    views,
  };
}

export function nextView() {
  return {
    type: 'NEXT_VIEW',
  };
}

export function prevView() {
  return {
    type: 'PREV_VIEW',
  };
}

export function goToView(viewName) {
  return {
    type: 'GO_TO_VIEW',
    viewName,
  };
}

export function removeView(keyToRemove) {
  return {
    type: 'REMOVE_VIEW',
    keyToRemove,
  };
}

export function updateTime(time) {
  return {
    type: 'UPDATE_TIME',
    time,
  };
}
