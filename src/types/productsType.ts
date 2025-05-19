export type ProductsType = {
  id: number;
  articleType: string;
  baseColour: string;
  gender: string;
  image: string;
  masterCategory: string;
  productDisplayName: string;
  season: string;
  subCategory: string;
  usage: string;
  year: string;
};

// export type ProductType = {
//   id              String          @id @default(auto()) @map("_id") @db.ObjectId
//   userId          String          @db.ObjectId
//   user            User            @relation(fields: [userId], references: [id])
//   productId       String          @db.ObjectId
//   interactionType InteractionType
//   amount          Float?
//   quantity: int
// }
