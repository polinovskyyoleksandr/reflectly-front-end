import './DiaryEntryList.css';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { index } from '../../services/diaryService';

const DiaryEntryList = (props) => {
    const entries = props.entries;
    console.log(entries);
    return (
        <main>
            <h1>My Diary Entries</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry._id}> 
                    {entry.title} 
                    </li>
                ))}
            </ul>
        </main>
    )
}

// we can display either created at / updated at timestamp 


export default DiaryEntryList;

