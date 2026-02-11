import './DiaryEntryList.css'; 

const DiaryEntryList = (props) => {
    const entries = props.entries || [

    ]

    return (
        <main>
            <h1>My Diary Entries</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.timestamp}> 
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default DiaryEntryList;

// amend diary entry list - it should show timestamp 