import './DiaryEntryList.css';
import { Link } from 'react-router';
import { useLocation, } from 'react-router';
import { index } from '../../services/diaryService';

const DiaryEntryList = (props) => {
    const entries = props.entries;
    const location = useLocation();

    const publicEntries = entries.filter((entry) => {
        return entry.isEntryPublic === true;
    });

    const privateEntries = entries.filter((entry) => {
        return entry.isEntryPublic === false;
    });
    console.log('public:',publicEntries);
    console.log('private:',privateEntries);
    return (
        <main>
            {location.pathname === "/" ? (
                <section>
                    <h1>Community Entries</h1>
                    <ul>
                        {publicEntries.map((entry) => (
                            <li key={entry._id}> 
                            {`${new Date(entry.createdAt).toLocaleDateString()}`} 
                            </li>
                        ))}
                    </ul>
                </section>
            ) :(
                <section>
                    <h1>My Diary Entries</h1>
                    <ul>
                        {privateEntries.map((entry) => (
                            <li key={entry._id}> 
                            {`${new Date(entry.createdAt).toLocaleDateString()}`} 
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    )
}

// we can display either created at / updated at timestamp 


export default DiaryEntryList;

