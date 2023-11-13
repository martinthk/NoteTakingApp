import React from 'react';
import {NoteInput} from '../components/NoteInput';
import {useRoute} from '@react-navigation/native';
import {EditScreenRouteProp} from '../types/types';

export const NewNoteScreen: React.FC = () => {
  // const route = useRoute<EditScreenRouteProp>();
  // const noteId = route.params.noteId;
  return <NoteInput />;
};
