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

	// 	editor.config.define( 'embedWidget', {
	// 		providers: [
	// 			{
	// 				name: 'post',
	// 				html: data => {
	// 					return (
	// 						'<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
	// 							`<iframe src="https://www.dailymotion.com/embed/video/${ id }" ` +
	// 								'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
	// 								'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">' +
	// 							'</iframe>' +
	// 						'</div>'
	// 					);
	// 				}
	// 			},

	// 			{
	// 				name: 'spotify',
	// 				url: [
	// 					/^open\.spotify\.com\/(artist\/\w+)/,
	// 					/^open\.spotify\.com\/(album\/\w+)/,
	// 					/^open\.spotify\.com\/(track\/\w+)/
	// 				],
	// 				html: match => {
	// 					const id = match[ 1 ];

	// 					return (
	// 						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 126%;">' +
	// 							`<iframe src="https://open.spotify.com/embed/${ id }" ` +
	// 								'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
	// 								'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
	// 							'</iframe>' +
	// 						'</div>'
	// 					);
	// 				}
	// 			},

	// 			{
	// 				name: 'youtube',
	// 				url: [
	// 					/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
	// 					/^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
	// 					/^youtube\.com\/embed\/([\w-]+)/,
	// 					/^youtu\.be\/([\w-]+)/
	// 				],
	// 				html: match => {
	// 					const id = match[ 1 ];

	// 					return (
	// 						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
	// 							`<iframe src="https://www.youtube.com/embed/${ id }" ` +
	// 								'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
	// 								'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
	// 							'</iframe>' +
	// 						'</div>'
	// 					);
	// 				}
	// 			},

	// 			{
	// 				name: 'vimeo',
	// 				url: [
	// 					/^vimeo\.com\/(\d+)/,
	// 					/^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
	// 					/^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
	// 					/^vimeo\.com\/channels\/[^/]+\/(\d+)/,
	// 					/^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
	// 					/^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
	// 					/^player\.vimeo\.com\/video\/(\d+)/
	// 				],
	// 				html: match => {
	// 					const id = match[ 1 ];

	// 					return (
	// 						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
	// 							`<iframe src="https://player.vimeo.com/video/${ id }" ` +
	// 								'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
	// 								'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
	// 							'</iframe>' +
	// 						'</div>'
	// 					);
	// 				}
	// 			},

	// 			{
	// 				name: 'instagram',
	// 				url: /^instagram\.com\/p\/(\w+)/
	// 			},
	// 			{
	// 				name: 'twitter',
	// 				url: /^twitter\.com/
	// 			},
	// 			{
	// 				name: 'googleMaps',
	// 				url: /^google\.com\/maps/
	// 			},
	// 			{
	// 				name: 'flickr',
	// 				url: /^flickr\.com/
	// 			},
	// 			{
	// 				name: 'facebook',
	// 				url: /^facebook\.com/
	// 			}
	// 		]
	// 	} );

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
			url: element.getChild( 2 ).getChild( 0 )._textData,
			date: element.getChild( 3 ).getChild( 0 )._textData
		};

		return data;
	}

}
