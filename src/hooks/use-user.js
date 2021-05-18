import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState({});

    useEffect(() => {
        const getUserObjByUserId = async (userId) => {
            const [user] = await getUserByUserId(userId);
            // console.log("user", user);
            setActiveUser(user || {});
        };

        if (userId) {
            getUserObjByUserId(userId);
        }

    }, [userId]);

    return { user: activeUser };
};
