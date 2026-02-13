import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router';
import { UserContext } from './contexts/UserContext';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import DiaryEntryForm from './components/DiaryEntryForm/DiaryEntryForm';
import DiaryEntryList from './components/DiaryEntryList/DiaryEntryList';
import * as diaryService from './services/diaryService'
import Landing from './components/Landing/Landing';
import DiaryEntryShow from './components/DiaryEntryShow/DiaryEntryShow';
import CommentsForm from './components/CommentsForm/CommentsForm';

const App = () => {
  const { user } = useContext(UserContext);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
    const entriesData = await diaryService.index();
    // console.log('entries data', entriesData); 
    
    setEntries(entriesData);
    };
    fetchEntries();
  }, [user]);

  const navigate = useNavigate();

  const handleAddEntry = async (isPublic, diaryFormData) => {
    const newEntry = await diaryService.create(diaryFormData);
    setEntries([newEntry, ...entries]);
    navigate(isPublic ? '/' : '/diary');
  };

  const handleDeleteEntry = async (isPublic, entryId) => {
    const deletedEntry = await diaryService.deleteDiaryEntry(entryId);
    setEntries(entries.filter((entry) => entry._id !== entryId ));
    // navigate(isPublic ? '/' : '/diary');
  };
  
  const handleUpdateEntry = async ( entryId, diaryFormData) => {
    const updatedEntry = await diaryService.updateDiaryEntry(entryId, diaryFormData);
    setEntries(entries.map((entry) => (entryId === entry._id ? updatedEntry : entry)));
    navigate(`/diary/${entryId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={
              <>
                <Landing />
                <DiaryEntryList entries={entries}/>
              </>
            }/>
        {user ? ( 
          <>
              <Route path='/diary' element={
                <section className="diary">
                  <div className='list'>
                  <DiaryEntryList entries={entries} />
                  </div>
                  <div className='form'>
                  <DiaryEntryForm handleAddEntry={handleAddEntry}/>
                </div>
                </section>
              } />

              <Route path='/diary/:entryId' element={
                <>
                <section className='handleedit'>
                <div className='showlist'>
                    <DiaryEntryList entries={entries} />
                </div>
                <div className='formedit'>
                    <DiaryEntryShow handleDeleteEntry={handleDeleteEntry} />
                </div>
                </section>
                </>
              }/>


              <Route path='/diary/:entryId/edit' element={
                <>
                <div className='showlist'>
                  <DiaryEntryList entries={entries} />
                </div>
                <div className='formedit'>
                  <DiaryEntryForm handleUpdateEntry={handleUpdateEntry}/>
                </div>
                </>
              }/>
          </>
        ) : (
        <>
          <Route path='/sign-up' element={<SignUpForm />}/>
          <Route path="/sign-in" element={<SignInForm />} />
        </>
        )}
      </Routes>
    </>
  );
};

export default App; 