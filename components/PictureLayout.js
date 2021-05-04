import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';


const PictureLayout = ({ imageVault, width, height}) => {

    const imageBoxStyle = (size = 1) => {
        if (size === 1) {
            return(
                {
                    width: width,
                    height: height,
                    borderWidth: 1,
                    borderColor: 'white',
                }
            )
        } else if (size === 2) {
            return(
                {
                    width: width * 2,
                    height: height * 2,
                    borderWidth: 1,
                    borderColor: 'white',
                }
            )
        }
    }

    const ImageBox = (uri, style = imageBoxStyle()) => (
        <View style={style}>
            <Image
                style={styles.imageStyle}
                source={uri}
            />  
        </View>
    );


    return (
        <View>
            <View style={styles.row}>
                {imageVault[0] && ImageBox(imageVault[0], imageBoxStyle(2))}
                <View style={styles.column}>
                    {imageVault[1] && ImageBox(imageVault[1])}
                    {imageVault[2] && ImageBox(imageVault[2])}
                </View>
            </View>
            <View style={styles.row}>
                {imageVault[3] && ImageBox(imageVault[3])}
                {imageVault[4] && ImageBox(imageVault[4])}
                {imageVault[5] && ImageBox(imageVault[4])}
            </View>
                
            <View style={styles.row}>
                <View style={styles.column}>
                    {imageVault[6] && ImageBox(imageVault[6])}
                    {imageVault[8] && ImageBox(imageVault[8])}
                </View>
                <View style={styles.column}>
                    {imageVault[7] && ImageBox(imageVault[7], imageBoxStyle(2))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },

    column: {
        flexDirection: "column",
    },

    imageStyle: {
        height: "100%",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default PictureLayout
