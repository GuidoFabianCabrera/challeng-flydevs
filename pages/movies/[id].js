import { React, useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@mui/styles';
import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { addMovie, removeMovie } from '../../store/movie';

import arrow from '../../public/images/Arrow.png';
import likeGray from '../../public/images/LikeGray.png';
import like from '../../public/images/Like.png';
import play from '../../public/images/Play.png';
import star from '../../public/images/StarIcon.png';
import starGray from '../../public/images/StarIconGray.png';

const useStyles = makeStyles((theme) => ({
  Details: {
    position: 'relative',
    background:
      'linear-gradient(180deg, rgba(25, 25, 38, 0.0001) 50%, #191926 92.15%)',
    // [theme.breakpoints.up('md')]: {
    //   background: 'none',
    // },
  },
  DetailsBackground: {
    position: 'absolute',
    zIndex: -1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  DetailsBackgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(1)',
  },
  DetailsMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#909096',
    height: 'fit-content',
  },
  DetailsBack: {
    cursor: 'pointer',
  },
  DetailsBackButton: {
    padding: '10px 10px 10px 0',
    verticalAlign: 'middle',
  },
  DetailsPlay: {
    display: 'flex',
    justifyContent: 'center',
  },
  DetailsPlayImage: {
    height: 'fit-content',
  },
  DetailsContent: {
    position: 'relative',
    zIndex: '1',
  },
  DetailsAge: {
    fontSize: '16px',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
  DetailsTitle: {
    color: '#ECECEC',
    fontSize: '40px',
    lineHeight: '1',
    fontWeight: '800',
    [theme.breakpoints.up('md')]: {
      fontSize: '60px',
    },
  },
  DetailsGenre: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '100',
    color: '#FF3466',
    textTransform: 'capitalize',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
  },
  DetailsReview: {},
  DetailsStars: {
    width: '10px',
    marginRight: '4px',
    [theme.breakpoints.up('sm')]: {
      width: '12px',
    },
    [theme.breakpoints.up('md')]: {
      width: '15px',
    },
  },
  DetailsReviewNumber: {
    color: '#6D6D80',
    fontSize: '12px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
  },
  DetailsSubtitle: {
    color: '#ECECEC',
    fontSize: '18px',
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
    },
  },
  DetailsDescription: {
    color: '#C6C6C9',
    fontSize: '15px',
    fontWeight: '300',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
  },
  DetailsCast: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
    '& :last-child': {
      color: '#6D6D80',
    },
  },
  DetailsListCastCard: {
    display: 'flex',
    overflow: 'auto',
    gap: '15px',
    paddingBottom: '20px',
    [theme.breakpoints.up('md')]: {
      gap: '20px',
    },

    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5',
    },
    '&::-webkit-scrollbar': {
      width: '12px',
      backgroundColor: '#191926',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: '#555',
    },
  },
  DetailsCastCard: {
    cursor: 'pointer',
    '& > img': {
      width: '80px',
      height: '120px',
      objectFit: 'cover',
      objectPosition: 'top',
      borderRadius: '10px',
      [theme.breakpoints.up('md')]: {
        width: '100px',
      },
    },
    '& > div': {
      fontSize: '14px',
      color: '#D8D8D8',
      width: '80px',
      [theme.breakpoints.up('md')]: {
        fontSize: '18px',
        width: '110px',
      },
    },
  },
}));

export default function MovieDetails() {
  const classes = useStyles();
  const router = useRouter();
  const favoriteMovies = useSelector((state) => state.movie.movies);
  const [data, setData] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchMovieById = async () => {
      await axios
        .get(`https://challeng-movies-api.herokuapp.com/movie/${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMovieById();
  }, [id]);

  const moviesMap = useMemo(() => {
    if (!data) {
      return;
    }
    return { ...data, like: favoriteMovies.includes(data._id) };
  }, [data, favoriteMovies]);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (moviesMap.like) {
      dispatch(removeMovie(moviesMap._id));
    } else {
      dispatch(addMovie(moviesMap._id));
    }
  };

  return (
    <>
      {!moviesMap && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {moviesMap && (
        <>
          <Container className={classes.Details}>
            <Grid container paddingY={4} height={'300px'}>
              <Grid item className={classes.DetailsBackground}>
                <img
                  src={moviesMap.videoUrl}
                  className={classes.DetailsBackgroundImage}
                />
              </Grid>
              <Grid item xs={12} className={classes.DetailsMenu}>
                <span
                  onClick={() => Router.push('/')}
                  className={classes.DetailsBack}>
                  <img className={classes.DetailsBackButton} src={arrow.src} />
                  Back
                </span>
                <span onClick={handleClick} className={classes.cardFavourite}>
                  {!moviesMap.like && <img src={likeGray.src} />}
                  {moviesMap.like && <img src={like.src} />}
                </span>
              </Grid>

              <Grid item xs={12} className={classes.DetailsPlay}>
                <img src={play.src} className={classes.DetailsPlayImage} />
              </Grid>
            </Grid>
          </Container>
          <Container className={classes.DetailsContent}>
            <Grid container marginTop={-6} spacing={1}>
              <Grid item xs={12}>
                <div className={classes.DetailsAge}>{moviesMap.age}+</div>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.DetailsTitle}>{moviesMap.title}</div>
              </Grid>
              <Grid item xs={12}>
                <small className={classes.DetailsGenre}>
                  {moviesMap.genre.join(', ')}
                </small>
              </Grid>
              <Grid item xs={12} paddingBottom={2}>
                <span className={classes.DetailsReview}>
                  {[...Array(Number(moviesMap.stars))].map((item, index) => (
                    <img
                      className={classes.DetailsStars}
                      src={star.src}
                      key={index}
                    />
                  ))}
                  {[...Array(5 - Number(moviesMap.stars))].map(
                    (item, index) => (
                      <img
                        className={classes.DetailsStars}
                        src={starGray.src}
                        key={index}
                      />
                    )
                  )}
                  <strong className={classes.DetailsReviewNumber}>
                    {Number(moviesMap.reviewsCount)} reviws
                  </strong>
                </span>
              </Grid>
              <Grid item xs={12} paddingBottom={2}>
                <strong className={classes.DetailsSubtitle}>Storyline</strong>
                <div className={classes.DetailsDescription}>
                  {moviesMap.description}
                </div>
              </Grid>
              <Grid item xs={12} className={classes.DetailsCast}>
                <span>Cast</span>
                <span>See All</span>
              </Grid>
              <Grid item xs={12} className={classes.DetailsListCastCard}>
                {moviesMap.casts.map((item, index) => (
                  <div
                    key={index}
                    className={classes.DetailsCastCard}
                    onClick={() => Router.push(`/actors/${item.url}`)}>
                    <img src={item.photoUrl} />
                    <div>{item.name}</div>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
