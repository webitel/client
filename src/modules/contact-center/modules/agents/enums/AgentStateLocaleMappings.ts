import {
	AgentStatus,
	ChannelState,
	ChannelType,
} from '@webitel/api-services/enums';

export const AgentStateLocaleMappings: Partial<
	Record<AgentStatus | ChannelState | ChannelType, string>
> = {
	[AgentStatus.Online]: 'objects.agent.status.online',
	[AgentStatus.Offline]: 'objects.agent.status.offline',
	[AgentStatus.Pause]: 'objects.agent.status.pause',
	[AgentStatus.BreakOut]: 'objects.agent.status.breakOut',
	[ChannelState.Waiting]: 'channel.state.waiting',
	[ChannelState.Distribute]: 'channel.state.distribute',
	[ChannelState.Offering]: 'channel.state.offering',
	[ChannelState.Answered]: 'channel.state.answered',
	[ChannelState.Active]: 'channel.state.active',
	[ChannelState.Bridged]: 'channel.state.bridged',
	[ChannelState.Hold]: 'channel.state.hold',
	[ChannelState.Missed]: 'channel.state.missed',
	[ChannelState.WrapTime]: 'channel.state.wrapTime',
	[ChannelState.Processing]: 'channel.state.processing',
	[ChannelState.Transfer]: 'channel.state.transfer',
	[ChannelType.Call]: 'channel.type.call',
	[ChannelType.Email]: 'channel.type.email',
	[ChannelType.Chat]: 'channel.type.chat',
	[ChannelType.Job]: 'channel.type.task',
	[ChannelType.OutCall]: 'channel.type.out_call',
};

export type AgentStateLocaleMappings =
	(typeof AgentStateLocaleMappings)[keyof typeof AgentStateLocaleMappings];
