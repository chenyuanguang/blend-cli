import {
    ADDNUM
} from './type.js';

export default {
    [ADDNUM]({commit},item){
        commit(ADDNUM,item);
    }
};
