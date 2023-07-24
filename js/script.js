const canvas = new fabric.Canvas('canvas')
const state = localStorage.getItem('canvas')

const saveState = () => {
  const json = canvas.toJSON()
  localStorage.setItem('canvas', JSON.stringify(json))
}

const addNote = () => {
  const note = new fabric.Postit('hello world', {
    width: 200,
    height: 200,
    top: 200,
    left: 200
  })
  canvas.add(note)
  saveState()
}

const changeColor = () => {
  const note = canvas.getActiveObject()
  if (note) {
    const hue = Math.floor(Math.random() * 360)
    note.set('noteColor', `hsl(${hue}deg, 100%, 50%)`)
    note.set('stripColor', `hsl(${hue}deg, 100%, 40%)`)
    saveState()
    canvas.requestRenderAll()
  }
}

const clearCanvas = () => {
  canvas.clear()
  localStorage.removeItem('canvas')
}

if (state) {
  const json = JSON.parse(state)
  canvas.loadFromJSON(json)
}

canvas.on('object:modified', (e) => {
  saveState()
})
