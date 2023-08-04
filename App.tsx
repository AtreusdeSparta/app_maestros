import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListStudentScreen} from './screen/Student/ListStudentScreen';
import {AddStudentScreen} from './screen/Student/AddStudentScreen';
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
        <Stack.Screen name="Students" component={ListStudentScreen} />
        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
          options={{title: 'Add Student'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
