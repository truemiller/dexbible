import React from "react";
import NETWORKS from "../json/networks.json"

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${NETWORKS.map((network)=>{
				return `<url key="${network.slug}">
					<loc>https://dex.bible/${network.slug}</loc>
					<priority>1.0</priority>
				</url>`	
			}).join("")}
    </urlset>
  `;

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};

export default Sitemap;