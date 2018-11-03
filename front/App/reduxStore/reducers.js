import { combineReducers } from 'redux';
import { createAction, handleAction } from 'redux-actions';
import { uniqueId } from 'lodash-es';

const addPhones = createAction('@@add_phones');

const reducer = combineReducers({
  phones: handleAction(addPhones, (state = [], { payload }) => [...state, ...payload], [
    { value: '+70234', uiId: uniqueId() },
  ]),
});

export default reducer;
