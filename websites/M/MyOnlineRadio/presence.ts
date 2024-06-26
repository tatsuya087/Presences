import { extToCountry } from "./extToCountry";
import { getDropDownSelected, getInp, toDate } from "./utils";
import { handleStation } from "./handleStation";

const presence = new Presence({
	clientId: "1217153856665026580",
});

export const enum Assets {
	Logo = "https://i.ibb.co/5LsDstd/mic2.png",
	MicIco = "https://i.ibb.co/QNhnC3z/mic.png",
}

const enum Pages {
	homepage = "/",
	contact = "/contact",
	playlists = "/playlists",
	schedule = "/schedule",
	news = "/news",
	parteners = "/partnership",
	embed = "/embed-radio",
}

presence.on("UpdateData", async () => {
	if (!document.location.toString()) return;

	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		name: `My Online Radio${extToCountry(document.location.origin)}`,
		type: ActivityType.Listening,
	};

	switch (document.location.pathname) {
		case Pages.homepage:
			presenceData.details = "Browsing Stations (home)";
			break;

		case Pages.contact:
			{
				const to = getDropDownSelected("to");
				presenceData.details = `Sending feedback${
					to ? ` to ${to.split(" - ")[0]}` : ""
				}`;
			}
			break;

		case Pages.parteners:
			{
				presenceData.details = "Applying to be a partener!";
			}
			break;

		case Pages.embed:
			{
				const to = getDropDownSelected("rid");
				presenceData.details = `Embdedding${
					to ? ` ${to.split(" - ")[0]}` : ""
				}`;

				if (to) {
					const server = getDropDownSelected("rsu_id");
					if (server) presenceData.largeImageText = server;
				}
			}
			break;

		case Pages.playlists:
			{
				const title = getInp("name") || "",
					from = getInp("from"),
					to = getInp("to"),
					channel = getDropDownSelected("rid");

				presenceData.details = `Searching playlists ${
					title ? `for ${title}` : ""
				}`;
				if (from && to)
					presenceData.largeImageText = `From ${toDate(from)} to ${toDate(to)}`;
				if (channel === "Radio channel") presenceData.state = " any channel";
				else if (channel) presenceData.state = `In Channel ${channel}`;
			}
			break;

		case Pages.news:
			{
				const title = getInp("name"),
					from = getInp("from"),
					to = getInp("to");

				presenceData.details = `Browsing news from ${
					title ? `for ${title}` : ""
				}`;
				if (from && to)
					presenceData.state = `From ${toDate(from)} to ${toDate(to)}`;
			}
			break;

		case Pages.schedule:
			{
				presenceData.details = "Browsing Radio Programs";
			}
			break;

		default:
			// deal with individual radio stations here
			handleStation(presence, presenceData);
			break;
	}

	presence.setActivity(presenceData);
});
