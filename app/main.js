import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Browse from "./browse";
import Settings from "./settings";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ThemeProvider, useThemeContext} from "../contexts/themeContext";

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1}}>
                    <MainView/>
                </SafeAreaView>
            </SafeAreaProvider>
        </ThemeProvider>
    )
}

function MainView() {
    const {theme} = useThemeContext();
    console.log(theme);
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: theme}}>
            <Tab.Screen name="Browse" component={Browse}/>
            <Tab.Screen name="Profile" component={Browse}/>
            <Tab.Screen name="Upload" component={Browse}/>
            <Tab.Screen name="Settings" component={Settings}/>
        </Tab.Navigator>
    )
}