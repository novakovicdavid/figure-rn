import {storage} from "../services/storage";
import {useEffect, useState} from "react";
import Browse from "./browse";
import {ActivityIndicator} from "react-native";

export function Profile() {
    const profilePromise = storage.loadProfile();
    const [profile, setProfile] = useState();

    useEffect(() => {
        profilePromise.then((profile) => setProfile(profile))
    }, []);

    return (
        <>
            {
                profile &&
                <Browse profileProp={profile} key={"own-profile"}/>
            }
            {
                !profile &&
                <ActivityIndicator/>
            }
        </>
    )
}