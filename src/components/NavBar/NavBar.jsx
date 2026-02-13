import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from './NavBar.module.css'
import Logo from '../../assets/images/Logo.png';


const NavBar = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate(); // added for point below 

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/'); 
        // navigate above added to fix error where person who isn't logged in still sees a list entries they haven't made on diary page
    }

    return (
        <nav className={styles.container}>
            <Link to='/'><img src={Logo} alt='Confused heads' /></Link>
            <Link to='/'><h1>Reflectly</h1></Link>
            {user ? (
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/diary'>{user.displayName ? user.displayName : user.username }'s Diary</Link></li>
                    <li><Link to='/' onClick= { handleSignOut }>Sign Out</Link> </li>
                </ul>
            ) : (
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to={user ? '/diary' : '/'}>Diary</Link></li>
                    <li><Link to='/sign-in'>Sign In</Link></li>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default NavBar