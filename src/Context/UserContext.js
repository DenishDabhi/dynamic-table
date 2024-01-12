// @ts-nocheck

import { createContext, useState } from "react";

export const user = createContext();

const UserContext = ({children})=>{
    const [edit,setEdit] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    return(
        <user.Provider value={{edit,setEdit,isEdit,setIsEdit}}>
            {children}
        </user.Provider>
    )
}
export default UserContext;
