const catchAsync = require('../catchAsync');
const db = require('../db');

//view users
exports.view = catchAsync(async (req, res) => {
  //user the connection
  const results = await db.query('SELECT * FROM user ORDER BY id DESC');

  if (results?.length > 0) {
    let removeUser = req.query.removed;
    res.render('home', { rows: results[0], removeUser });
  }
});

// find user by search
exports.find = catchAsync(async (req, res) => {
  let searchTerm = req.body.search;

  //user the connection
  const results = await db.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', {
    replacements: ['%' + searchTerm + '%', '%' + searchTerm + '%'],
  });
  if (results?.length > 0) {
    res.render('home', { rows: results[0] });
  }
});

exports.form = (req, res) => {
  res.render('add-user');
};

// add new user
exports.create = catchAsync(async (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  const created = await db.query(
    'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',
    {
      replacements: [first_name, last_name, email, phone, comments],
    },
  );
  if (created) {
    res.render('add-user', { alert: 'User added Successfully.' });
  }
});

// edit user
exports.edit = catchAsync(async (req, res) => {
  const results = await db.query('SELECT * FROM user WHERE id = ?', {
    replacements: [req.params.id],
  });

  if (results.length > 0) {
    res.render('edit-user', { rows: results[0] });
  }
});

// Update user
exports.update = catchAsync(async (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  const updated = await db.query(
    'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?',
    {
      replacements: [first_name, last_name, email, phone, comments, req.params.id],
    },
  );
  if (updated) {
    const results = await db.query('SELECT * FROM user WHERE id = ?', {
      replacements: [req.params.id],
    });
    if (results?.length > 0) {
      res.render('edit-user', { rows: results[0], alert: `${first_name} has been updated` });
    }
  }
});

//delete
exports.delete = catchAsync(async (req, res) => {
  const deleted = await db.query('DELETE FROM user WHERE id = ?', {
    replacements: [req.params.id],
  });
  if (deleted) {
    let removeUser = encodeURIComponent('Record succesfully removed');
    res.redirect('/?removed' + removeUser);
  }
});

//view
exports.viewall = catchAsync(async (req, res) => {
  const results = await db.query('SELECT * FROM user WHERE id =?', {
    replacements: [req.params.id],
  });
  if (results?.length > 0) {
    res.render('view-user', { rows: results[0] });
  }
});
