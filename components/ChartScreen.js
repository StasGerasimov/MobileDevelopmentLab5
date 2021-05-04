import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import SwitchSelector from 'react-native-switch-selector';
import { LineChart, PieChart } from "react-native-chart-kit";
import Svg, { Line, Circle } from 'react-native-svg';

let screenWidth = Dimensions.get("window").width;

export default function ChartScreen() {

    const [toggle, setToggle] = useState(true)

    function ChartShow() {

        if (toggle) {
            return (
                <View>
                    <View 
                        style={{ 
                            marginRight: screenWidth / 2,
                        }}>
                        <LineChart
                            data={data}
                            width={screenWidth } 
                            chartConfig={chartConfig}
                            height={270}
                            zIndex={1}
                            style={{
                                top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
                            }}
                            
                        />
                    </View>
                    <View style={{
                        zIndex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Svg height="280" width="300">
                            <Line x1="0" y1="224" x2="1000" y2="224" stroke="black" strokeWidth="2" />
                            <Line x1="148" y1="10" x2="158" y2="1000" stroke="black" strokeWidth="2" />

                            <Line x1="138" y1="24" x2="148" y2="10" stroke="black" strokeWidth="2" />
                            <Line x1="158" y1="24" x2="148" y2="10" stroke="black" strokeWidth="2" />

                            <Line x1="300" y1="224" x2="284" y2="214" stroke="black" strokeWidth="2" />
                            <Line x1="284" y1="234" x2="300" y2="224" stroke="black" strokeWidth="2" />
                        </Svg>
                    </View>
                </View>
            )
        }

        if (!toggle) {
            return (
                <View>
                    <PieChart
                        data={dataPie}
                        width={screenWidth}
                        height={300}
                        chartConfig={chartPieConfig}
                        accessor={"size"}
                        backgroundColor={"transparent"}
                        hasLegend={false}
                        center={[screenWidth / 4, 0]}
                    />
                    <View style={{
                        zIndex: 1, position: 'absolute', paddingLeft: 90, marginBottom: 100
                    }}>
                        <Svg height="280" width="300">
                            <Circle cx="118" cy="152" r="70" fill="white" />
                        </Svg>
                    </View>
                </View >
            )
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.toggleContainer}>
                <SwitchSelector
                    options={options}
                    initial={0}
                    fontSize={12}
                    textColor={"#000"}
                    selectedColor={'#000'}
                    buttonColor={'#FFF'}
                    backgroundColor={"#EEEEEE"}
                    borderColor={"#000"}
                    borderRadius={10}
                    onPress={value => setToggle(value)}
                    style={{ paddingTop: 10 }}
                    buttonMargin={2}
                    
                />
            </View>

            <View style={styles.container}>
                <ChartShow isSwitched={toggle} />
            </View>
        </View>
    );
}

const options = [
    { label: 'Графік', value: true },
    { label: 'Діаграма', value: false },
];

const styles = StyleSheet.create({
    container: {
        flex: 10,
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFF',
        paddingTop: 20
    },
    toggleContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    screen: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFF'
    }
});

const data = {
    fromZero: true,
    datasets: [
        {
            data: [Math.exp(-6), Math.exp(-5.5), Math.exp(-5), Math.exp(-4.5), Math.exp(-4), Math.exp(-3.5),
                Math.exp(-3), Math.exp(-2.5), Math.exp(-2), Math.exp(-1.5), Math.exp(-1), Math.exp(-0.5),
                Math.exp(0), Math.exp(0.5), Math.exp(1), Math.exp(1.5), Math.exp(2), Math.exp(2.5), 
                Math.exp(3), Math.exp(3.5), Math.exp(4), Math.exp(4.5), Math.exp(5), Math.exp(5.5), Math.exp(6),
            ],
            color: (opacity = 1) => `rgba(30, 139, 195, ${opacity})`, // optional
            strokeWidth: 2
        }
    ],
};

const dataPie = [
    {
        name: "Black",
        size: 40,
        color: "#000000",
    },
    {
        name: "Orange",
        size: 30,
        color: "#FF8000",
    },
    {
        name: "Green",
        size: 30,
        color: "#00FF00",
    },
];

const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    propsForDots: {
        r: "1",
        strokeWidth: "2",
    }
};

const chartPieConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
}
