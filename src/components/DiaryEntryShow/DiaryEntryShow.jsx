import { useParams, useNavigate, Link } from "react-router"
import { useState, useEffect, useContext } from 'react'
import * as diaryService from '../../services/diaryService'
import { UserContext } from "../../contexts/UserContext"
import DiaryEntryForm from "../DiaryEntryForm/DiaryEntryForm"
import CommentsForm from "../CommentsForm/CommentsForm"
import styles from './DiaryEntryShow.module.css'

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
            setDiaryEntry(diaryEntryData)
        }
        fetchDiaryEntry()
    }, [entryId])
    console.log('checking diary entry', diaryEntry); 

    const handleLike = async () => {
        await diaryService.toggleLike(entryId)
        const updatedEntry = await diaryService.show(entryId)
        setDiaryEntry(updatedEntry)
    }

    const handleAddComment = async (commentFormData) => {
        const newComment = await diaryService.createComment(entryId, commentFormData);
        setDiaryEntry({...diaryEntry, comments: [...diaryEntry.comments, newComment]});
      }

    if (!entryId) return <p>Loading...</p>

    return (
        <main>
            <section>
                <h2 id='title'>Your Mood on: {`${new Date(diaryEntry?.diaryEntry.createdAt).toLocaleDateString()}`}</h2>
                <div id='moodList'>
                    <ul>
                            <li >
                                {diaryEntry?.diaryEntry.mood} - Level: {diaryEntry?.diaryEntry.moodLvl}
                            </li>
                    </ul>
                </div>
                <p>{diaryEntry?.diaryEntry.reflection}</p>
                <div className='like'>
                    <button id='likeButton' onClick={handleLike}> {diaryEntry?.diaryEntry.like?.includes(user._id) ? 'Unlike' : 'Like'} </button>
                    <p id='likeNumber'>{diaryEntry?.diaryEntry.like?.length}</p>
                </div>
                {user._id === diaryEntry?.diaryEntry.owner && (
                    <div className={styles.actions}>
                        <button className={styles.editBtn}><Link to={`/diary/${entryId}/edit`}>Edit</Link></button>
                        <button className={styles.deleteBtn} onClick={() => props.handleDeleteEntry(diaryEntry?.diaryEntry.isEntryPublic, entryId)}>Delete</button>
                    </div>
                )}
            </section>
            <section>
            <h2>Comments</h2>
            <CommentsForm handleAddComment={handleAddComment} />
            {!diaryEntry?.comments?.length && <p>There are no comments</p>}
            {diaryEntry?.comments?.map((comment) => (
                <article key={comment._id}>
                    <header>
                        <p>
                            {comment.owner?.displayName || comment.owner?.username}
                        </p>
                </header>
                <p>{comment.comment}</p>
                </article>
            ))}
        </section>
    </main>
)}

export default DiaryEntryShow; 
