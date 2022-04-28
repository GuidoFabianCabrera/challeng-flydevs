import * as React from 'react';
import Link from 'next/link';

import { makeStyles } from '@mui/styles';
import { addMovie, removeMovie } from '../store/movie';
import { useDispatch } from 'react-redux';

import like from '../public/images/Like.png';
import likeGray from '../public/images/LikeGray.png';
import star from '../public/images/StarIcon.png';
import starGray from '../public/images/StarIconGray.png';

const useStyles = makeStyles((theme) => ({
  card: (props) => ({
    border: '1px solid #2B2B3A',
    background:
      'radial-gradient(73.32% 73.32% at 23.55% 26.12%, rgba(64, 64, 86, 0.546214) 0%, rgba(34, 34, 50, 0.55) 100%)',
    boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '100%',
    zIndex: '10',
    position: 'relative',
    cursor: 'pointer',
    [theme.breakpoints.up(`${props.showFullCard}`)]: {
      display: 'flex',
    },
  }),
  cardImageContent: (props) => ({
    position: 'relative',
    border: '1px solid #2B2B3A',
    borderRadius: '8px',
    borderBottom: 'none',
    height: 'fit-content',
    [theme.breakpoints.up(`${props.showFullCard}`)]: {
      flex: '2 1 0%',
      maxWidth: '200px',
    },
  }),
  cardImage: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  cardImageBackground: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '10px',
    background:
      'linear-gradient(180deg, rgba(25, 25, 38, 0.0001) 42.31%, #191926 87.5%)',
    '& > *': {
      position: 'absolute',
    },
  },
  cardAge: {
    top: '0',
    left: '0',
    padding: '5px',
    margin: '10px',
    background: '#191926',
    opacity: '0.9',
    fontSize: '14px',
    fontWeight: '800',
    borderRadius: '8px',
    color: 'white',
  },
  cardFavourite: {
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: '100',
    padding: '10px',
    '& > img': {
      display: 'block',
      margin: '5px',
      width: '20px',
    },
  },
  cardInfo: {
    margin: '5px 10px',
    bottom: '0',
    left: '0',
  },
  cardCategories: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '100',
    color: '#FF3466',
    textTransform: 'capitalize',
  },
  cardReview: {},
  cardStars: {
    width: '10px',
    marginRight: '4px',
    [theme.breakpoints.up('sm')]: {
      width: '12px',
    },
  },
  cardReviewNumber: {
    color: '#6D6D80',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  cardContent: (props) => ({
    padding: '8px',
    fontWeight: '800',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up(`${props.showFullCard}`)]: {
      flex: ' 3 1 0%',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  cardTitle: (props) => ({
    color: '#ECECEC',
    // fontSize: '16px',
    fontSize: `${props.showFullInformation ? '16px' : '14px'}`,
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  }),
  cardTime: {
    fontSize: '12px',
    color: '#565665',
    textTransform: 'uppercase',
  },
  cardDescription: (props) => ({
    display: 'none',
    margin: '10px 0',
    fontSize: '14px',
    fontWeight: '300',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up(`${props.showFullCard}`)]: {
      display: 'block',
    },
  }),
  cardButton: (props) => ({
    textAlign: 'center',
    padding: '5px 10px',
    display: 'none',
    marginTop: 'auto',
    fontSize: '14px',
    fontWeight: '300',
    textTransform: 'uppercase',
    background: 'linear-gradient(149.18deg, #8036E7 -24.9%, #FF3365 89.41%)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    [theme.breakpoints.up(`${props.showFullCard}`)]: {
      display: 'block',
    },
  }),
}));

export default function MovieCard({
  data,
  _id,
  showFullCard,
  showFullInformation = true,
}) {
  const classes = useStyles({ showFullCard, showFullInformation });
  const dispatch = useDispatch();

  const handleClick = () => {
    if (data.like) {
      dispatch(removeMovie(data._id));
    } else {
      dispatch(addMovie(data._id));
    }
  };

  return (
    <div className={classes.card}>
      <div className={classes.cardImageContent}>
        <Link href={`/movies/${data._id ? data._id : _id}`}>
          <div className={classes.cardImageBackground}>
            {showFullInformation && (
              <span className={classes.cardAge}>{data.age}+</span>
            )}

            <div className={classes.cardInfo}>
              {showFullInformation && (
                <span className={classes.cardCategories}>
                  {data.genre.join(', ')}
                </span>
              )}
              {showFullInformation && (
                <span className={classes.cardReview}>
                  {[...Array(Number(data.stars))].map((item, index) => (
                    <img
                      className={classes.cardStars}
                      src={star.src}
                      key={index}
                    />
                  ))}
                  {[...Array(5 - Number(data.stars))].map((item, index) => (
                    <img
                      className={classes.cardStars}
                      src={starGray.src}
                      key={index}
                    />
                  ))}
                  <strong className={classes.cardReviewNumber}>
                    {data.reviewsCount} reviws
                  </strong>
                </span>
              )}
            </div>
          </div>
        </Link>
        {showFullInformation && (
          <div onClick={handleClick} className={classes.cardFavourite}>
            {!data.like && <img src={likeGray.src} />}
            {data.like && <img src={like.src} />}
          </div>
        )}
        <img src={data.imageUrl} className={classes.cardImage} />
      </div>

      <Link href={`/movies/${data._id}`}>
        <div className={classes.cardContent}>
          <div className={classes.cardTitle}>{data.title}</div>
          {showFullInformation && (
            <div className={classes.cardTime}>{data.duration} min</div>
          )}
          <div className={classes.cardDescription}>{data.description}</div>
          <div className={classes.cardButton}>Book your ticket</div>
        </div>
      </Link>
    </div>
  );
}
