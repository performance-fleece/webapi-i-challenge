// implement your API here
const express = require('express');
const Users = require('./data/db.js');
const server = express();

server.use(express.json());

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

server.delete('/api/users/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(deleted => {
      if (deleted > 0) {
        res.status(200).json({ message: 'User Deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: 'The user could not be removed' });
    });
});

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          errorMessage: ' The user witht he specified ID does not exist'
        });
      }
    })
    .catch(err => {
      req.status(500).json({
        errorMessage: 'The user information could not be retrieved.'
      });
    });
});

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
            message: 'The user with the specified ID does not exist.'
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The user information could not be modified.'
        });
      });
  }
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
