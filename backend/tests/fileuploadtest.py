import unittest
import requests


backendUrl = "http://localhost:5000/api"
class TestFileUpload(unittest.TestCase):
    def test_file_upload(self):
        with open("./backend/tests/test.txt", 'w') as f:
            f.write("cameron is the best")

        with open("./backend/tests/test.txt", 'rb') as f:
            files = {'file': f}
            response = requests.post(f"{ backendUrl }/single", files=files)
        if response.status_code == 400: 
            print(response._content)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get("fileText"), 'cameron is the best')

if __name__ == '__main__':
    unittest.main()
