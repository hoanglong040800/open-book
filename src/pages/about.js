import { useSession } from "next-auth/client";
import Head from "next/head";

export default function About() {
  const [session] = useSession()

  return (
    <>
      <Head>
        <title>About page</title>
      </Head>

      <h1>About page</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
