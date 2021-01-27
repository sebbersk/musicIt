const removeTag = (text) => {
	const regex = /<\/?[^>].+(>|$)/gm;
	return text.replace(regex, '');
};

export { removeTag };
