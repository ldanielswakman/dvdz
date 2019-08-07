<?
$file = file_get_contents('content/1-oeuvre/oeuvrelist.json');
$array = json_decode($file);

foreach ($array as $key => $item) {

	$file = 'oeuvredata/' . $item->id . '.jpg.txt';

	$separator = "\r\n\r\n----\r\n\r\n";

	$contents = '';
	$contents .= 'Title: ' . $item->name;
	$contents .= $separator;
	$contents .= 'Technique: ' . $item->technique;
	$contents .= $separator;
	$contents .= 'Technique-old: ' . $item->technique;
	$contents .= $separator;
	$contents .= 'Size-width: ' . $item->size_width;
	$contents .= $separator;
	$contents .= 'Size-height: ' . $item->size_height;
	$contents .= $separator;
	$contents .= 'Year: ' . $item->year;

	file_put_contents($file, $contents);

	// echo '<pre>';
	// var_dump($file, $contents);
	// echo '</pre>';

	// echo '<br>';
}
// echo '<pre>';
// var_dump($json);
// echo '</pre>';

//The name of the file that we want to create if it doesn't exist.
$file = 'oeuvredata/test.txt';

//Use the function is_file to check if the file already exists or not.
// if(!is_file($file)){
  //   //Some simple example content.
		// $contents = 'Title: Zelfportret';

  //   //Save our content to the file.
  //   file_put_contents($file, $contents);
// }
