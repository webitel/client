import {
	AgentStatus,
	ChannelState,
	ChannelType,
} from '@webitel/api-services/enums';

export const AgentStateLocaleMappings: Partial<
	Record<AgentStatus | ChannelState | ChannelType, string>
> = {
	[AgentStatus.ONLINE]: 'objects.agent.status.online',
	[AgentStatus.OFFLINE]: 'objects.agent.status.offline',
	[AgentStatus.PAUSE]: 'objects.agent.status.pause',
	[AgentStatus.BREAK_OUT]: 'objects.agent.status.breakOut',
	[ChannelState.WAITING]: 'channel.state.waiting',
	[ChannelState.DISTRIBUTE]: 'channel.state.distribute',
	[ChannelState.OFFERING]: 'channel.state.offering',
	[ChannelState.ANSWERED]: 'channel.state.answered',
	[ChannelState.ACTIVE]: 'channel.state.active',
	[ChannelState.BRIDGED]: 'channel.state.bridged',
	[ChannelState.HOLD]: 'channel.state.hold',
	[ChannelState.MISSED]: 'channel.state.missed',
	[ChannelState.WRAP_TIME]: 'channel.state.wrapTime',
	[ChannelState.PROCESSING]: 'channel.state.processing',
	[ChannelState.TRANSFER]: 'channel.state.transfer',
	[ChannelType.CALL]: 'channel.type.call',
	[ChannelType.EMAIL]: 'channel.type.email',
	[ChannelType.CHAT]: 'channel.type.chat',
	[ChannelType.JOB]: 'channel.type.task',
	[ChannelType.OUT_CALL]: 'channel.type.out_call',
};

export type AgentStateLocaleMappings =
	(typeof AgentStateLocaleMappings)[keyof typeof AgentStateLocaleMappings];
