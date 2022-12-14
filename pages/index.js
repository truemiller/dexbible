import Link from "next/link";
import NETWORKS from "../json/networks.json";
import DEXS from "../json/dexs.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useInView } from "react-intersection-observer";

const APP_NAME = "DEX Bible";
const APP_DESC = "DEX Lists for any Blockchain";
const APP_KEYWORDS = "";

export default function Home(props) {
  const [filter, setFilter] = useState(props.initialFilter ?? "");
  const [networks, setNetworks] = useState([]);
  const [dexs, setDexs] = useState([]);

  useEffect(() => {
    setNetworks(NETWORKS.sort((a, b) => a.slug > b.slug));
    const filteredDexs = DEXS.filter(
      (dex) => dex.networks.includes(filter) || filter === ""
    );
    const sortedDexs = filteredDexs.sort((a, b) => b?.rating - a?.rating);
    setDexs(sortedDexs);
  }, [filter]);

  return (
    <>
      <Head>
        <title>
          {filter
            ? `${
                networks.find((network) => network.slug === filter)?.title +
                " DEX List"
              } | ${APP_NAME}`
            : `${APP_NAME} | ${APP_DESC}`}
        </title>
        <meta
          property="og:title"
          content={
            filter
              ? `${
                  networks.find((network) => network.slug === filter)?.title +
                  " DEX List"
                } | ${APP_NAME}`
              : `${APP_NAME} | ${APP_DESC}`
          }
        />
        <meta
          property="og:description"
          content={`Find our list of ${dexs.length} DEXs${
            filter
              ? " on " +
                networks.find((network) => network.slug === filter)?.title
              : ""
          }.`}
        />
        <meta
          name={"description"}
          content={`Find our list of ${dexs.length} DEXs${
            filter
              ? " on " +
                networks.find((network) => network.slug === filter)?.title
              : ""
          }.`}
        />
        <meta
          name={"keywords"}
          content={`dex bible, ${filter + " "}dex list, ${filter + " "}dexs`}
        />
      </Head>
      <div className={"bg-light min-vh-100 d-flex flex-column"}>
        <nav className="navbar bg-white">
          <div className="container">
            <Link href={"/"}>
              <a className="navbar-brand">???? DEX Bible</a>
            </Link>
            <Link href={"https://t.me/truemiller1"}>
              <a className="nav-link">Contact</a>
            </Link>
          </div>
        </nav>
        <main>
          <header className={"container my-3"}>
            <h1>
              {filter
                ? networks.find((network) => network.slug === filter)?.title +
                  " DEX list"
                : "DEX Bible"}
            </h1>
            <p>{`Find our list of ${dexs.length} DEXs${
              filter
                ? " on " +
                  networks.find((network) => network.slug === filter)?.title
                : ""
            }.`}</p>
          </header>
          <section className={"mb-1"}>
            <div className="container mt-3">
              {networks.map((network) => {
                return (
                  <Link href={`/${network.slug}`} key={network.slug}>
                    <a
                      className={`btn btn-sm bg-white shadow-sm me-2 mb-2 ${
                        filter === network.slug ? "active" : ""
                      }`}
                      onClick={() => setFilter(network.slug)}
                    >
                      {network.title}
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>
          <section className={"container overflow-auto"}>
            <table className="table table-hover bg-white rounded shadow-sm small">
              <thead>
                <tr>
                  <th width={30}>#</th>
                  <th width={200}>Name</th>
                  <th width={100}>Rating</th>
                  <th>Networks</th>
                  <th className={"text-nowrap ml-auto"} width={150}>
                    Native Token
                  </th>
                  <th width={100}>Audited</th>
                </tr>
              </thead>
              <tbody>
                {dexs.map((dex, index) => {
                  return (
                    <TableRow
                      key={dex.slug}
                      dex={dex}
                      index={index}
                      networks={networks}
                    />
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>
        <footer className="navbar bg-white mt-auto">
          <div className="container">
            <span>
              &copy; <Link href={"https://mlxn.ltd"}>MLXN Ltd.</Link> 2022
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

function TableRow(props) {
  const dex = props.dex;
  const index = props.index;
  const networks = props.networks;
  const { ref, inView, entry } = useInView({ threshold: 0 });

  return (
    <tr ref={ref} style={{ height: "32px", maxHeight: "32px" }}>
      {inView ? (
        <>
          <td className={"align-middle"}>{index + 1}</td>
          <td className={"text-nowrap align-middle text-primary fw-bold"}>
            <span className={"align-middle"}>
              <Image
                className={"rounded-circle border border-dark"}
                src={dex.logo}
                width={20}
                height={20}
                layout={"fixed"}
                alt={`${dex.title} logo.`}
                title={`${dex.title}`}
              />
            </span>
            <Link href={dex.url}>
              <a className={"ms-2 text-decoration-none"}>{dex.title}</a>
            </Link>
          </td>
          <td className={"align-middle"}>
            <div className={"progress"}>
              <span
                className={"progress-bar bg-success"}
                aria-valuemax={10}
                aria-valuemin={0}
                aria-valuenow={dex.rating}
                style={{ width: `${dex.rating * 10}%` }}
              >
                {dex.rating}
              </span>
            </div>
          </td>

          <td className={"align-middle"}>
            {dex.networks.sort().map((networkSlug, index) => {
              return (
                <Image
                  key={networkSlug}
                  style={{ borderRadius: "100%" }}
                  src={`${
                    networks.find((network) => network.slug === networkSlug)
                      ?.logo
                  }`}
                  width={20}
                  height={20}
                  layout={"fixed"}
                  alt={`${
                    networks.find((network) => network.slug === networkSlug)
                      ?.title
                  } logo`}
                  title={`${
                    networks.find((network) => network.slug === networkSlug)
                      ?.title
                  }`}
                  className={"border border-dark"}
                />
              );
            })}
          </td>

          <td>{dex.native_token}</td>
          <td className={"align-middle"}>{dex.audited ? "Yes" : "No"}</td>
        </>
      ) : null}
    </tr>
  );
}
