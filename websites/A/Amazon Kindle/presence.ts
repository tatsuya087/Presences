const presence = new Presence({
		clientId: "1208798725116395592",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Amazon Kindle Home",
			largeImageKey: "https://i.imgur.com/LnSgbsr.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;
	switch (pathname) {
		case "/": {
			presenceData.details = document.querySelector(
				"#top-menu-bar > ion-toolbar > ion-title"
			).textContent;
			presenceData.state = document
				.querySelector(
					"#main-content > div:nth-child(7) > ion-footer > ion-toolbar > ion-title > div"
				)
				.textContent.split("●")[0]
				.replace("Page", " ")
				.replace("of", "/")
				.replace("Location", " ")
				.trim();
		}
	}

	presence.setActivity(presenceData);
});
