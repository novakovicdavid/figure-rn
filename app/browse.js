import {FlatList, View, Image, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {backend} from "../services/backend";

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
            <View>
                <Image source={{uri: item.item.url}} style={styles.tinyLogo}/>
            </View>
        } onEndReached={() => {
        }
        } contentContainerStyle={{alignItems: "stretch"}}/>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {

    }
});