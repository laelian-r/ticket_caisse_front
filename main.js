const form = document.querySelector("form");
const article = document.getElementById("article");
const qty = document.getElementById("qty");
const price = document.getElementById("price");
const tbody = document.getElementById("tbody");
const tfoot = document.getElementById("tfoot");

async function getArticles() {
	const response = await fetch("http://localhost:3002/articles");
	const articles = await response.json();

	articles.forEach((e) => {
		tbody.innerHTML += `
			<tr>
				<td>${e.article}</td>
				<td>${e.quantite}</td>
				<td>${e.prix}</td>
				<td>${e.quantite * e.prix}</td>
			</tr>
    	`;
	});
}
getArticles();

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const articleValue = article.value.trim();
	const qtyValue = parseInt(qty.value);
	const priceValue = parseFloat(price.value);

	if (articleValue !== "" && qtyValue !== "" && priceValue !== "") {
		await fetch("http://localhost:3002/articles", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				article: articleValue,
				quantite: qtyValue,
				prix: priceValue,
			}),
		});

		tbody.innerHTML = "";
		getArticles();
	}
});
