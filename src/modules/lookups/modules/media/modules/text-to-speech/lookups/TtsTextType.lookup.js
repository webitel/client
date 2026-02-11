import TtsTextTypeEnum from '../enums/TtsTextType.enum';

const TtsTextType = Object.freeze([
	{
		locale: 'vocabulary.text',
		value: TtsTextTypeEnum.TEXT,
	},
	{
		locale: 'objects.lookups.media.tts.textType.ssml',
		value: TtsTextTypeEnum.SSML,
	},
]);

export default TtsTextType;
