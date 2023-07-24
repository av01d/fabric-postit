fabric.Postit = fabric.util.createClass(fabric.Group, {
  type: 'postit',

  initialize: function ({ text, rect, accent, ...options }) {
    this.text = new fabric.Textbox(text ?? '', {
      left: 0,
      top: 0,
      originY: 'center',
      originX: 'center',
      textAlign: 'center',
      padding: 10,
      fontSize: 20,
      fontFamily: 'Arial',
      ...text
    })

    this.rect = new fabric.Rect({
      left: 0,
      top: 0,
      originY: 'center',
      originX: 'center',
      fill: '#ffffaa',
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      rx: 10,
      ry: 10,
      ...rect
    })

    this.accent = new fabric.Rect({
      left: 0,
      top: 0,
      height: 30,
      originY: 'top',
      originX: 'center',
      fill: '#ffff00',
      ...accent
    })

    this.on('scaling', this._onScale.bind(this))
    this.on('mousedblclick', this._enterEditing.bind(this))
    this.text.on('changed', this._onChange.bind(this))
    this.text.on('selection:changed', this._onChange.bind(this))

    this.callSuper('initialize', [this.rect, this.accent, this.text], {
      lockScalingFlip: true,
      ...options
    })
    this._resize(this.width, this.height)
  },

  _enterEditing: function () {
    console.log('dblclick')
    this.canvas.setActiveObject(this.text)

    this.text.bringToFront()
    this.text.enterEditing()
    this.text.selectAll()

    this._onChange()
  },

  _onChange: function () {
    this.text.set('dirty', true)
    this._resize()
  },

  _onScale: function () {
    // prevent scaling and update the text box
    const scaleX = Math.abs(this.scaleX)
    const scaleY = Math.abs(this.scaleY)
    const width = this.width * scaleX
    const height = this.height * scaleY
    this._resize(width, height)
  },

  _resize: function (width = this.width, height = this.height) {
    this.text.set({
      scaleX: 1,
      scaleY: 1,
      top: this.accent.height / 2,
      width: width - this.text.padding * 2,
      height: height - this.accent.height - this.text.padding * 2
    })

    this.text.setCoords()
    width = this.text.width + this.text.padding * 2
    height = Math.max(
      this.text.height + this.accent.height + this.text.padding * 2,
      height
    )

    this.set({ scaleX: 1, scaleY: 1, width, height })
    this.rect.set({ width, height })
    this.accent.set({ width, top: -this.height / 2 })

    this.setCoords()
    this.canvas?.requestRenderAll()
  },

  toObject: function (propertiesToInclude) {
    return fabric.util.object.extend(
      this.callSuper('toObject', propertiesToInclude),
      {
        text: this.text.toObject(propertiesToInclude),
        rect: this.rect.toObject(propertiesToInclude),
        accent: this.accent.toObject(propertiesToInclude)
      }
    )
  }
})

fabric.Postit.fromObject = function (object, callback) {
  return fabric.Object._fromObject('Postit', object, callback)
}
