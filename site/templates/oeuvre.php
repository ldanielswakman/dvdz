<?

$range = get('range');
$filter = get('filter');
$value = get('value');

$items = $page->files()->filterBy('visible', '!=', 'false')->filterBy('type', 'image');

// Technique filter
if($filter == 'techniek' && strlen($value) > 0) {
	$items = $items->filterBy('technique', $value);
}

// Size filter
if($filter == 'afmeting') {
	if(!is_array($value)) {
		$value = explode(',', $value);
	}
	$minW = $value[0];
  $maxW = $value[1];
	$items = $items->filter(function($child) use ($minW, $maxW) {
		return (
			// Measure quantities by width
			$child->size_width()->isNotEmpty() &&
			$child->size_width()->value() > $minW &&
			$child->size_width()->value() <= $maxW
		);
	});
}

// Year filter
if($filter == 'periode') {
	if(!is_array($value)) {
		$value = explode(',', $value);
	}
	$min = $value[0];
  $max = $value[1];
	$items = $items->filter(function($child) use ($min, $max) {
		return (
			// Perform year check
			$child->year()->isNotEmpty() &&
			$child->year()->value() > $min &&
			$child->year()->value() <= $max
		);
	});
}

if($filter == 'all') {
	$items = $items->shuffle();
}

// if range is defined, set pagination page
$rangeSet = (isset($range)) ? $range[1]/10 : 1;

$count = $items->count();
$paginated = $items->paginate(10, ['page' => $rangeSet]);
?>

<script>var amount = <?= $count ?></script>

<? foreach ($paginated as $item) : ?>
	<div class="item">
		<div class="image">
			<img class="lazy" onload="imgLoaded($(this))" src="<?= $item->thumb(['width' => 1000, 'height' => 1000])->url() ?>" />
		</div>
		<div class="info">
			<span class="titel"><?= $item->title() ?></span>
		  <span class="techniek"><?= $item->technique() ?></span>
		  <span class="afmeting"><?= $item->size_width() . 'x' . $item->size_height() . ' cm' ?></span>
		  <span class="periode"><?= $item->year() ?></span>
			<span class="id"><?= $item->name() ?></span>
		</div>
	</div>
<? endforeach ?>
