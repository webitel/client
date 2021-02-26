import instance from '../../../instance';
import BaseItemGetter from './BaseItemGetter';

// remove named export after refactor with default export
export class WebitelAPIItemGetter extends BaseItemGetter {
  constructor(url, defaultItem) {
    super(null, defaultItem);
    this.url = url;
  }

  async getItem(id) {
    const getUrl = `${this.url}/${id}`;

    try {
      const response = await instance.get(getUrl);
      return this.responseHandler(response);
    } catch (err) {
      throw err;
    }
  }
}

export default WebitelAPIItemGetter;
