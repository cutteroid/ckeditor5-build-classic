import Template from '@ckeditor/ckeditor5-ui/src/template';

export default class EmbedRegistry {

	getMediaViewElement( writer, data ) {
		return this._getMedia( data ).getViewElement( writer );
	}

	_getMedia( data ) {
		return new EmbeddedData( data );
	}

}

class EmbeddedData {

	constructor( data ) {
		this.data = data;
	}

	getViewElement( writer ) {
		const attributes = {};
		let viewElement;


		attributes.class = 'postBlock';

		const mediaHtml = this._getPreviewHtml( );

		viewElement = writer.createUIElement( 'div', attributes, function( domDocument ) {
			const domElement = this.toDomElement( domDocument );

			domElement.innerHTML = mediaHtml;

			return domElement;
		} );

		writer.setCustomProperty( 'embed-widget', true, viewElement );
		writer.setCustomProperty( 'embed-widget-data', this.data, viewElement );

		return viewElement;
	}

	_getPreviewHtml() {

		const embedWidget = new Template( {
			tag: 'div',
			attributes: {
				class: 'postBox'
			},
			children: this._getPreviewContent()
		} ).render();

		return embedWidget.outerHTML;
	}

	_getPreviewContent() {

		var children = [];

		switch (this.data.type) {
			case "post":
				children = [
					{
						tag: 'div',
						attributes: {
							class: 'customEmbedAuthor'
						},
						children: [ this.data.author ]
					},
					{
						tag: 'div',
						attributes: {
							class: 'customEmbedContent'
						},
						children: [ this.data.text ]
					},
					{
						tag: 'div',
						attributes: {
							class: 'customEmbedUrl'
						},
						children: [ this.data.url ]
					},
					{
						tag: 'div',
						attributes: {
							class: 'customEmbedDate'
						},
						children: [ this.data.date ]
					}
				]
				break
		}

		return children;
	}
}
