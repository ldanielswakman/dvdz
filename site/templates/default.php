<? snippet('head') ?>

	<body>

		<? snippet('nav') ?>
		
		<div class="wrapper" id="oeuvre">
		
		<div id="detail">
			<div class="img">
				<span class="text info"></span>
				<span class="cross"></span>
			</div>
		</div>
			
		<div id="container">
		</div>
			
		</div>
		<!-- /#wrapper -->
		
		
		<div class="wrapper" id="info">
			
			<div id="container">
				<?= $pages->find('info')->info()->kirbytext() ?>
			</div>
			<!-- /#container -->
			
		</div>
		<!-- /#wrapper -->
		
		
		<div class="wrapper" id="kumulth">
			
			<div id="container">
				<?= $pages->find('info')->kumulth()->kirbytext() ?>
			</div>
			<!-- /#container -->
			
		</div>
		<!-- /#wrapper -->
		
		
		<div class="wrapper" id="contact">
			
			<div id="container">
				<?= $pages->find('contact')->text()->kirbytext() ?>
			</div>
			<!-- /#container -->
			
		</div>
		<!-- /#wrapper -->
		
	</body>
	
</html>
