import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    console.log("result", result);

    const user = result.docs.map((item, index) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase
        .firestore()
        .collection('users')
        .limit(10).get();

    console.log("result", result, following, userId);
    // const [{ following}]
    return result.docs.map((user) => ({
        ...user.data(), docId: user.id
    })).filter((profile) => profile.userId !== userId && !following.includes(profile.userId)
    );

}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile = false) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile = false) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile ? FieldValue.arrayRemove(loggedInUserDocId) : FieldValue.arrayUnion(loggedInUserDocId)
        });
}


// await updateLoggedInUserFollowing(loggedInUserDocId, profileId);
// await updateFollowedUserFollowers(spDocId, userId);

