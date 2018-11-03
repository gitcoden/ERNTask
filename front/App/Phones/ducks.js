import { createAction, handleAction } from 'redux-actions';
import { uniqueId } from 'lodash-es';

const addPhoneAction = createAction('@@add_phone');

export const addPhones = phones => dispatch => {
  phones.forEach(phone => {
    dispatch(addPhoneAction({ value: phone, uiId: uniqueId() }));
  });
};

const reducer = handleAction(addPhoneAction, (state = [], { payload }) => [...state, payload], [
  { value: '88005553535', uiId: uniqueId() },
]);

export default reducer;
