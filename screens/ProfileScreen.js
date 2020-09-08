import React from "react"
import { View, Text, StyleSheet, Button, Image } from "react-native"
import Fire from "../Fire"

// console.ignoredYellowBox = [
//     'Setting a timer'
// ]

export default class ProfileScreen extends React.Component {
    state = {
        user: {}
    }

    unsubscribe = null;

    componentDidMount(){
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot( doc => {
                this.setState({ user: doc.data() })
            })
    }
    componentDidUpdate(){
        this.unsubscribe()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 64,alignItems:"center"}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} 
                            source={ 
                                this.state.user.avatar 
                                    ? { uri: this.state.user.avatar} 
                                    : require("../assets/defaultAvatar.jpg")}/>
                    </View>
                            <Text style={styles.name}> { this.state.user.name } </Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statsAmount}>23</Text>
                        <Text style={styles.statsTitle}>Posts</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statsAmount}>198k</Text>
                        <Text style={styles.statsTitle}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statsAmount}>12</Text>
                        <Text style={styles.statsTitle}>Following</Text>
                    </View>
                </View>

                <Button onPress={() =>  {Fire.shared.signOut()}} title={"Log Out"}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarContainer:  {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statsAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statsTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    }
})