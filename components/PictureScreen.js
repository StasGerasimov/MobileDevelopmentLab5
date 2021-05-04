import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, Platform, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import PictureLayout from "./PictureLayout";

import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const arraySplitter = (arr = [], maxArrSize = 9) => {
    const result = [];
    for (let i = 0; i < Math.ceil(arr.length / maxArrSize); i++) {
        result[i] = arr.slice(i * maxArrSize, (i * maxArrSize) + maxArrSize);
    }
    return result;
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function MainScreen({ navigation }) {

    const [dimensions, setDimensions] = useState({ window, screen });

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const styles = StyleSheet.create({
        container: {
            marginTop: StatusBar.currentHeight,
            backgroundColor: 'white',
            flex: 1,
            borderWidth: 1,
            borderColor: 'white',

        },

        // Add form
        addPictureIcon: {
            textAlign: 'right',
            marginHorizontal: 16,
            marginBottom: 5,
            marginTop: 2,
            color: '#3076CB'
        },
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={pickImage}>
                    <MaterialCommunityIcons style={styles.addPictureIcon} name="plus" color={'#808082'} size={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    const [imageVault, setImageVault] = useState([]);

    const pickImage = async () => {
        let pickedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        if (!pickedImage.cancelled) {
            setImageVault(prevState => [...prevState, { uri: pickedImage.uri }])
        }
    };

    const imageSize = {
        width: dimensions.window.width / 3,
        height: dimensions.window.width / 3,
    }

    const PictureLayoutComponent = arraySplitter(imageVault).map(
        image => (
            <PictureLayout
                key={image[0].uri}
                imageVault={image}
                width={imageSize.width}
                height={imageSize.height}
            />
        )
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {PictureLayoutComponent}
            </ScrollView>
        </SafeAreaView>
    );
}

const Stack = createStackNavigator();

export default function PictureScreen() {

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('We need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);


    return (
        <Stack.Navigator initialRouteName="Images">
            <Stack.Screen name="Images" component={MainScreen} />
        </Stack.Navigator>
    );
}