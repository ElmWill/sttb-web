import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/kalender-akademik",
      permanent: true,
    },
  }
}

export default function KegiatanSlugRedirect() {
  return null
}
