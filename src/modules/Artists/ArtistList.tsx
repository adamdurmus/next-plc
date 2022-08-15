import React, { useEffect, useRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getArtistsAsync, selectArtistList } from './artistListReducer';
import SearchAppBar from '../SearchAppBar';
import { Song } from './types';
import { Container } from '../../components/Container';

export default function ArtistList() {
  const dispatch = useAppDispatch();
  const artistList = useAppSelector(selectArtistList);
  const [dataLimit, setDataLimit] = useState<number>(10)
  const [searchField, setSearchField] = useState<string>('all')
  const messagesEndRef = useRef(null)

  const setSearchValue=(val:string)=>{
    setSearchField(val);
    setDataLimit(10);
  }

  useEffect(() => {
    dispatch(getArtistsAsync({ dataLimit, term: searchField }))
  }, [])
  useEffect(() => {
    const scrollFun = () => {
      const windowHeight = window.innerHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        setDataLimit((prev) => prev + 10)
      }
    }
    window.addEventListener("scroll", scrollFun);
    return () => {
      window.removeEventListener("scroll", scrollFun);
    };
  }, [])
  useEffect(() => {
    if (searchField.length < 2) {
      return;
    }
    dispatch(getArtistsAsync({ dataLimit, term: searchField }))
  }, [dataLimit, searchField])
  return (
    <>
      <SearchAppBar setSearchField={setSearchValue} />
      <Container>
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }} ref={messagesEndRef} >
          {(artistList && artistList.results.length > 0) ? artistList.results.map((song: Song, index: number) => {
            return (
              <>
                <ListItem key={index} alignItems="flex-start" style={{ height: 150 }}>
                  <ListItemAvatar>
                    <Avatar alt={song.artistName} src={song.artworkUrl60} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={song.artistName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {song.collectionName}
                        </Typography>
                        {" - " + song.trackName}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )
          }) : <span>no result</span>
          }
        </List>
      </Container>
    </>
  );
}
