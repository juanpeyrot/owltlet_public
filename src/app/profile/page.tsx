import { ProfileContent } from "@/components/profile/ProfileContent";
import { ProfileInfo } from "@/components/profile/ProfileInfo";


const Page = () => {
  return (
    <section className="flex flex-col items-center bg-light-bg dark:bg-dark-bg pt-5 gap-10">
      <ProfileInfo/>
      <ProfileContent/>
    </section>
  )
}

export default Page;