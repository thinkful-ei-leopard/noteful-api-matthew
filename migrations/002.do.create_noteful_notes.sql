CREATE TABLE noteful_notes (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  note_name TEXT NOT NULL,
  content TEXT,
  date_modified TIMESTAMP DEFAULT now() NOT NULL,
  folder_id INTEGER REFERENCES blogful_folders(id) ON DELETE SET NULL
);