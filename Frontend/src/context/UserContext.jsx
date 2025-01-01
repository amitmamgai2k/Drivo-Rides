import React,{createContext} from 'react'
import { use } from 'react'
export const UserContext = createContext()

function UserContext({children}) {
    const [user,setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    });
  return (
    <div>
        <UserContext.Provider value={{user}}>
        {children}
        </UserContext.Provider>
    </div>
  )
}

export default UserContext
