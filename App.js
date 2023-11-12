import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import HikeRegister from './components/HikeRegister';
import HikeList from './components/HikeList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CommonScreen from './components/CommonScreen';

const Tab= createBottomTabNavigator();
const App = ()=>{
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
        name="Register"
        component={HikeRegister}
        options={{
          tabBarIcon :()=> (<MaterialIcons name="add-chart" size={24} color="black" />),
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor : 'gray',
          tabBarActiveBackgroundColor : 'gray',
          tabBarInactiveBackgroundColor : 'white'
        }}
        />

        <Tab.Screen
        name="Records"
        component={CommonScreen}
        options={{
          tabBarIcon :()=> (<Ionicons name="list" size={24} color="black" />),
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor : 'gray',
          tabBarActiveBackgroundColor : 'gray',
          tabBarInactiveBackgroundColor : 'white'
        }}
        />
          
      
      </Tab.Navigator>
    </NavigationContainer>
  )

}
/* export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HikeRegister>
        
      </HikeRegister>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
} */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
