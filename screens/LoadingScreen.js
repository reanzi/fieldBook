import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

export default class LoadingScreeen extends React.Component {
    componentDidMount() {
        this._isMounted = true;
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})