
interface FrontdEndFilters{
    key:string,
    name:string,
    descriptions:string,
    values:Array<Object>,
    isrequired:boolean,
    multiSelect:boolean
}

interface GuestModel{
    id:string,
    name:string
    nickName:string,
    inviteMode:string,
    side:string,
    seats:number,
    contact1?:string,
    constact2?:string,
    tag1:string,
    tag2:string,
    tag3:string,
    tableNo:number
}


interface GuessFilter{
    side?:String,
    inviteMode?:Array<String>,
    tag1?:Array<String>,
    tag2?:Array<String>,
    tag3?:Array<String>,
    tableNo?:number
}

interface ResponseAPI{
    status:boolean,
    message?:string,
    statusCode?:number,
    data?:Array<any>|Object,
    resultCount?:number
}



export{
    GuestModel,
    GuessFilter,
    ResponseAPI,
    FrontdEndFilters
}