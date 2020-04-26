function hide_and_see(item) {
	console.log(item)

	let item_body = document.getElementById(`part_${item}`).querySelector(".card-body");
	item_body.style.display = item_body.style.display == 'none' ? "block" : "none";
}