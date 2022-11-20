import { StorageReference } from 'firebase/storage';
import { ReactNode } from 'react';

export interface TreeNode {
  label: ReactNode;
  value: string;
  children?: StorageReference[];
}
