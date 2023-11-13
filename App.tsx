import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {EditNoteScreen} from './src/screens/EditNoteScreen';
import {NewNoteButton} from './src/components/NewNoteButton';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          contentStyle: {
            backgroundColor: '#f8f9fa',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'All Notes',
            headerRight: () => <NewNoteButton />,
          }}
        />
        <Stack.Screen
          name="EditNote"
          component={EditNoteScreen}
          options={{headerTitle: 'Edit Note'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
