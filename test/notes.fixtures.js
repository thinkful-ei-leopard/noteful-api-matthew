function makeNotesArray() {
  return [
    {
      id: 1,
      note_name: 'First Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur',
      folder_id: 3
    },
    {
      id: 2,
      note_name: 'Second Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, exercitationem',
      folder_id: 1
    },
    {
      id: 3,
      note_name: 'Third Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate?',
      folder_id: 2
    },
    {
      id: 4,
      note_name: 'Fourth Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum molestiae',
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
    note_name: 'Naughty naughty very naughty &;t;script&gt;alert(\"xss\");&lt/script&gt;',
    content: 'Bad image <img src="badimg.jpg">. But not <strong>all</strong> bad.'
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