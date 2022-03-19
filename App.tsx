import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Dashboard } from './src/screens/Dashboard';
import { DefaultScreen } from './src/screens/DefaultScreen';
import { DeleteScreen } from './src/screens/DeleteAppointment';
import { DetailsAppointment } from './src/screens/DetailsAppointment';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { RootStackParamList } from './src/types';
const Stack = createNativeStackNavigator<RootStackParamList>();


function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator

      >
        <Stack.Screen name='Default' component={DefaultScreen} />


        <Stack.Screen name='בית' component={HomeScreen} />
        <Stack.Screen name='הרשמה' component={RegisterScreen} />
        <Stack.Screen name='התחברות' component={LoginScreen} />
        <Stack.Screen name='תורים' component={Dashboard} />
        <Stack.Screen name='פרטים' component={DetailsAppointment} />
        <Stack.Screen name='פרופיל' component={ProfileScreen} />
        <Stack.Screen name='ביטול' component={DeleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;
