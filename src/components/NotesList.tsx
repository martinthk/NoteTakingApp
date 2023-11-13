import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Divider, Chip} from 'react-native-paper';
import {Note, getAllNotes} from '../services/NoteStorageService';
import {ScreenNavigationStackProp} from '../types/types';

export const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const navigation = useNavigation<ScreenNavigationStackProp>();

  //  Refresh the list every time the screen is focused
  useFocusEffect(() => {
    getAllNotes().then(result => setNotes(result.notes));
  });

  return (
    <FlatList
      data={notes}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditNote', {
              noteId: item.id,
            });
          }}>
          <View style={styles.noteContainer}>
            <View style={styles.textContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}>
                {item.client.length !== 0 ? (
                  <Text variant="titleMedium" style={{marginEnd: 12}}>
                    {item.client}
                  </Text>
                ) : null}

                {item.category.length !== 0 ? (
                  <Chip mode="flat">{item.category}</Chip>
                ) : null}
              </View>
              {item.noteText.length !== 0 ? (
                <Text variant="bodyMedium" numberOfLines={3}>
                  {item.noteText}
                </Text>
              ) : null}

              {/* Default text for blank note */}
              {item.client.length === 0 &&
              item.category.length === 0 &&
              item.noteText.length === 0 ? (
                <Text>(Blank note)</Text>
              ) : null}
            </View>

            <Divider />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  textContainer: {
    paddingBottom: 8,
  },
});
