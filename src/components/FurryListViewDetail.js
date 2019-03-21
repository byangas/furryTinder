import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements'

export class FurryListViewDetail extends React.Component {
    render() {
        const { furry } = this.props;

        return (<View style={styles.container}>
            <Image source={{ cache:'force-cache', uri: furry.img }} style={{ width: 100, height: 100 }} />
            <View>
                <Text style={styles.textContainer}>{furry.name}, {furry.age}yr, {furry.sex}</Text>
                <Text style={styles.profileContainer}>{furry.profile}</Text>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
      flex:2, padding:3, flexDirection:"row", justifyContent:"flex-start"
    },
    textContainer: { paddingTop:3, fontSize:20, fontWeight: 'bold' },
    profileContainer: { height:50 }
  }
);
