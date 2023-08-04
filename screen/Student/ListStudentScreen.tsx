/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, StyleSheet, Button} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {listStudents} from '../../src/graphql/queries';
import {Student} from '../../src/models';
import {CreateStudentInput} from '../../src/API';

export const ListStudentScreen = ({navigation}: {navigation: any}) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const studentData: any = await API.graphql<Student[]>(
        graphqlOperation(listStudents),
      );
      const sudents = studentData.data.listStudents.items.filter(
        (s: any) => !s._deleted,
      );
      setStudents(sudents);
    } catch (err) {
      console.error(err);
      console.log('error fetching students');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        {students.map((student: CreateStudentInput, index) => (
          <View key={student.id ? student.id : index} style={styles.student}>
            <Text style={styles.name}>
              {student.Name} {student.LastName} {student.MaternalName}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonStyle}>
        <Button title="Add" onPress={() => navigation.navigate('AddStudent')} />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {flex: 1, padding: 5},
  student: {marginBottom: 30},
  title: {fontSize: 30, textAlign: 'center'},
  input: {backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  name: {fontSize: 20, color: '#255163', fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonStyle: {
    backgroundColor: 'yellow',
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});
