const isStyleExtension = (extension: string) => {
	if (extension === 'css' || extension === 'scss'){
		return true
	}
	return false
}

module.exports = isStyleExtension