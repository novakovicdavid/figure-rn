import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Browse from "./browse";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <Tab.Navigator screenOptions={{headerShown: false}}>
                    <Tab.Screen name="Browse" component={Browse}/>
                    <Tab.Screen name="Profile" component={Browse}/>
                    <Tab.Screen name="Upload" component={Browse}/>
                    <Tab.Screen name="Settings" component={Browse}/>
                </Tab.Navigator>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}