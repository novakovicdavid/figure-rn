import {FlatList, View, Text} from "react-native";
import {useEffect, useState} from "react";
import {backend} from "../services/backend";
import FitImage from 'react-native-fit-image';

export default function Browse() {
    const [figures, setFigures] = useState([]);
    const figuresPromise = backend.get_first_browse_figures();
    useEffect(() => {
        figuresPromise.then((figures) => {
            if (figures.figures) setFigures(figures.figures);
        });
    }, []);

    return (
        <FlatList data={figures} renderItem={(item) =>
            <View style={{flex: 1, width: "100%"}}>
                <FitImage source={{uri: item.item.url}}/>
                <Text>{item.item.title}</Text>
            </View>
        } onEndReached={async () => {
            const newFigures = await backend.get_figures_after_id(figures[figures.length - 1].id);
            if (newFigures.figures && newFigures.figures.length > 0) setFigures([...figures, ...newFigures.figures]);
        }
        } contentContainerStyle={{alignItems: "stretch"}}/>
    )
}