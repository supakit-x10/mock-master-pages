import axiosAdapter from "../adapters/axios.adapter";
import { ApiHost, ApiPath } from "../types/api-path.enum";
import { AlbumRes } from "../types/response/album-res.type";
import { ApiResponse } from "../types/response/api-response.type";
import { axiosError } from "../utils/axios-error.utils";
import { axiosResponse } from "../utils/axios-esponse.utils";

export class AlbumsRepositoryImpl {
  async getAlbums(): Promise<ApiResponse<AlbumRes[]>> {
    try {
      const result = await axiosAdapter.get(ApiPath.Albums, { baseURL: ApiHost.Typicode });
      return axiosResponse<AlbumRes[]>(result);
    } catch (error) {
      return axiosError(error);
    }
  }
}
