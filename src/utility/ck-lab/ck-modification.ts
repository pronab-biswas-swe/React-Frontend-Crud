import htmlToPdfMake from './html-to-json';

const a4InnerWidth = 545.28;

const calculatePdfInnerWidth = (selfWidthPersent: string, parentWidth = a4InnerWidth) =>
	parentWidth * (+selfWidthPersent?.split('%')?.[0] / 100);

export const ckToHtmlPreview = (html: string) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	const figure: NodeListOf<HTMLElement> = doc.querySelectorAll('figure');
	figure.forEach((f: any) => {
		switch (f?.firstChild?.nodeName) {
			case 'IMG':
				if (f?.style.width) {
					if (f.className?.includes('image-style-side')) {
						f.firstChild['style'].float = 'right';
					} else {
						f.firstChild['style'].display = 'block';
						f.firstChild['style'].margin = 'auto';
						f.firstChild['style'].marginBottom = '0.5rem';
					}
				}
				f.firstChild['style'].width = f.firstChild['style'].width || f.style.width || '100%';
				f.firstChild['style'].maxWidth = f.firstChild['style'].width;
				break;

			case 'TABLE':
				if (f?.style?.width) {
					f.firstChild['style'].width = f.style.width;
				} else f.firstChild['style'].width = '100%';
				break;
		}
		while (f.firstChild) {
			f.parentNode.insertBefore(f.firstChild, f);
		}
		f.parentNode.removeChild(f);
	});

	// Replace all <p>&nbsp;</p> with <br/>
	const paragraphs: NodeListOf<HTMLElement> = doc.querySelectorAll('p');
	paragraphs.forEach((p) => {
		if (p.textContent?.trim() === '') p.outerHTML = '<br/>';
	});

	// Set all image height to auto
	const img = doc.querySelectorAll('img');
	img?.forEach((i) => {
		i.style.maxWidth = i.style?.width;
		i.style.height = 'auto';
	});

	return doc.body.innerHTML.toString();
};

export const ckToPdfMake = (html: string, innerWidth?: number) => {
	if (!html) return [];
	let cleanHtml = ckToHtmlPreview(html);
	cleanHtml = cleanHtml.replace(/&nbsp;/g, '');
	const json: any = htmlToPdfMake(cleanHtml, {
		tableAutoSize: true,
		ignoreStyles: ['font-family'],
	});
	json.forEach((js: any) => {
		switch (js?.nodeName) {
			case 'IMG':
				js.alignment = js?.display === 'block' ? 'center' : js?.float === 'right' ? 'right' : 'left';
				js.width = calculatePdfInnerWidth(js?.maxWidth, innerWidth);
				break;
			case 'P':
				if (js?.stack?.[0]?.nodeName === 'IMG')
					js.stack[0].width = calculatePdfInnerWidth(js?.stack?.[0]?.maxWidth, innerWidth);
				break;
		}
	});
	return json;
};
