// fetchFileText.test.ts
import { describe, it, expect, vi } from 'vitest';
import axios from '../utils/axios';
import { fetchFileText } from '../hooks/sendFile';  // assuming it's in the same folder

vi.mock("../utils/axios", () => ({
	default: {
		post: vi.fn(),
	},
}));


describe("fetchFileTgext", () => {
	it("should send a post request with the file data", async () => {
		const mockFile = new File(['file content'], "test.txt", { type: "text/plain" });
		const mockResponse = { data: "file content" }

		axios.post.mockResolvedValueOnce(mockResponse);

		const result = await fetchFileText(mockFile);

		expect(axios.post).toHaveBeenCalledWith("/single", expect.any(FormData));
		expect(result).toEqual(mockResponse);

		const formData = axios.post.mock.calls[0][1];
		expect(formData.get("File")).toEqual(mockFile);
	});
});

describe("FetchFileTextWrongExt", () => {
	it("should send a file that doesnt have a .txt or .pdf ext and expect a 400 error message", async () => {
		const mockFile = new File(["file content"], "test.fail", { type: "text/plain" });
		const mockError = {
			response: {
				status: 400,
				data: { error: "multer Error: Invalid file extension" },
			}
		}

		axios.post.mockRejectedValueOnce(mockError);

		try {
			await fetchFileText(mockFile);
		} catch (error) {
			expect(axios.post).toHaveBeenCalledWith("/single", expect.any(FormData));
			const formData = axios.post.mock.calls[0][1];
			expect(formData.get("File")).toEqual(mockFile);

			expect(error.response.status).toBe(400);
			expect(error.response.data.error).toBe("multer Error: Invalid file extension")
		}


	})
})
