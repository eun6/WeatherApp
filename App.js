import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Geolocation from "@react-native-community/geolocation"; //커뮤니티 api
import * as RNLocalize from "react-native-localize";
import Icon from "react-native-vector-icons/FontAwesome";

const { width : SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "5212ff3d3a90ee6b4c66779ca312c601";
const icons = {
    Rain : "rocket",
    Clouds : "cloud",
    Clear : "google"
};

//사용자에게 권한 허가 여부 받고
//현재 사용자의 위치 정보 받아오기
Geolocation.setRNConfiguration("false", "whenInUse", "auto");

export default function App() {
    const [city, setCity] = useState("Loading...");
    const [days, setDays] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const getlocation =async()=> {
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
        setCity(RNLocalize.getCountry);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const json = await response.json();
        setDays(
            json.list.filter((weather) => {
            if (weather.dt_txt.includes("00:00:00")) {
            return weather;}})
        );
        
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
            {days.length === 0 ? (
                <View style={{...styles.day, alignItems : "center"}}>
                    <ActivityIndicator
                        color ="white"
                        style = {{marginTop: 10}}
                        size = "large" 
                    />
                </View>
            ):(
                days.map((day, index)=> (
                    <View key={index} style={styles.day}>
                        <View
                            style={{
                                flexDirection : "row",
                                alignItems : "center",
                                justifyContent : "space-between"
                            }}>
                            <Text style={styles.temp}>
                                {parseFloat(day.main.temp).toFixed(1)}
                            </Text>
                            <Icon name={icons[day.weather[0].main]} size={100} color="white"/>
                        </View>
                    <Text style={styles.description}>{day.weather[0].main}</Text>
                    <Text style={styles.tinyText}>{day.weather[0].description}</Text>
                </View>
                ))
            )}      
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
        color:"white",
        fontSize: 100,
        fontWeight:"500"
    },
    weather : {
        marginTop: -10,
    },
    day: {
        width: SCREEN_WIDTH, 
        paddingHorizontal: 10,
    },
    temp:{
        color: "white",
        marginTop: 40,
        fontSize: 120,
    },
    description: {
        marginTop:-20,
        color: "white",
        fontSize: 30,
        paddingHorizontal: 10,
    },
    tinyText: {
        fontSize: 20,
        color: "white",
        paddingHorizontal: 10,

    }
});