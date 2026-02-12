import NavBar from "../NavBar/NavBar";
import { Link } from "react-router"
import { UserContext } from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import DiaryEntryList from "../DiaryEntryList/DiaryEntryList";



const Landing = () => {

  const { user, setUser } = useContext(UserContext)
  
    const [publicEntries, setPublicEntries] = useState([]);
    const [privateEntries, setPrivateEntries] = useState([]);
  
    useEffect(() => {
      const fetchPrivateEntries = async () => {
      const entriesData = await diaryService.index(true);
      
      setPrivateEntries(entriesData);
      };
      fetchPrivateEntries();
  
      const fetchPublicEntries = async () => {
      const entriesData = await diaryService.index();
      
      setPublicEntries(entriesData);
      };
      fetchPublicEntries();
    }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem('token')
      setUser(null)
  }

  return (
    <>
    <section>
      <h1>TRACK YOUR CHANGE.</h1>
      <p>Don’t be ashamed, write about you in the diary and share yourself to others. They can help you.</p>
      { user ? (
        <ul>
          <li><button onClick={ handleSignOut }>Sign Out</button></li>
        </ul>
      ) : (
        <ul>
          <li><button><Link to='/sign-in'>Sign In</Link></button></li>
          <li><button><Link to='/sign-up'>Sign Up</Link></button></li>
        </ul>
      )}
    </section>
    <section>
    
    </section>
    </>
  );
};

export default Landing;