import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Platform, Picker, Modal, Image, StatusBar, TouchableHighlightBase } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import Fire from "../Fire"
import UserPermissions from '../utilities/UserPermissions'


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
                            <Picker.Item key={index} label={i.label} style={{ color: "red" }} value={i.value} />
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
                            placeholder="Select Department"
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
    static navigationOptions = {
        headerShown: false
    };
    state = {
        user: {
            name: "",
            designation: "",
            department: "",
            email: "",
            password: "",
            avatar: null
        },
        errorMessage: null
    }

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });

        if (result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri }})
        }
    }

    handlRegister = () => {
        Fire.shared.createUser(this.state.user)
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                <Image source={require("../assets/authHeader.png")} style={{ marginTop: -170, marginLeft: -30 }}></Image>
                <Image source={require("../assets/authFooter.png")} style={{ position: "absolute", bottom: -250, right: -100 }}></Image>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                    {/* <Text>{`< Back`}</Text> */}
                </TouchableOpacity>

                <View style={{ position: "absolute", top: 0, alignItems: "center", width: "100%" }}>
                    <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.user.avatar}} style={styles.avatar} />
                        <Ionicons name="ios-add" size={40} color="#FFF" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                        <Text style={{color: "#FFF"}}>Add Photo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMsg}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>full name</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none" 
                            onChangeText={name => this.setState({user: { ...this.state.user, name}})} 
                            value={this.state.user.name}
                        ></TextInput>
                    </View>
                    <View style={styles.inputGap}>
                        <Text style={styles.inputTitle}>Work Designation</Text>
                        <TextInput style={styles.input} 
                            autoCapitalize="none" 
                            onChangeText={designation => this.setState({ user: { ...this.state.user, designation} })} 
                            value={this.state.user.designation}
                        ></TextInput>
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
                        onValueChange={department => this.setState({ user: { ...this.state.user, department} })}
                        value={this.state.user.department}
                    />
                    <View style={styles.inputGap}>
                        <Text style={styles.inputTitle}>Email or Phone</Text>
                        <TextInput style={styles.input} 
                            autoCapitalize="none" 
                            onChangeText={email => this.setState({user: { ...this.state.user, email }})} 
                            value={this.state.user.email}
                        ></TextInput>
                    </View>
                    <View style={styles.inputGap}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} 
                            secureTextEntry 
                            autoCapitalize="none" 
                            onChangeText={password => this.setState({user: { ...this.state.user, password }})} 
                            value={this.state.user.password}
                        ></TextInput>
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
        marginTop: 23,
        fontSize: 18,
        fontWeight: '200',
        textAlign: "center",
        color: "#FFF"
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
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#F29900",
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        marginTop: -70,
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