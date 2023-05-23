import React from 'react';
import {Button} from 'react-native';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <Button title="Students" onPress={() => navigation.navigate('Students')} />
  );
};
