import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.titleContainer}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>Welcome to Figure.</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={{gap: 30, width: 170}}>
                        <Button style={styles.button} title={"Sign up"}/>
                        <Button style={styles.button} title={"Login"}/>
                    </View>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40
    },
    buttonsContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        maxWidth: 90,
        width: 90
        // fontSize: 30
    }
});
