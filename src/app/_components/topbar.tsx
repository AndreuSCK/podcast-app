import Link from "next/link";
import styles from "./topbar.module.css";
export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <Link href="/" prefetch={false}>
        <h1>Podcaster</h1>
      </Link>
    </div>
  );
}
