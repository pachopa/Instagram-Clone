import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';


export default function Profile() {
    const { username } = useParams();
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        // const checkUserExists = async () => {
        //     const doesUserExist = await getUserByUsername(username);
        //     console.log("doesUserExist", doesUserExist);
        // };

        async function checkUserExists() {
            const doesUserExist = await getUserByUsername(username);
            console.log("doesUserExist", doesUserExist);

        }
    }, []);

    return <p>hello</p>;
};
