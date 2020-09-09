import Ract from "react"
import { View, Text, Button, Image, StyleSheet } from "react-native"
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
    const Skip = () => <Button title="Skip" color="#000"/>
    const Next = ({ ...props }) => <Button title="Next" color="#000" { ...props}/>
    const Done = ({ ...props }) => <Button title="Done" color="#000"  {...props}/>
    
    return (
        <Onboarding
                //  after developing use .replace() insteady of .navigate()
            onSkip={() => navigation.navigate("login")} 
            onDone={() => navigation.navigate("login")}
            pages={
                [
                    {
                        backgroundColor: '#fff',
                        // image: <Image source={require('./images/circle.png')} />,
                        title: 'Onboarding 1',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    
                    {
                        backgroundColor: '#fff',
                        // image: <Image source={require('./images/circle.png')} />,
                        title: 'Onboarding 2',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    
                    {
                        backgroundColor: '#fff',
                        // image: <Image source={require('./images/circle.png')} />,
                        title: 'Onboarding 3',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    }
                    
                ]
            }
        />
    )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})