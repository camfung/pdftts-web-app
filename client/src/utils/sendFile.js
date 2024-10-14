import axios from '../utils/axios';

export async function fetchFileText(file) {
  const formData = new FormData()
  formData.append("file", file)
  const response = await axios.post("/single", formData)
  console.log(response)
  return response.data.fileText
}

