import { React, useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from 'axios';

import { makeStyles } from '@mui/styles';
import { Box, CircularProgress, Container, Grid } from '@mui/material';

import MovieCard from '../../components/MovieCard';
import arrow from '../../public/images/Arrow.png';

const useStyles = makeStyles((theme) => ({
  ActorBio: {
    position: 'relative',
    background:
      'linear-gradient(180deg, rgba(25, 25, 38, 0.0001) 50%, #191926 92.15%)',
  },
  ActorBioBackground: {
    position: 'absolute',
    zIndex: -1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  ActorBioBackgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(1)',
  },
  ActorBioMenu: {
    color: '#909096',
  },
  ActorBioBack: {
    cursor: 'pointer',
  },
  ActorBioBackButton: {
    padding: '10px 10px 10px 0',
    verticalAlign: 'middle',
  },
  ActorBioPlay: {
    display: 'flex',
    justifyContent: 'center',
  },
  ActorBioPlayImage: {
    height: 'fit-content',
  },
  ActorBioTitle: {
    color: '#ECECEC',
    fontSize: '40px',
    lineHeight: '1',
    fontWeight: '800',
    [theme.breakpoints.up('md')]: {
      fontSize: '60px',
    },
  },
  ActorBioGenre: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '100',
    color: '#FF3466',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
  },
  ActorBioSubtitle: {
    color: '#ECECEC',
    fontSize: '18px',
    marginBottom: '15px',
    display: 'inline-block',
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
    },
  },
  ActorBioDescription: {
    color: '#C6C6C9',
    fontSize: '15px',
    fontWeight: '300',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
  ActorBioCast: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
      paddingTop: '30px',
    },
    '& :last-child': {
      color: '#6D6D80',
    },
  },
  ActorBioListCastCard: {
    display: 'flex',
    overflow: 'auto',
    gap: '15px',
    paddingBottom: '30px',

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
  ActorBioCastCard: {
    minWidth: '140px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '190px',
      minWidth: '200px',
    },
  },
  ActorBioPhoto: {
    float: 'left',
    width: '80px',
    marginRight: '20px',
    [theme.breakpoints.up('md')]: {
      width: '100px',
    },
  },
  ActorBioBirthday: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '100',
    textTransform: 'capitalize',
    marginTop: '5px',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
  },
  ActorBioCountry: {
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
}));

export default function ActorBio() {
  const classes = useStyles();
  const router = useRouter();
  const [data, setData] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchActorById = async () => {
      await axios
        .get(`https://challeng-movies-api.herokuapp.com/actor/${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchActorById();
  }, [id]);

  return (
    <>
      {!data && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {data && (
        <>
          <Container className={classes.ActorBio}>
            <Grid container paddingTop={4} height={'400px'}>
              <Grid item className={classes.ActorBioBackground}>
                <img
                  src={data.bannerUrl}
                  className={classes.ActorBioBackgroundImage}
                />
              </Grid>
              <Grid item xs={12} className={classes.ActorBioMenu}>
                <span
                  onClick={() => Router.push('/')}
                  className={classes.ActorBioBack}>
                  <img className={classes.ActorBioBackButton} src={arrow.src} />
                  <span>Back</span>
                </span>
              </Grid>

              <Grid item xs={8} sm={5} md={4}>
                <div className={classes.ActorBioTitle}>{data.name}</div>
              </Grid>
              <Grid item xs={12}>
                <img className={classes.ActorBioPhoto} src={data.photoUrl} />
                <div className={classes.ActorBioBirthday}>{data.birthday}</div>
                <div className={classes.ActorBioCountry}>{data.country}</div>
                <div className={classes.ActorBioGenre}>
                  {data.genre.join(', ')}
                </div>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container>
              <Grid
                item
                xs={12}
                className={classes.ActorBioCast}
                paddingBottom={3}>
                <span>Cast</span>
                <span>See All</span>
              </Grid>
              <Grid
                item
                xs={12}
                marginBottom={5}
                className={classes.ActorBioListCastCard}>
                {data.movies.map((item, index) => (
                  <div key={index} className={classes.ActorBioCastCard}>
                    <MovieCard
                      data={item}
                      _id={item.url}
                      showFullInformation={false}
                    />
                  </div>
                ))}
              </Grid>
              <Grid item xs={12} paddingBottom={10}>
                <strong className={classes.ActorBioSubtitle}>Storyline</strong>
                <div className={classes.ActorBioDescription}>
                  {data.biography}
                </div>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
