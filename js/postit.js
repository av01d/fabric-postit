fabric.Postit = fabric.util.createClass(fabric.Group, {
  type: 'postit',

  initialize: function (text, options) {
    // sub-classed objects
    this.tbox = new fabric.Textbox(text, {
      left: 0,
      top: 0,
      originY: 'center',
      originX: 'center',
      textAlign: 'center',
      padding: 10,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#000000'
    })
    this.note = new fabric.Rect({
      left: 0,
      top: 0,
      originY: 'top',
      originX: 'center',
      fill: '#ffffaa',
      shadow: 'rgba(0,0,0,0.3) 3px 3px 3px',
      rx: 5,
      ry: 5
    })
    this.strip = new fabric.Rect({
      left: 0,
      top: 0,
      originY: 'top',
      originX: 'center',
      height: 30,
      fill: '#ffff00'
    })

    // property definitions
    Object.defineProperty(this, 'text', {
      get: () => this.tbox.text,
      set: (value) => this.tbox.set('text', value)
    })
    Object.defineProperty(this, 'textPadding', {
      get: () => this.tbox.padding,
      set: (value) => this.tbox.set('padding', value)
    })
    Object.defineProperty(this, 'fontSize', {
      get: () => this.tbox.fontSize,
      set: (value) => this.tbox.set('fontSize', value)
    })
    Object.defineProperty(this, 'fontFamily', {
      get: () => this.tbox.fontFamily,
      set: (value) => this.tbox.set('fontFamily', value)
    })
    Object.defineProperty(this, 'textColor', {
      get: () => this.tbox.fill,
      set: (value) => this.tbox.set('fill', value)
    })
    Object.defineProperty(this, 'noteColor', {
      get: () => this.note.fill,
      set: (value) => this.note.set('fill', value)
    })
    Object.defineProperty(this, 'boxShadow', {
      get: () => this.note.shadow,
      set: (value) => this.note.set('shadow', value)
    })
    Object.defineProperty(this, 'radius', {
      get: () => this.note.rx,
      set: (value) => this.note.set({ rx: value, ry: value })
    })
    Object.defineProperty(this, 'stripHeight', {
      get: () => this.strip.height,
      set: (value) => this.strip.set('height', value)
    })
    Object.defineProperty(this, 'stripColor', {
      get: () => this.strip.fill,
      set: (value) => this.strip.set('fill', value)
    })

    // event handlers
    this.on('scaling', this._onScale.bind(this))
    this.on('mousedblclick', this._enterEditing.bind(this))
    this.tbox.on('changed', this._onChange.bind(this))
    this.tbox.on('selection:changed', this._onChange.bind(this))

    // initialize
    this.callSuper('initialize', [this.note, this.strip, this.tbox], {
      lockScalingFlip: true,
      ...options
    })

    this.setCoords()
  },

  _enterEditing: function () {
    this.canvas.setActiveObject(this.tbox)

    this.tbox.bringToFront()
    this.tbox.enterEditing()
    this.tbox.selectAll()

    this._onChange()
  },

  _onChange: function () {
    this.setCoords()
  },

  _onScale: function () {
    // prevent scaling and update the text box
    const scaleX = Math.abs(this.scaleX)
    const scaleY = Math.abs(this.scaleY)
    this.set({
      scaleX: 1,
      scaleY: 1,
      width: this.width * scaleX,
      height: this.height * scaleY
    })
    this.setCoords()
  },

  setCoords() {
    this.tbox.set({
      top: this.strip.height / 2,
      width: this.width - this.tbox.padding * 2,
      height: this.height - this.strip.height - this.tbox.padding * 2
    })

    this.tbox.setCoords()
    const width = this.tbox.width + this.tbox.padding * 2
    const height = Math.max(
      this.tbox.height + this.strip.height + this.tbox.padding * 2,
      this.height
    )

    this.set({ scaleX: 1, scaleY: 1, width, height })
    this.note.set({ width, height, top: -height / 2 })
    this.strip.set({ width, top: -this.height / 2 })

    this.callSuper('setCoords')
    this.canvas?.requestRenderAll()
  },

  toObject: function (propertiesToInclude) {
    const properties = [
      'text',
      'textPadding',
      'fontSize',
      'fontFamily',
      'textColor',
      'noteColor',
      'boxShadow',
      'radius',
      'stripHeight',
      'stripColor',
      ...(propertiesToInclude ?? [])
    ]
    return fabric.util.object.extend(this.callSuper('toObject', properties))
  }
})

fabric.Postit.fromObject = function (object, callback) {
  return fabric.Object._fromObject('Postit', object, callback, 'text')
}
