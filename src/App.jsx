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

const App = () => {
  const { user } = useContext(UserContext);
  
  return (
    <>
      <NavBar />
        <Routes>
          <Route path='/' element={<Community/>}/>
          <Route path='/sign-up' element={<SignUpForm />}/>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path='/diaryEntry/new' element={<DiaryEntryForm />} />
          <Route path='/diary-entries' element={<DiaryEntryList />} />
        </Routes>
    </>
  );
};

export default App
