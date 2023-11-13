import React from 'react';
import {View} from 'react-native';
import {NotesList} from '../components/NotesList';

export const HomeScreen: React.FC = () => {
  return (
    <View style={{marginHorizontal: 8, marginTop: 12, paddingBottom: 40}}>
      <NotesList />
    </View>
  );
};
