
var bus={
    cbArr:{},
    $on(event,cb){
        if(!this.cbArr.hasOwnProperty(event)){
            this.cbArr[event]=[cb]
        }else{
            this.cbArr[event].push(cb)
        }
    },
    $emit(event,attr,...data){
        if(this.data.hasOwnProperty(attr)){
            this.data[attr]=data[0]
        }
        if(!this.cbArr[event]){
            return 
        }
       
        this.cbArr[event].forEach((i)=>{
            i(...data)
        })
    },
    destroyed(event){
        delete this.cbArr[event] 
    }   
}

export default bus
