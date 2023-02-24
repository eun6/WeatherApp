import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Geolocation from "@react-native-community/geolocation"; //커뮤니티 api
import * as RNLocalize from "react-native-localize";

const { width : SCREEN_WIDTH } = Dimensions.get("window");

console.log(RNLocalize.getLocales());
console.log(RNLocalize.getCurrencies());

//사용자에게 권한 허가 여부 받고
//현재 사용자의 위치 정보 받아오기
Geolocation.setRNConfiguration("false", "whenInUse", "auto");

export default function App() {
    const [city, setCity] = useState("Loading...");
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const getlocation =()=> {
        Geolocation.getCurrentPosition(
            postion => {
                const latitude = postion.coords.latitude;
                const longitude = postion.coords.longitude;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            error => {
                console.log(code, message,PERMISSION_DENIED, POSITION_UNAVAILABLE);
            },
            {enableHighAccuracy:true}
          );
          console.log(latitude, longitude);
        setCity(RNLocalize.getTimeZone());
    };
   useEffect(()=>{
    getlocation();
   },[]);
    return <View style={styles.container}>
        <View style={styles.city}>
            <Text style={styles.cityName}>{city}</Text>
        </View>
        {/*전체 예보의 view*/}
        <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle={styles.weather}>
        {/*일자별 예보의 view*/}
            <View style={styles.day}>
                <Text style={styles.temp}>27</Text>
                <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.day}>
                <Text style={styles.temp}>27</Text>
                <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.day}>
                <Text style={styles.temp}>27</Text>
                <Text style={styles.description}>Sunny</Text>
            </View>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: "hotpink"
    },
    city : {
        flex:1,
        justifyContent: "center",
        alignItems:"center"
    },
    cityName : {
        color:"black",
        fontSize:70,
        fontWeight:"500"
    },
    weather : {
        
    },
    day: {
        width: SCREEN_WIDTH, 
        alignItems:"center",
    },
    temp:{
        color: "black",
        marginTop: 40,
        fontSize: 180,
    },
    description: {
        marginTop:-45,
        color: "black",
        fontSize: 60,
    }
});