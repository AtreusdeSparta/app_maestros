import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createStudent, deleteStudent} from '../src/graphql/mutations';
import {listStudents} from '../src/graphql/queries';
import {Student} from '../src/models';
import {CreateStudentInput} from '../src/API';
import {Button} from 'react-native-paper';

const initialState = {
  Name: '',
  LastName: '',
  MaternalName: '',
};

export const StudentScreen = () => {
  const [formState, setFormState] = useState(initialState);
  const [students, setStudents] = useState<CreateStudentInput[]>([]);

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

  function setInput(key: string, value: string) {
    setFormState({...formState, [key]: value});
  }

  async function addStudent() {
    try {
      if (!formState.Name || !formState.LastName || !formState.MaternalName)
        return;
      const student = {...formState};
      setStudents([...students, student]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createStudent, {input: student}));
    } catch (err) {
      console.error(err);
      console.log('error creating student:', err);
    }
  }

  function removeStudent(id: string | null | undefined, version: number) {
    return async () => {
      if (!id) {
        return;
      }
      console.log('INSIDE REMOVE STUDENT', id);
      try {
        await API.graphql(
          graphqlOperation(deleteStudent, {input: {id, _version: version}}),
        ); // Application Programable Interface
      } catch (err) {
        console.error(err);
        console.log('error removing student:', err);
      }
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add a student</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={value => setInput('Name', value)}
          style={styles.input}
          value={formState.Name}
          placeholder="Name"
        />
        <TextInput
          onChangeText={value => setInput('LastName', value)}
          style={styles.input}
          value={formState.LastName}
          placeholder="Last Name"
        />
        <TextInput
          onChangeText={value => setInput('MaternalName', value)}
          style={styles.input}
          value={formState.MaternalName}
          placeholder="Maternal Name"
        />
        <Pressable onPress={addStudent} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create Student</Text>
        </Pressable>
        {students.map((student: CreateStudentInput, index) => (
          <View key={student.id ? student.id : index} style={styles.student}>
            <Text style={styles.name}>
              {student.Name} {student.LastName} {student.MaternalName}
              <Button
                icon="delete"
                mode="contained"
                onPress={removeStudent(student.id, student._version)}>
                Delete
              </Button>
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  student: {marginTop: 30},
  title: {fontSize: 30, textAlign: 'center'},
  input: {backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  name: {fontSize: 20, color: '#255163', fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  smallButton: {
    width: 300,
    height: 300,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});
