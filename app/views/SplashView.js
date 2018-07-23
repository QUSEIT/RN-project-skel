import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native'
import Color from "../styles/Color";

export default class SplashView extends React.PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Color.purple}
                    translucent={false}
                    hidden={false}
                    barStyle={'light-content'}
                />
                <Text style={styles.text}>Splash Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.purple
    },
    text: {
        fontSize: 24,
        color: Color.white
    }
});