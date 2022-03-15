import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  getMoviesPopular,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
} from '../services/services';

import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularmovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  //data fetching//
  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getMoviesPopular(),
      getPopularTv(),
      getFamilyMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMoviesImages(moviesImagesArray);
          setPopularmovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.slideContainer}>
              <SliderBox
                images={moviesImages}
                dotStyle={styles.styleDot}
                sliderBoxHeight={dimensions.height / 1.8}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}
          {/* Popular Movies */}
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title="Popular Movies"
              content={popularMovies}></List>
          </View>
          {/* Popular Tv */}
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title="Popular Tv"
              content={popularTv}></List>
          </View>
          {/* Family Movies */}
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title="Family Movies"
              content={familyMovies}></List>
          </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
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
