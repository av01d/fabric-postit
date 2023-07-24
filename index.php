<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Fabric.js Post It</title>
<style>
canvas {
	border: 1px solid black;
}
</style>
<script src="fabric.js"></script>
<script src="fabric.Postit.js"></script>
</head>
<body>
<canvas id="c" width="800" height="600"></canvas>
<script>

const canvas = new fabric.Canvas('c');
// create a rectangle object
const rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 100,
  height: 50
});

const note1 = new fabric.Postit('Hello world 1', {
	left: 400,
	top: 100,
	padding: 50,
	fontFamily: 'Arial',
	//backgroundColor: 'red',
	//bgCornerRadius:10
	//selectionBackgroundColor: 'blue'
});

// "add" rectangle onto canvas
canvas.add(rect, note1);

</script>
</body>
</html>
