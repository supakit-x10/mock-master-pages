import { AlbumsRepositoryImpl } from "../repositories/albums.repository";
import { Album } from "../types/response/album.type";

export interface GetAlbumsUsecase {
  execute(): Promise<Album[]>
}

export class GetAlbumsUsecaseImpl implements GetAlbumsUsecase {
  constructor(
    private readonly albumsRepository: AlbumsRepositoryImpl = new AlbumsRepositoryImpl()
  ) { }

  async execute() {
    const { error, data } = await this.albumsRepository.getAlbums();
    if (error) {
      return []; // something went wrong
    }
    const mapAlbums = data.map<Album>((album) => {
      return {
        ...album,
        bookmark: false,
      };
    });
    return mapAlbums;
  }
}
