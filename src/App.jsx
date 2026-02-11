import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import DiaryEntryForm from './components/DiaryEntryForm/DiaryEntryForm';
import DiaryEntryList from './components/DiaryEntryList/DiaryEntryList';
import Community from './components/Community/Community';
import * as diaryService from './services/diaryService'

const App = () => {
  const { user } = useContext(UserContext);
  const [publicEntries, setPublicEntries] = useState();
  const [privateEntries, setPrivateEntries] = useState();

  useEffect(() => {
    const fetchPrivateEntries = async () => {
    const entriesData = await diaryService.index(true);
    
    setPrivateEntries(entriesData);
    };
    fetchPrivateEntries();

    const fetchPublicEntries = async () => {
    const entriesData = await diaryService.index();
    
    setPrivateEntries(entriesData);
    };
    fetchPublicEntries();
  }, [user]);

  
  return (
    <>
      <NavBar />
        <Routes>
          <Route path='/' element={<Community entries={publicEntries}/>}/>
          <Route path='/sign-up' element={<SignUpForm />}/>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path='/diaryEntry/new' element={<DiaryEntryForm />} />
          <Route path='/diary-entries' element={<DiaryEntryList entries={privateEntries} />} />
        </Routes>
    </>
  );
};

export default App
