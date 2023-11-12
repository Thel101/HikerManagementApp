import { View, Text, TextInput, StyleSheet, Pressable, Button, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RadioButton, Switch } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.hikes');
const HikeRegister = () => {
    useEffect(() => { createTable() }, []);
    const createTable = () => {
        db.transaction((txn) => {
            txn.executeSql('create table if not exists hikes(id integer primary key autoincrement,name text, location text, length text, date text, weather text, difficulty text, type text, parking boolean, description text)',
                [],
                (tx, result) => {
                    console.log('Table created!');
                },
                (tx, error) => {
                    console.log(error);
                });
        });
    }
    const [hikeName, setHikeName] = useState("");
    const [hikeLocation, setHikeLocation] = useState("");
    const [hikeLength, setHikeLength] = useState("");
    const [dateOfHike, setDateOfHike] = useState("")
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            toggleDatePicker();
            setDateOfHike(currentDate.toDateString());
        }
        else
            toggleDatePicker();
    }
    const [difficulty, setDifficulty] = useState('low');
    const [type, setType] = useState('one-way');

    const [selected, setSelected] = useState('');
    const data = [
        { key: '1', value: 'sunny' },
        { key: '2', value: 'cloudy' },
        { key: '3', value: 'windy' },
        { key: '4', value: 'rainy' },
        { key: '5', value: 'stormy' },

    ]
    const [description, setDescription] = useState('');
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


    const submit = () => {
        if (!hikeName) {
            Alert.alert('Hike Record', 'Hike Name cannot be empty');
            return;
        }
        if (!hikeLocation) {
            Alert.alert('Hike Record', 'Hike Location cannot be empty');
            return;
        }
        if (!hikeLength) {
            Alert.alert('Hike Record', 'Hike Length cannot be empty');
            return;
        }
        if (!dateOfHike) {
            Alert.alert('Hike Record', 'Hike Date cannot be empty');
            return;
        }

        let switchMode = false;

        (isSwitchOn) ? switchMode = true : switchMode = false;

        db.transaction((txn) => {
            txn.executeSql(

                'insert into hikes(name,location,length,date,weather,difficulty,type,parking, description) values (?,?,?,?,?,?,?,?,?)',
                [hikeName, hikeLocation, hikeLength, dateOfHike, selected, difficulty, type, isSwitchOn, description],
                (tx, result) => {
                    Alert.alert('Hike Record', 'Successfully Saved!')
                    setHikeName('');
                    setHikeLocation('');
                    setHikeLength('');
                    setDateOfHike('');
                    setSelected();
                    setDifficulty('low');
                    setType('one-way');
                    setIsSwitchOn(false);
                    setDescription('');
                },
                (tx, error) => { console.log("Error in saving hike record" + error.message); })
        })





    }
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView 
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
            >
                <Text style={{ fontSize: 25, textAlign: 'center', marginVertical: 10, color: 'green' }}>Record your hike history</Text>
                <TextInput style={styles.input}
                    placeholder='Enter Hike Name' value={hikeName} onChangeText={setHikeName} />

                <TextInput style={styles.input}
                    placeholder='Enter Hike Location' value={hikeLocation} onChangeText={setHikeLocation} />

                <TextInput style={styles.input}
                    placeholder='Enter Hike Length in meters'
                    keyboardType='numeric' value={hikeLength} onChangeText={setHikeLength} />

                {showPicker && (<DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                    minimumDate={new Date()} />)}

                {!showPicker && (
                    <Pressable
                        onPress={toggleDatePicker}>
                        <TextInput style={styles.input}
                            placeholder='Enter date of hike'
                            value={dateOfHike}
                            onChangeText={setDateOfHike}
                            editable={false}

                        />
                    </Pressable>)}
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, marginRight: 10, marginVertical: 10 }}>Hike Site Weather</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />
                </View>
                <View style={styles.radioContainer}>
                    <Text style={{ fontSize: 15, marginRight: 10, marginVertical: 10 }}>Diffuculty of Hike</Text>
                    <RadioButton.Group onValueChange={difficulty => setDifficulty(difficulty)} value={difficulty}>
                        <View style={styles.rowContainer}>
                            <View style={styles.rowContainer}>
                                <RadioButton value="low" />
                                <Text style={{ fontSize: 15 }}>Low</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <RadioButton value="high" />
                                <Text style={{ fontSize: 15 }}>High</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={styles.radioContainer}>
                    <Text style={{ fontSize: 15, marginRight: 10, marginVertical: 10 }}>Hike Type </Text>
                    <RadioButton.Group onValueChange={type => setType(type)} value={type}>
                        <View style={styles.rowContainer}>
                            <View style={styles.rowContainer}>
                                <RadioButton value="one-way" />
                                <Text style={{ fontSize: 15 }}>One-way</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <RadioButton value="round-trip" />
                                <Text style={{ fontSize: 15 }}>Round-trip</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={{ fontSize: 15, marginRight: 10 }}>Parking Available</Text>
                    <Switch style={{ fontSize: 15 }} value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
                <TextInput style={styles.inputTextArea}
                    placeholder="Enter Hike Description"
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={{ justifyContent: 'center', width: 300 }}>
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >



    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        color: 'black',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black'
    },
    inputTextArea: {
        width: 300,
        color: 'black',
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black'
    },
    radioContainer: {
        justifyContent: 'flex-start',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 5,
    },
    button: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },


})
export default HikeRegister;