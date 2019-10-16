export interface ImageMetaData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface ThumbnailMetaData extends ImageMetaData {
  thumbnail_url: string;
}

export class Image {
  private metaDataInternal: ThumbnailMetaData;

  constructor(metaData: ThumbnailMetaData) {
    this.metaDataInternal = { ...metaData };
  }

  get metaData(): ThumbnailMetaData {
    return this.metaDataInternal;
  }
}
