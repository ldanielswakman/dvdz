<? $oeuvre_items = $pages->find('oeuvre')->files()->filterBy('visible', '!=', 'false') ?>

<div id="logo"><a href="<?= $site->url() ?>" target="_self"><img src="<?= url('assets/images/logo.png') ?>" alt="" /></a></div>

<nav>
  <ul id="menu">

  	<? // Main menu ?>
		<? foreach($pages->visible() as $menu_item): ?>
			<li class="menu-item<?= r($menu_item->isOpen(), ' active') ?>">
			  <a href="#<?= $menu_item->slug() ?>"><?= strtolower($menu_item->title()->html()) ?></a>
			</li>
		<? endforeach ?>

		<? // Sub menu ?>
		<li class="submenu">
		  <ul id="oeuvremenu">

				<li>
					<a href="#" class="main" data-type="techniek">techniek</a>
					<a href="#" class="unfilter" style="display: none;"><i></i></a>

					<ul class="sub-categories">
						<? $techniques = $pages->find('oeuvre')->techniques()->split() ?>
						<? foreach($techniques as $technique) : ?>
							<li><a href="#" data-category="<?= $technique ?>">
								<?= $technique ?>
								<span class="quantity"><?= $oeuvre_items->filterBy('technique', $technique)->count() ?></span>
							</a></li>
						<? endforeach ?>
					</ul>
				</li>

				<li>
					<a href="" class="main" data-type="afmeting">afmeting</a>
					<a href="#" class="unfilter" style="display: none;"><i></i></a>

					<ul class="sub-categories">
						<?
						$sizes = [
							['tot 25x30cm',0,25,0,30],
							['tot 40x50cm',25,40,30,50],
							['tot 79x100cm',40,70,50,100],
							['tot 100x130cm',70,100,100,130],
							['groter dan 100x130cm',100,500,130,500],
						];
						foreach ($sizes as $size) :
							$n = $oeuvre_items->filter(function($child) use ($size) {
								return (
									// Measure quantities by width
									$child->size_width()->isNotEmpty() &&
									$child->size_width()->value() > $size[1] &&
									$child->size_width()->value() <= $size[2]
								);
   						})->count();
							?>
							<li><a href="#" data-category="<?= $size[1] . ',' . $size[2] . ',' . $size[3] . ',' . $size[4] ?>">
								<?= $size[0] ?>
								<span class="quantity"><?= $n ?></span>
							</a></li>
						<? endforeach ?>
					</ul>
				</li>

				<li>
					<a href="#" class="main" data-type="periode">periode</a>
					<a href="#" class="unfilter" style="display: none;"><i></i></a>

					<ul class="sub-categories">
						<?
						$periods = [
							['2014',date('Y')],
							['1996','2013'],
							['1992','1995'],
							['1989','1991'],
							['1986','1988'],
							['1979','1985']
						];
						foreach ($periods as $period) :
							$n = $oeuvre_items->filter(function($child) use ($period) {
								return (
									$child->year()->isNotEmpty() &&
									$child->year()->value() > $period[0] &&
									$child->year()->value() <= $period[1]
								);
   						})->count();
							?>
							<li><a href="#" data-category="<?= $period[0] . ',' . $period[1] ?>">
								<?= $period[0] . '-' . $period[1] ?>
								<span class="quantity"><?= $n ?></span>
							</a></li>
						<? endforeach ?>
					</ul>
				</li>

				<li>
					<a href="" class="main refresh" data-type=""><img src="<?= url('assets/images/refresh.png') ?>" alt="" /></a>

					<ul class="sub-categories refresh">
						<li>10 willekeurige werken</li>
					</ul>
				</li>

			</ul>
		</li>

		<li class="submenu">
		  <ul id="infomenu" style="display: none;">
			<li><a href="#info" class="active">curriculum vitae</a></li>
			<li><a href="#kumulth">Kumulth</a></li>
		  </ul>
		</li>

  </ul>
</nav>