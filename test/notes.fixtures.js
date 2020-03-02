function makeNotesArray() {
  return [
    {
      id: 1,
      note_name: 'First Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur',
      date_modified: '2020-03-03T06:35:13.835Z',
      folder_id: 3
    },
    {
      id: 2,
      note_name: 'Second Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, exercitationem',
      date_modified: '2020-03-02T06:35:13.835Z',
      folder_id: 1
    },
    {
      id: 3,
      note_name: 'Third Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate?',
      date_modified: '2020-01-03T06:35:13.835Z',
      folder_id: 2
    },
    {
      id: 4,
      note_name: 'Fourth Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum molestiae',
      date_modified: '2020-03-03T04:35:13.835Z',
      folder_id: 3
    }
  ];
}

function makeMaliciousNote() {
  const maliciousNote = {
    id: 911,
    note_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    content: 'Bad image <img src="badimg.jpg" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
    date_modified: new Date().toISOString(),
    folder_id: 1
  };

  const expectedNote = {
    ...maliciousNote,
    note_name: 'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    content: 'Bad image <img src>. But not <strong>all</strong> bad.'
  }

  return {
    maliciousNote,
    expectedNote
  }
}

module.exports = {
  makeNotesArray,
  makeMaliciousNote
}