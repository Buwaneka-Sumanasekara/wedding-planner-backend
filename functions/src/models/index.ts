interface Location{
    id:number,
    name:string
}

interface Tag{
    name:string
}

interface GuestModel{//family or guest
    id?:string,
    name:string
    nickname:string,
    tags:[Tag],
    location:Location,
    packs:number
}





export{
    GuestModel
}