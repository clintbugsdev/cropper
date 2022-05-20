import "./App.css"
import {useState} from "react"
import ImageCropDialog from "./ImageCropDialog"

const initData = [
  {
    id: 1,
    imageUrl: "images/demo1.png",
    croppedImageUrl: null,
  },
  {
    id: 2,
    imageUrl: "images/demo2.png",
    croppedImageUrl: null,
  },
]

function App() {
  const [docs, setDocs] = useState(initData)
  const [selectedDoc, setSelectedDoc] = useState(null)

  const onCancel = () => {
    setSelectedDoc(null)
  }

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newDocsList = [...docs]
    const docIndex = docs.findIndex(x=>x.id === id)
    const doc = docs[docIndex]
    const newDoc = {...doc, croppedImageUrl, crop, zoom, aspect}
    newDocsList[docIndex] = newDoc
    setDocs(newDocsList)
    setSelectedDoc(null)
  }

  const resetImage = (id) => {
    setCroppedImageFor(id)
  }

  return (
    <div>
      {selectedDoc ? (
        <ImageCropDialog 
          id={selectedDoc.id} 
          imageUrl={selectedDoc.imageUrl} 
          cropInit={selectedDoc.crop} 
          zoomInit={selectedDoc.zoom}
          aspectInit={selectedDoc.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
        />
      ) : null}

      {docs.map((doc) => (
        <div className="imageCard" key={doc.id}>
          <img 
            src={doc.croppedImageUrl ? doc.croppedImageUrl : doc.imageUrl} 
            alt="" 
            onClick={() => {
              console.log(doc)
              setSelectedDoc(doc)
            }} 
            />
        </div>
      ))}
    </div>
  )
}

export default App;
