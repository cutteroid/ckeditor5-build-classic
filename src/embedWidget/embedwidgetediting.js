import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget'
import InsertEmbedWidgetCommand from './insertembedwidgetcommand.js'

export default class EmbedWidgetEditing extends Plugin {

	static get requires() {
		return [ Widget ];
	}

	init() {
		this._defineSchema();
		this._defineConverters();

		  this.editor.commands.add( 'insertEmbedWidget', new InsertEmbedWidgetCommand( this.editor ) );
	}

	_defineSchema() {

		const schema = this.editor.model.schema;

		schema.register( 'embedWidget', {
			isObject: true,
			allowWhere: '$block',
			allowAttributes: [ 'type', 'uid' ]
		} );

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

		conversion.for( 'upcast' ).elementToElement( {
		    model: ( viewElement, modelWriter ) => {
		        const el = modelWriter.createElement( 'embedWidget', { class: 'customEmbed', type: viewElement.getAttribute( 'type' ), uid: viewElement.getAttribute( 'uid' ) } );
		        return el;
		    },
		    view: {
		        name: 'figure',
		        classes: 'customEmbed'
		    }
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'embedWidget',
		    view: ( modelElement, viewWriter ) => {
		    	console.log('dataDowncast', modelElement);
		        const figure = viewWriter.createContainerElement( 'figure', { class: 'customEmbed', type: modelElement.getAttribute( 'type' ), uid: modelElement.getAttribute( 'uid' ) } );
		        return figure;
		    }
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
		    model: 'embedWidget',
		    view: ( modelElement, viewWriter ) => {
		    	console.log('editingDowncast', modelElement);
		        const figure = viewWriter.createContainerElement( 'figure', { class: 'customEmbed', type: modelElement.getAttribute( 'type' ), uid: modelElement.getAttribute( 'uid' ) } );
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

		const embedDateConfig = {
		    model: 'embedDate',
		    view: {
		        name: 'div',
		        classes: 'customEmbedDate'
		    }
		};
		conversion.for( 'upcast' ).elementToElement( embedDateConfig );
		conversion.for( 'dataDowncast' ).elementToElement( embedDateConfig );
		conversion.for( 'editingDowncast' ).elementToElement( {
		    model: 'embedDate',
		    view: ( modelElement, viewWriter ) => {
		        const div = viewWriter.createContainerElement( 'div', { class: 'customEmbedDate' } );
		        return toWidgetEditable( div, viewWriter );
		    }
		} );

	}

}
