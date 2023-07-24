const canvas = new fabric.Canvas('canvas')
const state = localStorage.getItem('canvas')

const saveState = () => {
  const json = canvas.toJSON()
  localStorage.setItem('canvas', JSON.stringify(json))
}

const addNote = () => {
  const note = new fabric.Postit({
    text: {
      text: 'Hello World'
    },
    width: 200,
    height: 200,
    top: 200,
    left: 200
  })
  canvas.add(note)
  saveState()
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
