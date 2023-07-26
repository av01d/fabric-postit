/* Copyright 2023 WebGear en EvoStack. All rights reserved. */
(() => {
  // lib/fabric.postit.js
  fabric.Postit = fabric.util.createClass(fabric.Group, {
    type: "postit",
    initialize(text, options) {
      this.tbox = new fabric.Textbox(text, {
        left: 0,
        top: 0,
        originY: "center",
        originX: "center",
        textAlign: "center",
        padding: 10,
        fontSize: 20,
        fontFamily: "Sans-serif",
        fontStyle: "normal",
        fontWeight: 400
      });
      this.note = new fabric.Rect({
        left: 0,
        top: 0,
        originY: "top",
        originX: "center",
        fill: "#ffffaa",
        rx: 5,
        ry: 5
      });
      this.strip = new fabric.Rect({
        left: 0,
        top: 0,
        originY: "top",
        originX: "center",
        height: 30,
        fill: "#ffff00"
      });
      Object.defineProperty(this, "text", {
        get: () => this.tbox.text,
        set: (value) => this.tbox.set("text", value)
      });
      Object.defineProperty(this, "textPadding", {
        get: () => this.tbox.padding,
        set: (value) => this.tbox.set("padding", value)
      });
      Object.defineProperty(this, "textAlign", {
        get: () => this.tbox.textAlign,
        set: (value) => this.tbox.set("textAlign", value)
      });
      Object.defineProperty(this, "fontSize", {
        get: () => this.tbox.fontSize,
        set: (value) => this.tbox.set("fontSize", value)
      });
      Object.defineProperty(this, "fontWeight", {
        get: () => this.tbox.fontWeight,
        set: (value) => this.tbox.set("fontWeight", value)
      });
      Object.defineProperty(this, "fontStyle", {
        get: () => this.tbox.fontStyle,
        set: (value) => this.tbox.set("fontStyle", value)
      });
      Object.defineProperty(this, "fontFamily", {
        get: () => this.tbox.fontFamily,
        set: (value) => this.tbox.set("fontFamily", value)
      });
      Object.defineProperty(this, "textColor", {
        get: () => this.tbox.fill,
        set: (value) => this.tbox.set("fill", value)
      });
      Object.defineProperty(this, "noteColor", {
        get: () => this.note.fill,
        set: (value) => this.note.set("fill", value)
      });
      Object.defineProperty(this, "boxShadow", {
        get: () => this.shadow,
        set: (value) => this.set("shadow", value)
      });
      Object.defineProperty(this, "radius", {
        get: () => this.note.rx,
        set: (value) => this.note.set({ rx: value, ry: value })
      });
      Object.defineProperty(this, "stripHeight", {
        get: () => this.strip.height,
        set: (value) => this.strip.set("height", value)
      });
      Object.defineProperty(this, "stripColor", {
        get: () => this.strip.fill,
        set: (value) => this.strip.set("fill", value)
      });
      this.on("scaling", this._onScale.bind(this));
      this.on("mousedblclick", this._enterEditing.bind(this));
      this.tbox.on("changed", this._onChange.bind(this));
      this.tbox.on("selection:changed", this._onChange.bind(this));
      this.callSuper("initialize", [this.note, this.strip, this.tbox], {
        lockScalingFlip: true,
        boxShadow: "rgba(0,0,0,0.3) 3px 3px 3px",
        ...options
      });
      this.setCoords();
    },
    _enterEditing() {
      this.canvas.setActiveObject(this.tbox);
      this.tbox.bringToFront();
      this.tbox.enterEditing();
      this.tbox.selectAll();
      this._onChange();
    },
    _onChange() {
      this.setCoords();
    },
    _onScale() {
      const scaleX = Math.abs(this.scaleX);
      const scaleY = Math.abs(this.scaleY);
      this.set({
        scaleX: 1,
        scaleY: 1,
        width: this.width * scaleX,
        height: this.height * scaleY
      });
      this.setCoords();
    },
    setCoords() {
      this.tbox.set({
        top: this.strip.height / 2,
        width: this.width - this.tbox.padding * 2,
        height: this.height - this.strip.height - this.tbox.padding * 2
      });
      this.tbox.setCoords();
      const width = this.tbox.width + this.tbox.padding * 2;
      const height = Math.max(this.tbox.height + this.strip.height + this.tbox.padding * 2, this.height);
      this.set({ scaleX: 1, scaleY: 1, width, height });
      this.note.set({ width, height, top: -height / 2 });
      this.strip.set({ width, top: -this.height / 2 });
      this.callSuper("setCoords");
      this.canvas?.requestRenderAll();
    },
    toObject(propertiesToInclude) {
      const properties = [
        "text",
        "textPadding",
        "textAlign",
        "fontSize",
        "fontFamily",
        "fontStyle",
        "fontWeight",
        "textColor",
        "noteColor",
        "boxShadow",
        "radius",
        "stripHeight",
        "stripColor",
        ...propertiesToInclude ?? []
      ];
      return fabric.util.object.extend(this.callSuper("toObject", properties));
    }
  });
  fabric.Postit.fromObject = function(object, callback) {
    return fabric.Object._fromObject("Postit", object, callback, "text");
  };
})();
