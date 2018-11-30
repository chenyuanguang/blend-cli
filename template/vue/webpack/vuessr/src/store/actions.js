import {
    ADDNUM,
    PREDATA
} from './type.js';

import { getDataService } from "../service/index"
export default {

    [ADDNUM]({ commit }, item) {
        commit(ADDNUM, item);
    },
    [PREDATA]({ commit }, item) {

        return getDataService().then((data) => {
            console.log(data)
                // resolve()
            commit(PREDATA, data);
        })


    }
};