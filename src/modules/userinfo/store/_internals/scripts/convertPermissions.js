const convertPermissions = (initialPermissions) => {
  let permissions = {};
  if (!initialPermissions) return permissions;
  permissions = initialPermissions.reduce((permissions, currentPermission) => ({
      ...permissions,
      [currentPermission.id]: currentPermission,
    }), {});
  return permissions;
};

export default convertPermissions;
