import { AgentStatus, ChannelState, ChannelType } from 'webitel-sdk';

const agentState = Object.freeze({
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
	[ChannelState.Hold]: 'channel.state.bridged',
	[ChannelState.Missed]: 'channel.state.hold',
	[ChannelState.WrapTime]: 'channel.state.wrapTime',
	[ChannelState.Processing]: 'channel.state.processing',
	[ChannelState.Transfer]: 'channel.state.transfer',
	[ChannelType.Call]: 'channel.type.call',
	[ChannelType.Email]: 'channel.type.email',
	[ChannelType.Chat]: 'channel.type.chat',
});
export default agentState;
