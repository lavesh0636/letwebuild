const fs = require('fs')
const path = require('path')
const https = require('https')
const { exec } = require('child_process')

const images = [
  {
    url: 'https://placehold.co/800x600/2563eb/ffffff/png?text=LetWeBuild+Platform',
    filename: 'hero-image.png'
  },
  {
    url: 'https://placehold.co/200x80/6b7280/ffffff/png?text=Client+1',
    filename: 'client-1.png'
  },
  {
    url: 'https://placehold.co/200x80/6b7280/ffffff/png?text=Client+2',
    filename: 'client-2.png'
  },
  {
    url: 'https://placehold.co/200x80/6b7280/ffffff/png?text=Client+3',
    filename: 'client-3.png'
  },
  {
    url: 'https://placehold.co/200x80/6b7280/ffffff/png?text=Client+4',
    filename: 'client-4.png'
  },
  {
    url: 'https://placehold.co/200x80/6b7280/ffffff/png?text=Client+5',
    filename: 'client-5.png'
  }
]

const imagesDir = path.join(__dirname, '../public/images')

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// Download images
images.forEach((image) => {
  const filepath = path.join(imagesDir, image.filename)
  
  https.get(image.url, (response) => {
    response.pipe(fs.createWriteStream(filepath))
    console.log(`Downloaded ${image.filename}`)
  }).on('error', (err) => {
    console.error(`Error downloading ${image.filename}:`, err.message)
  })
}) 