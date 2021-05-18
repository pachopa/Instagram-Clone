import { useState, useEffect } from "react";
import { getPhotos } from '../services/firebase';


export default function usePhotos(user) {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        async function getTimelinePhotos() {
            // const [{ following }] = await getUserByUserId(userId);
            if (user?.following?.length > 0) {
                const followedUserPhotos = await getPhotos(user.userId, user.following);
                followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }

        }

        getTimelinePhotos();
        // console.log("userId", userId);
    }, [user?.userId]);

    return { photos };
};
