export interface ITreeNode {
  id: string | number;
  title: string;
  subtitle?: string;
  children?: ITreeNode[];
}