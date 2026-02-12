import { useParams, useNavigate } from "react-router"
import { useState, useEffect, useContext } from 'react'
import * as diaryService from '../../services/diaryService'
import { UserContext } from "../../contexts/UserContext"
import DiaryEntryForm from "../DiaryEntryForm/DiaryEntryForm"

const DiaryEntryShow = () => {
    const [diaryEntry, setDiaryEntry] = useState(null)
    const { entryId } = useParams(); 
    console.log('checking use params', entryId); 
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

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

const handleDelete = (entryId) => {
    props.handleDeleteEntry(entryId)
    navigate('/diary')
}

return (
    <main>
        <section>
            <h1 id='title'>{`${new Date(diaryEntry?.createdAt).toLocaleDateString()}`}</h1>
            <div id='moodList'>
                <ul>
                    {diaryEntry?.moodList.map((mood) => (
                        <li key={mood._id}>
                            {mood.mood} - Level: {mood.moodLvl}
                        </li>
                    ))}
                </ul>
            </div>
            <p>{diaryEntry?.reflection}</p>
            <div className='like'>
                <button id='likeButton' onClick={handleLike}> {diaryEntry?.like?.includes(user._id) ? 'Like' : 'Unlike'} </button>
                <p id='likeNumber'>{diaryEntry?.like?.length}</p>
            </div>
            {user._id === diaryEntry?.owner && (
                <div className="actions">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
)}

        </section>
    </main>
)}

export default DiaryEntryShow; 
