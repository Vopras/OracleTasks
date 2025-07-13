const db = require('./db.js')
const express = require('express')

var app = express();
app.use(express.json());
const PORT = 3000;

app.get('/projects', (req, res) => {
    const getAllQuery = 'SELECT * FROM IT_PROJECTS';
    db.all(getAllQuery, (err, rows) => {
        if (err) {
            console.error("Error running get all query: ", err)
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});

app.get('/projects/:id', (req, res) => {
    const {id} = req.params;

    const getOneQuery = 'SELECT * FROM IT_PROJECTS WHERE PROJECT_ID = ?;';
    const params = [id];

    db.get(getOneQuery, params, (err, row) => {
        if (err) {
            console.error('Error running get single query:', err);
            return res.status(500).json({error: err.message});
        }
        if (!row) {
            return res.status(404).json({error:"Project not found"});
        }
        res.json(row);
    });
});

app.post('/projects', (req, res) => {
    const {
        PROJECT_NAME,
        START_DATE,
        TARGET_END_DATE,
        ACTUAL_END_DATE,
        CREATED_BY,
    } = req.body;

    if (
    !PROJECT_NAME ||
    !START_DATE ||
    !TARGET_END_DATE ||
    !ACTUAL_END_DATE ||
    !CREATED_BY
  ) {
    return res
      .status(400)
      .json({ error: 'PROJECT_NAME, START_DATE, TARGET_END_DATE, ACTUAL_END_DATE, CREATED_BY are required.' });
  }

  const CREATED_ON = new Date().toISOString().slice(0, 10);

  const createQuery = `
    INSERT INTO IT_PROJECTS
      (PROJECT_NAME, 
       START_DATE, 
       TARGET_END_DATE, 
       ACTUAL_END_DATE, 
       CREATED_ON, 
       CREATED_BY)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    PROJECT_NAME,
    START_DATE,
    TARGET_END_DATE,
    ACTUAL_END_DATE,
    CREATED_ON,
    CREATED_BY
  ];

  db.run(createQuery, params, function (err) {
    if (err) {
      console.error('Error running insert project:', err);
      return res.status(400).json({ error: err.message });
    }

    const newId = this.lastID;
    db.get(
      'SELECT * FROM IT_PROJECTS WHERE PROJECT_ID = ?',
      [newId],
      (err2, row) => {
        if (err2) {
          console.error('Error fetching select new project:', err2);
          return res.status(500).json({ error: err2.message });
        }
        res.status(201).json(row);
      }
    );
  });
})

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  const {
    PROJECT_NAME,
    TARGET_END_DATE,
    ACTUAL_END_DATE,
    MODIFIED_BY,
  } = req.body;

  if (
    !PROJECT_NAME ||
    !TARGET_END_DATE ||
    !ACTUAL_END_DATE ||
    !MODIFIED_BY
  ) {
    return res.status(400).json({
      error:
        'PROJECT_NAME, TARGET_END_DATE, ACTUAL_END_DATE and MODIFIED_BY are required.',
    });
  }

  const updateQuery = `
    UPDATE IT_PROJECTS
    SET
      PROJECT_NAME      = ?,
      TARGET_END_DATE   = ?,
      ACTUAL_END_DATE   = ?,
      MODIFIED_ON       = datetime('now'),
      MODIFIED_BY       = ?
    WHERE PROJECT_ID = ?
  `;
  const params = [
    PROJECT_NAME,
    TARGET_END_DATE,
    ACTUAL_END_DATE,
    MODIFIED_BY,
    id,
  ];

  db.run(updateQuery, params, function (err) {
    if (err) {
      console.error('Error running update project:', err);
      return res.status(400).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    db.get(
      'SELECT * FROM IT_PROJECTS WHERE PROJECT_ID = ?',
      [id],
      (err2, row) => {
        if (err2) {
          console.error('Error fetching updated project:', err2);
          return res.status(500).json({ error: err2.message });
        }
        res.json(row);
      }
    );
  });
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const deleteQuery = 'DELETE FROM IT_PROJECTS WHERE PROJECT_ID = ?';
  db.run(deleteQuery, [id], function (err) {
    if (err) {
      console.error('Error running delete project:', err);
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Deleted successfully', PROJECT_ID: id });
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});