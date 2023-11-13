import React, {useLayoutEffect} from 'react';
import {NoteInput} from '../components/NoteInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EditScreenRouteProp, ScreenNavigationStackProp} from '../types/types';

export const EditNoteScreen: React.FC = () => {
  const route = useRoute<EditScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationStackProp>();
  const noteId = route.params.noteId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: noteId ? 'Edit Note' : 'New Note',
    });
  }, [navigation, noteId]);

  return <NoteInput noteId={noteId} />;
};
