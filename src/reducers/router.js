import {
  getNextViewIndex,
  getPrevViewIndex,
  getNewActiveViews,
  removeView,
  getUniqueId,
} from './router-utilities';

const defaultState = {
  targetIndex: 0,
  views: [],
  activeViews: [],
};

function routerReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_VIEWS':
      return {
        ...state,
        views: action.views.slice(),
        activeViews: [getUniqueId(action.views[0])],
      };
    case 'NEXT_VIEW': {
      const newTargetIndex = getNextViewIndex(state.views.length, state.targetIndex);
      const newTargetViewName = state.views[newTargetIndex];

      return {
        ...state,
        targetIndex: newTargetIndex,
        activeViews: getNewActiveViews(newTargetViewName, state.activeViews),
      };
    }
    case 'PREV_VIEW': {
      const newTargetIndex = getPrevViewIndex(state.views.length, state.targetIndex);
      const newTargetViewName = state.views[newTargetIndex];

      return {
        ...state,
        targetIndex: newTargetIndex,
        activeViews: getNewActiveViews(newTargetViewName, state.activeViews),
      };
    }
    case 'GO_TO_VIEW': {
      const newTargetIndex = state.views.indexOf(action.viewName);
      if (state.targetIndex === newTargetIndex) return { ...state };

      return {
        ...state,
        targetIndex: newTargetIndex,
        activeViews: getNewActiveViews(action.viewName, state.activeViews),
      };
    }
    case 'REMOVE_VIEW': {
      return {
        ...state,
        activeViews: removeView(state.activeViews, action.keyToRemove),
      };
    }
    default:
      return state;
  }
}

export default routerReducer;
