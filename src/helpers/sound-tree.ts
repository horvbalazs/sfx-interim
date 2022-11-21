import {
  ref,
  listAll,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';
import _ from 'lodash';
import { storage } from '../firebase';
import { TreeNode } from '../types';

export const createSoundTree = async (): Promise<TreeNode[]> => {
  const root = ref(storage, 'sounds');
  const list = await listAll(root);

  const result: TreeNode[] = [];
  const children = [...list.prefixes];

  for (let i = 0; i < children.length; i++) {
    result.push(await fetchTreeNode(children[i]));
  }

  return result;
};

const fetchTreeNode = async (
  storageRef: StorageReference
): Promise<TreeNode> => {
  const list = await listAll(storageRef);
  const childRefs = [...list.items, ...list.prefixes];

  if (childRefs.length === 0) {
    const url = await getDownloadURL(storageRef);

    return {
      label: _.capitalize(storageRef.name),
      value: url,
    };
  }

  const children: TreeNode[] = [];
  for (let i = 0; i < childRefs.length; i++) {
    children.push(await fetchTreeNode(childRefs[i]));
  }

  return {
    label: _.capitalize(storageRef.name),
    value: storageRef.name,
    children,
  };
};

export const getUncheckableNodes = (tree: TreeNode[]): string[] => {
  return tree.reduce((acc, curr) => {
    const res = [];
    if (curr.children) {
      res.push(curr.value, ...getUncheckableNodes(curr.children));
    }

    return [...acc, ...res];
  }, [] as string[]);
};
