import {
    ADDNUM
} from './type';

export default {
    [ADDNUM](text){
        return {
            type:ADDNUM,
            text:text
        };
    }
};
