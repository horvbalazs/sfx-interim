import { ref, listAll, getDownloadURL } from 'firebase/storage';
import _ from 'lodash';
import { storage } from '../firebase';
import { TreeNode } from '../types';

export const createSoundTree = async (): Promise<TreeNode[]> => {
  const root = ref(storage, 'sounds');

  return fetchTreeNode({
    value: root.fullPath,
  });
};

export const fetchTreeNode = async (
  activeNode: unknown | TreeNode
): Promise<TreeNode[]> => {
  const result: TreeNode[] = [];
  const { value } = activeNode as TreeNode;
  const branch = ref(storage, value);
  const list = await listAll(branch);
  const children = [...list.items, ...list.prefixes];

  for (let i = 0; i < children.length; i++) {
    const nodeRef = children[i];
    const subList = await listAll(nodeRef);
    const hasChildren = subList.items.length > 0 || subList.prefixes.length > 0;
    const url = hasChildren ? null : await getDownloadURL(nodeRef);

    result.push({
      label: _.capitalize(nodeRef.name),
      value: url ? url : nodeRef.fullPath,
      children: hasChildren ? [] : undefined,
    });
  }

  return result;
};
