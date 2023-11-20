import instance from '../../../app/api/instance';
import applyTransform, {
  camelToSnake,
  notify,
  snakeToCamel
} from '@webitel/ui-sdk/src/api/transformers';

const baseUrl = 'users';

export const getWebPhone = async () => {

  const url = 'user/settings/phone';

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

export const changeWebPhone = async (changes) => {

  const item = applyTransform(changes, [
    camelToSnake(),
  ]);

  const url = 'user/settings/phone';

  try {
    const response = await instance.put(url, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const patchItem = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    camelToSnake(),
  ]);
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.patch(url, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

export const changePassword = ({ id, changes }) => patchItem({
  id,
  changes,
});


export default {
  changePassword,
  changeWebPhone,
  getWebPhone,
};
