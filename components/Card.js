import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {PropTypes} from 'prop-types';

const propTypes = {
  item: PropTypes.object,
};
class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {movieId: item.id})}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
});
Card.propTypes = propTypes;

export default Card;
