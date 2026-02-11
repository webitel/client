import FlowApp from '@webitel/flow-ui-sdk/src/enums/FlowApp.enum';

const FlowAppAutocomplete = Object.freeze({
	[FlowApp.CALENDAR]: {
		label: FlowApp.CALENDAR,
		documentation: FlowApp.CALENDAR,
		insertText: {
			[FlowApp.CALENDAR]: {
				extended: false,
				name: '',
				setVar: '',
			},
		},
	},
	[FlowApp.EXECUTE]: {
		label: FlowApp.EXECUTE,
		documentation: FlowApp.EXECUTE,
		insertText: {
			[FlowApp.EXECUTE]: {
				name: '',
			},
		},
	},
	[FlowApp.FUNCTION]: {
		label: FlowApp.FUNCTION,
		documentation: FlowApp.FUNCTION,
		insertText: {
			[FlowApp.FUNCTION]: {
				name: 'myFunction',
				actions: [],
			},
		},
	},
	[FlowApp.GOTO]: {
		label: FlowApp.GOTO,
		documentation: FlowApp.GOTO,
		insertText: {
			[FlowApp.GOTO]: 'tagName',
		},
	},
	[FlowApp.IF]: {
		label: FlowApp.IF,
		documentation: FlowApp.IF,
		insertText: {
			[FlowApp.IF]: {
				expression: '${myVar} == 1',
				then: [],
				else: [],
			},
		},
	},
	[FlowApp.JS]: {
		label: FlowApp.JS,
		documentation: FlowApp.JS,
		insertText: {
			[FlowApp.JS]: {
				data: "var time = LocalDate(); time.setDate(time.getDate() + (+${dpd}*-1)); return time.getMonth() + '-' + time.getDate() + '-' + time.getFullYear()",
				setVar: 'myVar',
			},
		},
	},
	[FlowApp.MATH]: {
		label: FlowApp.MATH,
		documentation: FlowApp.MATH,
		insertText: {
			[FlowApp.MATH]: {
				data: '',
				setVar: '',
				fn: 'round',
			},
		},
	},
	[FlowApp.SWITCH]: {
		label: FlowApp.SWITCH,
		documentation: FlowApp.SWITCH,
		insertText: {
			[FlowApp.SWITCH]: {
				variable: '${getIvrDigit}',
				case: {
					1: [],
					2: [],
					3: [],
					default: [],
				},
			},
		},
	},
	[FlowApp.STRING]: {
		label: FlowApp.STRING,
		documentation: FlowApp.STRING,
		insertText: {
			[FlowApp.STRING]: {
				data: '${caller_id_number}',
				fn: 'reverse',
				setVar: 'reverted_caller_id_number',
			},
		},
	},
	[FlowApp.MARK_IVR]: {
		label: FlowApp.MARK_IVR,
		documentation: FlowApp.MARK_IVR,
		insertText: {
			[FlowApp.MARK_IVR]: {
				name: 'Log',
				value: 'Входящий звонок',
			},
		},
	},
	[FlowApp.SOFT_SLEEP]: {
		label: FlowApp.SOFT_SLEEP,
		documentation: FlowApp.SOFT_SLEEP,
		insertText: {
			[FlowApp.SOFT_SLEEP]: 1000,
		},
	},
	[FlowApp.SET_GRANTEE]: {
		label: FlowApp.SET_GRANTEE,
		documentation: FlowApp.SET_GRANTEE,
		insertText: {
			[FlowApp.SET_GRANTEE]: {
				name: '',
				id: 1,
			},
		},
	},
	[FlowApp.SCHEMA]: {
		label: FlowApp.SCHEMA,
		documentation: FlowApp.SCHEMA,
		insertText: {
			[FlowApp.SCHEMA]: {
				name: '',
				id: 1,
			},
		},
	},
	[FlowApp.LOG]: {
		label: FlowApp.LOG,
		documentation: FlowApp.LOG,
		insertText: {
			[FlowApp.LOG]: 'log',
		},
	},
	[FlowApp.TRIGGER]: {
		label: FlowApp.TRIGGER,
		documentation: FlowApp.TRIGGER,
		insertText: {
			[FlowApp.TRIGGER]: {
				disconnected: [],
			},
		},
	},
	[FlowApp.HTTP_REQUEST]: {
		label: FlowApp.HTTP_REQUEST,
		documentation: FlowApp.HTTP_REQUEST,
		insertText: {
			[FlowApp.HTTP_REQUEST]: {
				url: '',
				method: 'POST',
				timeout: 1000,
				insecureSkipVerify: false,
				parser: 'application/json',
				responseCode: 'http_response_code',
				headers: {
					'Content-Type': 'application/json',

					Cookie: '${my_cookie}',
				},
				path: {
					id: 0,
				},
				data: {
					Name: 'Supervisor',
					UserID: 'Supervisor',
				},
				exportVariables: {
					effective_caller_id_name: 'callerIdName',
					owner_caller_id_number: 'callerIdOwner',
				},
			},
		},
	},
	[FlowApp.EXPORT_VARIABLES]: {
		label: FlowApp.EXPORT_VARIABLES,
		documentation: FlowApp.EXPORT_VARIABLES,
		insertText: {
			[FlowApp.EXPORT_VARIABLES]: [
				'reverted_caller_id_number',
			],
		},
	},
	[FlowApp.SET_VARIABLES]: {
		label: FlowApp.SET_VARIABLES,
		documentation: FlowApp.SET_VARIABLES,
		insertText: {
			[FlowApp.SET_VARIABLES]: [
				{
					key: '',
					value: '',
				},
			],
		},
	},
	[FlowApp.UN_SET_VARIABLES]: {
		label: FlowApp.UN_SET_VARIABLES,
		documentation: FlowApp.UN_SET_VARIABLES,
		insertText: {
			[FlowApp.UN_SET_VARIABLES]: [
				'reverted_caller_id_number',
			],
		},
	},
	[FlowApp.LIST]: {
		label: FlowApp.LIST,
		documentation: FlowApp.LIST,
		insertText: {
			[FlowApp.LIST]: {
				list: {
					id: 1,
					name: '',
				},
				destination: '',
			},
		},
	},
	[FlowApp.LIST_ADD]: {
		label: FlowApp.LIST_ADD,
		documentation: FlowApp.LIST_ADD,
		insertText: {
			[FlowApp.LIST_ADD]: {
				destination: '',
				list: {
					id: 1,
					name: '',
				},
				description: '',
			},
		},
	},

	[FlowApp.PLAYBACK]: {
		label: FlowApp.PLAYBACK,
		documentation: FlowApp.PLAYBACK,
		insertText: {
			[FlowApp.PLAYBACK]: {
				files: [
					{
						name: 'its_${lang}.wav',
					},
				],
				getDigits: {
					flushDTMF: true,
					max: 4,
					min: 1,
					setVar: 'getIVR',
					timeout: 3000,
					tries: 1,
				},
			},
		},
	},
	[FlowApp.RING_READY]: {
		label: FlowApp.RING_READY,
		documentation: FlowApp.RING_READY,
		insertText: {
			[FlowApp.RING_READY]: '',
		},
	},
	[FlowApp.PRE_ANSWER]: {
		label: FlowApp.PRE_ANSWER,
		documentation: FlowApp.PRE_ANSWER,
		insertText: {
			[FlowApp.PRE_ANSWER]: '',
		},
	},
	[FlowApp.ANSWER]: {
		label: FlowApp.ANSWER,
		documentation: FlowApp.ANSWER,
		insertText: {
			[FlowApp.ANSWER]: '',
		},
	},
	[FlowApp.HANGUP]: {
		label: FlowApp.HANGUP,
		documentation: FlowApp.HANGUP,
		insertText: {
			[FlowApp.HANGUP]: '',
		},
	},
	[FlowApp.SIP_REDIRECT]: {
		label: FlowApp.SIP_REDIRECT,
		documentation: FlowApp.SIP_REDIRECT,
		insertText: {
			[FlowApp.SIP_REDIRECT]: 'sip:foo@end.com',
		},
	},
	[FlowApp.RINGBACK]: {
		label: FlowApp.RINGBACK,
		documentation: FlowApp.RINGBACK,
		insertText: {
			[FlowApp.RINGBACK]: {
				all: true,
				call: {
					name: '%(1000,6000,425);loops=-1',
					type: 'tone',
				},
				hold: {
					id: 10,
				},
				transfer: {
					name: '%(1000,6000,425);loops=-1',
					type: 'tone',
				},
			},
		},
	},
	[FlowApp.BRIDGE]: {
		label: FlowApp.BRIDGE,
		documentation: FlowApp.BRIDGE,
		insertText: {
			[FlowApp.BRIDGE]: {
				endpoints: [
					{
						extension: 1008,
						idle: true,
						type: 'user',
					},
					{
						dialString: '380732327758',
						name: 'lifecell_out',
						type: 'gateway',
						parameters: {
							origination_caller_id_number: '380732327757',
							'sip_h_X-FWD-Original': '${caller_id_number}',
						},
					},
				],
			},
		},
	},
	[FlowApp.CONFERENCE]: {
		label: FlowApp.CONFERENCE,
		documentation: FlowApp.CONFERENCE,
		insertText: {
			[FlowApp.CONFERENCE]: {
				flags: [
					'audio-always',
				],
				name: 'CR-$1',
				profile: 'video-mcu-stereo',
			},
		},
	},
	[FlowApp.GENERATE_LINK]: {
		label: FlowApp.GENERATE_LINK,
		documentation: FlowApp.GENERATE_LINK,
		insertText: {
			[FlowApp.GENERATE_LINK]: {
				expire: 604800,
				server: 'https://dev.webitel.com',
				set: 'record_link',
			},
		},
	},
	[FlowApp.IN_BAND_DTMF]: {
		label: FlowApp.IN_BAND_DTMF,
		documentation: FlowApp.IN_BAND_DTMF,
		insertText: {
			[FlowApp.IN_BAND_DTMF]: 'start',
		},
	},
	[FlowApp.FLUSH_DTMF]: {
		label: FlowApp.FLUSH_DTMF,
		documentation: FlowApp.FLUSH_DTMF,
		insertText: {
			[FlowApp.FLUSH_DTMF]: true,
		},
	},
	[FlowApp.UPDATE_CID]: {
		label: FlowApp.UPDATE_CID,
		documentation: FlowApp.UPDATE_CID,
		insertText: {
			[FlowApp.UPDATE_CID]: {
				name: 'Новый клиент',
				number: '8${effective_caller_id_number}',
			},
		},
	},
	[FlowApp.PARK]: {
		label: FlowApp.PARK,
		documentation: FlowApp.PARK,
		insertText: {
			[FlowApp.PARK]: {
				name: 'myPark',
				lot: '1000-2000',
				auto: 'in',
			},
		},
	},
	[FlowApp.JOIN_QUEUE]: {
		label: FlowApp.JOIN_QUEUE,
		documentation: FlowApp.JOIN_QUEUE,
		insertText: {
			[FlowApp.JOIN_QUEUE]: {
				bucket_id: 1,
				priority: 100,
				agent: {
					extension: 1000,
				},
				queue: {
					id: 1,
				},
				ringtone: {
					id: 126,
					type: 'wav',
				},
				timers: [
					{
						actions: [
							{
								playback: {
									files: [
										{
											name: 'hold_акции.wav',
										},
									],
								},
							},
						],
						interval: 1,
						tries: 20,
					},
				],
				transferAfterBridge: {
					id: 2,
				},
			},
		},
	},
	[FlowApp.RECORD_FILE]: {
		label: FlowApp.RECORD_FILE,
		documentation: FlowApp.RECORD_FILE,
		insertText: {
			[FlowApp.RECORD_FILE]: {
				maxSec: 30,
				name: '${uuid}',
				silenceHits: 5,
				terminators: '#',
				type: 'mp3',
				voiceMail: true,
			},
		},
	},
	[FlowApp.RECORD_SESSION]: {
		label: FlowApp.RECORD_SESSION,
		documentation: FlowApp.RECORD_SESSION,
		insertText: {
			[FlowApp.RECORD_SESSION]: {
				action: 'start',
				bridged: false,
				followTransfer: true,
				minSec: 2,
				stereo: true,
				type: 'mp3',
			},
		},
	},
	[FlowApp.TTS]: {
		label: FlowApp.TTS,
		documentation: FlowApp.TTS,
		insertText: {
			[FlowApp.TTS]: {
				language: 'ru-RU',
				provider: 'google',
				text: '',
				textType: 'ssml',
			},
		},
	},
	[FlowApp.MEMBER_INFO]: {
		label: FlowApp.MEMBER_INFO,
		documentation: FlowApp.MEMBER_INFO,
		insertText: {
			[FlowApp.MEMBER_INFO]: {
				bucket_i: 1,
				completed: false,
				destination: '${caller_id_number}',
				name: 'Customer Name',
				queue_ids: [
					8,
				],
				set: {
					member_var1: 'sum',
					member_var2: 'credit',
				},
				today: true,
			},
		},
	},
	[FlowApp.GET_QUEUE_AGENTS]: {
		label: FlowApp.GET_QUEUE_AGENTS,
		documentation: FlowApp.GET_QUEUE_AGENTS,
		insertText: {
			[FlowApp.GET_QUEUE_AGENTS]: {
				queue: {
					id: 2,
				},
				set: {
					res_count: 'count',
					res_offline: 'offline',
					res_online: 'online',
					res_pause: 'pause',
					res_waiting: 'waiting',
				},
			},
		},
	},
	[FlowApp.JOIN_AGENT]: {
		label: FlowApp.JOIN_AGENT,
		documentation: FlowApp.JOIN_AGENT,
		insertText: {
			[FlowApp.JOIN_AGENT]: {
				agent: {
					extension: 1008,
				},
				bridged: [
					{
						log: 'request 1C',
					},
				],
				cancel_distribute: true,
				processing: {
					enabled: true,
					renewal_sec: 5,
					sec: 30,
				},
				queue_name: '${cc_queue_name}',
			},
		},
	},
	[FlowApp.CALLBACK_QUEUE]: {
		label: FlowApp.CALLBACK_QUEUE,
		documentation: FlowApp.CALLBACK_QUEUE,
		insertText: {
			[FlowApp.CALLBACK_QUEUE]: {
				communication: {
					destination: '${caller_id_number}',
					type_id: 1,
				},
				holdSec: 1,
				name: '${caller_id_number}',
				queue_id: 26,
				variables: {
					DPD: '${DPD}',
					internal_operator_id: '${internal_operator_id}',
					loan_id: '${Loan}',
				},
			},
		},
	},
	[FlowApp.PATCH_MEMBERS]: {
		label: FlowApp.PATCH_MEMBERS,
		documentation: FlowApp.PATCH_MEMBERS,
		insertText: {
			[FlowApp.PATCH_MEMBERS]: {
				bucket_id: 1,
				completed: false,
				destination: '${caller_id_number}',
				name: 'Customer Name',
				queue_ids: [
					8,
				],
				patch: {
					bucket_id: 2,
					name: 'sum',
					priority: 'credit',
					ready_at: 2147483647,
					stop_cause: 'cancel',
					variables: {
						new_var: 'var',
					},
				},
				today: true,
			},
		},
	},

	[FlowApp.RECV_MESSAGE]: {
		label: FlowApp.RECV_MESSAGE,
		documentation: FlowApp.RECV_MESSAGE,
		insertText: {
			[FlowApp.RECV_MESSAGE]: {
				set: 'response',
				timeout: 60,
			},
		},
	},
	[FlowApp.SEND_TEXT]: {
		label: FlowApp.SEND_TEXT,
		documentation: FlowApp.SEND_TEXT,
		insertText: {
			[FlowApp.SEND_TEXT]: {
				text: '',
			},
		},
	},
	[FlowApp.SEND_FILE]: {
		label: FlowApp.SEND_FILE,
		documentation: FlowApp.SEND_FILE,
		insertText: {
			[FlowApp.SEND_FILE]: {
				file: {},
				server: window.location.origin,
				source: 'media',
				text: '',
			},
		},
	},
	[FlowApp.SEND_EMAIL]: {
		label: FlowApp.SEND_EMAIL,
		documentation: FlowApp.SEND_EMAIL,
		insertText: {
			[FlowApp.SEND_EMAIL]: {
				from: '',
				to: [],
				cc: [],
				message: '',
				smtp: {
					_isAuth: false,
					auth: {
						password: '',
						user: '',
					},
					port: '',
					server: '',
					tls: true,
				},
				responseCode: '',
				subject: '',
				replyToId: '',
			},
		},
	},
	[FlowApp.CLASSIFIER]: {
		label: FlowApp.CLASSIFIER,
		documentation: FlowApp.CLASSIFIER,
		insertText: {
			[FlowApp.CLASSIFIER]: {
				cluster: [],
				input: '',
				set: '',
			},
		},
	},
	[FlowApp.MENU]: {
		label: FlowApp.MENU,
		documentation: FlowApp.MENU,
		insertText: {
			[FlowApp.MENU]: {
				text: '',

				set: '${onClick.Menu}',
				buttons: [],
				type: '',
			},
		},
	},
	[FlowApp.BROADCAST_CHAT_MESSAGE]: {
		label: FlowApp.BROADCAST_CHAT_MESSAGE,
		documentation: FlowApp.BROADCAST_CHAT_MESSAGE,
		insertText: {
			[FlowApp.BROADCAST_CHAT_MESSAGE]: {
				peer: [],
				profile: {},
				text: '',
				type: 'text',
			},
		},
	},

	[FlowApp.FORM_TEXTFIELD]: {
		label: FlowApp.FORM_TEXTFIELD,
		documentation: FlowApp.FORM_TEXTFIELD,
		insertText: {
			formComponent: {
				id: '',
				view: {
					label: '',
					hint: '',
					initialValue: '',
					component: 'wt-input',
				},
			},
		},
	},
	[FlowApp.FORM_SELECT]: {
		label: FlowApp.FORM_SELECT,
		documentation: FlowApp.FORM_SELECT,
		insertText: {
			formComponent: {
				id: '',
				view: {
					label: '',
					hint: '',
					initialValue: '',
					options: [],
					multiple: false,
					component: 'wt-select',
				},
			},
		},
	},
	[FlowApp.FORM_TEXT]: {
		label: FlowApp.FORM_TEXT,
		documentation: FlowApp.FORM_TEXT,
		insertText: {
			formComponent: {
				id: '',
				view: {
					label: '',
					hint: '',
					initialValue: '',
					color: 'default',
					component: 'form-text',
				},
			},
		},
	},
	[FlowApp.FORM_DATETIME_PICKER]: {
		label: FlowApp.FORM_DATETIME_PICKER,
		documentation: FlowApp.FORM_DATETIME_PICKER,
		insertText: {
			formComponent: {
				id: '',
				view: {
					label: '',
					hint: '',
					initialValue: Date.now(),
					component: 'wt-datetimepicker',
				},
			},
		},
	},
	[FlowApp.FORM_RICH_TEXT_EDITOR]: {
		label: FlowApp.FORM_RICH_TEXT_EDITOR,
		documentation: FlowApp.FORM_RICH_TEXT_EDITOR,
		insertText: {
			formComponent: {
				id: '',
				view: {
					label: '',
					hint: '',
					initialValue: '',
					output: 'html',
					component: 'rich-text-editor',
				},
			},
		},
	},
	[FlowApp.GENERATE_FORM]: {
		label: FlowApp.GENERATE_FORM,
		documentation: FlowApp.GENERATE_FORM,
		insertText: {
			[FlowApp.GENERATE_FORM]: {
				id: '',
				title: '',
				body: [],
				actions: [
					{
						id: 'id',
						view: {
							color: 'primary',
							text: 'Send',
						},
					},
				],
			},
		},
	},
	[FlowApp.ATTEMPT_RESULT]: {
		label: FlowApp.ATTEMPT_RESULT,
		documentation: FlowApp.ATTEMPT_RESULT,
		insertText: {
			[FlowApp.ATTEMPT_RESULT]: {
				stickyDisplay: true,
				description: '',
			},
		},
	},
	[FlowApp.GET_EMAIL]: {
		label: FlowApp.GET_EMAIL,
		documentation: FlowApp.GET_EMAIL,
		insertText: {
			[FlowApp.GET_EMAIL]: {
				email: {
					id: '',
					messageId: '',
				},
				set: {
					myA: 'attachments',
				},
			},
		},
	},
	[FlowApp.FORM_FILE]: {
		label: FlowApp.FORM_FILE,
		documentation: FlowApp.FORM_FILE,
		insertText: {
			[FlowApp.FORM_FILE]: {
				id: 'id',
				view: {
					initialValue: 'initialValue',
					label: 'Logo',
					hint: 'Hint',
					readonly: true,
					component: 'form-file',
				},
			},
		},
	},
	[FlowApp.CHAT_HISTORY]: {
		label: FlowApp.CHAT_HISTORY,
		documentation: FlowApp.CHAT_HISTORY,
		insertText: {
			[FlowApp.CHAT_HISTORY]: {
				conversationId: '${id}',
				variable: 'my_var',
				format: 'html',
				timeout: '3000',
				limit: '150',
			},
		},
	},
	[FlowApp.WHILE]: {
		label: FlowApp.WHILE,
		documentation: FlowApp.WHILE,
		insertText: {
			[FlowApp.WHILE]: {
				condition: '${myVar} < 10',
				maxSteps: '1000',
				do: [],
			},
		},
	},
});

export default FlowAppAutocomplete;
