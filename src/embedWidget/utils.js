import { isWidget, toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export function insertEmbedWidget( model, data, insertPosition ) {
	model.change( writer => {
		const mediaElement = writer.createElement( 'embedWidget', data );

		console.log('data 2', data, mediaElement);

		model.insertContent( mediaElement, insertPosition );

		writer.setSelection( mediaElement, 'on' );
	} );
}

export function createMediaFigureElement( writer, registry, data ) {
	console.log(data);
	const figure = writer.createContainerElement( 'figure', { class: 'embedWidget', type: data.type, uid: data.uid } );

	figure.getFillerOffset = null;

	writer.insert( writer.createPositionAt( figure, 0 ), registry.getMediaViewElement( writer, data ) );

	return figure;
}

export function toEmbedWidget( viewElement, writer ) {
	writer.setCustomProperty( 'embed-widget', true, viewElement );

	return toWidget( viewElement, writer );
}
