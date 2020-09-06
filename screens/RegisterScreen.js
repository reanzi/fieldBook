import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Platform, Picker, Modal } from 'react-native'
import * as firebase from "firebase"


const workDepartments = [
    {
        label: "== Select Department ==",
        value: ""
    },
    {
        label: "Agriculture",
        value: "agriculture"
    },
    {
        label: "Livestock",
        value: "livestock"
    },
    {
        label: "Fisheries",
        value: "fisheries"
    },
    {
        label: "Health",
        value: "health"
    }
];

class FormPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    render() {
        if (Platform.OS === 'android') {
            return (
                <Picker
                    selectedValue={this.props.value}
                    onValueChange={this.props.onValueChange}>
                    {this.props.items.map((i, index) => (
                        <Picker.Item key={index} label={i.label} value={i.value} />
                    ))}
                </Picker>
            );
        } else {
            const selectedItem = this.props.items.find(
                i => i.value === this.props.value
            );
            const selectedLabel = selectedItem ? selectedItem.label : '';
            return (
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: true })}>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder="Select language"
                            onChangeText={searchString => {
                                this.setState({ searchString });
                            }}
                            value={selectedLabel}
                        />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ modalVisible: false })}>
                            <View style={styles.modalContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text
                                        style={{ color: 'blue' }}
                                        onPress={() => this.setState({ modalVisible: false })}>
                                        Done
                  </Text>
                                </View>
                                <View>
                                    <Picker
                                        selectedValue={this.props.value}
                                        onValueChange={this.props.onValueChange}>
                                        {this.props.items.map((i, index) => (
                                            <Picker.Item
                                                key={index}
                                                label={i.label}
                                                value={i.value}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            );
        }
    }
}



export default class RegisterScreen extends React.Component {
    state = {
        name: "",
        designation: "",
        department: "",
        email: "",
        password: "",
        errorMessage: null
    }

    handlRegister = () => {
        // const { name, designation, email, password } = this.state
        // console.log(this.state)
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(error => this.setState({ errorMessage: error.message }))


    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
                <View style={styles.errorMsg}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>full name</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={name => this.setState({ name })} value={this.state.name}></TextInput>
                    </View>
                    <View style={styles.inputGap}>
                        <Text style={styles.inputTitle}>Work Designation</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={designation => this.setState({ designation })} value={this.state.designation}></TextInput>
                    </View>
                    {/* <View style={styles.inputGap}>
                        <Text style={styles.inputTitle}>`Department:  Agriculture or Livestock`</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={department => this.setState({ department })} value={this.state.department}></TextInput>
                    </View> 
                    * <View style={styles.row}>
                        <Text>Work & Designation</Text>
                        <View>
                            <Text style={styles.inputTitle}>Work Station</Text>
                            <TextInput style={styles.inputdate} autoCapitalize="none" onChangeText={designation => this.setState({ designation })} value={this.state.designation}></TextInput>
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.label}>Department</Text>
                            <FormPicker
                                items={workDepartments}
                                value={this.state.department}
                                onValueChange={itemValue => this.setState({ department: itemValue })}
                            />
                        </View>
                    </View> */}
                    <FormPicker
                        items={workDepartments}
                        value={this.state.department}
                        onValueChange={itemValue => this.setState({ department: itemValue })}
                    />
                    <View style={styles.inputGap}>
                        <Text style={styles.inputTitle}>Email or Phone</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={email => this.setState({ email })} value={this.state.email}></TextInput>
                    </View>
                    <View style={styles.inputGap}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} value={this.state.password}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handlRegister}>
                    <Text style={{ color: "#FFF", textTransform: "uppercase", fontWeight: "500" }}> Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        Already have an account? <Text style={{ color: "#E9446A", fontWeight: "500" }}>Sign In</Text>
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
        marginTop: 5,
        marginBottom: 48,
        marginHorizontal: 30
    },
    row: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 40
    },
    inputWrap: {
        flex: 1,
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    inputdate: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595"
    },
    inputcvv: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
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
    inputGap: {
        marginTop: 20
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