/*
 * File: index.js
 * File Created: Wednesday, 2nd September 2020 12:58:41 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Wednesday, 2nd September 2020 12:58:41 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */


const filter_invite_modes =[{"id":"MR","name":"Mr"},{"id":"MRS","name":"Mrs"},{"id":"MS","name":"Miss"},{"id":"MR & MRS","name":"Couple"},{"id":"FAMILY","name":"All Family members"}];

const filter_Side = [{"id":"B","name":"Groom"},{"id":"S","name":"Bride"}];

const filter_tag1 = [{"id":"FAMILY","name":"Close members"},{"id":"FRIEND","name":"Friend"},{"id":"OFFICE","name":"Office"},{"id":"COUSIN","name":"Cousins"},{"id":"NEIGHBOURS","name":"Neighbours"}];

const filter_tag2 = [{"id":"INTERLECTIVE","name":"Office interlective","tag1":"OFFICE"},{"id":"GOTRADIE","name":"GoTradie","tag1":"OFFICE"},{"id":"NANOBOTZ","name":"Nanobots","tag1":"OFFICE"},{"id":"SCHOOL","name":"School friends","tag1":"FRIEND"},{"id":"CLOSE","name":"Close friends","tag1":"FRIEND"},{"id":"SOFTWARE STYLES","name":"Office Software styles","tag1":"OFFICE"},{"id":"SLPA","name":"Ports authority","tag1":"OFFICE"},{"id":"PALITHA OFFICE","name":"Sularis fathers office","tag1":"OFFICE"},{"id":"SUNANDA","name":"Sunanda friends","tag1":"FRIEND"},{"id":"NAMITH","name":"Namith friends","tag1":"FRIEND"},{"id":"LAKSHMAN","name":"Lakshman bappas akka","tag1":"COUSIN"},{"id":"MYPOS","name":"MyPos","tag1":"OFFICE"},{"id":"ICBT","name":"ICBT","tag1":"FRIEND"},{"id":"IJTS","name":"IJTS","tag1":"FRIEND"},{"id":"SHANAKA","name":"Shanaka friend","tag1":"FRIEND"}];

const filter_tag3 = [{"id":"ANGODA","name":"Angoda","side":"S"},{"id":"KANDY","name":"Kandy","side":"B"},{"id":"RATHMALANA","name":"Rathmalana","side":"B"},{"id":"MORATUWA","name":"Moratuwa","side":"COMMON"},{"id":"THELAWALA","name":"Thelawala","side":"B"},{"id":"THALAHENA","name":"Thalahena","side":"B"},{"id":"BIYAGAMA","name":"Biyagama","side":"B"},{"id":"PILIYANDALA","name":"Piliyandala","side":"B"},{"id":"KAHATHUDUWA","name":"Kahathuduwa","side":"B"},{"id":"KIRIWATHTHUDUWA","name":"Kiriwaththuduwa","side":"B"},{"id":"MAKOLA","name":"Makola","side":"S"},{"id":"WEYANGODA","name":"Weyangoda","side":"S"},{"id":"YAKKALA","name":"Yakkala","side":"S"},{"id":"NITTABUWA","name":"Nittabuwa","side":"S"},{"id":"MALABE","name":"Malabe","side":"COMMON"},{"id":"HIBUTANA","name":"Hibutana","side":"S"},{"id":"KOTHALAWALA","name":"Kothalawala","side":"S"},{"id":"BOMIRIYA","name":"Bomiriya","side":"S"},{"id":"HORANA","name":"Horana","side":"S"},{"id":"KOTIKAWATTA","name":"Kotikawatta","side":"S"},{"id":"RAJAGIRIYA","name":"Rajagiriya","side":"B"},{"id":"MAHABAGE","name":"Mahabage","side":"B"},{"id":"MAHARAGAMA","name":"Maharagama","side":"B"},{"id":"GALLE","name":"Galle","side":"B"},{"id":"RATHANAPITIYA","name":"Raththanapitiya","side":"B"},{"id":"KOTTAWA","name":"Kottawa","side":"B"},{"id":"AMBALANGODA","name":"Ambalangoda","side":"B"},{"id":"KOLLUPITIYA","name":"Kollupitiya","side":"B"},{"id":"KOHUWALA","name":"Kohuwala","side":"B"},{"id":"BORELLA","name":"Borella","side":"B"},{"id":"WELLAMPITIYA","name":"Wellampitiya","side":"S"},{"id":"AWISSAWELLA","name":"Awissawella","side":"S"},{"id":"COLOMBO","name":"Colombo","side":"S"},{"id":"NEGAMBO","name":"Negambo","side":"S"},{"id":"PANNALA","name":"Pannala","side":"S"},{"id":"WATTALA","name":"Wattala","side":"S"}];

const  FILTER_KEYS={
    SIDE:"side",
    INVITE_MODE:"inviteMode",
    TAG1:"tag1",
    TAG2:"tag2",
    TAG3:"tag3",  
    TABLE_NO:"tableNo" 
}

const FILTERS={
    SIDE:filter_Side,
    INVITE_MODE:filter_invite_modes,
    TAG1:filter_tag1,
    TAG2:filter_tag2,
    TAG3:filter_tag3,  
     
}

const INVITATION={
    LOCATION:"Saminro Grand Palace",
    DATE:"2020-10-25",
    PORUWA_CEROMONEY:"10:00",    
}


 export {
    FILTERS,
    FILTER_KEYS,
    INVITATION
 }