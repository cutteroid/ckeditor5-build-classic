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

		const embedWidgetConfig = {
		    model: 'embedWidget',
		    view: {
		        name: 'figure',
		        classes: 'customEmbed'
		    }
		};
		conversion.for( 'upcast' ).elementToElement( embedWidgetConfig );
		conversion.for( 'dataDowncast' ).elementToElement( embedWidgetConfig );
		conversion.for( 'editingDowncast' ).elementToElement( {
		    model: 'customEmbed',
		    view: ( modelElement, viewWriter ) => {
		        const figure = viewWriter.createContainerElement( 'figure', { class: 'customEmbed' } );
		        return toWidget( figure, viewWriter );
		    }
		} );


		const embedURLConfig = {
		    model: 'embedUrl',
		    view: {
		        name: 'div',
		        classes: 'customEmbedUrl'
		    }
		};
		conversion.for( 'upcast' ).elementToElement( embedURLConfig );
		conversion.for( 'dataDowncast' ).elementToElement( embedURLConfig );
		conversion.for( 'editingDowncast' ).elementToElement( {
		    model: 'embedUrl',
		    view: ( modelElement, viewWriter ) => {
		        const div = viewWriter.createContainerElement( 'div', { class: 'customEmbedUrl' } );
		        return toWidgetEditable( div, viewWriter );
		    }
		} );


		const embedContentConfig = {
		    model: 'embedContent',
		    view: {
		        name: 'div',
		        classes: 'customEmbedContent'
		    }
		};
		conversion.for( 'upcast' ).elementToElement( embedContentConfig );
		conversion.for( 'dataDowncast' ).elementToElement( embedContentConfig );
		conversion.for( 'editingDowncast' ).elementToElement( {
		    model: 'embedContent',
		    view: ( modelElement, viewWriter ) => {
		        const div = viewWriter.createContainerElement( 'div', { class: 'customEmbedContent' } );
		        return toWidgetEditable( div, viewWriter );
		    }
		} );


	}

}
