import { useContext } from "react";
import { Link } from "react-router";
import { UserContext} from "../../contexts/UserContext";

const NavBar = () => {
    const { user, setUser } = UserContext(UserContext)
    const handleSignOut = () => {
        localStorage.removeItemtem('token')
        setUser(null)
    }

    return (
        <nav>
            { user ? (
                <ul>
                    <li><Link to='/'>Community</Link></li>
                    <li><Link to='/diary'>{user.displayedname}'s Diary</Link></li>
                    <li><Link to='/' onClick= { handleSignOut }>Sign Out</Link> </li>
                </ul>
            ) : (
                <ul>
                    <li><Link to='/'>Community</Link></li>
                    <li><Link to='/sign-in'>Sign In</Link></li>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default NavBar