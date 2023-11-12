import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation,useIsFocused } from '@react-navigation/core';
import * as SQLite from 'expo-sqlite'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase('db.hikes');

const HikeList = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [hikeList, setHikeList] = useState([]);
    useEffect(() => { getAllHikes() }, [isFocused]);
    const getAllHikes = () => {
        console.log("Show All Saved contacts");
        db.transaction((txn) => {
            txn.executeSql('select * from hikes',
                [],
                (tx, result) => {
                    console.log("Number of records" + result.rows.length);
                    let temp = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        temp.push(result.rows.item(i));
                        console.log(temp);
                    }
                    setHikeList(temp);
                },
                (tx, error) => { console.log("Error in getting hikes" + error); }
            )
        });
    }
    const showItem = (item) => {
        console.log("Show Item");
        return (
            <View style={styles.list}>
                <Text>{item.name}</Text>
                <Text>{item.location}</Text>
                <Text>{item.length}meters</Text>
                <TouchableOpacity onPress={() => updateHike(item)}>
                    <Text><Ionicons name='md-pencil' /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { confirmAlert(item.id) }}>
                    <Text><MaterialCommunityIcons name="delete" size={24} color="black" /></Text>
                </TouchableOpacity>
            </View>
        )
    }
    /* 'insert into hikes(name,location,length,date,weather,difficulty,type,parking, description) */
    const updateHike =(item)=>{
        navigation.navigate('Update',{
          hike_id : item.id,
          hike_name : item.name,
          hike_location: item.location,
          hike_length : item.length,
          hike_date : item.date,
          hike_weather : item.weather,
          hike_difficulty : item.difficulty,
          hike_type : item.type,
          parking : item.parking,
          hike_description : item.description

        });
       
      }
    return (
        <View>
            <Text>Hike List</Text>
            <FlatList
                data={hikeList}
                renderItem={({ item }) => showItem(item)}

            />


        </View>
    )

}
const styles = StyleSheet.create({

    list: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
}
);
export default HikeList;