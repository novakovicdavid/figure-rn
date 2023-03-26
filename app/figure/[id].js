import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {backend} from "../../services/backend";
import FitImage from "react-native-fit-image";
import {useSearchParams} from "expo-router";

export default function Figure() {
    const {id} = useSearchParams();
    const [figure, setFigure] = useState();

    useEffect(() => {
        if (!id) return;
        backend.get_figure(id).then((result) => {
            if(result.figure) setFigure(result.figure);
        });
    }, [id]);

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