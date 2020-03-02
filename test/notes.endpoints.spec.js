const knex = require('knex');
const app = require('../src/app');
const {
  makeNotesArray,
  makeMaliciousNote
} = require('./notes.fixtures');
const {
  makeFoldersArray
} = require('./folders.fixtures');

describe('Notes Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'));

  this.afterEach('cleanup', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'));

  describe('GET /api/notes', () => {
    context('Given no notes', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/notes')
          .expect(200, []);
      });
    });

    context('Given notes in the database', () => {
      const testFolders = makeFoldersArray();
      const testNotes = makeNotesArray();

      beforeEach('insert notes', () => {
        return db
          .into('noteful_folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('noteful_notes')
              .insert(testNotes);
          });
      });

      it('responds with 200 and all notes', () => {
        return supertest(app)
          .get('/api/notes')
          .expect(200, testNotes);
      });
    });

    context('Given an XSS attack note', () => {
      const testFolders = makeFoldersArray();
      const {
        maliciousNote,
        expectedNote
      } = makeMaliciousNote();

      beforeEach('insert malicious note', () => {
        return db
          .into('noteful_folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('noteful_notes')
              .insert([maliciousNote]);
          });
      });

      it('removes XSS attack content', () => {
        return supertest(app)
          .get('/api/notes')
          .expect(200)
          .expect(res => {
            expect(res.body[0].note_name).to.eql(expectedNote.note_name);
            expect(res.body[0].content).to.eql(expectedNote.content);
          });
      });
    });
  });

  describe('GET /api/notes/:note_id', () => {
    context('Given not notes', () => {
      it('responds with 404', () => {
        const noteId = 6969;
        return supertest(app)
          .get(`/api/notes/${noteId}`)
          .expect(404, {
            error: {
              message: 'Note doesn\'t exist'
            }
          });
      });
    });

    context('Given notes in the database', () => {
      const testFolders = makeFoldersArray();
      const testNotes = makeNotesArray();

      beforeEach('insert notes', () => {
        return db
          .into('noteful_folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('noteful_notes')
              .insert(testNotes);
          });
      });

      //TODO: Finish tests
    });
  });
});