import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/kalender-akademik",
      permanent: true,
    },
  }
}

export default function KegiatanRedirect() {
  return null
}
