function showAuth(authType) {
	var authTypes = RB.Dom.getChildren('auth-types');
	for (i=0; i < authTypes.length; i++) {
		RB.Dom.setStyle(authTypes[i], 'display','none');
		RB.Dom.removeClass('auth-select-' + authTypes[i].id.replace('auth-form-', ''), 'selected');
	}
	RB.Dom.setStyle('auth-form-' + authType, 'display','');
	RB.Dom.addClass('auth-select-' + authType, 'selected');
}