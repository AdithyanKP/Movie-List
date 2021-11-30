import React from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import Card from './Card';
class List extends React.PureComponent {
  render() {
    const {title, content} = this.props;

    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => <Card item={item}></Card>}></FlatList>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: 'black',
  },
});

export default List;
