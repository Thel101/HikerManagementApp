import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.hikes');
const UpdateHike = ()=>{
    const navigation = useNavigation();
    const route = useRoute(); /* to give paramters in navigate */
    
    const { hike_id, hike_name, hike_location,hike_length,hike_date,hike_weather,hike_difficulty,hike_type,parking,hike_description} = route.params;
    const [id,setModifyID]= useState(hike_id);
    const [name, setModifyName] = useState(hike_name);
    const [location, setModifyLocation] = useState(hike_location);
    const [length, setModifyLength] = useState(hike_length);
    const [date, setModifyDate] = useState(hike_date);
    const [weather, setModifyWeather] = useState(hike_weather);
    const [difficulty, setModifyDifficulty] = useState(hike_difficulty);
    const [type, setModifyType] = useState(hike_type);
    const [hike_parking, setModifyParking] = useState(parking);
    const [description, setModifyDescription] = useState(hike_description);
    const editContact=() => {
        
     
        db.transaction((txn) =>{
         txn.executeSql('update hikes set name=?, location=?, length=?, date=?, weather=?, difficulty=?, type=?, parking=?, description=? where id=?',
         [name, location,length, date,weather,difficulty, type, hike_parking, description, id],
         (tx, result)=>{ navigation.navigate('UpdateHike')},
         (tx, error)=>{ console.log("Error in updating " + error);})
        })

    }

    return (
        <View>
          <Text>UpdateHike</Text>
        </View>
      )
}
export default UpdateHike;
