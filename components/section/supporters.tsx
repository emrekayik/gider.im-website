import { EventSponsor } from "@/components/custom/event-sponsor";
import { Sponsor } from "@/components/custom/sponsor";
import { YoutubeSponsor } from "@/components/custom/youtube-sponsor";
import { getGithubInfo } from "@/server/github";

const EVENT_SPONSORS = [
	{
		username: "9ssi7",
		tooltip: "Sami Salih İbrahimbaş",
		platform: "github",
		includeInTotal: false,
	},
	{
		username: "eserozvataf",
		tooltip: "Eser Özvataf",
		platform: "twitter",
		includeInTotal: false,
	},
	{
		username: "oguzyagizkara",
		tooltip: "Oğuz Yağız Kara",
		platform: "twitter",
		includeInTotal: true,
	},
	{
		username: "batuhankrskl",
		tooltip: "Batuhan Karasakal",
		platform: "github",
		includeInTotal: false,
	},
	{
		username: "ugorur",
		tooltip: "Umurcan Görür",
		platform: "github",
		includeInTotal: false,
	},
];

export async function Supporters() {
	const githubResponse = await getGithubInfo();
	const allSupporters =
		githubResponse.data.viewer.sponsorshipsAsMaintainer.nodes.sort((a, b) =>
			new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
				? 1
				: -1,
		);

	const chunks = allSupporters.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / 14);

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [];
		}

		resultArray[chunkIndex].push(item);

		return resultArray;
	}, [] as SponsorshipsAsMaintainerNode[][]);

	return (
		<>
			<h2 className="text-md text-center lg:text-left mb-3">
				<span className="underline-doodle font-semibold">
					{githubResponse.data.viewer.sponsorshipsAsMaintainer.totalCount +
						EVENT_SPONSORS.filter((s) => s.includeInTotal).length}{" "}
					people
				</span>{" "}
				supporting this project
			</h2>

			{chunks.map((chunk, index) => (
				<div
					key={index}
					className="flex lg:justify-start justify-center max-w-sm flex-wrap -mt-1.5"
				>
					{chunk.map((sponsor) => (
						<Sponsor
							key={sponsor.sponsorEntity.login}
							{...sponsor.sponsorEntity}
						/>
					))}
				</div>
			))}

			<h2 className="text-md font-semibold text-center lg:text-left mt-4 mb-0.5">
				Contest Sponsors
			</h2>
			<div className="flex lg:justify-start justify-center mb-4 items-center flex-wrap">
				{EVENT_SPONSORS.map((sponsor) => (
					<EventSponsor key={sponsor.username} {...sponsor} />
				))}
			</div>

			<div className="mt-4 mx-auto max-w-fit lg:-ml-1.5">
				<YoutubeSponsor />
			</div>
		</>
	);
}
