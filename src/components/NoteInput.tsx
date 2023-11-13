import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {getNote, removeItem, saveNote} from '../services/NoteStorageService';
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

export const NoteInput: React.FC<Props> = ({
  // saveNote,
  noteId,
}) => {
  const [clients, setClients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [noteText, setNoteText] = useState<string>('');

  const theme = useTheme();
  const navigation = useNavigation<ScreenNavigationStackProp>();

  const saveNoteHandler = () => {
    saveNote(noteId, client, category, noteText);
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
        setCategory(result?.category ?? '');
        setNoteText(result?.noteText ?? '');
        console.log(client, category);
      });
    }
  }, [category, client, noteId]);

  return (
    <View style={{marginHorizontal: 8, marginTop: 12}}>
      {/* Client drop down menu */}

      {noteId ? (
        <Text variant="labelSmall" style={{paddingBottom: 4}}>
          Original Client: {client}
        </Text>
      ) : null}

      <SelectList
        setSelected={setClient}
        data={clients}
        save="value"
        placeholder="Client"
        search={false}
        boxStyles={{borderRadius: 10, borderColor: '#868e96'}}
        dropdownStyles={{borderRadius: 10, borderColor: '#adb5bd'}}
      />
      <Gap />

      {/* Category drop down menu*/}
      {noteId ? (
        <Text variant="labelSmall" style={{paddingBottom: 4}}>
          Original Category: {category}
        </Text>
      ) : null}

      <SelectList
        setSelected={setCategory}
        data={categories}
        save="value"
        placeholder="Category"
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
      <Button
        mode="contained"
        onPress={() => {
          saveNoteHandler();
          navigation.navigate('Home');
        }}>
        Save Note
      </Button>

      <Gap />
      {/* Delete button */}
      {noteId ? (
        <Button
          buttonColor={theme.colors.error}
          textColor="white"
          onPress={() => removeItem()}>
          Delete Note
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: '#868e96',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
