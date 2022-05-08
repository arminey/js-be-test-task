import axios from "axios";

const expectedResult = {
  id: "90d61876-b99a-443e-994c-ba882c8558b6",
  status: "uploaded_media",
  media: {
    "document-front": [
      {
          "id": "40851916-3e86-45cd-b8ce-0e948a8a7751",
          "mimeType": "image/png",
          "context": "document-front"
      },
      {
          "id": "7f2dcbd8-5b5f-4f1a-bfa4-016ddf4dd662",
          "mimeType": "image/png",
          "context": "document-front"
      },
      {
          "id": "40f1e462-6db8-4313-ace3-83e4f5619c56",
          "mimeType": "image/png",
          "context": "document-back"
      }
    ],
    "document-back": [
      {
          "id": "a6c90b4f-ddfc-49eb-89ad-05b7f1274f96",
          "mimeType": "image/png",
          "context": "document-front"
      }
    ]
  }
};

describe('GET endpoint returns the session and media with combined details', () => {
  it('Returns grouped media by the context type', async () => {
    const response = await axios.get(`http://localhost:3200/api/sessions/90d61876-b99a-443e-994c-ba882c8558b6/media-context`);
    expect(response.data.code).toEqual(200);
    expect(response.data.data).toMatchObject(expectedResult);
  })
});

