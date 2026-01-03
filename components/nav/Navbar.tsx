
import { getUserCurrentPlan } from "@/lib/utils/billing-helper";
import {NavbarClient} from "@/components/nav/NavbarClient";

export default async function Navbar() {
    const plan = await getUserCurrentPlan();

    return <NavbarClient plan={plan} />;
}
