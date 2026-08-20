import type { EngineMemberCommunication } from '@webitel/api-services/gen/models';
import { computed, type Ref, toRaw } from 'vue';

export const useMemberCommunications = (
	member: Ref<{
		communications?: EngineMemberCommunication[];
	}>,
) => {
	const communications = computed<EngineMemberCommunication[]>(() => {
		if (!member.value.communications) member.value.communications = [];
		return member.value.communications;
	});

	const add = (communication: EngineMemberCommunication) => {
		communications.value.push(communication);
	};

	const update = (index: number, communication: EngineMemberCommunication) => {
		communications.value.splice(index, 1, communication);
	};

	/**
	 * By identity, not by destination + type: two rows can legitimately be
	 * identical, and matching on their values deleted whichever came first.
	 *
	 * Compared through `toRaw`, because the rows reachable from the draft are
	 * reactive proxies while a caller may hold the underlying object — the same
	 * row then fails a plain identity check.
	 */
	const remove = (deleted: EngineMemberCommunication[]) => {
		const doomed = new Set(
			deleted.map((communication) => toRaw(communication)),
		);
		member.value.communications = communications.value.filter(
			(communication) => !doomed.has(toRaw(communication)),
		);
	};

	return {
		communications,
		add,
		update,
		remove,
	};
};
