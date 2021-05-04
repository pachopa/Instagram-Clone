import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getUserObjByUserId = async () => {
            const [response] = await getUserByUserId(user.uid);
            // console.log("response", response);
            setActiveUser(response);
        };

        if (user?.uid) {
            getUserObjByUserId();
        }

    }, [user]);

    return { user: activeUser };
};