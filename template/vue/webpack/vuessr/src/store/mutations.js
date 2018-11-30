import {
    ADDNUM,
    PREDATA
} from './type';

export default {
    [ADDNUM](state, item) {
        state.num += item;
    },
    [PREDATA](state, item) {
        console.log(item)
        state.listData = item.data.list;
    }
};