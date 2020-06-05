import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

export default class EmbedWidgetEditing extends Plugin {

	static get requires() {
		return [ Widget ];
	}

	init() {
		this._defineSchema();
		this._defineConverters();
	}

	_defineSchema() {

		const schema = this.editor.model.schema;

		schema.register( 'embedWidget', {
			isObject: true,
			allowWhere: '$block'
		} );

		// schema.register( 'postWidgetAuthor', {
		// 	isLimit: true,
		// 	allowIn: 'postWidget',
		// 	allowContentOf: '$block'
		// } );

		schema.register( 'embedUrl', {
			isLimit: true,
			allowIn: 'embedWidget',
			allowContentOf: '$block'
		} );

		schema.register( 'embedContent', {
			isLimit: true,
			allowIn: 'embedWidget',
			allowContentOf: '$root'
		} );

		schema.register( 'embedDate', {
			isLimit: true,
			allowIn: 'embedWidget',
			allowContentOf: '$block'
		} );
	}

	_defineConverters() {

		const conversion = this.editor.conversion;

		conversion.elementToElement( {
			model: 'embedWidget',
			view: {
				name: 'figure',
				classes: 'customEmbed'
			}
		} );

		// conversion.elementToElement( {
		// 	model: 'postWidgetAuthor',
		// 	view: {
		// 		name: 'h3',
		// 		classes: 'forumPostAuthor'
		// 	}
		// } );


		conversion.elementToElement( {
			model: 'embedUrl',
			view: {
				name: 'div',
				classes: 'customEmbedUrl'
			}
		} );

		conversion.elementToElement( {
			model: 'embedContent',
			view: {
				name: 'div',
				classes: 'customEmbedContent'
			}
		} );

		conversion.elementToElement( {
			model: 'embedDate',
			view: {
				name: 'div',
				classes: 'forumPostDate'
			}
		} );
	}

}
