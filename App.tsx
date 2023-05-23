import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StudentScreen} from './screen/StudentScreen';
import {HomeScreen} from './screen/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Students"
          component={StudentScreen}
          options={{title: 'Students'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
