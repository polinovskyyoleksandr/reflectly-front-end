import { useParams, useNavigate } from "react-router"
import { useState, useEffect, useContext } from 'react'
import * as diaryService from '../../services/diaryService'
import { UserContext } from "../../contexts/UserContext"

const DiaryEntryShow = () => {
    const [diaryEntry, setDiaryEntry] = useState(null)
    const { diaryEntryId } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

useEffect(() => {
    const fetchDiaryEntry = async () => {
        const diaryEntryData = await diaryService.show(diaryEntryId)
        setDiaryEntry(diaryEntryData)
    }
    fetchDiaryEntry()
}, [diaryEntryId])

const handleLike = async () => {
    await diaryService.toggleLike(diaryEntryId)
    const updatedEntry = await diaryService.show(diaryEntryId)
    setDiaryEntry(updatedEntry)
}

if (!diaryEntry) return <p>Loading...</p>

const handleEdit = () => {
    navigate(`/diary/${diaryEntryId}/id`)
}

const handleDelete = () => {
    diaryService.deleteDiaryEntry(diaryEntry)
    navigate('/diary')
}

return (
    <main>
        <section>
            <h1 id='title'>{`${new Date(diaryEntry.createdAt).toLocaleDateString()}`}</h1>
            <div id='moodList'>
                <ul>
                    {diaryEntry.moodList.map((mood) => (
                        <li key={mood._id}>
                            {mood.mood} - Level: {mood.moodLvl}
                        </li>
                    ))}
                </ul>
            </div>
            <p>{diaryEntry.reflection}</p>
            <div className='like'>
                <button id='likeButton' onClick={handleLike}> {diaryEntry.like.includes(user._id) ? 'Like' : 'Unlike'} </button>
                <p id='likeNumber'>{diaryEntry.like.length}</p>
            </div>
            {user._id === diaryEntry.owner && (
                <div className="actions">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
)}

        </section>
    </main>
)}

export default DiaryEntryShow
