import { React, useEffect, useState, useMemo } from 'react';
import Router from 'next/router';
import axios from 'axios';

import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Search from '../components/Search';
import MovieCard from '../components/MovieCard';
import { useSelector } from 'react-redux';

import like from '../public/images/Like.png';

const useStyles = makeStyles((theme) => ({
  homeFavorite: {
    border: '1px solid #FF3869',
    borderRadius: '15px',
    height: 'fit-content',
    textAlign: 'center',
    marginTop: '3px',
    padding: '10px 10px',
    '& > img': {
      display: 'block',
      margin: '0 auto',
    },
  },
  homeCard: {
    [theme.breakpoints.up('md')]: {
      '& > div  > div:first-child': {
        height: '100%',
      },
    },
  },
}));

export default function Index() {
  const classes = useStyles();
  const favoriteMovies = useSelector((state) => state.movie.movies);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

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
      return {
        ...item,
        like: favoriteMovies.includes(item._id),
      };
    });
  }, [data, favoriteMovies]);

  const clone = useMemo(() => {
    let cloneItems = moviesMap.filter((item) => {
      if (item.title.toLowerCase().includes(value.toString().toLowerCase()))
        return item;
    });
    return cloneItems;
  }, [data, value, favoriteMovies]);

  return (
    <Container>
      <Grid container paddingY={4} justifyContent="center">
        <Grid item xs={10} md={5} paddingBottom={4}>
          <Search data={data} setValue={setValue} />
        </Grid>
        <Grid
          item
          xs={2}
          md={1}
          className={classes.homeFavorite}
          onClick={() => Router.push('/favorites')}>
          <img src={like.src} />
        </Grid>
        <Grid container paddingY={2} spacing={2}>
          {moviesMap.length == 0 && (
            <Box sx={{ display: 'flex', margin: '0 auto' }}>
              <CircularProgress />
            </Box>
          )}
          {clone.map((item, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={6}
              key={item._id}
              className={classes.homeCard}>
              <MovieCard data={item} showFullCard="md" />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
