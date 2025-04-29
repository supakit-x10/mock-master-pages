import { configure, makeAutoObservable, runInAction } from "mobx";
import { Album } from "../../../types/response/album.type";
import { GetAlbumsUsecase, GetAlbumsUsecaseImpl } from "../../../usecases/get-albums.usecase";

configure({
  enforceActions: "always",
});

export class AlbumViewModel {
  albums: Album[] = []

  constructor(private readonly getAlbumsUsecase: GetAlbumsUsecase = new GetAlbumsUsecaseImpl()) {
    makeAutoObservable(this)
  }

  async getAlbums() {
    const albums = await this.getAlbumsUsecase.execute()
    runInAction(() => {
      this.albums = albums;
    });
  }
}

const albumViewModel = new AlbumViewModel()

export default albumViewModel