import { useParams, useNavigate, Link } from "react-router"
import { useState, useEffect, useContext } from 'react'
import * as diaryService from '../../services/diaryService'
import { UserContext } from "../../contexts/UserContext"
import DiaryEntryForm from "../DiaryEntryForm/DiaryEntryForm"

const DiaryEntryShow = (props) => {
    const [diaryEntry, setDiaryEntry] = useState(null)
    const { entryId } = useParams(); 
    console.log('checking use params', entryId); 
    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    if (!user) {navigate()}

    useEffect(() => {
        const fetchDiaryEntry = async () => {
            const diaryEntryData = await diaryService.show(entryId)
            console.log('checking diary inside use effect', diaryEntryData); 
            setDiaryEntry(diaryEntryData.diaryEntry)
        }
        fetchDiaryEntry()
    }, [entryId])
    console.log('checking diary entry', diaryEntry); 

    const handleLike = async () => {
        await diaryService.toggleLike(entryId)
        const updatedEntry = await diaryService.show(entryId)
        setDiaryEntry(updatedEntry)
    }

    if (!entryId) return <p>Loading...</p>

    return (
        <main>
            <section>
                <h2 id='title'>Your Mood on: {`${new Date(diaryEntry?.createdAt).toLocaleDateString()}`}</h2>
                <div id='moodList'>
                    <ul>
                            <li >
                                {diaryEntry?.mood} - Level: {diaryEntry?.moodLvl}
                            </li>
                    </ul>
                </div>
                <p>{diaryEntry?.reflection}</p>
                <div className='like'>
                    <button id='likeButton' onClick={handleLike}> {diaryEntry?.like?.includes(user._id) ? 'Unlike' : 'Like'} </button>
                    <p id='likeNumber'>{diaryEntry?.like?.length}</p>
                </div>
                {user._id === diaryEntry?.owner && (
                    <div className="actions">
                        <Link to={`/diary/${entryId}/edit`}>Edit</Link>
                        <button onClick={() => props.handleDeleteEntry(diaryEntry.isEntryPublic, entryId)}>Delete</button>
                    </div>
                )}
            </section>
        </main>
)}

export default DiaryEntryShow; 
