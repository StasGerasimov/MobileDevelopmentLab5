import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { posterSwitch } from "../global/posterSwitch";
import { posterInfoSwitch } from "../global/posterInfoSwitch";


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function PosterInfo({ fileName, title, year }) {
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

    const orientation = () => {
        const dim = Dimensions.get('screen');
        if (dim.height >= dim.width) {
            return styles
        } else {
            return landscape
        }
    }

    const tt = posterInfoSwitch(fileName)

    return (
        <View >
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={orientation().infoScreen}>
                        <View style={orientation().infoImageSection}>
                            <Image
                                style={orientation().infoImage}
                                source={posterSwitch(tt.Poster)}
                            />
                        </View>
                        <View style={orientation().infoScreenTextView}>
                            <Text style={orientation().baseText}>
                                Title:
                            <Text style={orientation().innerText}> {tt.Title != '' ? tt.Title : title}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Year:
                            <Text style={orientation().innerText}> {tt.Year != '' ? tt.Year : year}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Genre:
                            <Text style={orientation().innerText}> {tt.Genre}{'\n'}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Director:
                            <Text style={orientation().innerText}> {tt.Director}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Actors:
                            <Text style={orientation().innerText}> {tt.Actors}{'\n'}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Country:
                            <Text style={orientation().innerText}> {tt.Country}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Language:
                            <Text style={orientation().innerText}> {tt.Language}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Production:
                            <Text style={orientation().innerText}> {tt.Production}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Released:
                            <Text style={orientation().innerText}> {tt.Released}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Runtime:
                            <Text style={orientation().innerText}> {tt.Runtime}{'\n'}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Awards:
                            <Text style={orientation().innerText}> {tt.Awards}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Rating:
                            <Text style={orientation().innerText}> {tt.imdbRating != '' ? tt.imdbRating + '/10' : ''}{'\n'}</Text>
                            </Text>
                            <Text style={orientation().baseText}>
                                Plot:
                            <Text style={orientation().innerText}> {tt.Plot}</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({

    baseText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 14,
        marginVertical: 1,

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
        alignItems: 'center',
    },

    infoImage: {
        width: 200,
        height: 340,

        borderWidth: 3,
        borderColor: '#EEEEEE'

    },
    infoScreenTextView: {
        marginTop: 10,
        
        
    }


});


const landscape = StyleSheet.create({

    infoScreen: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
    },

    

    infoImage: {
        width: 170,
        height: 300,

        borderWidth: 3,
        borderColor: '#EEEEEE',

        
    },

    infoScreenTextView: {
        paddingLeft: 10,
        flexShrink: 1 // перенос строк 
    },

    baseText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 14,
        marginVertical: 1,
        
        
    },

    innerText: {
        color: 'black',
        fontWeight: '400',
       
    },
    

})