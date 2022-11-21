import { ReactNode } from 'react';

export interface TreeNode {
  label: ReactNode;
  value: string;
  children?: TreeNode[];
}
