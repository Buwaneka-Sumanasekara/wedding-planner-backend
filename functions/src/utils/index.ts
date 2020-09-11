/*
 * File: index.ts
 * File Created: Friday, 11th September 2020 11:47:38 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Friday, 11th September 2020 11:47:38 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */


const removeUndefinedProps = (obj:any) =>{
    return JSON.parse(JSON.stringify(obj));
}

export default {
    removeUndefinedProps:removeUndefinedProps
};