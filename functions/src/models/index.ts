
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
    tableNo:number,
    keywords1:Array<any>,
    keywords2?:Array<any>
}


interface GuessFilter{
    name?:String,
    side?:String,
    inviteMode?:String,
    tag1?:String,
    tag2?:String,
    tag3?:String,
    tableNo?:number
}

interface ResponseAPI{
    status:boolean,
    message?:string,
    statusCode?:number,
    data?:Array<any>|Object,
    resultCount?:number
}

interface Invitation{
    status:boolean,
    refCode:string,
    guestId:string,
    eventLocation?:string,
    eventDate?:string,
    poruwaCeromoney?:string,
    guest?:GuestModel,
    qrCode?:string,
    scanned:boolean
}

interface ServiceAccount{
    type:string,
    project_id:string,
    private_key_id:string,
    private_key:string,
    client_email:string,
    client_id:string,
    auth_uri:string,
    token_uri:string,
    auth_provider_x509_cert_url:string,
    client_x509_cert_url:string
}

interface NewInvitation{
    guestId:string,
}



export{
    GuestModel,
    GuessFilter,
    ResponseAPI,
    FrontdEndFilters,
    Invitation,
    NewInvitation,
    ServiceAccount
}