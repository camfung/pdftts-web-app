import axios from '../utils/axios';

export async function fetchFileText(file) {
  const formData = new FormData()
  formData.append("File", file)
  const response = await axios.post("/single", formData)
  return response
}

