import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { DATA } from "./FilmScreen";

let newPosterCounter = 0

const AddPoster = () => {
    const [title, onChangeTitle] = useState('');
    const [type, onChangeType] = useState('');
    const [year, onChangeYear] = useState('');

    const [shouldShow, setShouldShow] = useState(false);

    const newItem = () => {
        onChangeTitle('')
        onChangeType('')
        onChangeYear('')
        if (title != '') {
            const obj = {
                "Title": title,
                "Type": type,
                "Year": year,
                "imdbID": newPosterCounter + 1,
            }
            DATA.push(obj)
            newPosterCounter++
        } else {
            setShouldShow(true)
            setTimeout(() => {
                setShouldShow(false)
            }, 4000);
        }
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
            >


                <Text style={styles.textStyle}>Title</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangeTitle(text)}
                        value={title}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{ padding: 2 }}>
                    {shouldShow ? (<Text style={styles.textTipStyle}>Movie title is required!</Text>) : null}
                </View>


                <Text style={styles.textStyle}>Type</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangeType(text)}
                        value={type}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{ padding: 2 }}></View>


                <Text style={styles.textStyle}>Year</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        keyboardType={'numeric'}
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangeYear(text)}
                        value={year}
                        clearButtonMode={'while-editing'}
                        maxLength={4}
                    />
                </View>
                <View style={{ padding: 2 }}></View>

                <View style={styles.buttonStyle}>
                    <Button
                        title="Add"
                        onPress={newItem}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 0,
    },

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
        backgroundColor: 'white',

        height: 40,
        borderRadius: 6,
        marginTop: 10,
        marginHorizontal: 8,

        borderColor: '#808082',
        borderWidth: 1,
    },

    imageStyle: {
        margin: 5,
    },

    buttonStyle: {
        marginVertical: 16,
    },

    textStyle: {
        marginLeft: 16,
        color: 'black',
        marginTop: 20,
        fontSize: 16,
    },

    textTipStyle: {
        paddingTop: 6,
        marginLeft: 16,
        position: 'absolute',
        fontSize: 12,
        color: 'red',
    },

    closeButtonParent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        color: '#3076CB'
    },
});

export default AddPoster;