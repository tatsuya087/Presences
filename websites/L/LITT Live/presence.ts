const presence = new Presence({
		clientId: "575756169986048004",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let songName: HTMLElement,
	songArtist: HTMLElement,
	songNameS: string,
	songArtistS: string,
	thumbnail: HTMLImageElement;

presence.on("UpdateData", async () => {
	const sidePanel = document.querySelector(".MuiPaper-elevation");
	if (sidePanel && sidePanel.childNodes[1]) {
		thumbnail = sidePanel.childNodes[1].childNodes[0].childNodes[0]
			.childNodes[0] as HTMLImageElement;
	}

	const presenceData: PresenceData = {
		largeImageKey: thumbnail ?? "https://i.imgur.com/bs7XU8u.png",
	};

	songName = document.querySelector(
		"header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Title-Text"
	);
	if (!songName) {
		songNameS = document
			.querySelector("#marquee1")
			.textContent.replace("<span>", "")
			.replace("</span>", "");
		if (songNameS === "") songNameS = "None";
	} else if (songName) songNameS = songName.textContent;

	songArtist = document.querySelector(
		"header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Artist-Text"
	);
	if (!songArtist) {
		songArtistS = document
			.querySelector("#marquee2")
			.textContent.replaceAll("&amp;", "&")
			.replace('<span class="artist">', "")
			.replace("</span>", "");
		if (songNameS === "") songArtistS = "None";
	} else if (songArtist)
		songArtistS = songArtist.textContent.replace("&amp;", "&");

	if ((songNameS === "None" && songArtistS === "None") || songArtistS === "") {
		presenceData.smallImageKey = Assets.Pause;
		presenceData.smallImageText = "PauseChamp";

		presenceData.details = (await strings).pause;
	} else {
		presenceData.smallImageKey = Assets.Play;
		presenceData.smallImageText = "Playing...";

		presenceData.details = songNameS;
		presenceData.state = songArtistS;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
