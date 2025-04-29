import { AxiosError } from "axios";
import axiosAdapter from "../../adapters/axios.adapter";
import { AlbumsRepositoryImpl } from "../../repositories/albums.repository";
import { ApiHost, ApiPath } from "../../types/api-path.enum";
import { AlbumRes } from "../../types/response/album-res.type";
import { ApiResponse } from "../../types/response/api-response.type";

jest.mock("../../adapters/axios.adapter", () => ({
  get: jest.fn(),
}))

describe("AlbumsRepository", () => {
  let albumsRepository: AlbumsRepositoryImpl;

  beforeEach(() => {
    albumsRepository = new AlbumsRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get albums successfully", async () => {
    // Given
    const baseURL = ApiHost.Typicode
    const path = ApiPath.Albums
    const mockResponse: ApiResponse<AlbumRes[]> = {
      data: [
        {
          userId: 1,
          id: 1,
          title: "Album 1",
        },
      ],
      message: undefined,
      description: '',
      error: false
    };

    (axiosAdapter.get as jest.Mock).mockResolvedValue({
      data: mockResponse.data,
    });

    // When
    const result = await albumsRepository.getAlbums();

    // Then
    expect(axiosAdapter.get).toHaveBeenCalledTimes(1);
    expect(axiosAdapter.get).toHaveBeenCalledWith(path, { baseURL });
    expect(result).toEqual(mockResponse);
  });

  it("should handle an error when get albums", async () => {
    // Given
    const baseURL = ApiHost.Typicode
    const path = ApiPath.Albums
    const mockResponse: ApiResponse = {
      data: null,
      message: 'Specific error message',
      description: 'Detailed error description',
      error: true
    };
    const mockAxiosError = {
      response: {
        data: {
          message: "Specific error message",
          description: "Detailed error description",
        },
      },
      message: "Default error message",
      isAxiosError: true
    } as AxiosError;

    (axiosAdapter.get as jest.Mock).mockRejectedValue(mockAxiosError);

    // When
    const result = await albumsRepository.getAlbums();

    // Then
    expect(axiosAdapter.get).toHaveBeenCalledTimes(1);
    expect(axiosAdapter.get).toHaveBeenCalledWith(path, { baseURL });
    expect(result).toEqual(mockResponse);
  });
});
