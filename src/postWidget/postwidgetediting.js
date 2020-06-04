import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

export default class PostWidgetEditing extends Plugin {

	static get requires() {
		return [ Widget ];
	}

	init() {
		this._defineSchema();
		this._defineConverters();
	}

	_defineSchema() {

		const schema = this.editor.model.schema;

		schema.register( 'postWidget', {
			isObject: true,
			allowWhere: '$block'
		} );

		schema.register( 'postWidgetAuthor', {
			isLimit: true,
			allowIn: 'postWidget',
			allowContentOf: '$block'
		} );

		schema.register( 'postWidgetContent', {
			isLimit: true,
			allowIn: 'postWidget',
			allowContentOf: '$root'
		} );

		schema.register( 'postWidgetDate', {
			isLimit: true,
			allowIn: 'postWidget',
			allowContentOf: '$block'
		} );
	}

	_defineConverters() {

		const conversion = this.editor.conversion;

		conversion.elementToElement( {
			model: 'postWidget',
			view: {
				name: 'figure',
				classes: 'forumPost'
			}
		} );

		conversion.elementToElement( {
			model: 'postWidgetAuthor',
			view: {
				name: 'h3',
				classes: 'forumPostAuthor'
			}
		} );

		conversion.elementToElement( {
			model: 'postWidgetContent',
			view: {
				name: 'div',
				classes: 'forumPostContent'
			}
		} );

		conversion.elementToElement( {
			model: 'postWidgetDate',
			view: {
				name: 'div',
				classes: 'forumPostDate'
			}
		} );
	}

}
