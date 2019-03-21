import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import SettingsScreen  from './components/SettingsScreen';
import FurryListView  from './components/FurryListView';
import SearchScreen from './components/SearchScreen';

//data layer stuff
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { FurryReducer } from './reducers/FurryReducer';
import  LoadWrapper  from './components/LoadWrapper';

const store = createStore(FurryReducer);

const SavedFurryListStack = createStackNavigator({
  SavedList: FurryListView,
  Details: SearchScreen
}, { mode:'modal'});

const TabNavigator = createBottomTabNavigator({
  Search: SearchScreen,
  Saved: SavedFurryListStack,
  Settings: SettingsScreen,
});

const AppContainer = createAppContainer(TabNavigator);


export default class MainApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LoadWrapper bob={store}>
          <AppContainer/>
        </LoadWrapper>
      </Provider>
    );
  }
}

