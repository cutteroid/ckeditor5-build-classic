import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

import PostWidgetEditing from './postwidgetediting';
import PostWidgetUI from './postwidgetui';

export default class PostWidget extends Plugin {
	/**
	 * @inherptDocui
	 */
	static get requires() {
		return [ Widget, PostWidgetEditing, PostWidgetUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'PostContent';
	}
}
