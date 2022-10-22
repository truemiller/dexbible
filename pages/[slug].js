import Home from "./index";
import { useRouter } from "next/router";
import NETWORKS from "../json/networks.json";

export default function FilteredPage() {
  const router = useRouter();
  const { slug } = router.query;
  if (NETWORKS.find((network) => network.slug === slug)) {
    return <Home initialFilter={slug} />;
  }
}
