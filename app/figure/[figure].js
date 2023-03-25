import {Text, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {backend} from "../../services/backend";
import * as Linking from 'expo-linking';
import FitImage from "react-native-fit-image";

export default function Figure() {
    const currentUrl = Linking.useURL();
    const [figure, setFigure] = useState();
    const gotUrl = useRef(false);
    useEffect(() => {
        if (gotUrl.current || !!!currentUrl || (new URL(currentUrl.toString()).pathname.lastIndexOf("/main") === 0)) return;
        gotUrl.current = true;
        const url = new URL(currentUrl.toString());
        const figureId = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
        backend.get_figure(figureId).then((result) => {
            if(result.figure) setFigure(result.figure);
        });
    }, [currentUrl]);

    return (
        <>
            {
                figure &&
                <View>
                    <FitImage source={{uri: figure.url}}/>
                    <Text>{figure.title}</Text>
                </View>
            }
        </>
    )
}