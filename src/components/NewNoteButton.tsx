import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native-paper';
import {ScreenNavigationStackProp} from '../types/types';

// New Note button for navigation bar
export const NewNoteButton: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationStackProp>();

  return (
    <Button
      mode="text"
      onPress={() => navigation.navigate('EditNote', {noteId: undefined})}>
      New Note
    </Button>
  );
};
