import './DiaryEntryList.css';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { index } from '../../services/diaryService';

const DiaryEntryList = (props) => {

    if (!props.entries) {
        return (
        <main className="diary-list-container">
            <h1>Loading your entries</h1>
        </main>
        ); 
    }

    return (
        <main className="diary-list-container">
            <h1>My Diary Entries</h1>
            <ul className="timestamp-list">
                {props.entries.map((entry) => (
                    <li key={entry._id}>
                        <Link to={`/diary-entries/${entry._id}`} className="entry-link">
                        {new Date(entry.createdAt).toLocaleString()}
                        </Link> 
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default DiaryEntryList;

