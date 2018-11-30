import {
    ADDNUM
} from './type';

let initState={
    num:0
};

export default (state=initState,actions)=>{
    let {type,text}=actions;
    switch(type){
    case ADDNUM:{
        return {...state,...{num:state.num+1}};
    };
    default:{
        return state;
    };
    };
};
