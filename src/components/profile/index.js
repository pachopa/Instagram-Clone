import PropTypes from 'prop-types';
import { useReducer, useEffect } from 'react';
import { getUserByUsername, getUserPhotosByUsername } from '../../services/firebase';
import Header from './header';
import Photos from './photos';

export default function Profile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        profile: [],
        profile: 0,
    };

    const [{ profile, photosCollection, followerCount }, dispatch]
        = useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            // const [user] = await getUserByUsername(username);
            //   console.log("", );
            const photos = await getUserPhotosByUsername(user.username);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }

        getProfileInfoAndPhotos();

    }, [user.username]);

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    );
};


Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    })

};

// content: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     imageSrc: PropTypes.string.isRequired,
//     caption: PropTypes.string.isRequired,
//     docId: PropTypes.string.isRequired,
//     userLikedPhoto: PropTypes.bool.isRequired,
//     likes: PropTypes.array.isRequired,
//     comments: PropTypes.array.isRequired,
//     dateCreated: PropTypes.number.isRequired,
// })
