// implement your API here
const express = require('express');
const Users = require('./data/db.js');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

//FETCH ALL USERS

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      req.status(500).json({
        errorMessage: 'The users information could not be retrieved.'
      });
    });
});

// ADD USER

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            'There was an error while saving the user to the database'
        });
      });
  }
});

// DELETE ALL USERS

server.delete('/api/users/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(deleted => {
      if (deleted > 0) {
        res.status(200).json({ message: 'User Deleted' });
      } else {
        res.status(404).json({ errorMessage: 'The user could not be removed' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The user with the specified ID does not exist.' });
    });
});

//GET SPECIFIC USER

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user[0].id == req.params.id) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          errorMessage: 'The user information could not be retrieved.'
        });
      }
    })
    .catch(err => {
      req.status(500).json({
        errorMessage: 'The user with the specified ID does not exist'
      });
    });
});

// UPDATE USER

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(404)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    Users.update(id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            errorMessage: 'The user information could not be modified.'
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'The user with the specified ID does not exist.'
        });
      });
  }
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
