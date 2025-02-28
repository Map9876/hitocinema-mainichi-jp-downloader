export interface Film {
  id: string;
  name: string;
  images: { image: { url: string } }[];
  productionYear: string;
  discription?: string;
}