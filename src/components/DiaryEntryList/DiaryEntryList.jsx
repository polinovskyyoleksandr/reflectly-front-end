import './DiaryEntryList.css';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { index } from '../../services/diaryService';

const DiaryEntryList = (props) => {
    const entries = props.entries;

    return (
        <main>
            <h1>My Diary Entries</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry._id}>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default DiaryEntryList;

// amend diary entry list - it should show timestamp 