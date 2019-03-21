import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux'
import { furryActionCreator } from "../actions/actionTypes"
import { Image } from 'react-native-elements'


const mapState = state => {
  return  { furry: state.current }
}

class SearchScreen extends React.Component {
    updateLists(dispatch) {
      dispatch(furryActionCreator.moveNext());
      //update the list of furries that have been marked as saved so that the
      //"saved" view will update
      dispatch(furryActionCreator.updateSaved());
    }

    render() {
      let { furry } = this.props;
      const { dispatch, navigation } = this.props;

      //only show buttons on the main search screen. somewhat "hacky" way of re-using the same screen for the list view.
      //todo: refactor into component
      let buttons =  <View style={{flexDirection:"row"}}>
                        <Button title="Yes please!!" onPress={(e)=> {
                            furry.save = true;
                            this.updateLists(dispatch);
                        }}/>
                        <Button title="No thanks" onPress={(e)=> {
                            furry.save = false;
                            this.updateLists(dispatch);
                        }}/>
                    </View>;

      const furryFromParams = navigation.getParam('furry', null);
      //if this was loaded from a navigation event
      //hide the buttons and get the pet from the params.
      if(furryFromParams) {
        furry = furryFromParams;
        buttons = null;
      }
      //must be waiting for web call to complete
      if(!furry)
          return (<ActivityIndicator size="large" color="#0000ff" />)
      
      return (
        <View style={styles.container}>
            <Image source={{ cache:'force-cache', uri: furry.img }} style={{ width: 300, height:300}} />
            <View>
                <Text style={styles.textContainer}>{furry.name}, {furry.age}yr, {furry.sex} {furry.save ? "Saved": ""}</Text>
                { buttons }
                <Text style={styles.profileContainer}>{furry.profile}</Text>
            </View>
        </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    padding:3, paddingTop:50,  justifyContent:"flex-start"
  },
  textContainer: { paddingTop:3, fontSize:20, fontWeight: 'bold' },
  profileContainer: { }
}
);

export default connect(mapState)(SearchScreen)

