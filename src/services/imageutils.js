const IMAGE_URL = "http://images.huwolai.com"
export function imageWithSize(path, width, heigth) {
	let queryParam = "";
	if (width) {
		queryParam += "width=" + width + "&"
	}
	if (heigth) {
		queryParam += "heigth=" + heigth
	}
	return IMAGE_URL + `${path}?${queryParam}`
}

//小图
export function imageWithSmall(path) {

	return imageWithSize(path, 120)
}

//中小图 
export function imageWithMSmall(path) {

	return imageWithSize(path, 166)
}