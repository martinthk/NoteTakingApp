import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {deleteNote, getNote, saveNote} from '../services/NoteStorageService';
import {SelectList} from 'react-native-dropdown-select-list';
import {Button, Text} from 'react-native-paper';
import data from '../data/data.json';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {ScreenNavigationStackProp} from '../types/types';
type Props = {
  noteId?: string | undefined;
};

const Gap = () => {
  return <View style={{paddingVertical: 8}} />;
};

export const NoteInput: React.FC<Props> = ({noteId}) => {
  const [clients, setClients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [orgClient, setOrgClient] = useState('');
  const [orgCategory, setOrgCategory] = useState('');
  const [noteText, setNoteText] = useState<string>('');

  const theme = useTheme();
  const navigation = useNavigation<ScreenNavigationStackProp>();

  const saveNoteHandler = async () => {
    await saveNote(noteId, client, category, noteText);
    navigation.navigate('Home');
  };

  const deleteNoteHandler = async () => {
    await deleteNote(noteId!);
    navigation.navigate('Home');
  };

  // Fetch client and category data from the JSON file
  useEffect(() => {
    setClients(data.clients);
    setCategories(data.categories);
  }, [categories, clients]);

  // Fetch selected note's data
  useEffect(() => {
    if (noteId) {
      getNote(noteId).then(result => {
        setClient(result?.client ?? '');
        setOrgClient(result?.client ?? '');
        setCategory(result?.category ?? '');
        setOrgCategory(result?.category ?? '');
        setNoteText(result?.noteText ?? '');
      });
    }
  }, [noteId]);

  return (
    <View style={{marginHorizontal: 8, marginTop: 12}}>
      {noteId ? (
        <Text variant="labelSmall" style={{paddingBottom: 4}}>
          Original Client: {orgClient}
        </Text>
      ) : null}

      {/* Client drop down menu */}
      <SelectList
        setSelected={val => setClient(val)}
        data={clients}
        save="value"
        placeholder="Client Options"
        search={false}
        boxStyles={{borderRadius: 10, borderColor: '#868e96'}}
        dropdownStyles={{borderRadius: 10, borderColor: '#adb5bd'}}
      />
      <Gap />

      {noteId ? (
        <Text variant="labelSmall" style={{paddingBottom: 4}}>
          Original Category: {orgCategory}
        </Text>
      ) : null}

      {/* Category drop down menu*/}
      <SelectList
        setSelected={val => setCategory(val)}
        data={categories}
        save="value"
        placeholder="Category Options"
        search={false}
        boxStyles={{borderRadius: 10, borderColor: '#868e96'}}
        dropdownStyles={{borderRadius: 10, borderColor: '#adb5bd'}}
      />

      <Gap />
      {/* Note text box */}
      <TextInput
        placeholder="Note"
        multiline
        style={styles.input}
        value={noteText}
        onChangeText={setNoteText}
      />

      <Gap />
      {/* Save button */}
      <Button mode="contained" onPress={() => saveNoteHandler()}>
        Save Note
      </Button>

      <Gap />
      {/* Delete button */}
      {noteId ? (
        <Button
          buttonColor={theme.colors.error}
          textColor="white"
          onPress={() => deleteNoteHandler()}>
          Delete Note
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: '#868e96',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
