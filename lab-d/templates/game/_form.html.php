<?php
    /** @var $game ?\App\Model\Game */
?>

<div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="game[title]" value="<?= $game ? $game->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="Author">Author</label>
    <textarea id="author" name="game[author]"><?= $game? $game->getAuthor() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
