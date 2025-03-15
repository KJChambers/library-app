"use client";

import { fetchAuthorFromKey, fetchWorks, HandleISBN } from "./book";

export const handleIsbnChange = async (
	inputISBN,
	setBookPrev,
	setIsbnTen,
	setIsbnExists,
	setWorksData,
	setAuthorPrev,
	setOpen,
	updateISBN = false,
	formData = {},
	setFormData = null
) => {
	const resetState = () => {
		setIsbnExists(false);
		setIsbnTen(false);
		setOpen(false);
	};

	if (updateISBN) setFormData({ ...formData, ISBN: inputISBN });

	const cleanISBN = inputISBN.replace(/-/g, "").trim();
	if (![10, 13].includes(cleanISBN.length)) return resetState();

	const res = await HandleISBN(cleanISBN);

	setBookPrev(res.bookData || {});
	setIsbnTen(res.isbnTen);

	if (res.isbnExists) return setIsbnExists(true);
	setIsbnExists(false);

	if (res.isbnTen || !res.bookData) return;

	const worksDataRes = res.bookData.works?.[0]?.key
		? await fetchWorks(res.bookData.works[0].key)
		: {};
	setWorksData(worksDataRes);

	const authorKey =
		res.bookData.authors?.[0]?.key || worksDataRes.authors?.[0]?.author.key;
	if (authorKey) {
		const authorData = await fetchAuthorFromKey(authorKey);
		setAuthorPrev(
			authorData.name || authorData.personal_name || "Unknown Author"
		);
	}
	setOpen(true);
};
