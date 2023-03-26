import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Browse from "./browse";
import Settings from "./settings";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ThemeProvider, useThemeContext} from "../contexts/themeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: theme}}>
            <Tab.Screen name="Browse" component={Browse} options={{tabBarIcon: ({focused}) => {
                    return <MaterialCommunityIcons name="view-gallery" size={24} color={focused ? theme : "#998f91"} />
            }
            }}/>
            <Tab.Screen name="Profile" component={Browse} options={{tabBarIcon: ({focused}) => {
                    return <MaterialCommunityIcons name="face-man-profile" size={24} color={focused ? theme : "#998f91"} />
                }
            }}/>
            <Tab.Screen name="Upload" component={Browse} options={{tabBarIcon: ({focused}) => {
                    return <MaterialCommunityIcons name="cloud-upload" size={24} color={focused ? theme : "#998f91"} />
                }
            }}/>
            <Tab.Screen name="Settings" component={Settings} options={{tabBarIcon: ({focused}) => {
                    return <MaterialCommunityIcons name="card-bulleted-settings" size={24} color={focused ? theme : "#998f91"} />
                }
            }}/>
        </Tab.Navigator>
    )
}