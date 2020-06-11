import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget'
import InsertEmbedWidgetCommand from './insertembedwidgetcommand.js'
import { modelToViewUrlAttributeConverter } from './converters';
import EmbedRegistry from './embedregistry';
import { toEmbedWidget, createMediaFigureElement } from './utils';

export default class EmbedWidgetEditing extends Plugin {

	static get requires() {
		return [ Widget ];
	}

	constructor( editor ) {
		super( editor );
		this.registry = new EmbedRegistry();
	}

	init() {

		const registry = this.registry;
		const editor = this.editor;
		const schema = editor.model.schema;
		const t = editor.t;
		const conversion = editor.conversion;


		this.editor.commands.add( 'insertEmbedWidget', new InsertEmbedWidgetCommand( this.editor ) );

		schema.register( 'embedWidget', {
			isObject: true,
			isBlock: true,
			allowWhere: '$block',
			allowAttributes: [ 'type', 'uid', 'text', 'url', 'date', 'author' ]
		} );

		// Model -> Data
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'embedWidget',
			view: ( modelElement, viewWriter ) => {
				var data = this._getAttributesData(modelElement);

				return createMediaFigureElement( viewWriter, registry, data );
			}
		} );

		conversion.for( 'dataDowncast' ).add(
			modelToViewUrlAttributeConverter( registry )
		);

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'embedWidget',
			view: ( modelElement, viewWriter ) => {
				var data = this._getAttributesData(modelElement);


				const figure = createMediaFigureElement( viewWriter, registry, data );

				return toEmbedWidget( figure, viewWriter );
			}
		} );

		conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'figure',
				attributes: {
					type: true,
					uid: true
				}
			},
			model: ( viewMedia, modelWriter ) => {
				var data = this._getValuesData(viewMedia);

				return modelWriter.createElement( 'embedWidget', data );
			}
		} );

	}

	_getAttributesData(element)
	{
		var data = {
			type: element.getAttribute( 'type' ),
			uid: element.getAttribute( 'uid' ),
			text: element.getAttribute('text'),
			date: element.getAttribute('date'),
			url: element.getAttribute('url'),
			author: element.getAttribute('author')
		};

		return data;
	}

	_getValuesData(figureElement)
	{
		var element = figureElement.getChild( 0 ).getChild( 0 );

		var data = {
			type: figureElement.getAttribute( 'type' ),
			uid: figureElement.getAttribute( 'uid' ),
			author: element.getChild( 0 ).getChild( 0 )._textData,
			text: element.getChild( 1 ).getChild( 0 )._textData,
			url: element.getChild( 3 ).getChild( 0 )._textData,
			date: element.getChild( 2 ).getChild( 0 )._textData
		};

		return data;
	}

}
