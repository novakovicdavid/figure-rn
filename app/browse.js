import {FlatList, Text, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {backend} from "../services/backend";
import FitImage from 'react-native-fit-image';
import {useRouter} from "expo-router";

export default function Browse(props) {
    const {profileProp} = props;
    const [profile] = useState(profileProp);
    const [figures, setFigures] = useState([]);
    const figuresPromise = backend.get_first_browse_figures(profile?.id);

    useEffect(() => {
        figuresPromise.then((figures) => {
            if (figures.figures) setFigures(figures.figures);
        });
    }, []);

    const router = useRouter();

    return (
        <FlatList data={figures} renderItem={(item) =>
            <TouchableOpacity onPress={() => {
                router.push(`/figure/${item.item.id}`)
            }
            }>
                <FitImage source={{uri: item.item.url}}/>
                <Text>{item.item.title}</Text>
            </TouchableOpacity>
        } onEndReached={async () => {
            const newFigures = await backend.get_figures_after_id(figures[figures.length - 1].id, profile?.id);
            if (newFigures.figures && newFigures.figures.length > 0) setFigures([...figures, ...newFigures.figures]);
        }
        } contentContainerStyle={{alignItems: "stretch"}}/>
    )
}