import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as firebase from "firebase"

export default class LoginScreeen extends React.Component {
    state = {
        emaail: "",
        password: "",
        errorMessage: null
    }

    handlLogin = () => {
        const { email, password } = this.state

        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>
                <View style={styles.errorMsg}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email or Phone</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={email => this.setState({ email })} value={this.state.email}></TextInput>
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} value={this.state.password}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handlLogin}>
                    <Text style={{ color: "#FFF", textTransform: "uppercase", fontWeight: "500" }}> Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ alignSelf: "center", marginTop: 10, color: "teal" }}> Forgot Something?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        New to FieldBook? <Text style={{ color: "#E9446A", fontWeight: "500" }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
    errorMsg: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        // marginLeft: 40,
        // marginRight: 40,
        marginHorizontal: 40
    },
    form: {
        marginTop: 50,
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8a8f9e",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8a8f9e",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161f3d"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})