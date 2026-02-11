import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';
import './App.css'
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm'
import DiaryEntryForm from './components/DiaryEntryForm/DiaryEntryForm'
import DiaryEntryList from './components/DiaryEntryList/DiaryEntryList'
import Community from './components/Community/Community';
import * as diaryService from './services/diaryService'

const App = () => {
  const { user } = useContext(UserContext);
  const [entries, setEntries] = useState();

  useEffect(() => {
    const fetchAllEntries = async () => {
    const entriesData = await diaryService.index();
  
    setEntries(entriesData);
    };
    fetchAllEntries();
  }, [user]);
  
  return (
    <>
      <NavBar />
        <Routes>
          <Route path='/' element={<Community entries={entries}/>}/>
          <Route path='/sign-up' element={<SignUpForm />}/>
          <Route path='/diaryEntry/new' element={<DiaryEntryForm />} />
          <Route path='/diary-entries' element={<DiaryEntryList entries={entries} />} />
        </Routes>
    </>
  );
};

export default App
