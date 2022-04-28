import { React, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { makeStyles } from '@mui/styles';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) => ({
  searchborder: {
    '& > div > fieldset': {
      border: '1px solid #C7C7E7',
      borderRadius: '25px',
    },
  },
}));

export default function Asynchronous({ data, setValue }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      size="small"
      width={'100%'}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      onChange={(event, newValue) => {
        setValue(newValue ? newValue.title : '');
      }}
      freeSolo
      disableClearable
      renderInput={(params) => (
        <TextField
          className={classes.searchborder}
          {...params}
          onChange={(event) => setValue(event.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
            onKeyDown: (e) => {
              if (e.key === 'Enter') {
                e.stopPropagation();
              }
            },
          }}
        />
      )}
    />
  );
}
