import React, {useState, useEffect} from 'react';
import StarRating from 'react-native-star-rating';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import {getMovies} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';
const height = Dimensions.get('screen').height;
const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieData, setMovieData] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovies(movieId).then(movieData => {
      setMovieData(movieData);
      setLoaded(true);
    });
  });

  const videoVisibleHandler = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + movieData.poster_path,
              }}
            />

            <View style={styles.container}>
              <View style={styles.PlayButton}>
                <PlayButton onHandPress={videoVisibleHandler} />
              </View>
              <Text style={styles.movieTitle}> {movieData.title}</Text>
              {movieData.genres && (
                <View style={styles.genresContainer}>
                  {movieData.genres.map(genre => {
                    return (
                      <Text style={styles.genresText} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={30}
                rating={movieData.vote_average / 2}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{movieData.overview}</Text>
              <Text style={styles.releaseDate}>
                {'Release Date:' +
                  dateFormat(movieData.release_date, 'mmm,dS,yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <VideoPlayer
                onBack={() => {
                  videoVisibleHandler();
                }}
                navigator={navigation}
                source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
              />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
  },
  movieTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genresText: {
    marginRight: 10,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold',
    color: 'black',
  },
  PlayButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});

export default Detail;
