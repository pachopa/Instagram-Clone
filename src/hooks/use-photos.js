import { func } from "prop-types";
import { useContext, useState, useEffect } from "react";

import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';


export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            console.log("userId use-photos", userId);
            const [{ following }] = await getUserByUserId(userId);
            let followedUserPhotos = [];
            console.log("following", following);
            //
            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            }

            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }

        getTimelinePhotos();
        // console.log("userId", userId);
    }, [userId]);

    return { photos };
};
