<?php
$posts = json_decode(file_get_contents('./data/posts.json'), true);
$id = $_GET['id'] ?? null;
$current = null;

foreach ($posts as $post) {
    if ((string)$post['id'] === (string)$id) {
        $current = $post;
        break;
    }
}

function getYouTubeID($url) {
    parse_str(parse_url($url, PHP_URL_QUERY), $vars);
    return $vars['v'] ?? '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title><?= $current ? htmlspecialchars($current['title']) : 'Post Not Found' ?></title>
  <link rel="stylesheet" href="assets/style.css" />
</head>
<body>
  <header>
    <h1><?= $current ? htmlspecialchars($current['title']) : 'Post Not Found' ?></h1>
    <a href="index.php" class="add-btn">← Back to Home</a>
  </header>

  <main class="post-container">
    <?php if ($current): ?>
      <div class="video-wrapper">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/<?= getYouTubeID($current['youtube_url']) ?>" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="content">
        <p><?= nl2br(htmlspecialchars($current['content'])) ?></p>
        <?php if (!empty($current['tags'])): ?>
          <p class="tags"><strong>Tags:</strong> <?= htmlspecialchars(implode(', ', $current['tags'])) ?></p>
        <?php endif; ?>
      </div>
    <?php else: ?>
      <p>Sorry, the post you're looking for does not exist.</p>
    <?php endif; ?>
  </main>
</body>
</html>
