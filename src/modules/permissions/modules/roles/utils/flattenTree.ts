export interface NodeWithChildren {
  children?: this[];
}

export function flattenTree<T extends NodeWithChildren>(nodes: T[]): Omit<T, 'children'>[] {
  const flatList: Omit<T, 'children'>[] = [];

  for (const node of nodes) {
    const { children, ...nodeWithoutChildren } = node;
    flatList.push(nodeWithoutChildren);

    if (children && children.length) {
      flatList.push(...flattenTree(children));
    }
  }

  return flatList;
}
