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
		console.log('getViewElement', mediaHtml, this.data);

		viewElement = writer.createUIElement( 'div', attributes, function( domDocument ) {
			const domElement = this.toDomElement( domDocument );

			domElement.innerHTML = mediaHtml;

			return domElement;
		} );

		writer.setCustomProperty( 'embed-widget', true, viewElement );
		writer.setCustomProperty( 'embed-widget-data', this.data, viewElement );

		return viewElement;
	}

	/**
	 * Returns the HTML string of the media content preview.
	 *
	 * @param {module:engine/view/downcastwriter~DowncastWriter} writer The view writer used to produce a view element.
	 * @param {Object} options
	 * @param {String} [options.renderForEditingView]
	 * @returns {String}
	 */
	// _getPreviewHtml( options ) {
	//  if ( this._previewRenderer ) {
	//      return this._previewRenderer( this._match );
	//  } else {
	//      // The placeholder only makes sense for editing view and media which have URLs.
	//      // Placeholder is never displayed in data and URL-less media have no content.
	//      if ( this.url && options.renderForEditingView ) {
	//          return this._getPlaceholderHtml();
	//      }

	//      return '';
	//  }
	// }

	/**
	 * Returns the placeholder HTML when the media has no content preview.
	 *
	 * @returns {String}
	 */
	_getPreviewHtml() {

		const embedWidget = new Template( {
			tag: 'div',
			attributes: {
				class: 'postBox',
				uid: this.data.uid,
				type: this.data.type
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
							class: 'customEmbedUrl'
						},
						children: [ this.data.url ]
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
