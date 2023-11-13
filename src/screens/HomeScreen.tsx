import React from 'react';
import {View} from 'react-native';
import {NotesList} from '../components/NotesList';

type Props = {};

export const HomeScreen: React.FC<Props> = ({}) => {
  return (
    <View style={{marginHorizontal: 8, marginTop: 12, paddingBottom: 40}}>
      <NotesList />
    </View>
  );
};
