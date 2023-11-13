import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  NewNote: undefined;
  EditNote: {noteId: string | undefined};
};

export type ScreenNavigationStackProp =
  NativeStackNavigationProp<RootStackParamList>;

export type EditScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;
