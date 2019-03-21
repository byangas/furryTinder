import React from 'react';
import { Text, View, TextInput, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ButtonGroup } from 'react-native-elements';
import { furryActionCreator } from "../actions/actionTypes"
import { red } from 'ansi-colors';

const mapState = state => {
  return  { settings: state.settings }
}

class SettingsScreen extends React.Component {
  buttons = ["cat", "dog"];

  constructor() {
    super()
    this.state = {
      selectedIndex:-1,
      error:""
    }
  }

  componentWillMount() {
    this.setState( {
      max:this.props.settings.ageRange.max.toString(),
     min:this.props.settings.ageRange.min.toString() 
    })
  }

  isNumber(n) {
      return !isNaN(parseInt(n)) && isFinite(n);
  }
  
  onMinChanged = (text) => {

    this.setState({min:text, error:""})

    if(!this.isNumber(text)) {
      this.setState({error:"Min age must be a positive number"})
      return;
    }
    const { settings } = this.props;
    const min = parseInt(text)
    if(min >= settings.ageRange.max) {
      this.setState({error:"Min age must less than Max age"})
      return;
    }

    if(min < 0 ) {
      this.setState({error:"age must greater than zero"})
      return;
    }

    //if we got this far, we are good to update settings
    settings.ageRange.min = min;
    this.updateSettings(settings);
  }

  onMaxChanged = (text) => {

    this.setState({max:text, error:""})

    if(!this.isNumber(text)) {
      this.setState({error:"Max age must be a positive number"})
      return;
    }
    const { settings } = this.props;

    const max = parseInt(text)
    if(max <= settings.ageRange.min) {
      this.setState({error:"Max age must greater than Min age"})
      return;
    }

    if(max < 0 ) {
      this.setState({error:"age must greater than zero"})
      return;
    }

    if(max > 20 ) {
      this.setState({error:"Are you sure you want a pet that is over 20 years old?"})
    }
    //if we got this far, we are good to update settings
    settings.ageRange.max = max;
    this.updateSettings(settings);
  }
 
  updateSettings = (settings) => {
    this.props.dispatch(furryActionCreator.updateSettings(settings));
    this.props.dispatch(furryActionCreator.applyFilter());
    this.props.dispatch(furryActionCreator.moveNext());
  }


  render() {
    const { typePreference, profile  } = this.props.settings;
    const selectedIndex = this.state.selectedIndex < 0 ? this.buttons.indexOf(typePreference): this.state.selectedIndex;


    return (<View style={{ padding:10, paddingTop:50 }}>
      <Text style={styles.header}>Adopter Profile</Text>
      <Text>{profile}</Text>
      <Text style={styles.header}>Prefers</Text>
      <ButtonGroup
      onPress={(index) => {
        this.props.settings.typePreference = this.buttons[index];
        //forcing a rerender
        this.setState({ selectedIndex:index })
        this.updateSettings(this.props.settings);
      }}
      selectedIndex={selectedIndex}
      buttons={this.buttons}
      containerStyle={{height: 30}} />
      <View style={styles.ageContainer}>
        <Text style={{fontWeight:'bold', fontSize:20}}>Age</Text>
        <View style={styles.textBorder}>
          <TextInput onChangeText={this.onMinChanged} style={ styles.ageInput} value={this.state.min}/>
        </View>
        <View style={styles.textBorder}>
          <TextInput onChangeText={this.onMaxChanged} style={ styles.ageInput} value={this.state.max}/>
        </View>
      </View>
      <Text style={styles.error}>{this.state.error}</Text>
 
    </View>);
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop:20,
    color:'red',
    fontSize:20,
    fontWeight:'bold'
  },

  header: {
     fontWeight:'bold', fontSize:20, marginTop:30, marginBottom:10 
  },
  ageContainer: {
    flexDirection:"row",
    marginTop:20
  },
  ageInput: {
    width:50, marginLeft:30
  },
  textBorder: {
    marginLeft:10,
    backgroundColor: '#EEEEEE',
    borderColor: 'black',
    borderRadius:3,
    borderWidth: 1 
  }
})

export default connect(mapState)(SettingsScreen)
