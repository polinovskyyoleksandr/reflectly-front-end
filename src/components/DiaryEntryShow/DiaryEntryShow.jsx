import { useParams } from "react-router"
import { useState, useEffect, useContext } from 'react'
import * as diaryService from '../../services/diaryService'
import { UserContext } from "../../contexts/UserContext"

const DiaryEntryShow = (props) => {
    const [diaryEntry, setDiaryEntry] = useState(null)
    const [upVote, setUpVote] = useState(false)
    const { diaryEntryId } = useParams()
    const { user } = useContext(UserContext)
}

useEffect(() => {
    const fetchDiaryEntry = async () => {
        const diaryEntryData = await diaryService.show(diaryEntryId)
        setDiaryEntry(diaryEntryData)
    }
    fetchDiaryEntry()
}, [diaryEntryId])



return (
    <main>
        <section>
            <h1 id='title'>{`${new Date(diaryEntry.createdAt).toLocaleDateString()}`}</h1>
            <div id='moodList'>
                <ul>
                    {diaryEntry.moodList.map((moods) => (
                        <li key={moods._id}>
                            {moods.mood} - Level: {moods.moodLvl}
                        </li>
                    ))}
                </ul>
            </div>
            <p>{diaryEntry.reflection}</p>
            <div class='like'>
                <button id='likeButton' onClick={handleLike}> {diaryEntry.like.includes(userId) ? 'Like' : 'Unlike'} </button>
                <p id='likeNumber'>{diaryEntry.like.lenght - 1}</p>
            </div>

        </section>
    </main>
)