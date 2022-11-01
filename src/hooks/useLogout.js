//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
       
        // remove user from storage
        localStorage.removeItem('user')


        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        
        
      
        
    
    }

    return {logout}
}