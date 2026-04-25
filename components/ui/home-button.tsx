import Link from "next/link";
import React from "react";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr";

export default function HomeButton() {
    return (
        <React.Fragment>
            <Link href="/feed">
                <HouseIcon />
            </Link>
        </React.Fragment>
    );
}
