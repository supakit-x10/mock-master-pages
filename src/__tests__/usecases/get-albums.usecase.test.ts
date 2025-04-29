import { AlbumsRepositoryImpl } from "../../repositories/albums.repository";
import { AlbumRes } from "../../types/response/album-res.type";
import { ApiResponse } from "../../types/response/api-response.type";
import { GetAlbumsUsecaseImpl } from "../../usecases/get-albums.usecase";


describe("GetAlbumsUsecase", () => {
  let usecase: GetAlbumsUsecaseImpl;
  let albumsRepositoryMock: jest.Mocked<AlbumsRepositoryImpl>;

  beforeEach(() => {
    albumsRepositoryMock = {
      getAlbums: jest.fn(),
    };
    usecase = new GetAlbumsUsecaseImpl(albumsRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return mapped albums with bookmark set to false", async () => {
    // Given
    const response: ApiResponse<AlbumRes[]> = {
      error: false,
      data: [
        {
          userId: 1,
          id: 1,
          title: "quidem molestiae enim",
        },
        {
          userId: 1,
          id: 2,
          title: "sunt qui excepturi placeat culpa",
        },
      ],
    };

    const expected = [
      {
        id: 1,
        title: "quidem molestiae enim",
        userId: 1,
        bookmark: false,
      },
      {
        id: 2,
        title: "sunt qui excepturi placeat culpa",
        userId: 1,
        bookmark: false,
      },
    ];

    albumsRepositoryMock.getAlbums.mockResolvedValue(response);

    // When
    const result = await usecase.execute();

    // Then
    expect(albumsRepositoryMock.getAlbums).toHaveBeenCalledTimes(1);
    expect(albumsRepositoryMock.getAlbums).toHaveBeenCalledWith();
    expect(result).toEqual(expected);
  });

  it("should return an empty array when there is an error", async () => {
    // Given
    const response = {
      error: true,
      data: [],
    };

    albumsRepositoryMock.getAlbums.mockResolvedValue(response);

    // When
    const result = await usecase.execute();

    // Then
    expect(albumsRepositoryMock.getAlbums).toHaveBeenCalledTimes(1);
    expect(albumsRepositoryMock.getAlbums).toHaveBeenCalledWith();
    expect(result).toEqual([]);
  });
});
