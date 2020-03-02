INSERT INTO noteful_folders (id, folder_name)
  VALUES
    (911,  'This text contains an intentionally broken image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie); alert(''you just got pretend hacked! oh noes!'');">. The image will try to load, when it fails, it executes malicious JavaScript');