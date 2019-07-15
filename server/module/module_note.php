<?php

?>
<style type="text/css">
	.lisens{
		position: fixed;
		right: 10px;
		top: 10px;
		font-size: 30px;
		/*border: 1px solid red;*/
	}
</style>
<div class="lisens" id="li">
	<label id="f">F</label><label id="un">_</label><label id="0">0</label>
</div>

<script type="text/javascript">
	satu();
	var blink_speed = 500; // every 1000 == 1 second, adjust to suit
	var t = setInterval(function () {
		    var ele = document.getElementById('li');
		    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
		}, blink_speed);

	function satu(){
		document.getElementById('f').style.color = "#cc0000";
		document.getElementById('un').style.color = "#006600";
		document.getElementById('0').style.color = "#0000b3";
	}
	function dua(){
		document.getElementById('f').style.color = "#0000b3";
		document.getElementById('un').style.color = "#995c00";
		document.getElementById('0').style.color = "#cc0000";
	}
</script>