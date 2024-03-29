/*
 * File: commonController.ts
 * File Created: Wednesday, 2nd September 2020 4:11:08 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Wednesday, 2nd September 2020 4:11:08 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import { FrontdEndFilters } from "../models";
import {FILTER_KEYS,FILTERS} from "../constants-data";
import * as _ from "lodash";

const getAllFilters = () => {
    try {
        

        const result: Array<FrontdEndFilters> = [];


        const filterObj_side: FrontdEndFilters = {
            "key": FILTER_KEYS.SIDE,
            "name": "Side",
            "descriptions": "Filter by Side",
            "isrequired": true,
            "multiSelect": false,
            "values": _.sortBy(FILTERS.SIDE,(o:any)=>{return o.name}),
            "depend_on":""
        }
        result.push(filterObj_side);
        const filterObj_invite_mode: FrontdEndFilters = {
            "key": FILTER_KEYS.INVITE_MODE,
            "name": "Invite Mode",
            "descriptions": "Filter by Invite Mode",
            "isrequired": true,
            "multiSelect": false,
            "values":_.sortBy(FILTERS.INVITE_MODE,(o:any)=>{return o.id}),
            "depend_on":""
        }
        result.push(filterObj_invite_mode);

        const filterObj_tag1: FrontdEndFilters = {
            "key": FILTER_KEYS.TAG1,
            "name": "Tag1",
            "descriptions": "Filter by Tag1",
            "isrequired": true,
            "multiSelect": false,
           "values":_.sortBy(FILTERS.TAG1,(o:any)=> {return o.name}),
            "depend_on":""
        }
        result.push(filterObj_tag1);

        const filterObj_tag2: FrontdEndFilters = {
            "key": FILTER_KEYS.TAG2,
            "name": "Tag2",
            "descriptions": "Filter by Tag2",
            "isrequired": true,
            "multiSelect": false,
            "values":_.sortBy(FILTERS.TAG2,(o:any)=>{return o.name}),
            "depend_on":FILTER_KEYS.TAG1,
        }
        result.push(filterObj_tag2);

        const filterObj_tag3: FrontdEndFilters = {
            "key": FILTER_KEYS.TAG3,
            "name": "Tag3",
            "descriptions": "Filter by Tag3",
            "isrequired": true,
            "multiSelect": false,
            "values":_.sortBy(FILTERS.TAG3,(o:any)=>{return o.name}),
            "depend_on":FILTER_KEYS.SIDE
        }
        result.push(filterObj_tag3);
        return result;

    } catch (error) {
        return [];
    }
}


export default{
    getAllFilters
}