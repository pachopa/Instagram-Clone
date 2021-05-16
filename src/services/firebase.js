import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    const user = result.docs.map((item, index) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
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

export async function getPhotos(userId, following) {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get();

    console.log("firebase result 234", result);

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    console.log("userFollowedPhotos", userFollowedPhotos);

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            // photo.userId = 2
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    );

    return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
    const [user] = await getUserByUsername(username);
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', user.userId).get();

    const photos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return photos;
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUserUsername)
        .where('following', 'array-contains', profileUserId)
        .get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    console.log("response", response);
    return response.userId;
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId) {
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}