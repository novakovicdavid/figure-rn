import {Button, StyleSheet, Text, TextInput, View, ScrollView} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {useState} from "react";
import FitImage from "react-native-fit-image";
import {Controller, useForm} from "react-hook-form";
import {backend} from "../services/backend";
import {useRouter} from "expo-router";


export function UploadPage() {
    const router = useRouter();
    const [imageUri, setImageUri] = useState("");
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });
    const onSubmit = async data => {
        backend.upload_figure(data.title, data.description, imageUri,)
            .then((result) => {
                if (result.figure_id) {
                    router.push(`/figure/${result.figure_id}`);
                }
            })
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Button title={"Choose image"} onPress={async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                });
                if (result.canceled) return;
                setImageUri(result.assets[0].uri);
            }
            }/>
            {
                imageUri &&
                <>
                    <FitImage source={{uri: imageUri}}/>
                    <View style={styles.formContainer}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <>
                                    <Text style={styles.formLabel}>Title:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"A title"}
                                    />
                                </>
                            )}
                            name="title"
                        />
                        {errors.email && <Text style={styles.error}>Please enter your email.</Text>}

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <>
                                    <Text style={styles.formLabel}>Description:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"A description"}
                                    />
                                </>
                            )}
                            name="description"
                        />
                        {errors.password && <Text style={styles.error}>Please enter your password.</Text>}
                        <View style={styles.submitButton}>
                            <Button title={"Upload"} onPress={handleSubmit(onSubmit)}/>
                        </View>
                    </View>
                </>

            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 2,
        justifyContent: "center",
        alignContent: "center",
        marginLeft: "5%",
        marginRight: "5%",
    },
    formLabel: {
        fontSize: 15,
        marginBottom: 5
    },
    formInput: {
        height: 50,
        marginBottom: 10,
        paddingLeft: 10,
        borderStyle: "solid",
        borderColor: "#2196f3",
        borderWidth: 1,
        borderRadius: 3
    },
    submitButton: {
        marginTop: 20
    },
    error: {
        fontSize: 13,
        marginBottom: 15,
        color: "red"
    }
});