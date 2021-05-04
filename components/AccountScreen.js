import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function AccountScreen() {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>
                Герасімов Станіслав
                {"\n"}
                Група ІВ-83
                {"\n"}
                ЗК ІВ-8304
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    }
})