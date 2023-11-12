import React from 'react'
import HikeList from './HikeList'
import UpdateHike from './UpdateHike'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();
const CommonScreen = ()=>{
    <Stack.Navigator initialRouteName='List'>
            <Stack.Screen
            name='List'
            component={HikeList}
            />
            <Stack.Screen
            name='Update'
            component={UpdateHike}
            />
        </Stack.Navigator>
    
}
export default CommonScreen;