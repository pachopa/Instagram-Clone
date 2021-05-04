import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

export default function Index() {

    const test = useUser();
    // console.log("test", test);
    const { user: { fullName, username, userId, following } } = useUser();

    // console.log("fullName, username, userId", fullName, username, userId);
    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} />
        </div>
    );
};

