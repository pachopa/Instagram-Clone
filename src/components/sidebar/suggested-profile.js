import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId }) {
    // console.log("po suggested profile", userDocId, username, profileId, userId);

    const [followed, setFollowed] = useState(false);

    // const handleFollowUser = async () => {
    //     const  = await functionName();
    //     console.log("",);



    // };

    const handleFollowedUser = async () => {

        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId);
        // console.log("", );
    };



    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className='rounded-full w-8 flex mr-3'
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowedUser}
            >
                Follow
            </button>
        </div>

    ) : null;
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
};
