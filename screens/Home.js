import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {getMoviesPopular, getUpcomingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimensions = Dimensions.get('screen');
const Home = () => {
  const [moviesImages, setMoviesImages] = useState('');
  const [popularMovies, setPopularmovies] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
      })
      .catch(error => {
        setError(error);
      });
    getMoviesPopular()
      .then(movies => {
        setPopularmovies(movies);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <React.Fragment>
      <View style={styles.slideContainer}>
        <SliderBox
          images={moviesImages}
          dotStyle={styles.styleDot}
          sliderBoxHeight={dimensions.height / 1}
          autoplay={true}
          circleLoop={true}
        />
      </View>

      <View style={styles.carousel}>
        <List title="Popular Movies" content={popularMovies}></List>
      </View>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleDot: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
