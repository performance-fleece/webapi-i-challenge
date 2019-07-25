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
      req.status(500).json({ success: false, err });
    });
});

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({ errorMessage: 'Requires name and bio for user' });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'Error saving user to database'
        });
      });
  }
});

server.delete('/api/users/:id', (req, res) => {
  Users.remove(req.params.id).then(deleted => {
    if (deleted > 0) {
      res.status(200).json({ message: 'User Deleted' });
    } else {
      res.status(404).json({ message: 'User does not exist' });
    }
  });
});

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      req.status(500).json({ success: false, err });
    });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
