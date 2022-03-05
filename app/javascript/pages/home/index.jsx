import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import withLogin from '@app/hoc/withLogin';
import FAB from '@app/components/fab';
import { loadResources } from '@app/store/resources';
import { setFabState } from '@app/store/fab';
import { loadStats } from '@app/store/stats';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

import ResourcePresenter from './ResourcePresenter';
import Quote from './Quote';
import Stats from './Stats';

function HomePage() {
  const { data: { id } } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(false);

  const onClick = useCallback(() => {
    setBookmarked((prev) => !prev);
  }, []);

  useEffect(() => {
    dispatch(loadResources(id));
    dispatch(loadStats(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setFabState({ type: 'resource' }));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="row space-between">
          <Quote />
          <FormGroup>
            <FormControlLabel
              control={(
                <Switch
                  checked={bookmarked}
                  onChange={onClick}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              )}
              label="Bookmarks"
            />
          </FormGroup>
        </div>
        <Stats />
        <ResourcePresenter bookmarked={bookmarked} />
      </div>
      <FAB type="resource" />
    </>
  );
}

export default withLogin(HomePage);
