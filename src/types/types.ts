export interface Comment {
  id: number;
  text: string;
  parentId: number | null;
}
