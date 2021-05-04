import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AccountScreen from "../components/AccountScreen";
import ChartScreen from "../components/ChartScreen";
import FilmScreen from "../components/FilmScreen";
import PicturesScreen from "../components/PictureScreen";


import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AddPoster from "../components/AddPoster";
import PosterInfo from "../components/PosterInfo";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('New poster')}>

                    <MaterialCommunityIcons style={styles.addIcon} name="plus" color={'#808082'} size={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return <FilmScreen />;
}

function AddItemForm() {
    return (
        <AddPoster />
    );
}

function PosterInfoForm({ route }) {

    const { fileName, title, year } = route.params;

    return (
        <PosterInfo
            fileName={fileName}
            title={title}
            year={year}
        />
    );
}

const Stack = createStackNavigator();

function Header() {
    return (
        <Stack.Navigator initialRouteName="Movies">
            <Stack.Screen name="Movies" component={HomeScreen} />
            <Stack.Screen name="New poster" component={AddItemForm} />
            <Stack.Screen name="Info" component={PosterInfoForm} />
        </Stack.Navigator>
    );
}

export default function AppNavigation() {
    return (
        <Tab.Navigator
            tabBarOptions={
                { labelStyle: { paddingBottom: 5 } }}
        >
            <Tab.Screen
                name="General"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'General',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Charts"
                component={ChartScreen}
                options={{
                    tabBarLabel: 'Charts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="poll" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Films"
                component={Header}
                options={{
                    tabBarLabel: 'Films',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="movie-roll" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Pictures"
                component={PicturesScreen}
                options={{
                    tabBarLabel: 'Pictures',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="image-frame" color={color} size={size} />
                    ),
                }}

            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    // Add form
    addIcon: {
        textAlign: 'right',
        marginHorizontal: 16,
        marginBottom: 5,
        marginTop: 2,
        color: '#3076CB'
    }
});