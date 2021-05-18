// import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';
import { useContext } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Index() {

    const { user: { docId = '', fullName, username, userId, following } = {} } = useContext(LoggedInUserContext);

    // console.log("fullName, username, userId", fullName, username, userId);
    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
    );
};

