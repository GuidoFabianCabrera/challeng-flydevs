import { React, useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import MovieCard from '../components/MovieCard';
import arrow from '../public/images/Arrow.png';

const useStyles = makeStyles((theme) => ({
  FavoriteMenu: {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      flex: '1',
    },
  },
  FavoriteBackButton: {
    padding: '10px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  FavoriteTitle: {
    fontSize: '25px',
  },
  FavoriteCard: {
    '& > div  > div:first-child': {
      height: '100%',
    },
  },
}));

export default function Favourites() {
  const classes = useStyles();
  const favoriteMovies = useSelector((state) => state.movie.movies);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://challeng-movies-api.herokuapp.com/movie')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const moviesMap = useMemo(() => {
    return data.map((item) => {
      return { ...item, like: favoriteMovies.includes(item._id) };
    });
  }, [data, favoriteMovies]);

  return (
    <Container>
      <Grid container paddingY={4}>
        <Grid item xs={12} paddingBottom={4} className={classes.FavoriteMenu}>
          <span>
            <img
              className={classes.FavoriteBackButton}
              onClick={() => Router.push('/')}
              src={arrow.src}
            />
          </span>
          <strong className={classes.FavoriteTitle}>Favoutite Movies</strong>
          <span></span>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {moviesMap.length == 0 && (
              <Box sx={{ display: 'flex', margin: '0 auto' }}>
                <CircularProgress />
              </Box>
            )}
            {moviesMap
              .filter((item) => favoriteMovies.includes(item._id))
              .map((item, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={6}
                  className={classes.FavoriteCard}>
                  <MovieCard data={item} showFullCard="xs" />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
