import './style.css'
import { Web3Storage } from 'web3.storage'

const fileInput = document.getElementById('fileInput')
const uploadButton = document.getElementById('uploadButton')
const resultBox = document.getElementById('result')

fileInput.addEventListener('change', enableUploadButton)
uploadButton.addEventListener('click', uploadFiles)

function enableUploadButton() {
  uploadButton.disabled = false
}

async function uploadFiles() {
  const files = fileInput.files
  const rootCid = await storeWithProgress(files)
  resultBox.innerText = `https://dweb.link/ipfs/${rootCid}`
}

function getAccessToken() {
    // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return ''

  // In a real app, it's better to read an access token from an 
  // environement variable or other configuration that's kept outside of 
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return import.meta.env.VITE_WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

async function storeFiles(files) {
  try {
    const client = makeStorageClient()
    const cid = await client.put(files)
     return cid
  } catch (e) {
    console.error(e)
  }
}

async function storeWithProgress(files) {
  // show the root cid as soon as it's ready
  const onRootCidReady = cid => {
    resultBox.innerText = `uploading... 5% complete`
  }

  // when each chunk is stored, update the percentage complete and display
  const totalSize = 
    Array.from(files)
    .map(f => f.size)
    .reduce((a, b) => a + b)
  let uploaded = 0

  const onStoredChunk = size => {
    uploaded += size
    const pct = uploaded / totalSize * 100
    resultBox.innerText = `uploading... ${pct.toFixed(2)}% complete`
  }

  // makeStorageClient returns an authorized Web3.Storage client
  const client = makeStorageClient()

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onStoredChunk })
}