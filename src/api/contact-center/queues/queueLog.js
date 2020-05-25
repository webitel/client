import { MemberServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import store from '../../../store/store';

const queueMemberAttemptsService = new MemberServiceApiFactory(configuration, '', instance);
export const getQueueCallLogList = async (queueId, page = 0, size = 10, sort) => {
    const { domainId } = store.state.userinfo;
    try {
       const response = await queueMemberAttemptsService.searchAttemptsHistory(
            page,
            size,
            0,
            Date.now() * 1000,
            undefined,
            queueId,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            sort,
            domainId,
        );
        if (response.items) {
            return response.items;
        }
        return [];
    } catch (err) {
        throw err;
    }
};
