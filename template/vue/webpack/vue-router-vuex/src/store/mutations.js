import {
    ADDNUM
} from './type';

export default {
    [ADDNUM](state,item){
        state.num+=item;
    }
};
