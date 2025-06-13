<?php
$posts = json_decode(file_get_contents('./data/posts.json'), true);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>FactualDocs Clone</title>
  <link rel="stylesheet" href="assets/style.css" />
</head>
<body>
<header class="site-header">
<div class="site-title">
  <span>Factual</span><span>Docs</span>
</div>


  <nav class="main-nav">
  <form class="search-form" method="get" action="#">
  <input type="text" placeholder="Search..." name="q" />
  <button type="submit" aria-label="Search">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707 1.414-1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
    </svg>
  </button>
</form>



    <div class="nav-links">
      <a href="#" id="categories-link">Categories ▾</a>
      <a href="add.php" class="add-btn">+ Add New</a>
    </div>
  </nav>
</header>

<!-- Popup Menu Placeholder -->
<div id="category-popup" class="category-popup hidden">
  <ul>
    <li><a href="#">Politics</a></li>
    <li><a href="#">Science</a></li>
    <li><a href="#">Technology</a></li>
    <li><a href="#">World News</a></li>
  </ul>
</div>


  <main class="grid">
    <?php foreach ($posts as $post): ?>
      <div class="card">
        <a href="post.php?id=<?= $post['id'] ?>">
          <img src="https://img.youtube.com/vi/<?= getYouTubeID($post['youtube_url']) ?>/hqdefault.jpg" alt="<?= htmlspecialchars($post['title']) ?>">
          <h2><?= htmlspecialchars($post['title']) ?></h2>
        </a>
        <p class="tags"><?= isset($post['tags']) ? htmlspecialchars(implode(', ', $post['tags'])) : '' ?></p>
      </div>
    <?php endforeach; ?>
  </main>
  <script src="assets/script.js"></script>

</body>
</html>

<?php
function getYouTubeID($url) {
  parse_str(parse_url($url, PHP_URL_QUERY), $vars);
  return $vars['v'] ?? '';
}
?>
