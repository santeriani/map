import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
    const [location, setLocation] = useState({
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect (() => {
        (async() => {
            getUserPosition()
        })()
    }, [])

    const getUserPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
    
        try {
            if (status !== 'granted') {
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            setLocation({...location,"latitude": position.coords.latitude,"latitude": position.coords.longitude})
        }   catch (error) {
            console.log(error)
        }
    }

    return (
        <MapView
        style={styles.map}
        region={location}
        />
    )


}


const styles = StyleSheet.create({
    map: {
        heigth: '100%',
        width: '100%'
    }
})