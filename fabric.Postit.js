// https://stackoverflow.com/questions/35888660/adding-padding-and-border-radius-in-background-text-in-fabricjs
// https://github.com/fabricjs/fabric.js/issues/3319
// https://github.com/fabricjs/fabric.js/issues/6309

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		this.beginPath();
		this.moveTo(x+r, y);
		this.arcTo(x+w, y,   x+w, y+h, r);
		this.arcTo(x+w, y+h, x,   y+h, r);
		this.arcTo(x,   y+h, x,   y,   r);
		this.arcTo(x,   y,   x+w, y,   r);
		this.closePath();
		return this;
	}

fabric.Postit = fabric.util.createClass(fabric.IText, {

	type: 'postit',

	initialize: function(text, options) {
		this.cacheProperties.push('bgColor');
		options || (options = {});

		this.callSuper('initialize', text, options);
	},

	_render: function(ctx) {
		var dim = this._getNonTransformedDimensions();
		ctx.fillStyle = 'yellow';
		ctx.fillRect(
				//-this.getScaledWidth() / 2 - 60,
			-370,
				-this.getScaledHeight() / 2 - (this.padding / this.scaleY),
				//0,//-dim.x / 2,
				//0,//-dim.y / 2,
				this.width + this.padding*2,
				this.height + this.padding*2
		);

		this.callSuper('_render', ctx);
	},

/*
  _getNonTransformedDimensions: function() { // Object dimensions
    return new fabric.Point(this.width, this.height).scalarAdd(this.padding);
  },
*/

	_renderBackground_OLD: function(ctx) {
		if (!this.backgroundColor) {
			return;
		}
		var dim = this._getNonTransformedDimensions();
		console.log('dim', dim)
		ctx.fillStyle = this.backgroundColor;

		if (!this.bgCornerRadius) {
			ctx.fillRect(
				-dim.x / 2,
				-dim.y / 2,
				dim.x,
				dim.y
			);
		} else {
			ctx.roundRect(-dim.x / 2, -dim.y / 2, dim.x, dim.y, this.bgCornerRadius).fill();
		}
		// if there is background color no other shadows
		// should be casted
		this._removeShadow(ctx);
	}

  /*
  _calculateCurrentDimensions: function() { // Controls dimensions
    return fabric.util.transformPoint(this._getTransformedDimensions(), this.getViewportTransform(), true);
  },
  */

  /*
	_calculateCurrentDimensions: function() { // Controls dimensions
		return fabric.util.transformPoint( this._getTransformedDimensions(), this.getViewportTransform(), true ).scalarAdd(this.padding * this.scaleX * 2);
	},
	*/

});
fabric.Postit.fromObject = function(object, callback) {
   return fabric.Object._fromObject('Postit', object, callback, 'text');
}

