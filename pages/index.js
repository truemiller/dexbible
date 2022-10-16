import Link from "next/link";
import NETWORKS from "../json/networks.json"
import DEXS from "../json/dexs.json"
import {useEffect, useState} from "react";
import Image from "next/image";
import Head from "next/head";

const APP_NAME = "DEX Bible"
const APP_DESC = "DEX Lists for any Blockchain"
const APP_KEYWORDS = ""

export default function Home(props) {

	const [filter, setFilter] = useState(props.initialFilter ?? "")
	const [networks, setNetworks] = useState([])
	const [dexs, setDexs] = useState([])

	useEffect(() => {
		setNetworks(NETWORKS.sort((a, b) => a.slug > b.slug))
		setDexs(DEXS.filter(dex => dex.networks.includes(filter) || filter === "").sort((a, b) => a.rating < b.rating))
	}, [filter])

	return (
		<>
			<Head>
				<title>{filter ? `${networks.find(network => network.slug === filter)?.title + " DEX List"} | ${APP_NAME}` : `${APP_NAME} | ${APP_DESC}`}</title>
				<meta property="og:title"
				      content={filter ? `${networks.find(network => network.slug === filter)?.title + " DEX List"} | ${APP_NAME}` : `${APP_NAME} | ${APP_DESC}`}/>
				<meta property="og:description"
				      content={`Find our list of ${dexs.length} DEXs${filter ? " on " + networks.find(network => network.slug === filter)?.title : ""}.`}/>
				<meta name={"description"}
				      content={`Find our list of ${dexs.length} DEXs${filter ? " on " + networks.find(network => network.slug === filter)?.title : ""}.`}/>
				<meta name={"keywords"} content={`dex bible, ${filter + " "}dex list, ${filter + " "}dexs`}/>
			</Head>
			<div className={"bg-light min-vh-100"}>
				<nav className="navbar bg-white">
					<div className="container">
						<Link href={"/"}><a className="navbar-brand">📖 DEX Bible</a></Link>
						<Link href={"https://t.me/truemiller1"}><a className="nav-link">Contact</a></Link>
					</div>
				</nav>
				<main>
					<header className={"container my-3"}>
						<h1>
							{filter ? networks.find(network => network.slug === filter)?.title + " DEX list" : "DEX Bible"}
						</h1>
						<p>{`Find our list of ${dexs.length} DEXs${filter ? " on " + networks.find(network => network.slug === filter)?.title : ""}.`}</p>
					</header>
					<section className={"mb-1"}>
						<div className="container mt-3">
							{networks.map((network) => {
								return <Link href={`/${network.slug}`} key={network.slug}>
									<a className={`btn btn-sm bg-white shadow-sm me-2 mb-2 ${filter===network.slug?"active":""}`}
									   onClick={() => setFilter(network.slug)}>{network.title}</a>
								</Link>
							})}
						</div>
					</section>
					<section className={"container overflow-auto"}>
						<table className="table table-hover bg-white rounded shadow-sm small">
							<thead>
							<tr>
								<th width={30}>#</th>
								<th width={200}>Name</th>
								<th>Rating</th>
								<th>Networks</th>
								<th>Audited</th>
							</tr>
							</thead>
							<tbody>
							{dexs.map((dex, index) => {
								return <tr key={dex.slug}>
									<td>{index + 1}</td>
									<td className={"text-nowrap align-middle text-primary"}>
										<span><Image src={dex.logo} width={16} height={16} layout={"fixed"}/></span>
										<Link href={dex.url}><a className={"ms-2"}>{dex.title}</a></Link>
									</td>
									<td>{dex.rating}</td>
									<td>
										{/*{dex.networks.map((networkSlug, index) => {*/}
										{/*	return `${networks.find(network => network.slug === networkSlug)?.title}${index + 1 === dex.networks.length ? "" : ", "}`*/}
										{/*})}*/}
										{
											dex.networks.sort().map((networkSlug, index) => {
												return <Image
													key={networkSlug}
													style={{borderRadius: "100%"}}
													src={`${networks.find(network => network.slug === networkSlug)?.logo}`}
													width={20} height={20} layout={"fixed"}
													alt={`${networks.find(network => network.slug === networkSlug)?.title} logo`}
												/>
											})
										}
									</td>
									<td>{dex.audited ? "Yes" : "No"}</td>
								</tr>
							})}
							</tbody>
						</table>
					</section>
				</main>
			</div>
		</>
	)
}
