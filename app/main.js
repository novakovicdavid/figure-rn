import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Browse from "./browse";

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Browse" component={Browse}/>
            <Tab.Screen name="Profile" component={Browse}/>
            <Tab.Screen name="Upload" component={Browse}/>
            <Tab.Screen name="Settings" component={Browse}/>
        </Tab.Navigator>
    )
}