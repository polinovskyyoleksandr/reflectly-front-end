import './DiaryEntryList.css';
import { Link } from 'react-router';
import { useLocation, } from 'react-router';
import { index } from '../../services/diaryService';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const DiaryEntryList = (props) => {
    const entries = props.entries;
    const location = useLocation();
    const { user } = useContext(UserContext);

    const publicEntries = entries.filter((entry) => {
        return entry.isEntryPublic === true;
    });

    const privateEntries = entries.filter((entry) => {
        return user._id === entry.owner;
    });
    // console.log('public:',publicEntries);
    // console.log('private:',privateEntries);
    // console.log(user._id, entry.owner)
    return (
        <main>
            {location.pathname === "/" ? (
                <section>
                    <h1>Community Moods</h1>
                    <ul>
                        {publicEntries.map((entry) => (
                            <Link key={entry._id} to={`/diary/${entry._id}`}>
                                <li key={entry._id}> 
                                {`Mood created on: ${new Date(entry.createdAt).toLocaleDateString('en-GB', "full")}
                                 at ${new Date(entry.createdAt).toLocaleTimeString('en-GB', "full")}`} 
                                </li>
                            </Link>
                        ))}
                    </ul>
                </section>
            ) : (
                <section>
                    <h1>My Diary Entries</h1>
                    <ul>
                        {privateEntries.map((entry) => (
                           <Link key={entry._id} to={`/diary/${entry._id}`}>
                                <li key={entry._id}> 
                                {`My Mood on: ${new Date(entry.createdAt).toLocaleDateString('en-GB', "short")}
                                 at ${new Date(entry.createdAt).toLocaleTimeString('en-GB', "short")}: ${entry.mood}`} 
                                </li>
                            </Link>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    )
}

// we can display either created at / updated at timestamp 


export default DiaryEntryList;

