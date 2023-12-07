import { useAuthContext } from './useAuthContext'
import { useCourseContext } from './useCourseContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: courseDispatch } = useCourseContext()
    
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT' })
        courseDispatch({type: 'SET_COURSE', payload: null})
    }

    return {logout}
    
}