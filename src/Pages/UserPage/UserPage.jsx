import React, { useState, useCallback } from 'react';

import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

import withHocs from '../../HOC/UserPageHoc';

const ProfilePage = ({ addSecret, data, removeSecret }) => {
  const [checked, setChecked] = useState([]);
  const [inputData, setInputData] = useState({ key: '', secret: '' });
  
  const handleToggle = useCallback(value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  },  [checked]);

  const handleAdd = useCallback(() => {
    const { key, secret } = inputData;
    const { id: userId } = data.user;

    addSecret({ secretType: key, secret, userId });
    setInputData({ key: '', secret: '' });
  }, [inputData, data.user]);

  const handleRemove = useCallback((secretId) => {
    removeSecret({ secretId });
  }, []);

  const handleChangeValue = useCallback((event) => {
    const { value, name } = event.target;

    setInputData(currentInputData => ({
      ...currentInputData,
      [name]: value
    }))
  }, []);

  const showText = useCallback((string, hide) => hide ? string : '*'.repeat(string.length), []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{data?.user?.name}</Typography>
        <div>
          <TextField
            placeholder="Add key"
            name="key"
            value={inputData.key}
            onChange={handleChangeValue}
          />
        </div>
        <div>
          <TextField
            placeholder="Add secret"
            name="secret"
            value={inputData.secret}
            onChange={handleChangeValue}
          />
        </div>
        <div>
          <Button onClick={handleAdd}>Add secret</Button>
        </div>
      </CardContent>

      <List style={{ width: '600px' }} subheader={<ListSubheader>Secrets</ListSubheader>}>
        {
          data?.user?.secrets?.map(
            ({ id, secret, secretType }) => (
              <ListItem key={id}>
                <ListItemText>{secretType}:</ListItemText>
                <ListItemText style={{ textAlign: 'right', paddingRight: '50px' }}>
                  {showText(secret, ~checked.indexOf(id))}
                </ListItemText>
                <div style={{ marginRight: '40px' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemove(id)}
                  >Remove</Button>
                </div>
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle(id)}
                    checked={Boolean(~checked.indexOf(id))}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          )
        }
      </List>
    </Card>
  );
};

export default withHocs(ProfilePage);
