function contentURL(url, def) {
	if (url) {
		if (url.indexOf('content/') == 0)
			return '/' + url;
		else
			return url;
	} else {
		return def;
	}
}
