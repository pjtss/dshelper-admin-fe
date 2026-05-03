import BaseApi from "@/api/BaseApi.jsx";

function createMultipartConfig() {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
}

function unwrapResponse(response) {
  return response?.data?.data ?? response?.data;
}

export async function uploadTrashBinCsv(file, apiClient = BaseApi) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/trash-bins/upload", formData, createMultipartConfig());
  return unwrapResponse(response);
}

export async function uploadTrashBinImage(image, apiClient = BaseApi) {
  const formData = new FormData();
  formData.append("image", image);

  const response = await apiClient.post("/trash-bins/images", formData, createMultipartConfig());
  return unwrapResponse(response);
}

export async function getTrashBins(params = {}, apiClient = BaseApi) {
  const response = await apiClient.get("/trash-bins", {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort ?? "desc",
      sortBy: params.sortBy ?? "createdAt",
    },
  });

  return unwrapResponse(response);
}
