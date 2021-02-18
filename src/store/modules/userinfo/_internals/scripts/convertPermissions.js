const convertPermissions = (initialPermissions) => {
  let permissions = {};
  if (!initialPermissions) return permissions;
  permissions = initialPermissions.reduce((permissions, currentPermission) => {
    return {
      ...permissions,
      [currentPermission.id]: currentPermission,
    };
  }, {});
  return permissions;
};

export default convertPermissions;
