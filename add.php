<?php
$dataFile = './data/posts.json';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title']);
    $youtube_url = trim($_POST['youtube_url']);
    $content = trim($_POST['content']);
    $tags = array_map('trim', explode(',', $_POST['tags']));

    $posts = json_decode(file_get_contents($dataFile), true);

    $newPost = [
        'id' => time(), // use timestamp as unique ID
        'title' => $title,
        'youtube_url' => $youtube_url,
        'content' => $content,
        'tags' => $tags
    ];

    $posts[] = $newPost;

    file_put_contents($dataFile, json_encode($posts, JSON_PRETTY_PRINT), LOCK_EX);

    header("Location: index.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add New Video</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header>
    <h1>Add New Video</h1>
    <a href="index.php" class="add-btn">← Back to Home</a>
  </header>

  <main class="form-container">
    <form method="post">
      <label>Title</label>
      <input type="text" name="title" required>

      <label>YouTube URL</label>
      <input type="url" name="youtube_url" required placeholder="https://www.youtube.com/watch?v=...">

      <label>Article / Info</label>
      <textarea name="content" rows="6" placeholder="Write about the video..."></textarea>

      <label>Tags (comma-separated)</label>
      <input type="text" name="tags" placeholder="science, politics, ai">

      <button type="submit">Save Video</button>
    </form>
  </main>
</body>
</html>
