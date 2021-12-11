import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class PlayButton extends React.PureComponent {
  render() {
    const {onHandPress} = this.props;
    return (
      <Pressable onPress={() => onHandPress()} style={styles.button}>
        <Icon name="caret-forward-outline" size={30} color={'white'} />
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FC',
  },
});

export default PlayButton;
