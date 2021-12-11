import React from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {PropTypes} from 'prop-types';
const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
  navigation: PropTypes.object,
};
import Card from './Card';
class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;

    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item}></Card>
            )}></FlatList>
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
List.propTypes = propTypes;

export default List;
