const createProposals = (range) => {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
        {
            label: '"agent"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Modify agent status.",
            insertText: JSON.stringify({
                "agent": {
                    "name": "1000",
                    "status": "Available",
                    "state": "Waiting"
                }
            }, null, 4),
        },
        {
            label: '"if"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Use if … then to specify a block of code to be executed, if a specified condition is true.",
            insertText: JSON.stringify({
                "if": {
                    "expression": "${myVar} != ''",
                    "then": [],
                    "else": []
                }
            }, null, 4),
        },
        {
            label: '"switch"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Use switch to specify many alternative blocks of code to be executed.",
            insertText: JSON.stringify({
                "switch": {
                    "variable": "${IVR}",
                    "case": {
                        "1": [],
                        "2": [],
                        "3": [],
                        "default": []
                    }
                }
            }, null, 4),
        },
        {
            label: '"amd"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Answering machine detection (voice activity detection).",
            insertText: JSON.stringify({
                "amd": {
                    "maximumWordLength": 5000,
                    "maximumNumberOfWords": 3,
                    "betweenWordsSilence": 50,
                    "minWordLength": 100,
                    "totalAnalysisTime": 5000,
                    "silenceThreshold": 256,
                    "afterGreetingSilence": 800,
                    "greeting": 1500,
                    "initialSilence": 2500
                }
            }, null, 4),
        },
        {
            label: '"answer"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Answers an incoming call or session.",
            insertText: JSON.stringify({
                "answer": "200 OK"
            }, null, 4),
        },
        {
            label: '"blackList"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "The blackList application executes various actions for the blacklisted numbers.",
            insertText: JSON.stringify({
                "blackList": {
                    "name": "myNewBlackList",
                    "number": "${caller_id_number}",
                    "actions": [
                        {
                            "hangup": "INCOMING_CALL_BARRED"
                        }
                    ]
                }
            }, null, 4),
        },
        {
            label: '"bridge"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Bridge a new channel to the existing one.Generally used to route an incoming call to one or more endpoints. Multiple endpoints can be dialed simultaneously or sequentially.",
            insertText: JSON.stringify({
                "bridge": {
                    "strategy": "multiple",
                    "pickup": "mygroup",
                    "codecs": ["G729", "PCMA"],
                    "parameters": ["instant_ringback=true"],
                    "endpoints": [
                        {
                            "name": "gw_name1",
                            "type": "sipGateway",
                            "dialString": "$1",
                            "parameters": ["sip_invite_params=user=phone"]
                        },
                        {
                            "name": "1000",
                            "type": "device",
                            "parameters": ["leg_timeout=15"]
                        },
                    ]
                }
            }, null, 4),
        },
        {
            label: '"cache"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "The application can be used to distribute key/value pairs without having to resort to using a database.",
            insertText: JSON.stringify({
                    "cache": {
                        "method": "add",
                        "expire": 10,
                        "key": "CID",
                        "value": "${caller_id_number}"
                    }
                }, null, 4),
        },
        {
            label: '"calendar"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Set true or false into the variable when current datetime is in the Calendar.",
            insertText: JSON.stringify({
                "calendar": {
                    "name": "my Business Calendar",
                    "extended": false,
                    "setVar": "isWorkDay"
                }
            }, null, 4),
        },
        {
            label: '"callback"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Add number to the callback queue.",
            insertText: JSON.stringify({
                "callback": {
                    "setVar": "return_value",
                    "widget": "myWidget",
                    "queue": "callbackQueueName",
                    "number": "${caller_id_number}",
                    "comment": "Additional comment"
                }
            }, null, 4),
        },
        {
            label: '"cdr"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Create search request into the CDR.",
            insertText: JSON.stringify({
                "cdr": {
                    "exportVar": {
                        "avg_wait": "aggregations.waiting.value"
                    },
                    "elastic": {
                        "aggs": {
                            "waiting": {
                                "avg": {
                                    "field": "queue.wait_duration"
                                }
                            }
                        },
                        "index": "cdr-a*",
                        "limit": 0,
                        "query": "*",
                        "filter": {
                            "bool": {
                                "must": [
                                    {
                                        "match": {
                                            "queue.name": "myQueue"
                                        }
                                    },
                                    {
                                        "range": {
                                            "created_time": {
                                                "gte": "now-1h",
                                                "lte": "now"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }, null, 4),
        },
        {
            label: '"conference"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "The inbound and outbound conference bridge service.",
            insertText: JSON.stringify({
                "conference": {
                    "name": "ConferenceName",
                    "pin": "1234",
                    "flags": ["mute", "moderator"]
                }
            }, null, 4),
        },
        {
            label: '"inBandDTMF"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "You can use inBandDTMF to enable in-band DTMF detection (i.e. the detection of DTMF tones on a channel). You should do this when you want to be able to identify DTMF tones on a channel that doesn’t otherwise support another signaling method (like RFC2833 or INFO).",
            insertText: JSON.stringify({
                    "inBandDTMF": "start"
                }, null, 4),
        },
        {
            label: '"flushDTMF"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Flushes DTMFs received on a channel. Useful in cases where callers may have entered extra digits in one dialog and you want to flush them out before sending them into another dialog.",
            insertText: JSON.stringify({
                "eavesdrop": {
                    "user": "1000",
                    "spy": false
                }
            }, null, 4),
        },
        {
            label: '"echo"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Simply returns all audio sent, including voice, DTMF, etc after the specified delay milliseconds.",
            insertText: JSON.stringify({echo: "0"}, null, 4),
        },
        {
            label: '"exists"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Determines whether the given resource exists or not.",
            insertText: JSON.stringify({
                "exists": {
                    "resource": "media",
                    "name": "myFile.wav",
                    "type": "wav",
                    "setVar": "DoesMyFileExist"
                }
            }, null, 4),
        },
        {
            label: '"sendEmail"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Sending an Email.",
            insertText: JSON.stringify({
                "sendEmail": {
                    "to": [
                        "office@gmail.com",
                        "support@webitel.ua"
                    ],
                    "subject": "[webitel](${Caller - Caller - ID - Number}) SMS notification",
                    "message": "<h3>Turn on SMS</h3>\\n<b>Creditcard</b>: \${Creditcard[0]} <i>***</i> \${Creditcard[1]}"
                }
            }, null, 4),
        },
        {
            label: '"receiveFax"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Receive a FAX as a PDF file.",
            insertText: JSON.stringify({
                "receiveFax": {
                    "enable_t38": false,
                    "email": ["office@webitel.com", "admin@webitel.com"]
                }
            }, null, 4),
        },
        {
            label: '"js"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Executes JavaScript code.",
            insertText: JSON.stringify({
                "js": {
                    "data": "var time = LocalDate(); time.setDate(time.getDate() + (+${dpd}*-1)); return time.getMonth() + '-' + time.getDate() + '-' + time.getFullYear()",
                    "setVar": "myVar"
                }
            }, null, 4),
        },
        {
            label: '"goto"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Immediately goto an another extension (or route) and exit from current extension.",
            insertText: JSON.stringify({
                    "goto": "public:my_extension"
                }, null, 4),
        },
        {
            label: '"hangup"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Hangs up a current channel, with an optional cause code supplied.",
            insertText: JSON.stringify({
                "hangup": ""
            }, null, 4),
        },
        {
            label: '"httpRequest"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Send HTTP Request.",
            insertText: JSON.stringify({
                "httpRequest": {
                    "url": "https://sales.bpmonline.com/ServiceModel/AuthService.svc/Login",
                    "method": "POST",
                    "timeout": 2000,
                    "responseCode": "http_response_code",
                    "exportCookie": "my_cookie",
                    "data": {
                        "UserName": "Supervisor",
                        "UserPassword": "Supervisor"
                    }
                }
            }, null, 4),
        },
        {
            label: '"log"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Logs a string of text to the console.",
            insertText: JSON.stringify({
                "log": "my log message"
            }, null, 4),
        },
        {
            label: '"math"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Math application allows you to perform mathematical tasks on numbers.",
            insertText: JSON.stringify({
                "math": {
                    "data": "${caller_id_array}",
                    "setVar": "new_random_caller_id",
                    "fn": "random"
                }
            }, null, 4),
        },
        {
            label: '"member"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Add new member to the dilaer.",
            insertText: JSON.stringify({
                "member": {
                    "dialer": "57a77ecbe5440b0c002ca16d",
                    "name": "${effective_caller_id_name}",
                    "priority": 10,
                    "variables": {
                        "DID": "380322530550"
                    },
                    "communications": [
                        {
                            "number": "380442228392",
                            "priority": 5,
                            "type": "1",
                            "description": "call was missed"
                        }
                    ]
                }
            }, null, 4),
        },
        {
            label: '"originate"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Originate a new call.",
            insertText: JSON.stringify({
                "originate": {
                    "uuid": "${new_uuid}",
                    "delay": 2,
                    "timeout": 40,
                    "cid_num": "${caller_id_number}",
                    "cid_name": "${caller_id_name}",
                    "exportVar": {
                        "other_uuid": "${uuid}",
                        "new_uuid": "${new_uuid}"
                    },
                    "endpoint": {
                        "name": "gw_name1",
                        "type": "sipGateway",
                        "dialString": "${caller_id2}",
                        "parameters": ["ignore_early_media=true"]
                    },
                    "actions": [
                        {
                            "playback": {
                                "name": "my.mp3",
                                "type": "mp3"
                            }
                        },
                        {
                            "bridge": {
                                "uuid": "${new_uuid}",
                                "other_uuid": "${other_uuid}"
                            }
                        }
                    ]
                }
            }, null, 4),
        },
        {
            label: '"park"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Places a channel “on hold” in the switch, instead of in the phone.",
            insertText: JSON.stringify({
                "park": {
                    "name": "myPark",
                    "lot": "1000-2000",
                    "auto": "in"
                }
            }, null, 4),
        },
        {
            label: '"pickup"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Permits proper answering of multiple simultaneous calls to the same pickup group.",
            insertText: JSON.stringify({
                "pickup": "mygroup"
            }, null, 4),
        },
        {
            label: '"playback"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Play an audio file or tone stream.",
            insertText: JSON.stringify({
                "playback": {
                    "name": "enter_ext.wav",
                    "type": "wav",
                    "getDigits": {
                        "setVar": "getIvrDigit",
                        "min": 3,
                        "max": 4,
                        "tries": 1,
                        "timeout": 2000,
                        "flushDTMF": true
                    }
                }
            }, null, 4),
        },
        {
            label: '"queue"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "An inbound call queuing application that can be used for call center needs.",
            insertText: JSON.stringify({
                "queue": {
                    "name": "myQueueName",
                    "transferAfterBridge": "public:feedback_ivr_menu",
                    "timer": {
                        "interval": 90,
                        "tries": 1,
                        "actions": [
                            {
                                "ccPosition": {
                                    "var": "cc_my_position"
                                }
                            },
                            {
                                "playback": {
                                    "files": [
                                        {
                                            "name": "ivr/ivr-you_are_number.wav",
                                            "type": "local"
                                        },
                                        {
                                            "name": "${cc_my_position}",
                                            "type": "say",
                                            "lang": "en",
                                            "method": "number pronounced"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            }, null, 4),
        },
        {
            label: '"recordFile"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Record to a file from the channel’s input media stream.",
            insertText: JSON.stringify({
                "recordFile": {
                    "name": "MySuperFile",
                    "terminators": "#",
                    "type": "mp3",
                    "maxSec": 60,
                    "silenceHits": 5,
                    "email": ["office@webitel.com", "admin@webitel.com"],
                    "emailSubject": "You have a new message!",
                    "emailBody": "Message fom ${caller_id_number}"
                }
            }, null, 4),
        },
        {
            label: '"recordSession"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Records an entire phone call or session.",
            insertText: JSON.stringify({
                "recordSession": {
                    "action": "start",
                    "type": "mp3",
                    "stereo": true,
                    "bridged": true,
                    "minSec": 2,
                    "followTransfer": true,
                    "email": ["office@webitel.com", "admin@webitel.com"],
                    "emailSubject": "You have a new message!",
                    "emailBody": "Message fom ${caller_id_number}"
                }
            }, null, 4),
        },
        {
            label: '"ringback"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Ringback call lets you set artificial ringback on a channel that is waiting for an originated call to be answered.",
            insertText: JSON.stringify({
                "ringback": {
                    "call": {
                        "name": "my.mp3",
                        "type": "mp3"
                    },
                    "hold": {
                        "type": "silence"
                    },
                    "transfer": {
                        "name": "${us-ring}",
                        "type": "tone"
                    }
                }
            }, null, 4),
        },
        {
            label: '"schedule"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Schedule a hangup or goto in the future. Also, you can schedule a callback.",
            insertText: JSON.stringify({
                    "schedule": {
                        "action": "hangup",
                        "seconds": 360,
                        "data": "ALLOTTED_TIMEOUT"
                    }
                }, null, 4),
        },
        {
            label: '"sendEvent"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "sendEvent application can be used to fire arbitrary events.",
            insertText: JSON.stringify({
                "sendEvent": {
                    "dump": false,
                    "data": {
                        "myUUID": "${uuid}"
                    }
                }
            }, null, 4),
        },
        {
            label: '"sipRedirect"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Can redirect a SIP channel to another endpoint.",
            insertText: JSON.stringify({
                    "sipRedirect": ["sip:foo@bar.com", "sip:foo@end.com"]
                }, null, 4),
        },
        {
            label: '"setSounds"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Set sound file package. There are a number of sound file packages available.",
            insertText: JSON.stringify({
                "setSounds": {
                    "voice": "elena",
                    "lang": "ru_RU"
                }
            }, null, 4),
        },
        {
            label: '"sleep"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Pause the channel for a given number of milliseconds, consuming the audio for that period of time. Calling sleep also will consume any outstanding RTP on the operating system’s input queue, which can be very useful in situations where audio becomes backlogged.",
            insertText: JSON.stringify({
                "sleep": 1000
            }, null, 4),
        },
        {
            label: '"script"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "String application help you to work with strings.",
            insertText: JSON.stringify({
                    "string": {
                        "data": "${caller_id_number}",
                        "fn": "replace",
                        "setVar": "effective_caller_id_number",
                        "args": [
                            "/^0/",
                            "+84"
                        ]
                    }
                }, null, 4),
        },
        {
            label: '"stt"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Speech-To-Text.",
            insertText: JSON.stringify({
                "stt": {
                    "lang": "uk-UA",
                    "maxSec": 15,
                    "silenceThresh": 200,
                    "silenceHits": 3,
                    "setVar": "myTextVar"
                }
            }, null, 4),
        },
        {
            label: '"tts"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Text-To-Speech.",
            insertText: JSON.stringify({
                "tts": {
                    "provider": "polly",
                    "accessKey": "GDNYEHJWNNYYWBJNOZA",
                    "accessToken": "c1j5QSPx9H63jmwtwMojSZiQ9QeO+3v",
                    "voice": "Maxim",
                    "textType": "ssml",
                    "text": "<speak><amazon:effect name=\"whispered\">If you make any noise, </amazon:effect> she said, <amazon:effect name=\"whispered\">they will hear us.</amazon:effect></speak>"
                }
            }, null, 4)
        },
        {
            label: '"setUser"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Pulls all of the channel variables defined for a user as if the user had auth’d.",
            insertText: JSON.stringify({
                "setUser": {
                    "name": "102"
                }
            }, null, 4),
        },
        {
            label: '"findUser"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Find an user by variables or parameters.",
            insertText: JSON.stringify({
                "findUser": {
                    "filter": {
                        "vm-password": "${userPIN}"
                    },
                    "columns": [
                        "id",
                        "effective_caller_id_name"
                    ],
                    "exportVariables": {
                        "ext_id": "0.id",
                        "effective_caller_id_name": "0.effective_caller_id_name"
                    }
                }
            }, null, 4),
        },
        {
            label: '"userData"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Retrieves user variables as defined in the directory.",
            insertText: JSON.stringify({
                "userData": {
                    "name": "102",
                    "var": "account_state",
                    "setVar": "acc_state"
                }
            }, null, 4),
        },
        {
            label: '"setVar"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Set a channel variable.",
            insertText: JSON.stringify({
                    "setVar": ["a=1", "b=2", "c=3"]
                }, null, 4),
        },
        {
            label: '"setArray"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Set array of variables",
            insertText: JSON.stringify({
                "setArray": {
                    "myArray": [
                        "val1", "val2", "val3"
                    ]
                }
            }, null, 4),
        },
        {
            label: '"setProfileVar"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Set profile variable.",
            insertText: JSON.stringify({
                "setProfileVar": [
                    "caller_id_name=Customer"
                ]
            }, null, 4),
        },
        {
            label: '"exportVars"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "exportVars lists variables to be exported to the webitel client side upon JavaScript library.",
            insertText: JSON.stringify({
                "exportVars": [
                    "ivrLang",
                    "mainMenuAction",
                    "subMenuAction"
                ]
            }, null, 4),
        },
        {
            label: '"unSet"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Clears out a channel variable.",
            insertText: JSON.stringify({
                "unSet": "sip_h_call-info"
            }, null, 4),
        },
        {
            label: '"voicemail"',
            range,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Voicemail application lets you send calls to voicemail, which allows callers to leave messages for users and allows users to retrieve and manage any messages left by callers.",
            insertText: JSON.stringify({
                "voicemail": {
                    "user": "100",
                    "skip_greeting": true,
                    "skip_instructions": true,
                    "cc": [
                        "1001",
                        "1002"
                    ]
                }
            }, null, 4),
        },
    ]
};

export const Monaco = (() => {
    let instance;

    const createInstance = () => {
        return monaco;
    };

    const registerCompletion = (instance) => {
        instance.languages.registerCompletionItemProvider('json', {
            provideCompletionItems: (model, position, context, token) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endLineNumber: position.lineNumber,
                    endColumn: word.endColumn,
                };
                return {
                    suggestions: createProposals(range),
                }
            }
        });
    };

    return {
        getInstance() {
            if(!instance) {
                instance = createInstance();
                registerCompletion(instance);
            }
            return instance;
        }
    }
})();