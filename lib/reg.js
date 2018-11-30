

module.exports={
    createObjectAttrRegNoLast(str){
        return new RegExp(`${str}:(.*?),`)
    }
}

