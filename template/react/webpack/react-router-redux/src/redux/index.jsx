import {createStore} from 'redux';
export {default as actions} from './actions';
export * from './type';
import reducer from './reducer';

export default createStore(reducer);
