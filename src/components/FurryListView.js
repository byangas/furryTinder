
import React from 'react';
import {  View, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { FurryListViewDetail } from './FurryListViewDetail';

const mapState = (state) => {
    return { saved: state.saved }
}

class FurryListView extends React.Component {
  render() {
    const { saved } = this.props;
    return (
    <View>
        <FlatList style={{paddingTop:50}}
            data={saved} 
            renderItem={({item}) => <TouchableOpacity onPress={() =>  {
                this.props.navigation.navigate('Details', { furry:item })}
            }>
                <FurryListViewDetail furry={item} />
            </TouchableOpacity> }
            keyExtractor={(item) => item.id.toString()}            
        />
    </View>
    );
  }
}

export default connect(mapState)(FurryListView)
