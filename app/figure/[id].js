import {Text, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {backend} from "../../services/backend";
import FitImage from "react-native-fit-image";
import {useSearchParams} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function Figure() {
    const {id} = useSearchParams();
    const [figure, setFigure] = useState();

    useEffect(() => {
        if (!id) return;
        backend.get_figure(id).then((result) => {
            if (result.figure) setFigure(result.figure);
        });
    }, [id]);

    return (
        <>
            {
                figure &&
                <SafeAreaProvider>
                    <SafeAreaView style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{flexGrow: 1}}>
                            <FitImage source={{uri: figure.url}}/>
                            <Text style={{paddingVertical: 20, paddingLeft: 16}}>Title: {figure.title}</Text>
                            <Text style={{paddingVertical: 20, paddingLeft: 16}}>Description: {figure.description}</Text>
                            <Text style={{paddingVertical: 20, paddingLeft: 16}}>By: {figure.profile.username}</Text>
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            }
        </>
    )
}