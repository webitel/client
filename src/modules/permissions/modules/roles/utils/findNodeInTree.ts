export interface TreeNode {
  name: string;
  children: this[];
}

export const findNodeInTree = <T extends TreeNode>(
  tree: T[],
  nodeName: string
): T | null => {
  for (const node of tree) {
    if (node.name === nodeName) {
      return node;
    }

    if (node.children && node.children.length > 0) {
      const found = findNodeInTree(node.children, nodeName);
      if (found) {
        return found;
      }
    }
  }

  return null;
};
