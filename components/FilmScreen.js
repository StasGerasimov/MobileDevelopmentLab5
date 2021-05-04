import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import * as data from '../MoviesList.json';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';


import { posterSwitch } from "../global/posterSwitch";

export const DATA = data.Search

const getItemCount = (data) => data.length;

const getItem = (data, index) => {
    return ({
        id: `${data[index].imdbID}`,
        title: `${data[index].Title}`,
        year: `${data[index].Year}`,
        type: `${data[index].Type}`,
        poster: `${data[index].Poster}`
    })
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function FilmScreen() {

    const [dimensions, setDimensions] = useState({ window, screen });
    const [rerender, setRerender] = useState(false);

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const orientation = () => {
        if (dimensions.window.height >= dimensions.window.width) {
            return portrait
        } else {
            return landscape
        }
    }

    const LeftActions = () => {
        return (
            <View style={portrait.rightAction}>
                <Text style={portrait.actionText}>Delete</Text>
            </View>
        )
    }

    function Item({ id, title, year, type, poster }) {
        const navigation = useNavigation();

        return (

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={
                    () => navigation.navigate('Info', {
                        fileName: id,
                        title: title,
                        year: year
                    })

                }>
                <Swipeable
                    renderRightActions={LeftActions}
                    onSwipeableRightOpen={() => {
                        const obj = DATA.findIndex(elem => elem.imdbID === id)
                        DATA.splice(obj, 1);
                        setRerender(!rerender) 
                    }

                    }
                >
                    <View style={portrait.item}>
                        <View style={portrait.posterViev}>
                            <Image
                                style={orientation().poster}
                                source={posterSwitch(poster)}
                            />
                        </View>
                        <View style={orientation().textViev}>
                            <Text style={portrait.title}>{title}</Text>
                            <Text style={portrait.details}>{year}</Text>
                            <Text style={portrait.details}>{type}</Text>
                        </View>
                    </View>
                </Swipeable>
            </TouchableOpacity>

        )
    }


    const ItemSeparator = () => {
        return (
            <View
                style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: '#C8C8C8',
                    width: '92%',
                    height: 0.5,

                }}
            />
        );
    };

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(DATA);
        setMasterDataSource(DATA);
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.Title
                    ? item.Title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    return (
        <SafeAreaView style={portrait.container}>
            <View style={portrait.sectionStyle}>
                <MaterialCommunityIcons style={portrait.imageStyle} name="magnify" color={'#808082'} size={26} />
                <TextInput
                    style={portrait.textInputStyle}
                    onChangeText={(text) =>
                        searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    clearButtonMode={'while-editing'}
                />
            </View>

            <VirtualizedList
                data={filteredDataSource}
                // decelerationRate='fast'
                initialNumToRender={4}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <Item id={item.id} title={item.title} year={item.year} type={item.type} poster={item.poster} />
                )}

                keyExtractor={(item, index) => {
                    return item.id;
                }}
                getItemCount={getItemCount}
                getItem={getItem}
            />

        </SafeAreaView>
    );
}

const portrait = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },

    item: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 'auto',
        justifyContent: 'center',
        marginHorizontal: 0,
        padding: 20,
    },

    title: {
        fontSize: 18,
    },

    poster: {
        width: 70,
        height: 120,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
    },

    posterViev: {
        flex: 2
    },

    textViev: {
        flex: 10,
        marginLeft: 28,

    },

    textViev: {
        flex: 10,
        marginLeft: 28,

    },

    details: {
        fontSize: 16,
        marginTop: 10,
    },

    // Search style section

    textInputStyle: {
        flex: 1,
        height: 40,
        margin: 2,
        borderRadius: 10,
        
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',

        height: 40,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 3,
    },

    imageStyle: {
        margin: 5,
        
    },

    // Text Styles (actually at Poster Info component)

    baseText: {
        color: '#949494',
        fontWeight: '600',
        fontSize: 15,

    },

    innerText: {
        color: 'black',
        fontWeight: '400',
    },

    infoScreen: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: 'white'
    },

    infoImageSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',

        // shadow
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },

    infoImage: {
        width: 380,
        height: 600,

    },

    rightAction: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',

    },

    actionText: {
        color: '#fff',
        padding: 20,
        textAlign: 'right'
    }
});

const landscape = StyleSheet.create({
    textViev: {
        marginRight: 20,
        flex: 10,
        marginLeft: -20
    },

    poster: {
        width: 70,
        height: 120,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
})
