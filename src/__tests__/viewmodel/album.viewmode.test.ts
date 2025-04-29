import { AlbumViewModel } from "../../app/[locale]/album/album.viewmode";
import { GetAlbumsUsecase } from "../../usecases/get-albums.usecase";

describe("AlbumViewModel", () => {
  let viewModel: AlbumViewModel;
  let getAlbumsUsecaseMock: jest.Mocked<GetAlbumsUsecase>;

  beforeEach(() => {
    getAlbumsUsecaseMock = {
      execute: jest.fn(),
    }
    viewModel = new AlbumViewModel(getAlbumsUsecaseMock)
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should viewModel call getAlbums", async () => {
    // Given
    const response = [
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
    getAlbumsUsecaseMock.execute.mockResolvedValue(response)

    // When
    await viewModel.getAlbums()

    // Then
    expect(getAlbumsUsecaseMock.execute).toHaveBeenCalledTimes(1);
    expect(getAlbumsUsecaseMock.execute).toHaveBeenCalledWith();
    expect(viewModel.albums).toEqual(expected);
  });
})